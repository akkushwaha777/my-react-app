import { useState, useEffect } from 'react';
import Card from './card';

function ItemForm({ onTaskCountChange }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (onTaskCountChange) {
      onTaskCountChange(tasks.length);
    }
  }, [tasks, onTaskCountChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description || !formData.date) {
      setMessage('❌ Please fill all fields!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(formData.date);

    if (Number.isNaN(selected.getTime())) {
      setMessage('❌ Invalid date format.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (selected < today) {
      setMessage('❌ Date cannot be in the past.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const now = Date.now();
    const newTask = {
      id: crypto.randomUUID?.() || now,
      completed: false,
      createdAt: now,
      completedAt: null,
      completionDays: null,
      ...formData
    };

    setTasks([newTask, ...tasks]);
    setFormData({ title: '', category: '', description: '', date: '' });
    setMessage('✅ Task added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== id) return task;

      const isNowComplete = !task.completed;

      if (isNowComplete) {
        const completedAt = Date.now();
        const createdAt = task.createdAt ?? completedAt;
        const msPerDay = 1000 * 60 * 60 * 24;
        const completionDays = Math.max(0, Math.round((completedAt - createdAt) / msPerDay));

        return { ...task, completed: true, completedAt, completionDays };
      }

      return { ...task, completed: false, completedAt: null, completionDays: null };
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
      setMessage('🗑️ All tasks cleared!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Tasks ({tasks.length})</h5>
        {tasks.length > 0 && (
          <button onClick={clearAll} className="btn btn-sm btn-warning">Clear All</button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="col-12 col-md-12">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={3}
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>

      {message && <p className="fs-6 text-muted">{message}</p>}

      <div className="row g-3">
        {tasks.map(task => {
          return (
            <div key={task.id} className="col-12 col-md-6 col-lg-4">
              <Card
                title={task.title}
                description={task.description}
                category={task.category}
                completed={task.completed}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            </div>
          );
        })}
        {tasks.length === 0 && (
          <p className="text-muted">No tasks yet. Add some using the form above.</p>
        )}
      </div>
    </div>
  );
}

export default ItemForm;