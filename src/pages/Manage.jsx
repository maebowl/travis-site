import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBourbons } from '../context/BourbonContext';

const emptyBourbon = {
  name: '',
  distillery: '',
  type: 'Kentucky Straight',
  age: '',
  proof: '',
  price: '',
  image: '',
  tastingNotes: '',
  rating: '',
  review: '',
  acquired: new Date().getFullYear().toString(),
  favorite: false
};

function Manage() {
  const { bourbons, addBourbon, updateBourbon, deleteBourbon, resetToDefault } = useBourbons();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyBourbon);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (bourbon) => {
    setEditingId(bourbon.id);
    setFormData({
      ...bourbon,
      tastingNotes: bourbon.tastingNotes.join(', '),
      proof: bourbon.proof.toString(),
      rating: bourbon.rating.toString()
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyBourbon);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyBourbon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bourbonData = {
      ...formData,
      proof: parseFloat(formData.proof) || 0,
      rating: parseFloat(formData.rating) || 0,
      tastingNotes: formData.tastingNotes
        .split(',')
        .map(note => note.trim())
        .filter(note => note),
      image: formData.image || null
    };

    if (editingId) {
      updateBourbon(editingId, bourbonData);
    } else {
      addBourbon(bourbonData);
    }

    handleCancel();
  };

  const handleDelete = (id) => {
    deleteBourbon(id);
    setDeleteConfirm(null);
  };

  const handleReset = () => {
    if (window.confirm('Reset to default collection? This will remove all your changes.')) {
      resetToDefault();
    }
  };

  return (
    <div className="manage-page">
      <header className="manage-header">
        <Link to="/" className="logo">Travis Richardson</Link>
        <nav className="manage-nav">
          <Link to="/collection" className="nav-link">View Collection</Link>
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </header>

      <main className="manage-content">
        <div className="manage-title-bar">
          <h1>Manage Collection</h1>
          <div className="manage-actions">
            <button className="btn-secondary" onClick={handleReset}>Reset to Default</button>
            <button className="btn-primary" onClick={handleAdd}>+ Add Bourbon</button>
          </div>
        </div>

        {showForm && (
          <form className="bourbon-form" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit Bourbon' : 'Add New Bourbon'}</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Blanton's Single Barrel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="distillery">Distillery *</label>
                <input
                  type="text"
                  id="distillery"
                  name="distillery"
                  value={formData.distillery}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Buffalo Trace"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Kentucky Straight">Kentucky Straight</option>
                  <option value="Single Barrel">Single Barrel</option>
                  <option value="Small Batch">Small Batch</option>
                  <option value="Cask Strength">Cask Strength</option>
                  <option value="Wheated">Wheated</option>
                  <option value="Rye">Rye</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years or NAS"
                />
              </div>

              <div className="form-group">
                <label htmlFor="proof">Proof *</label>
                <input
                  type="number"
                  id="proof"
                  name="proof"
                  value={formData.proof}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="200"
                  step="0.1"
                  placeholder="e.g., 90"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., $45"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating (0-10) *</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder="e.g., 8.5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="acquired">Year Acquired</label>
                <input
                  type="text"
                  id="acquired"
                  name="acquired"
                  value={formData.acquired}
                  onChange={handleInputChange}
                  placeholder="e.g., 2024"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/bottle.jpg"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="tastingNotes">Tasting Notes (comma-separated)</label>
                <input
                  type="text"
                  id="tastingNotes"
                  name="tastingNotes"
                  value={formData.tastingNotes}
                  onChange={handleInputChange}
                  placeholder="e.g., Caramel, Vanilla, Oak, Spice"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Your personal tasting notes and thoughts..."
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="favorite"
                    checked={formData.favorite}
                    onChange={handleInputChange}
                  />
                  <span>Mark as Favorite</span>
                </label>
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? 'Save Changes' : 'Add Bourbon'}
              </button>
            </div>
          </form>
        )}

        <div className="bourbon-list">
          <div className="list-header">
            <span className="col-name">Name</span>
            <span className="col-distillery">Distillery</span>
            <span className="col-proof">Proof</span>
            <span className="col-rating">Rating</span>
            <span className="col-actions">Actions</span>
          </div>

          {bourbons.map(bourbon => (
            <div key={bourbon.id} className="list-row">
              <span className="col-name">
                {bourbon.favorite && <span className="favorite-star">★</span>}
                {bourbon.name}
              </span>
              <span className="col-distillery">{bourbon.distillery}</span>
              <span className="col-proof">{bourbon.proof}</span>
              <span className="col-rating">{bourbon.rating}</span>
              <span className="col-actions">
                <button className="btn-edit" onClick={() => handleEdit(bourbon)}>
                  Edit
                </button>
                {deleteConfirm === bourbon.id ? (
                  <>
                    <button className="btn-confirm" onClick={() => handleDelete(bourbon.id)}>
                      Confirm
                    </button>
                    <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn-delete" onClick={() => setDeleteConfirm(bourbon.id)}>
                    Delete
                  </button>
                )}
              </span>
            </div>
          ))}

          {bourbons.length === 0 && (
            <div className="empty-list">
              <p>No bourbons in collection. Add your first bottle!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Manage;
