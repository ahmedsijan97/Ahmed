import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { SkillCmsItem } from '../../server/cmsStore';
import { Layers, Save, Sliders } from 'lucide-react';

const SKILL_CATEGORIES = [
  'Paid Advertising',
  'SEO',
  'AI & Automation',
  'Analytics',
  'Strategy'
];

const SKILL_LEVELS: Array<'Advanced' | 'Professional' | 'Working Knowledge'> = [
  'Advanced',
  'Professional',
  'Working Knowledge'
];

export function SkillsManager() {
  const { db, saveSkill, deleteSkill, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<SkillCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<SkillCmsItem> = {
    name: '',
    category: 'Paid Advertising',
    level: 'Advanced',
    description: 'High-performing ad campaign strategy, budget scaling, and audience segmentation.',
    proficiencyScore: 92,
    yearsExperience: 5,
    icon: 'Target',
    tools: ['Meta Ads', 'Advantage+', 'Pixel/CAPI'],
    relatedProjects: [],
    displayOrder: (db?.skills?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: SkillCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: SkillCmsItem) => {
    const copy = {
      ...item,
      name: `${item.name} (Copy)`,
      displayOrder: (db?.skills?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: SkillCmsItem) => {
    await saveSkill({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveSkill(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<SkillCmsItem>[] = [
    {
      header: 'Skill Name & Domain',
      accessor: (item) => (
        <div>
          <div className="font-bold text-white text-xs">{item.name}</div>
          <div className="text-[11px] text-purple-400">{item.category} • <span className="text-slate-400">{item.level}</span></div>
        </div>
      )
    },
    {
      header: 'Proficiency Meter',
      accessor: (item) => (
        <div className="w-36">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
            <span className="text-slate-400">Score</span>
            <span className="text-emerald-400 font-bold">{item.proficiencyScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full"
              style={{ width: `${item.proficiencyScore}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Experience',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-300">
          {item.yearsExperience || 0} Years
        </span>
      )
    },
    {
      header: 'Tools & Ecosystem',
      accessor: (item) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {item.tools?.map((tool, i) => (
            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {tool}
            </span>
          ))}
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
        title="Skills & Technical Capabilities"
        subtitle="Manage marketing competencies, proficiency ratings, tools, and categories."
        data={db?.skills || []}
        columns={columns}
        searchFields={['name', 'category', 'description']}
        categories={SKILL_CATEGORIES}
        getCategory={(item) => item.category}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteSkill}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Skill / Tool"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Technical Skill' : 'Edit Technical Skill'}
        subtitle="Configure skill proficiency score, ecosystem tools, and category domain."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Meta Ads & Scaling"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Competency Category</label>
                <select
                  value={editingItem.category || SKILL_CATEGORIES[0]}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Skill Level</label>
                <select
                  value={editingItem.level || 'Advanced'}
                  onChange={(e) => setEditingItem({ ...editingItem, level: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                >
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={editingItem.yearsExperience || 5}
                  onChange={(e) => setEditingItem({ ...editingItem, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            {/* Proficiency Slider */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  Proficiency Score: <span className="text-emerald-400 font-mono font-bold">{editingItem.proficiencyScore || 85}%</span>
                </label>
                <span className="text-[11px] text-slate-500">0% (Novice) to 100% (Master)</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={editingItem.proficiencyScore || 85}
                onChange={(e) => setEditingItem({ ...editingItem, proficiencyScore: parseInt(e.target.value) || 85 })}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Brief Description</label>
              <textarea
                rows={2}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="High-performing ad campaign strategy, budget scaling..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tools & Frameworks (Comma separated)</label>
                <input
                  type="text"
                  value={editingItem.tools?.join(', ') || ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  placeholder="Advantage+, Ads Manager, Creative Testing, CAPI"
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
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : isNew ? 'Create Skill' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
