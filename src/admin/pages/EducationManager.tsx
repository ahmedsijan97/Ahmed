import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { EducationItem } from '../../server/cmsStore';
import { GraduationCap, Save } from 'lucide-react';

export function EducationManager() {
  const { db, saveEducation, deleteEducation, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<EducationItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<EducationItem> = {
    degree: '',
    institution: '',
    department: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    description: '',
    displayOrder: (db?.education?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: EducationItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: EducationItem) => {
    const copy = {
      ...item,
      degree: `${item.degree} (Copy)`,
      displayOrder: (db?.education?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: EducationItem) => {
    await saveEducation({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveEducation(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<EducationItem>[] = [
    {
      header: 'Degree & Department',
      accessor: (item) => (
        <div>
          <div className="font-bold text-white text-xs">{item.degree}</div>
          <div className="text-[11px] text-purple-400">{item.department}</div>
        </div>
      )
    },
    {
      header: 'Institution & Location',
      accessor: (item) => (
        <div>
          <div className="text-xs text-slate-200">{item.institution}</div>
          <div className="text-[11px] text-slate-500">{item.location}</div>
        </div>
      )
    },
    {
      header: 'Duration',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-300">
          {item.startDate} — {item.currentlyStudying ? 'Present' : item.endDate}
        </span>
      )
    },
    {
      header: 'Order',
      accessor: (item) => (
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[11px]">
          #{item.displayOrder}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminDataTable
        title="Education History"
        subtitle="Manage degrees, institutions, departments, and academic foundations."
        data={db?.education || []}
        columns={columns}
        searchFields={['degree', 'institution', 'department', 'location']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteEducation}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Education Degree"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Education Record' : 'Edit Education Record'}
        subtitle="Specify degree level, institution, years, and academic achievements."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  required
                  value={editingItem.degree || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Science (B.Sc Honours)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Institution Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.institution || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  placeholder="e.g. National University"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Department / Major</label>
                <input
                  type="text"
                  value={editingItem.department || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                  placeholder="e.g. Science & Quantitative Analysis"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={editingItem.location || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  placeholder="e.g. Gaibandha, Bangladesh"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Start Year</label>
                <input
                  type="text"
                  value={editingItem.startDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                  placeholder="e.g. 2016"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">End Year</label>
                <input
                  type="text"
                  disabled={editingItem.currentlyStudying}
                  value={editingItem.currentlyStudying ? 'Present' : editingItem.endDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                  placeholder="e.g. 2020"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingItem.displayOrder || 1}
                  onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.currentlyStudying || false}
                  onChange={(e) => setEditingItem({ ...editingItem, currentlyStudying: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>Currently studying here</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.published !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>Published (Visible on site)</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Description / Core Focus</label>
              <textarea
                rows={3}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Highlight quantitative skills, research methods, and foundations learned..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : isNew ? 'Create Record' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
