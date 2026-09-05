import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { TestimonialCmsItem } from '../../server/cmsStore';
import { MessageSquare, Save, Star } from 'lucide-react';

export function TestimonialsManager() {
  const { db, saveTestimonial, deleteTestimonial, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<TestimonialCmsItem> = {
    name: '',
    position: 'Founder & CEO',
    company: 'E-Com Brand',
    avatar: '/assets/profile.jpg',
    testimonial: 'Sayed scaled our Meta Ads from break-even to 4.5x blended ROAS with complete attribution clarity.',
    rating: 5,
    projectType: 'Paid Advertising',
    resultHighlight: '+340% Revenue Growth in 90 Days',
    displayOrder: (db?.testimonials?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: TestimonialCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: TestimonialCmsItem) => {
    const copy = {
      ...item,
      name: `${item.name} (Copy)`,
      displayOrder: (db?.testimonials?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: TestimonialCmsItem) => {
    await saveTestimonial({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveTestimonial(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<TestimonialCmsItem>[] = [
    {
      header: 'Client / Reviewer',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
            <img
              src={item.avatar}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div>
            <div className="font-bold text-white text-xs">{item.name}</div>
            <div className="text-[11px] text-purple-400">{item.position} • {item.company}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Rating & Result',
      accessor: (item) => (
        <div>
          <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
            {Array.from({ length: item.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold">{item.resultHighlight}</div>
        </div>
      )
    },
    {
      header: 'Quote',
      accessor: (item) => (
        <span className="text-xs text-slate-400 line-clamp-1 max-w-sm">
          "{item.testimonial}"
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
        title="Client Reviews & Testimonials"
        subtitle="Manage verified feedback, star ratings, and headline revenue highlights."
        data={db?.testimonials || []}
        columns={columns}
        searchFields={['name', 'company', 'position', 'testimonial']}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteTestimonial}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Testimonial"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Client Testimonial' : 'Edit Client Testimonial'}
        subtitle="Capture client endorsement, star rating, and headline business impact."
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingItem.position || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                  placeholder="e.g. Founder & CMO"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company / Brand</label>
                <input
                  type="text"
                  value={editingItem.company || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  placeholder="e.g. Nord Apparel"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Star Rating (1 - 5)</label>
                <select
                  value={editingItem.rating || 5}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:border-purple-500 outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Result Highlight Pill</label>
                <input
                  type="text"
                  value={editingItem.resultHighlight || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, resultHighlight: e.target.value })}
                  placeholder="e.g. +340% Revenue Growth"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold focus:border-purple-500 outline-none"
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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Testimonial Quote</label>
              <textarea
                rows={3}
                required
                value={editingItem.testimonial || ''}
                onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                placeholder="Client feedback and review details..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed italic"
              />
            </div>

            <div>
              <ImageUploadDropzone
                label="Client Avatar Photo"
                value={editingItem.avatar || ''}
                onChange={(url) => setEditingItem({ ...editingItem, avatar: url })}
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
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : isNew ? 'Create Testimonial' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
