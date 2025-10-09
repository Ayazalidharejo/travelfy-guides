// tourService.js - Complete CRUD Operations for Tours

const API_BASE_URL = 'https://tour-backend-eight.vercel.app/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// ============ CREATE OPERATIONS ============

/**
 * Create a new tour
 * @param {Object} tourData - Tour data object
 * @returns {Promise} Response data
 */
export const createTour = async (tourData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tourData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create tour');
    }

    return data;
  } catch (error) {
    console.error('Create Tour Error:', error);
    throw error;
  }
};

// ============ READ OPERATIONS ============

/**
 * Get all tours with optional filters
 * @param {Object} filters - Query parameters (page, limit, category, etc.)
 * @returns {Promise} Response data with tours array
 */
export const getAllTours = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/posts${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tours');
    }

    return data;
  } catch (error) {
    console.error('Get All Tours Error:', error);
    throw error;
  }
};

/**
 * Get single tour by ID
 * @param {string} tourId - Tour ID
 * @returns {Promise} Response data with tour object
 */
export const getTourById = async (tourId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tour');
    }

    return data;
  } catch (error) {
    console.error('Get Tour By ID Error:', error);
    throw error;
  }
};

/**
 * Get tour by slug
 * @param {string} slug - Tour slug
 * @returns {Promise} Response data with tour object
 */
export const getTourBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/slug/${slug}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tour');
    }

    return data;
  } catch (error) {
    console.error('Get Tour By Slug Error:', error);
    throw error;
  }
};

/**
 * Get featured tours
 * @param {number} limit - Number of tours to fetch
 * @returns {Promise} Response data with featured tours
 */
export const getFeaturedTours = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/featured?limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch featured tours');
    }

    return data;
  } catch (error) {
    console.error('Get Featured Tours Error:', error);
    throw error;
  }
};

// ============ UPDATE OPERATIONS ============

/**
 * Update tour by ID
 * @param {string} tourId - Tour ID
 * @param {Object} updateData - Updated tour data
 * @returns {Promise} Response data
 */
export const updateTour = async (tourId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update tour');
    }

    return data;
  } catch (error) {
    console.error('Update Tour Error:', error);
    throw error;
  }
};

/**
 * Update tour status (draft, published, archived)
 * @param {string} tourId - Tour ID
 * @param {string} status - New status
 * @returns {Promise} Response data
 */
export const updateTourStatus = async (tourId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update tour status');
    }

    return data;
  } catch (error) {
    console.error('Update Tour Status Error:', error);
    throw error;
  }
};

/**
 * Toggle tour featured status
 * @param {string} tourId - Tour ID
 * @returns {Promise} Response data
 */
export const toggleTourFeatured = async (tourId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}/featured`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle featured status');
    }

    return data;
  } catch (error) {
    console.error('Toggle Featured Error:', error);
    throw error;
  }
};

/**
 * Bulk update tour status
 * @param {Array} tourIds - Array of tour IDs
 * @param {string} status - New status
 * @returns {Promise} Response data
 */
export const bulkUpdateStatus = async (tourIds, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/bulk/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids: tourIds, status })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to bulk update status');
    }

    return data;
  } catch (error) {
    console.error('Bulk Update Status Error:', error);
    throw error;
  }
};

// ============ DELETE OPERATIONS ============

/**
 * Delete tour by ID
 * @param {string} tourId - Tour ID
 * @returns {Promise} Response data
 */
export const deleteTour = async (tourId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete tour');
    }

    return data;
  } catch (error) {
    console.error('Delete Tour Error:', error);
    throw error;
  }
};

/**
 * Bulk delete tours
 * @param {Array} tourIds - Array of tour IDs
 * @returns {Promise} Response data
 */
export const bulkDeleteTours = async (tourIds) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/bulk/delete`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids: tourIds })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to bulk delete tours');
    }

    return data;
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    throw error;
  }
};

// ============ IMAGE UPLOAD OPERATIONS ============

/**
 * Upload images for a tour
 * @param {string} tourId - Tour ID
 * @param {FormData} formData - Form data with images
 * @returns {Promise} Response data
 */
export const uploadTourImages = async (tourId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/posts/${tourId}/upload-images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
      body: formData
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload images');
    }

    return data;
  } catch (error) {
    console.error('Upload Images Error:', error);
    throw error;
  }
};

// ============ SEARCH & FILTER OPERATIONS ============

/**
 * Search tours by query
 * @param {string} searchQuery - Search term
 * @param {Object} additionalFilters - Additional filters
 * @returns {Promise} Response data
 */
export const searchTours = async (searchQuery, additionalFilters = {}) => {
  try {
    const filters = {
      search: searchQuery,
      ...additionalFilters
    };
    
    return await getAllTours(filters);
  } catch (error) {
    console.error('Search Tours Error:', error);
    throw error;
  }
};

/**
 * Get tours by category
 * @param {string} category - Tour category
 * @param {Object} additionalFilters - Additional filters
 * @returns {Promise} Response data
 */
export const getToursByCategory = async (category, additionalFilters = {}) => {
  try {
    const filters = {
      category,
      ...additionalFilters
    };
    
    return await getAllTours(filters);
  } catch (error) {
    console.error('Get Tours By Category Error:', error);
    throw error;
  }
};

/**
 * Get tours by city
 * @param {string} city - City name
 * @param {Object} additionalFilters - Additional filters
 * @returns {Promise} Response data
 */
export const getToursByCity = async (city, additionalFilters = {}) => {
  try {
    const filters = {
      city,
      ...additionalFilters
    };
    
    return await getAllTours(filters);
  } catch (error) {
    console.error('Get Tours By City Error:', error);
    throw error;
  }
};

// Export all functions as default object
export default {
  createTour,
  getAllTours,
  getTourById,
  getTourBySlug,
  getFeaturedTours,
  updateTour,
  updateTourStatus,
  toggleTourFeatured,
  bulkUpdateStatus,
  deleteTour,
  bulkDeleteTours,
  uploadTourImages,
  searchTours,
  getToursByCategory,
  getToursByCity
};