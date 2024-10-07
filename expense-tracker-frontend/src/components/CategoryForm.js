// src/components/CategoryForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Category.css';

const CategoryForm = ({ onSubmit, initialCategory }) => {
  const [categoryName, setCategoryName] = useState(initialCategory ? initialCategory.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onSubmit({ name: categoryName });
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <label htmlFor="categoryName">Category Name</label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
        required
      />
      <button type="submit" className="form-submit-button">
        {initialCategory ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  );
};

CategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialCategory: PropTypes.object, // optional, used for editing
};

export default CategoryForm;
