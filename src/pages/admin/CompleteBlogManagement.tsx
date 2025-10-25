import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Star, ChevronDown, ChevronRight, Save, X, MapPin, Shield, Camera } from 'lucide-react';
import api from '@/lib/api';

const CompleteBlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    destinations: false,
    languageDetails: false,
    accommodations: false,
    transport: false,
    safety: false,
    shopping: false,
    localGuides: false,
    photoSpots: false,
    culture: false,
    medical: false,
    insurance: false,
    packing: false
  });

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    featured: ''
  });

  const [formData, setFormData] = useState({
    title: '', content: '', price: '', category: '', duration: '', difficulty: 'Easy',
    status: 'published', featured: false, imageUrl: '', tags: [],
    // New Complex Fields
    destinations: [],
    languagesDetailed: [],
    accommodations: [],
    transport: [],
    safetyInfo: [],
    shopping: [],
    localGuides: [],
    photoSpots: [],
    culture: [],
    medical: [],
    insurance: [],
    packingList: []
  });

  // use centralized api instance from lib/api (already has baseURL and interceptors)

  const categories = ['blog', 'tour', 'mountain', 'cultural', 'nature', 'adventure', 'food'];
  const difficulties = ['Easy', 'Moderate', 'Hard'];
  const statuses = ['draft', 'published', 'archived'];
  const languageLevels = ['Native', 'Fluent', 'Conversational', 'Basic'];
  const accommodationTypes = ['Hotel', 'Hostel', 'Resort', 'Homestay', 'Camping'];
  const transportTypes = ['Bus', 'Car', 'Train', 'Flight', 'Boat', 'Walking'];

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page: page.toString(), limit: '10', ...filters };
      const response = await api.get('/posts', { params });
      if (response.data.success) {
        setPosts(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setCurrentPage(response.data.pagination?.currentPage || 1);
      }
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.post('/posts', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setSuccess('Post created successfully!');
        setShowModal(false);
        resetForm();
        await fetchPosts(currentPage);
      }
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async () => {
    if (!editingPost?._id) return;
    setLoading(true);
    try {
      const response = await api.put(`/posts/${editingPost._id}`, formData);
      if (response.data.success) {
        setSuccess('Post updated successfully!');
        setShowModal(false);
        setEditingPost(null);
        resetForm();
        await fetchPosts(currentPage);
      }
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!id || !window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setSuccess('Deleted successfully!');
      await fetchPosts(currentPage);
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', content: '', price: '', category: '', duration: '', difficulty: 'Easy',
      status: 'published', featured: false, imageUrl: '', tags: [],
      destinations: [], languagesDetailed: [], accommodations: [], transport: [],
      safetyInfo: [], shopping: [], localGuides: [], photoSpots: [],
      culture: [], medical: [], insurance: [], packingList: []
    });
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      content: post.content || '',
      price: post.price || '',
      category: post.category || '',
      duration: post.duration || '',
      difficulty: post.difficulty || 'Easy',
      status: post.status || 'published',
      featured: Boolean(post.featured),
      imageUrl: post.imageUrl || '',
      tags: Array.isArray(post.tags) ? post.tags : [],
      destinations: Array.isArray(post.destinations) ? post.destinations : [],
      languagesDetailed: Array.isArray(post.languagesDetailed) ? post.languagesDetailed : [],
      accommodations: Array.isArray(post.accommodations) ? post.accommodations : [],
      transport: Array.isArray(post.transport) ? post.transport : [],
      safetyInfo: Array.isArray(post.safetyInfo) ? post.safetyInfo : [],
      shopping: Array.isArray(post.shopping) ? post.shopping : [],
      localGuides: Array.isArray(post.localGuides) ? post.localGuides : [],
      photoSpots: Array.isArray(post.photoSpots) ? post.photoSpots : [],
      culture: Array.isArray(post.culture) ? post.culture : [],
      medical: Array.isArray(post.medical) ? post.medical : [],
      insurance: Array.isArray(post.insurance) ? post.insurance : [],
      packingList: Array.isArray(post.packingList) ? post.packingList : []
    });
    setShowModal(true);
  };

  const addComplexField = (fieldName, template) => {
    setFormData({ ...formData, [fieldName]: [...(formData[fieldName] || []), template] });
  };

  const updateComplexField = (fieldName, index, field, value) => {
    const newArray = [...(formData[fieldName] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData({ ...formData, [fieldName]: newArray });
  };

  const removeComplexField = (fieldName, index) => {
    const newArray = (formData[fieldName] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [fieldName]: newArray });
  };

  const toggleSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category || !formData.duration || !formData.price) {
      setError('Please fill required fields');
      return;
    }
    editingPost ? updatePost() : createPost();
  };

  useEffect(() => { fetchPosts(1); }, []);
  useEffect(() => {
    const timer = setTimeout(() => fetchPosts(1), 500);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Complete Blog Management</h1>
        <button onClick={() => { setEditingPost(null); resetForm(); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> Add Post
        </button>
      </div>

      {success && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search..." value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>
          <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-2 border rounded-lg">
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 border rounded-lg">
            <option value="">All Status</option>
            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <select value={filters.featured} onChange={(e) => setFilters({...filters, featured: e.target.value})}
            className="px-3 py-2 border rounded-lg">
            <option value="">All Posts</option>
            <option value="true">Featured</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No posts found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-sm font-medium">{post.title}</div>
                      {post.featured && <Star className="ml-2 h-4 w-4 text-yellow-400 fill-current" />}
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-[#5C7AC0]  hover:bg-[#284078] text-blue-800">{post.category}</span></td>
                  <td className="px-6 py-4 text-sm">{post.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{post.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(post)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deletePost(post._id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50">
          <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-lg bg-white mb-8 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b z-10">
              <h3 className="text-xl font-bold">{editingPost ? 'Edit Post' : 'Create Post'}</h3>
              <button onClick={() => { setShowModal(false); setEditingPost(null); resetForm(); }}
                className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('basic')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Basic Information</h4>
                  {expandedSections.basic ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.basic && (
                  <div className="p-4 space-y-4">
                    <input type="text" required placeholder="Title *" value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md" />
                    <textarea required rows={4} placeholder="Content *" value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md" />
                    <div className="grid grid-cols-2 gap-4">
                      <select required value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="px-3 py-2 border rounded-md">
                        <option value="">Category *</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input type="text" required placeholder="Price *" value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="px-3 py-2 border rounded-md" />
                    </div>
                  </div>
                )}
              </div>

              {/* Destinations */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('destinations')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    <h4 className="text-lg font-medium">Destinations</h4>
                  </div>
                  {expandedSections.destinations ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.destinations && (
                  <div className="p-4 space-y-4">
                    {(formData.destinations || []).map((dest, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <input type="text" placeholder="Name" value={dest.name || ''}
                            onChange={(e) => updateComplexField('destinations', index, 'name', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                          <input type="text" placeholder="Duration" value={dest.duration || ''}
                            onChange={(e) => updateComplexField('destinations', index, 'duration', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                        </div>
                        <textarea placeholder="Description" rows={2} value={dest.description || ''}
                          onChange={(e) => updateComplexField('destinations', index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('destinations', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('destinations', {name: '', description: '', duration: '', difficulty: 'Easy'})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Destination
                    </button>
                  </div>
                )}
              </div>

              {/* Languages Detailed */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('languageDetails')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Language Details</h4>
                  {expandedSections.languageDetails ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.languageDetails && (
                  <div className="p-4 space-y-4">
                    {(formData.languagesDetailed || []).map((lang, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50 flex items-center gap-4">
                        <input type="text" placeholder="Language" value={lang.name || ''}
                          onChange={(e) => updateComplexField('languagesDetailed', index, 'name', e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md" />
                        <select value={lang.level || 'Basic'}
                          onChange={(e) => updateComplexField('languagesDetailed', index, 'level', e.target.value)}
                          className="px-3 py-2 border rounded-md">
                          {languageLevels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <button type="button" onClick={() => removeComplexField('languagesDetailed', index)}
                          className="text-red-600"><Trash2 size={16} /></button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('languagesDetailed', {name: '', level: 'Basic', guides: 0})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Language
                    </button>
                  </div>
                )}
              </div>

              {/* Accommodations */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('accommodations')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Accommodations</h4>
                  {expandedSections.accommodations ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.accommodations && (
                  <div className="p-4 space-y-4">
                    {(formData.accommodations || []).map((acc, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <input type="text" placeholder="Name" value={acc.name || ''}
                            onChange={(e) => updateComplexField('accommodations', index, 'name', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                          <select value={acc.type || 'Hotel'}
                            onChange={(e) => updateComplexField('accommodations', index, 'type', e.target.value)}
                            className="px-3 py-2 border rounded-md">
                            {accommodationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <input type="text" placeholder="Address" value={acc.address || ''}
                          onChange={(e) => updateComplexField('accommodations', index, 'address', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('accommodations', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('accommodations', {name: '', type: 'Hotel', address: '', priceRange: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Accommodation
                    </button>
                  </div>
                )}
              </div>

              {/* Transport */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('transport')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Transport Options</h4>
                  {expandedSections.transport ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.transport && (
                  <div className="p-4 space-y-4">
                    {(formData.transport || []).map((trans, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <select value={trans.type || 'Bus'}
                            onChange={(e) => updateComplexField('transport', index, 'type', e.target.value)}
                            className="px-3 py-2 border rounded-md">
                            {transportTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <input type="text" placeholder="Duration" value={trans.duration || ''}
                            onChange={(e) => updateComplexField('transport', index, 'duration', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                        </div>
                        <textarea placeholder="Description" rows={2} value={trans.description || ''}
                          onChange={(e) => updateComplexField('transport', index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('transport', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('transport', {type: 'Bus', description: '', included: false, cost: 0, duration: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Transport
                    </button>
                  </div>
                )}
              </div>

              {/* Safety Info */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('safety')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    <h4 className="text-lg font-medium">Safety Information</h4>
                  </div>
                  {expandedSections.safety ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.safety && (
                  <div className="p-4 space-y-4">
                    {(formData.safetyInfo || []).map((safety, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <input type="text" placeholder="Safety Tip" value={safety.tip || ''}
                          onChange={(e) => updateComplexField('safetyInfo', index, 'tip', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <input type="text" placeholder="Emergency Number" value={safety.emergencyNumber || ''}
                          onChange={(e) => updateComplexField('safetyInfo', index, 'emergencyNumber', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('safetyInfo', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('safetyInfo', {tip: '', emergencyNumber: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Safety Info
                    </button>
                  </div>
                )}
              </div>

              {/* Photo Spots */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('photoSpots')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-purple-600" />
                    <h4 className="text-lg font-medium">Photography Spots</h4>
                  </div>
                  {expandedSections.photoSpots ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.photoSpots && (
                  <div className="p-4 space-y-4">
                    {(formData.photoSpots || []).map((spot, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <input type="text" placeholder="Location" value={spot.location || ''}
                          onChange={(e) => updateComplexField('photoSpots', index, 'location', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <textarea placeholder="Description" rows={2} value={spot.description || ''}
                          onChange={(e) => updateComplexField('photoSpots', index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <input type="text" placeholder="Best Time" value={spot.bestTime || ''}
                          onChange={(e) => updateComplexField('photoSpots', index, 'bestTime', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('photoSpots', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('photoSpots', {location: '', description: '', bestTime: '', tip: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Photo Spot
                    </button>
                  </div>
                )}
              </div>

              {/* Shopping */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('shopping')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Shopping Recommendations</h4>
                  {expandedSections.shopping ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.shopping && (
                  <div className="p-4 space-y-4">
                    {(formData.shopping || []).map((shop, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <input type="text" placeholder="Item" value={shop.item || ''}
                            onChange={(e) => updateComplexField('shopping', index, 'item', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                          <input type="text" placeholder="Market" value={shop.market || ''}
                            onChange={(e) => updateComplexField('shopping', index, 'market', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                        </div>
                        <input type="text" placeholder="Price Range" value={shop.priceRange || ''}
                          onChange={(e) => updateComplexField('shopping', index, 'priceRange', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('shopping', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('shopping', {item: '', market: '', priceRange: '', description: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Shopping Item
                    </button>
                  </div>
                )}
              </div>

              {/* Local Guides */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('localGuides')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Local Guides</h4>
                  {expandedSections.localGuides ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.localGuides && (
                  <div className="p-4 space-y-4">
                    {(formData.localGuides || []).map((guide, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <input type="text" placeholder="Name" value={guide.name || ''}
                            onChange={(e) => updateComplexField('localGuides', index, 'name', e.target.value)}
                            className="px-3 py-2 border rounded-md" />
                          <input type="number" placeholder="Experience Years" value={guide.experienceYears || ''}
                            onChange={(e) => updateComplexField('localGuides', index, 'experienceYears', parseInt(e.target.value) || 0)}
                            className="px-3 py-2 border rounded-md" />
                        </div>
                        <input type="text" placeholder="Photo URL" value={guide.photo || ''}
                          onChange={(e) => updateComplexField('localGuides', index, 'photo', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('localGuides', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('localGuides', {name: '', experienceYears: 0, languages: [], specialties: [], rating: 0, photo: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Local Guide
                    </button>
                  </div>
                )}
              </div>

              {/* Culture */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('culture')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Local Culture & Etiquette</h4>
                  {expandedSections.culture ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.culture && (
                  <div className="p-4 space-y-4">
                    {(formData.culture || []).map((cult, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <input type="text" placeholder="Tradition" value={cult.tradition || ''}
                          onChange={(e) => updateComplexField('culture', index, 'tradition', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <input type="text" placeholder="Dress Code" value={cult.dressCode || ''}
                          onChange={(e) => updateComplexField('culture', index, 'dressCode', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <textarea placeholder="Etiquette" rows={2} value={cult.etiquette || ''}
                          onChange={(e) => updateComplexField('culture', index, 'etiquette', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('culture', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('culture', {tradition: '', dressCode: '', do: [], dont: [], etiquette: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Culture Info
                    </button>
                  </div>
                )}
              </div>

              {/* Medical */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('medical')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Medical Information</h4>
                  {expandedSections.medical ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.medical && (
                  <div className="p-4 space-y-4">
                    {(formData.medical || []).map((med, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <label className="flex items-center mb-2">
                          <input type="checkbox" checked={med.required || false}
                            onChange={(e) => updateComplexField('medical', index, 'required', e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded mr-2" />
                          <span className="text-sm">Vaccinations Required</span>
                        </label>
                        <textarea placeholder="Health Tips" rows={2} value={med.healthTips || ''}
                          onChange={(e) => updateComplexField('medical', index, 'healthTips', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('medical', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('medical', {required: false, vaccinations: [], healthTips: '', nearbyHospitals: []})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Medical Info
                    </button>
                  </div>
                )}
              </div>

              {/* Insurance */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('insurance')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Insurance Information</h4>
                  {expandedSections.insurance ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.insurance && (
                  <div className="p-4 space-y-4">
                    {(formData.insurance || []).map((ins, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <label className="flex items-center mb-2">
                          <input type="checkbox" checked={ins.recommended || false}
                            onChange={(e) => updateComplexField('insurance', index, 'recommended', e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded mr-2" />
                          <span className="text-sm">Recommended</span>
                        </label>
                        <textarea placeholder="Coverage Details" rows={2} value={(ins.coverage || []).join(', ')}
                          onChange={(e) => updateComplexField('insurance', index, 'coverage', e.target.value.split(',').map(s => s.trim()))}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('insurance', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('insurance', {recommended: false, coverage: [], providerSuggestions: []})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Insurance Info
                    </button>
                  </div>
                )}
              </div>

              {/* Packing List */}
              <div className="border rounded-lg">
                <button type="button" onClick={() => toggleSection('packing')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                  <h4 className="text-lg font-medium">Packing List</h4>
                  {expandedSections.packing ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.packing && (
                  <div className="p-4 space-y-4">
                    {(formData.packingList || []).map((pack, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <div className="flex items-center gap-4 mb-2">
                          <input type="text" placeholder="Item" value={pack.item || ''}
                            onChange={(e) => updateComplexField('packingList', index, 'item', e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md" />
                          <label className="flex items-center">
                            <input type="checkbox" checked={pack.required || false}
                              onChange={(e) => updateComplexField('packingList', index, 'required', e.target.checked)}
                              className="h-4 w-4 text-blue-600 rounded mr-2" />
                            <span className="text-sm">Required</span>
                          </label>
                        </div>
                        <input type="text" placeholder="Notes" value={pack.notes || ''}
                          onChange={(e) => updateComplexField('packingList', index, 'notes', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md mb-2" />
                        <button type="button" onClick={() => removeComplexField('packingList', index)}
                          className="text-red-600 text-sm flex items-center">
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                      </div>
                    ))}
                    <button type="button"
                      onClick={() => addComplexField('packingList', {item: '', required: false, notes: ''})}
                      className="text-blue-600 text-sm flex items-center">
                      <Plus size={16} className="mr-1" /> Add Packing Item
                    </button>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t sticky bottom-0 bg-white z-10">
                <button type="button" onClick={() => { setShowModal(false); setEditingPost(null); resetForm(); }}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {editingPost ? 'Update' : 'Create'} Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteBlogManagement;