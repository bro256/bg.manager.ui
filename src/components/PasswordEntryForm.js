import React, { useState } from 'react';

const PasswordEntryForm = ({ entry, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: entry.title,
    username: entry.username,
    website: entry.website,
    // Modify later: additional fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      {/* Add other input fields for username, website, etc. */}
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default PasswordEntryForm;
