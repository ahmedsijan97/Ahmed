import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminDataTable, Column } from '../components/AdminDataTable';
import { AdminModal } from '../components/AdminModal';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { CertificateCmsItem } from '../../server/cmsStore';
import { Award, Save, ExternalLink } from 'lucide-react';

const ISSUERS = ['Meta', 'Google', 'HubSpot', 'DeepLearning.AI', 'DigitalMarketer', 'National University', 'Other'];

export function CertificatesManager() {
  const { db, saveCertificate, deleteCertificate, saving } = useAdminCms();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Partial<CertificateCmsItem> | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const defaultItem: Partial<CertificateCmsItem> = {
    title: '',
    issuer: 'Meta',
    credentialId: '',
    issueDate: '2024',
    expiryDate: '',
    doesNotExpire: true,
    verificationUrl: '',
    image: '',
    badgeColor: '#1877F2',
    category: 'Marketing',
    skillsCovered: [],
    displayOrder: (db?.certificates?.length || 0) + 1,
    published: true
  };

  const handleAdd = () => {
    setEditingItem({ ...defaultItem });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: CertificateCmsItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleDuplicate = (item: CertificateCmsItem) => {
    const copy = {
      ...item,
      title: `${item.title} (Copy)`,
      displayOrder: (db?.certificates?.length || 0) + 1
    };
    delete (copy as any).id;
    setEditingItem(copy);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: CertificateCmsItem) => {
    await saveCertificate({ ...item, published: !item.published }, false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const ok = await saveCertificate(editingItem, isNew);
    if (ok) {
      setModalOpen(false);
      setEditingItem(null);
    }
  };

  const columns: Column<CertificateCmsItem>[] = [
    {
      header: 'Certificate & Issuer',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: item.badgeColor || '#7c3aed' }}
          >
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-xs">{item.title}</div>
            <div className="text-[11px] text-purple-400">{item.issuer}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Credential ID',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-300">
          {item.credentialId || 'Verified Record'}
        </span>
      )
    },
    {
      header: 'Issue Date',
      accessor: (item) => (
        <span className="font-mono text-[11px] text-slate-400">
          {item.issueDate} {item.doesNotExpire ? '(No Expiry)' : ''}
        </span>
      )
    },
    {
      header: 'Verification URL',
      accessor: (item) => (
        item.verificationUrl ? (
          <a
            href={item.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>Link</span> <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[11px] text-slate-600">—</span>
        )
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
        title="Certifications & Professional Credentials"
        subtitle="Manage Meta, Google, AI, and Analytics credentials with verification links."
        data={db?.certificates || []}
        columns={columns}
        searchFields={['title', 'issuer', 'credentialId']}
        categories={ISSUERS}
        getCategory={(item) => item.issuer}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteCertificate}
        onDuplicate={handleDuplicate}
        onTogglePublish={handleTogglePublish}
        addButtonLabel="Add Certification"
      />

      {/* Edit / Create Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNew ? 'Add Certificate Credential' : 'Edit Certificate Credential'}
        subtitle="Specify issuing authority, credential ID, verification URL, and badge color."
        maxWidth="2xl"
      >
        {editingItem && (
          <form onSubmit={handleSaveModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Certification Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Meta Certified Media Buying Professional"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  required
                  value={editingItem.issuer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                  placeholder="e.g. Meta / Google"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={editingItem.credentialId || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, credentialId: e.target.value })}
                  placeholder="e.g. META-MBP-94821"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Badge Brand Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingItem.badgeColor || '#7c3aed'}
                    onChange={(e) => setEditingItem({ ...editingItem, badgeColor: e.target.value })}
                    className="w-10 h-9 bg-transparent border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingItem.badgeColor || '#7c3aed'}
                    onChange={(e) => setEditingItem({ ...editingItem, badgeColor: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Issue Year / Date</label>
                <input
                  type="text"
                  value={editingItem.issueDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                  placeholder="e.g. 2024"
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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Public Verification URL</label>
              <input
                type="text"
                value={editingItem.verificationUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, verificationUrl: e.target.value })}
                placeholder="https://credly.com/badges/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
              />
            </div>

            <div>
              <ImageUploadDropzone
                label="Certificate Document / Badge Image (Optional)"
                value={editingItem.image || ''}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                helperText="Upload badge image or PDF certificate"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={editingItem.doesNotExpire || false}
                  onChange={(e) => setEditingItem({ ...editingItem, doesNotExpire: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                />
                <span>This credential does not expire</span>
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
                <span>{saving ? 'Saving...' : isNew ? 'Create Certificate' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
