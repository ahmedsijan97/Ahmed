import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { AchievementCmsItem } from '../../server/cmsStore';
import { Trophy, Save } from 'lucide-react';

export function AchievementsManager() {
  const { db, saveAchievement, deleteAchievement, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<AchievementCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<AchievementCmsItem> = {
    title: '',
    description: '',
    date: '2025',
    organization: 'Milestone',
    image: '',
    certificateUrl: '',
    credentialUrl: '',
    displayOrder: (db?.achievements?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: AchievementCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: AchievementCmsItem) => {
    const copy = {
      ...item,
      title: `${item.title} (Copy)`,
      displayOrder: (db?.achievements?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: AchievementCmsItem) => {
    await saveAchievement({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveAchievement(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<AchievementCmsItem>[] = [
    {
      header: 'Milestone / Achievement',
      accessor: (item) => (
        <div>
          <div className="font-bold text-white text-xs">{item.title}</div>
          <div className="text-[11px] text-purple-400">{item.organization}</div>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-300">{item.date}</span>
      )
    },
    {
      header: 'Description',
      accessor: (item) => (
        <span className="text-xs text-slate-400 line-clamp-1 max-w-sm">
          {item.description}
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
        title="Achievements & Honors"
        subtitle="Manage key quantitative milestones, client retention awards, and academic honors."
        data={db?.achievements || []}
        columns={columns}
        searchFields={['title', 'organization', 'description']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteAchievement}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Milestone"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Milestone Achievement' : 'Edit Milestone Achievement'}
        subtitle="Highlight significant awards, ad spend records, and client honors."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Achievement Headline</label>
              <input
                type="text"
                required
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. $4.2M+ Profitable Ad Spend Managed"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Organization / Context</label>
                <input
                  type="text"
                  value={editingItem.organization || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                  placeholder="e.g. Portfolio Milestone"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Date / Year</label>
                <input
                  type="text"
                  value={editingItem.date || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                  placeholder="e.g. 2025"
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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Description / Impact</label>
              <textarea
                rows={3}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Explain the background, criteria, and outcomes of this milestone..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div>
              <ImageUploadDropzone
                label="Milestone Media / Certificate Image (Optional)"
                value={editingItem.image || ''}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
              />
            </div>

            <div className="pt-2">
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Achievement' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
