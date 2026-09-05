import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { NavCmsItem } from '../../server/cmsStore';
import { Compass, Save } from 'lucide-react';

export function NavigationManager() {
  const { db, saveNavigationItem, deleteNavigationItem, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<NavCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<NavCmsItem> = {
    name: 'New Page',
    slug: 'new-page',
    icon: 'Folder',
    displayOrder: (db?.navigation?.length || 0) + 1,
    visible: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: NavCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: NavCmsItem) => {
    await saveNavigationItem({ ...item, visible: !item.visible }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveNavigationItem(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<NavCmsItem>[] = [
    {
      header: 'Menu Label & Slug',
      accessor: (item) => (
        <div>
          <div className="font-bold text-white text-xs">{item.name}</div>
          <div className="text-[11px] text-purple-400 font-mono">#{item.slug}</div>
        </div>
      )
    },
    {
      header: 'Icon Name',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-300">
          {item.icon}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
          item.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
        }`}>
          {item.visible ? 'Visible' : 'Hidden'}
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
        title="Navigation Menu Items"
        subtitle="Manage website header navigation bar, anchor links, and order."
        data={db?.navigation || []}
        columns={columns}
        searchFields={['name', 'slug']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteNavigationItem}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Menu Link"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Navigation Link' : 'Edit Navigation Link'}
        subtitle="Configure menu item label, destination anchor slug, and sorting sequence."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Menu Label</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setEditingItem({ ...editingItem, name, slug: editingItem.slug || slug });
                  }}
                  placeholder="e.g. Case Studies"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Anchor Slug / Section ID</label>
                <input
                  type="text"
                  required
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  placeholder="e.g. case-studies"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Lucide Icon Identifier</label>
                <input
                  type="text"
                  value={editingItem.icon || 'Folder'}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  placeholder="e.g. Briefcase, Award, TrendingUp"
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

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.visible !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, visible: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>Visible in Top Navbar & Mobile Menu</span>
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Link' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
