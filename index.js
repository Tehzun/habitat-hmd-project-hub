import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Storage layer — uses localStorage so data persists across browser sessions
// Each user's browser keeps their own data locally
if (!window.storage) {
  window.storage = {
    async get(key) {
      const val = localStorage.getItem('habhmd_' + key);
      if (val === null) throw new Error('Key not found');
      return { key, value: val };
    },
    async set(key, value) {
      localStorage.setItem('habhmd_' + key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem('habhmd_' + key);
      return { key, deleted: true };
    },
    async list(prefix) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('habhmd_' + (prefix || ''))) {
          keys.push(k.replace('habhmd_', ''));
        }
      }
      return { keys };
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
