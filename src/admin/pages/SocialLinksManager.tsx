import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { SocialLinkCmsItem } from '../../server/cmsStore';
import { Share2, Save, ExternalLink } from 'lucide-react';

const PLATFORMS = ['WhatsApp', 'LinkedIn', 'Facebook', 'GitHub', 'Email', 'Twitter / X', 'Instagram', 'YouTube', 'Telegram', 'Other'];

export function SocialLinksManager() {
  const { db, saveSocialLink, deleteSocialLink, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<SocialLinkCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<SocialLinkCmsItem> = {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/',
    icon: 'Linkedin',
    displayOrder: (db?.socialLinks?.length || 0) + 1,
    enabled: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: SocialLinkCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: SocialLinkCmsItem) => {
    const copy = {
      ...item,
      platform: `${item.platform} (Copy)`,
      displayOrder: (db?.socialLinks?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: SocialLinkCmsItem) => {
    await saveSocialLink({ ...item, enabled: !item.enabled }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveSocialLink(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<SocialLinkCmsItem>[] = [
    {
      header: 'Platform & Icon',
      accessor: (item) => (
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-white text-xs">{item.platform}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-purple-400 font-mono">
            {item.icon}
          </span>
        </div>
      )
    },
    {
      header: 'Destination Link URL',
      accessor: (item) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono truncate max-w-sm"
        >
          <span className="truncate">{item.url}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      )
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
          item.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
        }`}>
          {item.enabled ? 'Enabled' : 'Disabled'}
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
        title="Social Profiles & External Links"
        subtitle="Manage outbound social profiles, icon triggers, and profile URLs."
        data={db?.socialLinks || []}
        columns={columns}
        searchFields={['platform', 'url']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteSocialLink}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Social Link"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Social Profile' : 'Edit Social Profile'}
        subtitle="Specify target platform, public profile link, and Lucide icon identifier."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Platform Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.platform || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, platform: e.target.value })}
                  placeholder="e.g. LinkedIn / WhatsApp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Lucide Icon Name</label>
                <input
                  type="text"
                  value={editingItem.icon || 'Share2'}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  placeholder="e.g. Linkedin, Github, Facebook"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Profile / Channel URL</label>
              <input
                type="url"
                required
                value={editingItem.url || ''}
                onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingItem.displayOrder || 1}
                  onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingItem.enabled !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, enabled: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Active & Visible on Site</span>
                </label>
              </div>
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Social Link' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
