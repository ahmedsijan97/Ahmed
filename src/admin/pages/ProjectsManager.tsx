import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { RichTextEditorSimple } from '../components/RichTextEditorSimple';
import { ProjectCmsItem } from '../../server/cmsStore';
import { FolderGit2, Save, Plus, Trash2, ExternalLink, Star } from 'lucide-react';

const PROJECT_CATEGORIES = [
  'Marketing Campaigns',
  'SEO Projects',
  'AI Automation',
  'Websites',
  'Analytics Dashboards',
  'Creative Projects'
];

export function ProjectsManager() {
  const { db, saveProject, deleteProject, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<ProjectCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<ProjectCmsItem> = {
    title: '',
    slug: '',
    category: 'Marketing Campaigns',
    shortDescription: '',
    fullDescription: '',
    thumbnail: '/assets/profile.jpg',
    tools: ['Meta Ads', 'ROAS Scale', 'CAPI'],
    metrics: [{ label: 'ROAS', value: '4.8x' }, { label: 'Revenue', value: '+$120k' }],
    client: 'Apparel E-Com Brand',
    projectDate: '2024',
    result: '+310% Revenue Scaled',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    displayOrder: (db?.projects?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: ProjectCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: ProjectCmsItem) => {
    const copy = {
      ...item,
      title: `${item.title} (Copy)`,
      slug: `${item.slug}-copy-${Date.now().toString().slice(-4)}`,
      displayOrder: (db?.projects?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: ProjectCmsItem) => {
    await saveProject({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveProject(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleAddMetric = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      metrics: [...(editingItem.metrics || []), { label: 'New Metric', value: '+50%' }]
    });
  };

  const handleRemoveMetric = (idx: number) => {
    if (!editingItem) return;
    const list = [...(editingItem.metrics || [])];
    list.splice(idx, 1);
    setEditingItem({ ...editingItem, metrics: list });
  };

  const handleUpdateMetric = (idx: number, field: 'label' | 'value', val: string) => {
    if (!editingItem) return;
    const list = [...(editingItem.metrics || [])];
    list[idx] = { ...list[idx], [field]: val };
    setEditingItem({ ...editingItem, metrics: list });
  };

  const columns: Column<ProjectCmsItem>[] = [
    {
      header: 'Project / Case Study',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
            <img
              src={item.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div>
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <span>{item.title}</span>
              {item.featured && (
                <span className="p-0.5 rounded bg-amber-500/20 text-amber-400" title="Featured Case Study">
                  <Star className="w-3 h-3 fill-amber-400" />
                </span>
              )}
            </div>
            <div className="text-[11px] text-purple-400">{item.category} • {item.client || 'Client Study'}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Key Outcomes',
      accessor: (item) => (
        <div className="flex flex-wrap gap-1.5">
          {item.metrics?.slice(0, 2).map((m, i) => (
            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono font-bold">
              {m.label}: {m.value}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Links',
      accessor: (item) => (
        <div className="flex items-center gap-2">
          {item.liveUrl ? (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-slate-600 text-[11px]">—</span>
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
        title="Projects & Case Studies"
        subtitle="Manage client growth campaigns, scale results, ROAS metrics, and rich breakdowns."
        data={db?.projects || []}
        columns={columns}
        searchFields={['title', 'category', 'client', 'shortDescription']}
        categories={PROJECT_CATEGORIES}
        getCategory={(item) => item.category}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteProject}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Case Study"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Create New Case Study' : 'Edit Case Study'}
        subtitle="Configure headline metrics, client narrative, creative strategy, and live links."
        maxWidth="3xl"
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingItem({ ...editingItem, title, slug: editingItem.slug || slug });
                  }}
                  placeholder="e.g. Scaling D2C Brand from $15k to $110k/mo"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  placeholder="e.g. scaling-d2c-apparel"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Industry / Category</label>
                <select
                  value={editingItem.category || PROJECT_CATEGORIES[0]}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                >
                  {PROJECT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name / Brand</label>
                <input
                  type="text"
                  value={editingItem.client || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                  placeholder="e.g. Silk & Stone Apparel"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Key Result Headline</label>
                <input
                  type="text"
                  value={editingItem.result || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, result: e.target.value })}
                  placeholder="e.g. +310% Revenue Scaled in 90 Days"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Project Date / Year</label>
                <input
                  type="text"
                  value={editingItem.projectDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, projectDate: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Short Description / Summary</label>
              <textarea
                rows={2}
                value={editingItem.shortDescription || ''}
                onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                placeholder="2-3 sentence overview highlighting the transformation and core growth levers..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <RichTextEditorSimple
                label="Full Case Study Narrative"
                value={editingItem.fullDescription || ''}
                onChange={(val) => setEditingItem({ ...editingItem, fullDescription: val })}
                rows={6}
                helperText="Elaborate on the client challenge, hypotheses, execution strategy, and final results."
              />
            </div>

            {/* Key Outcomes List */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold text-purple-300">Quantifiable Metrics & ROI</label>
                  <p className="text-[11px] text-slate-500">Key proof points displayed prominently on the card</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Metric
                </button>
              </div>

              <div className="space-y-2">
                {editingItem.metrics?.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. Blended ROAS)"
                      value={metric.label}
                      onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                      className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 4.85x)"
                      value={metric.value}
                      onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                      className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMetric(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ImageUploadDropzone
                label="Case Study Thumbnail / Cover Visual"
                value={editingItem.thumbnail || ''}
                onChange={(url) => setEditingItem({ ...editingItem, thumbnail: url })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Live Demo / Client Website URL</label>
                <input
                  type="text"
                  value={editingItem.liveUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingItem.tools?.join(', ') || ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  placeholder="Meta Ads, ROAS, Google PMax, Python"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
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
                <span className="text-amber-400 font-semibold">Featured Case Study (Pinned at top)</span>
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
