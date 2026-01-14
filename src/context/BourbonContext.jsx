import React, { createContext, useContext, useState, useEffect } from 'react';
import { bourbons as initialBourbons } from '../data/bourbons';

const BourbonContext = createContext();

const API_BASE = '/api';

export function BourbonProvider({ children }) {
  const [bourbons, setBourbons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bourbons from API on mount
  useEffect(() => {
    fetchBourbons();
  }, []);

  const fetchBourbons = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/bourbons`);

      if (!response.ok) {
        throw new Error('Failed to fetch bourbons');
      }

      const data = await response.json();
      setBourbons(data);
      setError(null);
    } catch (err) {
      console.error('API fetch failed, using local data:', err);
      // Fallback to localStorage if API is unavailable (local dev)
      const stored = localStorage.getItem('travis-bourbon-collection');
      if (stored) {
        try {
          setBourbons(JSON.parse(stored));
        } catch {
          setBourbons(initialBourbons);
        }
      } else {
        setBourbons(initialBourbons);
      }
      setError(null); // Don't show error for fallback
    } finally {
      setLoading(false);
    }
  };

  const addBourbon = async (bourbon) => {
    try {
      const response = await fetch(`${API_BASE}/bourbons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bourbon)
      });

      if (!response.ok) throw new Error('Failed to add bourbon');

      const result = await response.json();
      const newBourbon = { ...bourbon, id: result.id };
      setBourbons(prev => [...prev, newBourbon]);
      return newBourbon;
    } catch (err) {
      console.error('API add failed, using local:', err);
      // Fallback to local
      const newId = Math.max(0, ...bourbons.map(b => b.id)) + 1;
      const newBourbon = { ...bourbon, id: newId };
      setBourbons(prev => {
        const updated = [...prev, newBourbon];
        localStorage.setItem('travis-bourbon-collection', JSON.stringify(updated));
        return updated;
      });
      return newBourbon;
    }
  };

  const updateBourbon = async (id, updates) => {
    try {
      const bourbon = bourbons.find(b => b.id === id);
      const updated = { ...bourbon, ...updates };

      const response = await fetch(`${API_BASE}/bourbons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (!response.ok) throw new Error('Failed to update bourbon');

      setBourbons(prev =>
        prev.map(b => (b.id === id ? updated : b))
      );
    } catch (err) {
      console.error('API update failed, using local:', err);
      // Fallback to local
      setBourbons(prev => {
        const updated = prev.map(b => (b.id === id ? { ...b, ...updates } : b));
        localStorage.setItem('travis-bourbon-collection', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteBourbon = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/bourbons/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete bourbon');

      setBourbons(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('API delete failed, using local:', err);
      // Fallback to local
      setBourbons(prev => {
        const updated = prev.filter(b => b.id !== id);
        localStorage.setItem('travis-bourbon-collection', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const resetToDefault = async () => {
    try {
      const response = await fetch(`${API_BASE}/reset`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to reset');

      // Refetch after reset
      await fetchBourbons();
    } catch (err) {
      console.error('API reset failed, using local:', err);
      // Fallback to local
      setBourbons(initialBourbons);
      localStorage.setItem('travis-bourbon-collection', JSON.stringify(initialBourbons));
    }
  };

  const getDistilleries = () => {
    return [...new Set(bourbons.map(b => b.distillery))].sort();
  };

  const getTypes = () => {
    return [...new Set(bourbons.map(b => b.type))].sort();
  };

  const getProofRanges = () => [
    { label: "All Proofs", min: 0, max: 200 },
    { label: "Under 100", min: 0, max: 99 },
    { label: "100-110", min: 100, max: 110 },
    { label: "110-120", min: 110, max: 120 },
    { label: "120+", min: 120, max: 200 }
  ];

  return (
    <BourbonContext.Provider value={{
      bourbons,
      loading,
      error,
      addBourbon,
      updateBourbon,
      deleteBourbon,
      resetToDefault,
      getDistilleries,
      getTypes,
      getProofRanges,
      refetch: fetchBourbons
    }}>
      {children}
    </BourbonContext.Provider>
  );
}

export function useBourbons() {
  const context = useContext(BourbonContext);
  if (!context) {
    throw new Error('useBourbons must be used within a BourbonProvider');
  }
  return context;
}
