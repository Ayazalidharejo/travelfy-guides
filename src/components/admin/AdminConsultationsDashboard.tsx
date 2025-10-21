import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, User, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, X } from 'lucide-react';

const API_BASE_URL = 'https://tour-backend-eight.vercel.app/api';

export default function AdminConsultationsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Fetch consultations when dashboard opens
  useEffect(() => {
    if (isOpen) {
      fetchConsultations();
    }
  }, [isOpen, activeTab]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      let endpoint = `${API_BASE_URL}/consultations`;
      
      if (activeTab === 'pending') endpoint = `${API_BASE_URL}/consultations/pending/list`;
      if (activeTab === 'today') endpoint = `${API_BASE_URL}/consultations/today/list`;
      if (activeTab === 'upcoming') endpoint = `${API_BASE_URL}/consultations/upcoming/list`;

      console.log('📡 Fetching from:', endpoint);

      const token = localStorage.getItem('token');
      console.log('🔑 Token:', token ? 'Found' : 'Not Found');

      if (!token) {
        console.error('❌ No token found');
        alert('Please login as admin to view consultations');
        setIsOpen(false);
        return;
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📊 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Data received:', data);

      if (data.success) {
        setConsultations(data.data || []);
        setFilteredData(data.data || []);
        console.log('✅ Consultations loaded:', data.data?.length || 0);
      } else {
        throw new Error(data.message || 'Failed to fetch consultations');
      }
    } catch (error) {
      console.error('❌ Error fetching consultations:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter consultations
  useEffect(() => {
    let filtered = consultations;

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchTerm, statusFilter, consultations]);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login as admin');
        return;
      }

      console.log('🔄 Updating status for:', id, 'to:', newStatus);

      const response = await fetch(`${API_BASE_URL}/consultations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Status updated successfully! ✅');
        fetchConsultations();
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('❌ Error updating status:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const pendingCount = consultations.filter(c => c.status === 'pending').length;

  return (
    <>
      {/* Simple Button - Initially shows only this */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Calendar className="h-5 w-5" />
          View Schedule
        </button>
        
        {/* Pending Count Badge - Like WhatsApp notifications */}
        {pendingCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[24px] h-6 px-2 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-pulse">
            {pendingCount}
          </span>
        )}
      </div>

      {/* Full Dashboard - Opens on button click */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl">
              {/* Header with Close Button */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultation Schedule</h1>
                    <p className="text-gray-600">Manage and track all consultation bookings</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total</p>
                        <p className="text-2xl font-bold text-blue-900">{consultations.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600 font-medium">Pending</p>
                        <p className="text-2xl font-bold text-yellow-900">
                          {consultations.filter(c => c.status === 'pending').length}
                        </p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Confirmed</p>
                        <p className="text-2xl font-bold text-blue-900">
                          {consultations.filter(c => c.status === 'confirmed').length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Completed</p>
                        <p className="text-2xl font-bold text-green-900">
                          {consultations.filter(c => c.status === 'completed').length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                      {['all', 'pending', 'today', 'upcoming'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                            activeTab === tab
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by name, email or phone..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        onClick={fetchConsultations}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        <p className="mt-2 text-gray-600">Loading consultations...</p>
                      </div>
                    ) : filteredData.length === 0 ? (
                      <div className="p-12 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium mb-2">No consultations found</p>
                        <p className="text-sm text-gray-500">
                          {consultations.length === 0 
                            ? 'No consultations have been scheduled yet.'
                            : 'Try adjusting your search or filter criteria.'}
                        </p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Schedule
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredData.map((consultation) => (
                            <tr key={consultation._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {consultation.fullName}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      ID: {consultation._id.slice(-6)}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 flex items-center gap-1 mb-1">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  {consultation.email}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  {consultation.phone}
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 flex items-center gap-1 mb-1">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  {formatDate(consultation.preferredDate)}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  {consultation.preferredTime}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                                  {getStatusIcon(consultation.status)}
                                  {consultation.status}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setSelectedConsultation(consultation)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    View
                                  </button>
                                  {consultation.status === 'pending' && (
                                    <button
                                      onClick={() => updateStatus(consultation._id, 'confirmed')}
                                      className="text-green-600 hover:text-green-800 font-medium"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {consultation.status === 'confirmed' && (
                                    <button
                                      onClick={() => updateStatus(consultation._id, 'completed')}
                                      className="text-green-600 hover:text-green-800 font-medium"
                                    >
                                      Complete
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium">{selectedConsultation.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedConsultation.status)}`}>
                      {selectedConsultation.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedConsultation.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{selectedConsultation.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Preferred Date</label>
                  <p className="text-gray-900">{formatDate(selectedConsultation.preferredDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Preferred Time</label>
                  <p className="text-gray-900">{selectedConsultation.preferredTime}</p>
                </div>
              </div>

              {selectedConsultation.travelPlans && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Travel Plans</label>
                  <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">{selectedConsultation.travelPlans}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-gray-900">{formatDate(selectedConsultation.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Updated At</label>
                  <p className="text-gray-900">{formatDate(selectedConsultation.updatedAt)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedConsultation(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {selectedConsultation.status === 'pending' && (
                <button
                  onClick={() => {
                    updateStatus(selectedConsultation._id, 'confirmed');
                    setSelectedConsultation(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Consultation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}