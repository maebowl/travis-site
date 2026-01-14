import React, { createContext, useContext, useState, useEffect } from 'react';

const BourbonContext = createContext();

const API_BASE = '/api';

export function BourbonProvider({ children }) {
  const [bourbons, setBourbons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBourbons();
  }, []);

  const fetchBourbons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/bourbons`);

      if (!response.ok) {
        throw new Error('Failed to fetch bourbons');
      }

      const data = await response.json();
      setBourbons(data);
    } catch (err) {
      console.error('Failed to fetch bourbons:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBourbon = async (bourbon) => {
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
  };

  const updateBourbon = async (id, updates) => {
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
  };

  const deleteBourbon = async (id) => {
    const response = await fetch(`${API_BASE}/bourbons/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete bourbon');

    setBourbons(prev => prev.filter(b => b.id !== id));
  };

  const resetToDefault = async () => {
    const response = await fetch(`${API_BASE}/reset`, {
      method: 'POST'
    });

    if (!response.ok) throw new Error('Failed to reset');

    await fetchBourbons();
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
