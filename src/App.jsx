import { useState, useEffect } from 'react';
import Header from './componets/Header';
import Navbar from './componets/navbar';
import StudentList from './componets/student';
import Footer from './componets/Footer';
import ItemForm from './componets/ItemForm';
import './index.css';
import Image from './componets/image';
import Card from './componets/card';
import About from './componets/about';
import Project from './componets/project';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');
  
  const [taskCount, setTaskCount] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved).length : 0;
    } catch(e) {
      return 0;
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if(e.key === 'tasks') {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : [];
          setTaskCount(next.length);
          setTasks(next);
        } catch(err) { 
          console.log('error parsing tasks');
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const navigate = (key) => setCurrentPage(key);

  const deleteHomeTask = (id) => {
    try {
      const next = tasks.filter(t => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(next));
      setTasks(next);
      setTaskCount(next.length);
    } catch {}
  };

  const toggleHomeTask = (id) => {
    try {
      const next = tasks.map(t => {
        if (t.id !== id) return t;
        const completed = !t.completed;
        if (completed) {
          const completedAt = Date.now();
          const createdAt = t.createdAt ?? completedAt;
          const msPerDay = 1000 * 60 * 60 * 24;
          const completionDays = Math.max(0, Math.round((completedAt - createdAt) / msPerDay));
          return { ...t, completed: true, completedAt, completionDays };
        }
        return { ...t, completed: false, completedAt: null, completionDays: null };
      });
      localStorage.setItem('tasks', JSON.stringify(next));
      setTasks(next);
      setTaskCount(next.length);
    } catch {}
  };

  return (
    <div className={`app-container ${theme}`}>
      <button className="theme-toggle btn btn-outline-secondary" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <Header />
      <Navbar onNavigate={navigate} currentPage={currentPage} taskCount={taskCount} />

      {currentPage === 'home' && (
        <>
          <Image />
          <StudentList />

          <div className="container">
            <h1 className="hero-sub">Student Task [{tasks.length}]</h1>
            <div className="row g-3 mt-1">
              {tasks.map(task => (
                <div key={task.id} className="col-12 col-md-6 col-lg-4">
                  <Card
                    title={task.title}
                    description={task.description}
                    category={task.category}
                    completed={task.completed}
                    onToggle={() => toggleHomeTask(task.id)}
                    onDelete={() => deleteHomeTask(task.id)}
                  />
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-muted mt-2">No tasks yet. Add some from the Task Form.</p>
              )}
            </div>
          </div>
        </>
      )}

      {currentPage === 'itemform' && (
        <div className="container my-3">
          <ItemForm onTaskCountChange={setTaskCount} />
        </div>
      )}

      {currentPage === 'about' && (
        <About />
      )}

      {currentPage === 'project' && (
        <Project />
      )}

      <Footer />
    </div>
  );
}

