import api from '@/lib/api';

export const tourService = {
  // Create
  async createTour(tourData) {
    try {
      const { data } = await api.post('/posts', tourData);
      return data;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  },

  // Read All
  async getAllTours() {
    try {
      const { data } = await api.get('/posts');
      return data;
    } catch (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
  },

  // Read Single
  async getTourById(id) {
    try {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching tour:', error);
      throw error;
    }
  },

  // Update
  async updateTour(id, tourData) {
    try {
      const { data } = await api.put(`/posts/${id}`, tourData);
      return data;
    } catch (error) {
      console.error('Error updating tour:', error);
      throw error;
    }
  },

  // Delete
  async deleteTour(id) {
    try {
      const { data } = await api.delete(`/posts/${id}`);
      return data;
    } catch (error) {
      console.error('Error deleting tour:', error);
      throw error;
    }
  },

  // Local Storage operations (fallback)
  localStorage: {
    getTours() {
      const tours = localStorage.getItem('tours');
      return tours ? JSON.parse(tours) : [];
    },

    saveTour(tourData) {
      const tours = this.getTours();
      const newTour = {
        id: Date.now().toString(),
        ...tourData,
        createdAt: new Date().toISOString()
      };
      tours.push(newTour);
      localStorage.setItem('tours', JSON.stringify(tours));
      return newTour;
    },

    updateTour(id, tourData) {
      const tours = this.getTours();
      const index = tours.findIndex(tour => tour.id === id);
      if (index !== -1) {
        tours[index] = { ...tours[index], ...tourData, updatedAt: new Date().toISOString() };
        localStorage.setItem('tours', JSON.stringify(tours));
        return tours[index];
      }
      return null;
    },

    deleteTour(id) {
      const tours = this.getTours();
      const filteredTours = tours.filter(tour => tour.id !== id);
      localStorage.setItem('tours', JSON.stringify(filteredTours));
      return true;
    }
  }
};