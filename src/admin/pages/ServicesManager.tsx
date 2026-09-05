import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ServiceCmsItem } from '../../server/cmsStore';
import { Zap, Save, Plus, Trash2 } from 'lucide-react';

const SERVICE_CATEGORIES = [
  'Paid Advertising',
  'Organic Search & SEO',
  'AI & Automation',
  'Analytics & CRO',
  'Full Funnel Growth'
];

export function ServicesManager() {
  const { db, saveService, deleteService, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<ServiceCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<ServiceCmsItem> = {
    title: '',
    shortDesc: '',
    fullDesc: '',
    icon: 'TrendingUp',
    category: 'Paid Advertising',
    deliverables: ['Custom Media Strategy', 'Advantage+ Testing', 'Weekly Reporting'],
    idealClient: 'D2C brands spending $5k - $50k/month looking to scale profitably',
    typicalOutcome: '2.5x - 4.5x blended ROAS within 90 days',
    startingPrice: '$1,500/mo',
    tools: ['Meta Ads', 'Google Ads', 'GA4'],
    color: '#8b5cf6',
    featured: false,
    displayOrder: (db?.services?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: ServiceCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: ServiceCmsItem) => {
    const copy = {
      ...item,
      title: `${item.title} (Copy)`,
      displayOrder: (db?.services?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: ServiceCmsItem) => {
    await saveService({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveService(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleAddDeliverable = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      deliverables: [...(editingItem.deliverables || []), 'New core deliverable']
    });
  };

  const handleRemoveDeliverable = (idx: number) => {
    if (!editingItem) return;
    const list = [...(editingItem.deliverables || [])];
    list.splice(idx, 1);
    setEditingItem({ ...editingItem, deliverables: list });
  };

  const handleUpdateDeliverable = (idx: number, val: string) => {
    if (!editingItem) return;
    const list = [...(editingItem.deliverables || [])];
    list[idx] = val;
    setEditingItem({ ...editingItem, deliverables: list });
  };

  const columns: Column<ServiceCmsItem>[] = [
    {
      header: 'Service & Category',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: item.color || '#8b5cf6' }}
          >
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-xs">{item.title}</div>
            <div className="text-[11px] text-purple-400">{item.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Starting Rate',
      accessor: (item) => (
        <span className="font-mono text-xs text-emerald-400 font-bold">
          {item.startingPrice || 'Custom Quote'}
        </span>
      )
    },
    {
      header: 'Target Client',
      accessor: (item) => (
        <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
          {item.idealClient}
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
        title="Services & Professional Offerings"
        subtitle="Manage marketing services, core deliverables, ideal client targets, and pricing tiers."
        data={db?.services || []}
        columns={columns}
        searchFields={['title', 'category', 'shortDesc', 'idealClient']}
        categories={SERVICE_CATEGORIES}
        getCategory={(item) => item.category}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteService}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Service Offering"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Create New Service' : 'Edit Service Offering'}
        subtitle="Specify deliverables, pricing model, target audience, and measurable outcomes."
        maxWidth="3xl"
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Meta Ads ROAS Scaling"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                <select
                  value={editingItem.category || SERVICE_CATEGORIES[0]}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Price / Pricing Model</label>
                <input
                  type="text"
                  value={editingItem.startingPrice || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, startingPrice: e.target.value })}
                  placeholder="e.g. $1,500/month or $500 setup"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Accent Theme Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingItem.color || '#8b5cf6'}
                    onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                    className="w-10 h-9 bg-transparent border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingItem.color || '#8b5cf6'}
                    onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Brief Description (Card View)</label>
              <textarea
                rows={2}
                value={editingItem.shortDesc || ''}
                onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                placeholder="1-2 sentences summarizing the value proposition..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Ideal Client Profile</label>
                <input
                  type="text"
                  value={editingItem.idealClient || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, idealClient: e.target.value })}
                  placeholder="e.g. Scaling Shopify brands spending $10k+/mo"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Expected / Typical Outcome</label>
                <input
                  type="text"
                  value={editingItem.typicalOutcome || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, typicalOutcome: e.target.value })}
                  placeholder="e.g. 3.5x - 5.0x ROAS in 60-90 days"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-2 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-purple-300">Core Deliverables & Inclusions</label>
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Deliverable
                </button>
              </div>

              <div className="space-y-2">
                {editingItem.deliverables?.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={deliv}
                      onChange={(e) => handleUpdateDeliverable(idx, e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.featured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span className="text-purple-300 font-semibold">Featured Offering</span>
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Service' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
