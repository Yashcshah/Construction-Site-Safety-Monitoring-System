// src/pages/Tasks.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Tasks = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Todo',   // 'Todo' | 'In Progress' | 'Done'
    site: '',         // optional
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);     // page-level loading (fetch + actions)
  const [saving, setSaving] = useState(false);       // form submit
  const [error, setError] = useState('');

  const authHeader = user?.token ? { Authorization: `Bearer ${user.token}` } : {};

  // Load tasks for this user
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosInstance.get('/api/tasks', { headers: authHeader });
      setTasks(res.data || []);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchTasks();
}, []); // <--- empty dependency array

  // Create task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    setSaving(true);
    setError('');
    try {
      await axiosInstance.post('/api/tasks', formData, { headers: authHeader });
      setFormData({ title: '', description: '', dueDate: '', status: 'Todo', site: '' });
      await fetchTasks();
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Toggle status Todo <-> Done (keeps In Progress as-is; you can extend as needed)
  const toggleStatus = async (task) => {
    setLoading(true);
    setError('');
    try {
      const next =
        task.status === 'Done' ? 'Todo' :
        task.status === 'Todo' ? 'Done' : 'Done';
      await axiosInstance.put(`/api/tasks/${task._id}`, { status: next }, { headers: authHeader });
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task.');
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    setLoading(true);
    setError('');
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, { headers: authHeader });
      await fetchTasks();
    } catch (err) {
      setError('Failed to delete task.');
      setLoading(false);
    }
  };

  if (!user?.token) {
    return <div className="text-center mt-20">Please log in to view your tasks.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-3">
      {/* Form (mirrors your Profile form styling) */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">New Task</h1>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="p-2 border rounded"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <input
            type="text"
            placeholder="Site (optional)"
            value={formData.site}
            onChange={(e) => setFormData({ ...formData, site: e.target.value })}
            className="p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Add Task'}
        </button>

        {error && <div className="text-red-600 mt-3">{error}</div>}
      </form>

      {/* Table (below the form) */}
      <div className="mt-8 bg-white p-6 shadow-md rounded overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <button
            onClick={fetchTasks}
            className="text-sm px-3 py-1 border rounded"
            disabled={loading}
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Due</th>
                <th className="py-2 pr-3">Site</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={5}>No tasks yet.</td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t._id} className="border-b last:border-b-0">
                    <td className="py-2 pr-3">{t.title}</td>
                    <td className="py-2 pr-3">
                      <span className="px-2 py-1 rounded border">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-2 pr-3">
                      {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-2 pr-3">{t.site || '—'}</td>
                    <td className="py-2 pr-3 space-x-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => toggleStatus(t)}
                        disabled={loading}
                        title="Toggle status"
                      >
                        {t.status === 'Done' ? 'Mark Todo' : 'Mark Done'}
                      </button>
                      <button
                        className="px-2 py-1 border rounded text-red-600"
                        onClick={() => deleteTask(t._id)}
                        disabled={loading}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
