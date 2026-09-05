import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ExperienceCmsItem } from '../../server/cmsStore';
import { Briefcase, Save, Plus, Trash2 } from 'lucide-react';

export function ExperienceManager() {
  const { db, saveExperience, deleteExperience, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<ExperienceCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<ExperienceCmsItem> = {
    position: '',
    company: '',
    type: 'Full-time',
    period: '2023 - Present',
    startDate: '2023',
    endDate: 'Present',
    currentlyWorking: true,
    location: 'Remote / Global',
    description: '',
    responsibilities: [],
    achievements: ['Scaled client revenue by +180% using Advantage+ creative testing.'],
    quantifiableResults: [{ metric: 'ROAS', impact: '4.2x' }, { metric: 'Ad Spend', impact: '$1.5M+' }],
    tools: ['Meta Ads', 'Google Ads', 'GA4', 'Python'],
    featuredProject: 'Scale Fashion E-Commerce Brand',
    displayOrder: (db?.experience?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: ExperienceCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: ExperienceCmsItem) => {
    const copy = {
      ...item,
      position: `${item.position} (Copy)`,
      displayOrder: (db?.experience?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: ExperienceCmsItem) => {
    await saveExperience({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveExperience(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleAddAchievement = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      achievements: [...(editingItem.achievements || []), 'New metric outcome']
    });
  };

  const handleRemoveAchievement = (idx: number) => {
    if (!editingItem) return;
    const list = [...(editingItem.achievements || [])];
    list.splice(idx, 1);
    setEditingItem({ ...editingItem, achievements: list });
  };

  const handleUpdateAchievement = (idx: number, val: string) => {
    if (!editingItem) return;
    const list = [...(editingItem.achievements || [])];
    list[idx] = val;
    setEditingItem({ ...editingItem, achievements: list });
  };

  const columns: Column<ExperienceCmsItem>[] = [
    {
      header: 'Role & Organization',
      accessor: (item) => (
        <div>
          <div className="font-bold text-white text-xs">{item.position}</div>
          <div className="text-[11px] text-purple-400 font-medium">{item.company} • {item.type}</div>
        </div>
      )
    },
    {
      header: 'Period & Metrics',
      accessor: (item) => (
        <div>
          <div className="font-mono text-[11px] text-slate-300">{item.period}</div>
          {item.quantifiableResults && item.quantifiableResults.length > 0 && (
            <div className="text-[10px] text-emerald-400 flex items-center gap-2 mt-0.5">
              {item.quantifiableResults.map((qr, i) => (
                <span key={i}>{qr.metric}: {qr.impact}</span>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Tools & Stack',
      accessor: (item) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {item.tools?.slice(0, 3).map((tool, i) => (
            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {tool}
            </span>
          ))}
          {(item.tools?.length || 0) > 3 && (
            <span className="text-[10px] text-slate-500">+{item.tools!.length - 3}</span>
          )}
        </div>
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
        title="Work Experience & Positions"
        subtitle="Manage professional career roles, media buying positions, achievements, and tools."
        data={db?.experience || []}
        columns={columns}
        searchFields={['position', 'company', 'type', 'period', 'description']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteExperience}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Work Experience"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Work Experience' : 'Edit Work Experience'}
        subtitle="Specify career milestone, company name, achievements, and ad spend metrics."
        maxWidth="3xl"
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Job Title / Position</label>
                <input
                  type="text"
                  required
                  value={editingItem.position || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                  placeholder="e.g. Senior Performance Marketing Lead"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.company || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  placeholder="e.g. Apex E-Commerce Growth Agency"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Engagement Type</label>
                <input
                  type="text"
                  value={editingItem.type || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                  placeholder="Full-time / Contract / Remote"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Time Period</label>
                <input
                  type="text"
                  value={editingItem.period || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                  placeholder="e.g. 2022 - Present"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
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

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Executive Summary / Responsibilities</label>
              <textarea
                rows={3}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Overview of client portfolio, team leadership, and strategy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Achievements Bullet List */}
            <div className="space-y-2 p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-purple-300">Key Measurable Achievements</label>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Result
                </button>
              </div>

              <div className="space-y-2">
                {editingItem.achievements?.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                    <input
                      type="text"
                      value={ach}
                      onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools List (Comma separated) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tools & Platforms (Comma separated)</label>
              <input
                type="text"
                value={editingItem.tools?.join(', ') || ''}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                })}
                placeholder="Meta Ads Manager, Google Ads, GA4, Triple Whale, BigQuery"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Published checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.published !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>Published (Visible on public portfolio)</span>
              </label>
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
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : isNew ? 'Create Position' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
