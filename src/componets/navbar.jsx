import React from 'react';

function Navbar({ onNavigate, currentPage, taskCount }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'project', label: 'Project' },
    { key: 'itemform', label: 'Add Task' }
  ];

  return (
    <nav className="navbar navbar-expand bg-light px-3">
      <span className="navbar-brand fw-bold">Student Record Manager</span>
      <ul className="navbar-nav ms-3">
        {tabs.map(t => {
          const isActive = currentPage === t.key;
          return (
            <li key={t.key} className="nav-item">
              <button
                className={`btn btn-link nav-link ${isActive ? 'fw-bold' : ''}`}
                onClick={() => onNavigate(t.key)}
              >
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
      <span className="ms-auto badge text-bg-primary rounded-pill px-3 py-2 shadow-sm">
        Tasks: {taskCount}
      </span>
    </nav>
  );
}

export default Navbar;