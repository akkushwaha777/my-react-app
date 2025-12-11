import { useState } from 'react';
import Card from './card';

export default function ItemForm({ onItemCountChange }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description) {
      setMessage('❌ Please fill all fields!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newItems = [...items, { ...formData, id: Date.now() }];
    setItems(newItems);
    onItemCountChange(newItems.length);
    setFormData({ title: '', category: '', description: '' });
    setMessage('✅ Item added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    onItemCountChange(newItems.length);
  };

  const clearAll = () => {
    setItems([]);
    onItemCountChange(0);
    setMessage('🗑️ All items cleared!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
    
      <p> Total Items Added: <strong>{items.length}</strong></p>
      
      <form onSubmit={handleSubmit} className="form" style={{ marginBottom: '30px' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {message && <p className="message" style={{ fontSize: '18px', margin: '10px 0' }}>{message}</p>}

      <div className="items-list">
        {items.map(item => (
          <div key={item.id} style={{ position: 'relative', marginBottom: '20px' }}>
            <Card title={item.title} description={item.description} category={item.category} />
            <button 
              onClick={() => deleteItem(item.id)} 
              className="btn btn-danger"
              style={{ marginTop: '10px' }}
            >
              Delete Item
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button 
          onClick={clearAll} 
          className="btn btn-warning"
          style={{ marginTop: '20px', width: '100%' }}
        >
          Clear All
        </button>
      )}
    </div>
  );
}