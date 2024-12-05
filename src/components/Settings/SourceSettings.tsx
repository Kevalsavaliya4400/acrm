import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import { IconPicker } from './IconPicker';
import type { LeadSource } from '../../types';

const initialFormData = {
  name: '',
  icon: 'Globe',
  color: '#3B82F6',
  is_active: true
};

export function SourceSettings() {
  const [sources, setSources] = useState<LeadSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSource, setNewSource] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const data = await settingsService.getLeadSources();
      setSources(data);
    } catch (err) {
      setError('Failed to load lead sources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await settingsService.updateLeadSource(editingId, formData);
        setSources(sources.map(s => s.id === editingId ? updated : s));
        setEditingId(null);
      } else {
        const created = await settingsService.createLeadSource(formData);
        setSources([...sources, created]);
        setNewSource(false);
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save source:', err);
    }
  };

  const handleEdit = (source: LeadSource) => {
    setFormData({
      name: source.name,
      icon: source.icon,
      color: source.color,
      is_active: source.is_active
    });
    setEditingId(source.id);
    setNewSource(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this source?')) return;
    try {
      await settingsService.deleteLeadSource(id);
      setSources(sources.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to delete source:', err);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setNewSource(false);
    setShowIconPicker(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const SelectedIcon = Icons[formData.icon as keyof typeof Icons] || Icons.Globe;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Lead Sources</h2>
        <button
          onClick={() => {
            setNewSource(true);
            setEditingId(null);
            setFormData(initialFormData);
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Source
        </button>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {(newSource || editingId) && (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <button
                type="button"
                onClick={() => setShowIconPicker(true)}
                className="mt-1 w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <SelectedIcon className="w-5 h-5" />
                  <span>{formData.icon}</span>
                </div>
                <span className="text-sm text-blue-600">Change</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sources.map(source => {
          const Icon = Icons[source.icon as keyof typeof Icons] || Icons.Globe;
          return (
            <div
              key={source.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${source.color}15`,
                    color: source.color
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-medium">{source.name}</span>
                  {!source.is_active && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(source)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(source.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showIconPicker && (
        <IconPicker
          value={formData.icon}
          onChange={(iconName) => setFormData(prev => ({ ...prev, icon: iconName }))}
          onClose={() => setShowIconPicker(false)}
        />
      )}
    </div>
  );
}