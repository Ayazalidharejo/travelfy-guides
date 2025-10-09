export const useFormHandlers = (formData, setFormData) => {
  // Highlights Handlers
  const addHighlight = (currentHighlight, setCurrentHighlight) => {
    if (currentHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlightsList: [...prev.highlightsList, currentHighlight.trim()]
      }));
      setCurrentHighlight('');
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlightsList: prev.highlightsList.filter((_, i) => i !== index)
    }));
  };

  // Taglines Handlers
  const addTagline = (currentTagline, setCurrentTagline) => {
    if (currentTagline.trim()) {
      setFormData(prev => ({
        ...prev,
        taglinesList: [...prev.taglinesList, currentTagline.trim()]
      }));
      setCurrentTagline('');
    }
  };

  const removeTagline = (index) => {
    setFormData(prev => ({
      ...prev,
      taglinesList: prev.taglinesList.filter((_, i) => i !== index)
    }));
  };

  // Selling Points Handlers
  const handleSellingPointsChange = (e) => {
    const value = e.target.value;
    if (value && !formData.selectedSellingPoints.includes(value)) {
      setFormData(prev => ({
        ...prev,
        selectedSellingPoints: [...prev.selectedSellingPoints, value]
      }));
    }
    e.target.value = '';
  };

  const removeSellingPoint = (pointToRemove) => {
    setFormData(prev => ({
      ...prev,
      selectedSellingPoints: prev.selectedSellingPoints.filter(point => point !== pointToRemove)
    }));
  };

  // Things to Bring Handlers
  const handleThingsToBringChange = (e) => {
    const value = e.target.value;
    if (value && !formData.thingsToBring.includes(value)) {
      setFormData(prev => ({
        ...prev,
        thingsToBring: [...prev.thingsToBring, value]
      }));
    }
    e.target.value = '';
  };

  const removeThingToBring = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      thingsToBring: prev.thingsToBring.filter(item => item !== itemToRemove)
    }));
  };

  // File Handlers
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (field === 'mainImage') {
      setFormData(prev => ({ ...prev, mainImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files }));
    }
  };

  return {
    addHighlight,
    removeHighlight,
    addTagline,
    removeTagline,
    handleSellingPointsChange,
    removeSellingPoint,
    handleThingsToBringChange,
    removeThingToBring,
    handleFileChange
  };
};