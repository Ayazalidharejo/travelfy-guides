import React from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, X } from 'lucide-react';
import { categories, tourTypes, sellingPointOptions } from '../../../utils/constants';

const SectionHeader = ({ title, section, expandedSections, toggleSection }) => (
  <div 
    className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
    onClick={() => toggleSection(section)}
  >
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {expandedSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
  </div>
);

const BasicInfoSection = ({ 
  formData, 
  handleInputChange, 
  expandedSections, 
  toggleSection,
  currentTagline,
  setCurrentTagline,
  addTagline,
  removeTagline,
  handleSellingPointsChange,
  removeSellingPoint
}) => {
  return (
    <div>
      <SectionHeader 
        title="Product Management - Create a Product" 
        section="basic" 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      {expandedSections.basic && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
              <select 
                name="tourType" 
                value={formData.tourType} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Tour Type</option>
                {tourTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          {/* Taglines */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Taglines</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={currentTagline} 
                onChange={(e) => setCurrentTagline(e.target.value)}
                placeholder="Enter a tagline"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button" 
                onClick={addTagline}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            {formData.taglinesList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.taglinesList.map((tagline, index) => (
                  <div key={index} className="flex items-center gap-1 bg-[#5C7AC0]  hover:bg-[#284078] text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tagline}
                    <button 
                      type="button" 
                      onClick={() => removeTagline(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Setting Points */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Setting Points</label>
            <div className="space-y-2">
              <select 
                onChange={handleSellingPointsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select selling points...</option>
                {sellingPointOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className="text-sm text-gray-500">Select from the dropdown to add selling points</p>
              
              {formData.selectedSellingPoints.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.selectedSellingPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-1 bg-[#5C7AC0]  hover:bg-[#284078] text-blue-800 px-3 py-1 rounded-full text-sm">
                      {point}
                      <button 
                        type="button" 
                        onClick={() => removeSellingPoint(point)}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;