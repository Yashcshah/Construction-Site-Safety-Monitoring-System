// src/pages/Incidents.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Incidents = () => {
  const { user } = useAuth();

  // ---------- form ----------
  const [formData, setFormData] = useState({
    title: '',
    type: 'Incident',          // 'Incident' | 'Hazard'
    site: '',
    severity: 'Low',           // 'Low' | 'Med' | 'High' | 'Critical'
    description: '',
  });

  // ---------- list / ui ----------
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState({ status: '' }); // '', 'Open', 'In Progress', 'Resolved', 'Closed'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const authHeader = user?.token ? { Authorization: `Bearer ${user.token}` } : {};

  // ---------- fetch ----------
  const fetchIncidents = async () => {
    setLoading(true);
    setError('');
    try {
      // clean query: drop empty values
      const params = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v != null && v !== '')
      );
      const res = await axiosInstance.get('/api/incidents', { headers: authHeader, params });
      setIncidents(res.data || []);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to load incidents';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, filter.status]);

  // ---------- create ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.site.trim()) {
      setError('Title and Site are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await axiosInstance.post('/api/incidents', formData, { headers: authHeader });
      setFormData({ title: '', type: 'Incident', site: '', severity: 'Low', description: '' });
      await fetchIncidents();
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to create incident';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  // ---------- actions ----------
  const startIncident = async (id) => {
    setLoading(true); setError('');
    try {
      await axiosInstance.put(`/api/incidents/${id}`, { status: 'In Progress' }, { headers: authHeader });
      await fetchIncidents();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to start incident');
      setLoading(false);
    }
  };

  const resolveIncident = async (id) => {
    setLoading(true); setError('');
    try {
      await axiosInstance.post(`/api/incidents/${id}/resolve`, {}, { headers: authHeader });
      await fetchIncidents();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to resolve incident');
      setLoading(false);
    }
  };

  const closeIncident = async (id) => {
    setLoading(true); setError('');
    try {
      await axiosInstance.post(`/api/incidents/${id}/close`, {}, { headers: authHeader });
      await fetchIncidents();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to close incident');
      setLoading(false);
    }
  };

  const assignToMe = async (id) => {
    if (!user?.id && !user?._id) {
      setError('Cannot assign: missing user id');
      return;
    }
    const myId = user?.id || user?._id;
    setLoading(true); setError('');
    try {
      await axiosInstance.post(`/api/incidents/${id}/assign`, { assignee: myId }, { headers: authHeader });
      await fetchIncidents();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to assign');
      setLoading(false);
    }
  };

  if (!user?.token) {
    return <div className="text-center mt-20">Please log in to view incidents.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-3">
      {/* Create form (same look/feel as your Profile/Tasks) */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Report Incident / Hazard</h1>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="p-2 border rounded"
          >
            <option>Incident</option>
            <option>Hazard</option>
          </select>

          <select
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
            className="p-2 border rounded"
          >
            <option>Low</option>
            <option>Med</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <input
            type="text"
            placeholder="Site (e.g., LOT 731 Walker St)"
            value={formData.site}
            onChange={(e) => setFormData({ ...formData, site: e.target.value })}
            className="p-2 border rounded"
          />
        </div>

        <textarea
          placeholder="Description / steps taken"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Submit'}
        </button>

        {error && <div className="text-red-600 mt-3">Error: {error}</div>}
      </form>

      {/* Filters + table */}
      <div className="mt-8 bg-white p-6 shadow-md rounded overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h2 className="text-xl font-semibold">Incidents</h2>
          <div className="flex items-center gap-2">
            <select
              value={filter.status}
              onChange={(e) => setFilter({ status: e.target.value })}
              className="p-2 border rounded"
              title="Filter by status"
            >
              <option value="">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <button
              onClick={fetchIncidents}
              className="text-sm px-3 py-2 border rounded"
              disabled={loading}
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Site</th>
                <th className="py-2 pr-3">Severity</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr><td className="py-3 text-gray-500" colSpan={6}>No incidents yet.</td></tr>
              ) : (
                incidents.map((it) => (
                  <tr key={it._id} className="border-b last:border-b-0">
                    <td className="py-2 pr-3">{it.title}</td>
                    <td className="py-2 pr-3">{it.type}</td>
                    <td className="py-2 pr-3">{it.site}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-1 rounded border ${
                        it.severity === 'Critical' ? 'text-red-700 border-red-300' :
                        it.severity === 'High' ? 'text-orange-700 border-orange-300' :
                        it.severity === 'Med' ? 'text-yellow-700 border-yellow-300' :
                        'text-green-700 border-green-300'
                      }`}>
                        {it.severity}
                      </span>
                    </td>
                    <td className="py-2 pr-3">{it.status}</td>
                    <td className="py-2 pr-3 space-x-2">
                      {it.status === 'Open' && (
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => startIncident(it._id)}
                          disabled={loading}
                        >
                          Start
                        </button>
                      )}
                      {it.status !== 'Closed' && (
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => resolveIncident(it._id)}
                          disabled={loading}
                          title="Mark Resolved"
                        >
                          Resolve
                        </button>
                      )}
                      {['Resolved', 'In Progress', 'Open'].includes(it.status) && (
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => closeIncident(it._id)}
                          disabled={loading}
                          title="Close Incident"
                        >
                          Close
                        </button>
                      )}
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => assignToMe(it._id)}
                        disabled={loading}
                        title="Assign to me"
                      >
                        Assign to me
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

export default Incidents;
