import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Edit, Copy, Eye, EyeOff, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => React.ReactNode);
  sortKey?: string;
  className?: string;
}

interface AdminDataTableProps<T extends { id: string; published?: boolean }> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  categories?: string[];
  getCategory?: (item: T) => string;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (item: T) => void;
  onTogglePublish?: (item: T) => void;
  addButtonLabel?: string;
}

export function AdminDataTable<T extends { id: string; published?: boolean }>({
  title,
  subtitle,
  data,
  columns,
  searchFields = [],
  categories = [],
  getCategory,
  onAdd,
  onEdit,
  onDelete,
  onDuplicate,
  onTogglePublish,
  addButtonLabel = 'Add New'
}: AdminDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Filtered & Searched Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search term filter
      if (searchTerm.trim() && searchFields.length > 0) {
        const matches = searchFields.some((field) => {
          const val = item[field];
          return val && String(val).toLowerCase().includes(searchTerm.toLowerCase());
        });
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && getCategory) {
        if (getCategory(item) !== selectedCategory) return false;
      }

      // Status filter
      if (statusFilter === 'Published' && item.published === false) return false;
      if (statusFilter === 'Draft' && item.published === true) return false;

      return true;
    });
  }, [data, searchTerm, searchFields, selectedCategory, getCategory, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page, itemsPerPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (onDelete) {
      selectedIds.forEach((id) => onDelete(id));
      setSelectedIds([]);
      setBulkDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2.5">
          {selectedIds.length > 0 && onDelete && (
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          {onAdd && (
            <button
              onClick={onAdd}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/40 hover:shadow-purple-900/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{addButtonLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Category & Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-purple-500/50"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => {
                setStatusFilter('All');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'All' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({data.length})
            </button>
            <button
              onClick={() => {
                setStatusFilter('Published');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'Published' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => {
                setStatusFilter('Draft');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'Draft' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="p-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                  />
                </th>
                {columns.map((col, idx) => (
                  <th key={idx} className={`p-3.5 ${col.className || ''}`}>
                    {col.header}
                  </th>
                ))}
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="p-8 text-center text-slate-500">
                    No matching records found. Click "{addButtonLabel}" to create one.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleToggleSelect(item.id)}
                        className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                      />
                    </td>

                    {columns.map((col, idx) => {
                      let cellContent: React.ReactNode = null;
                      if (typeof col.accessor === 'function') {
                        cellContent = col.accessor(item);
                      } else if (col.accessor) {
                        cellContent = String(item[col.accessor] ?? '');
                      }
                      return (
                        <td key={idx} className={`p-3.5 ${col.className || ''}`}>
                          {cellContent}
                        </td>
                      );
                    })}

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onTogglePublish && typeof item.published === 'boolean' && (
                          <button
                            onClick={() => onTogglePublish(item)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              item.published
                                ? 'text-emerald-400 hover:bg-emerald-500/10'
                                : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                            }`}
                            title={item.published ? 'Published (Click to unpublish)' : 'Draft (Click to publish)'}
                          >
                            {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        )}

                        {onDuplicate && (
                          <button
                            onClick={() => onDuplicate(item)}
                            className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
                            title="Duplicate record"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}

                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => setItemToDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="font-semibold text-white">{(page - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold text-white">
                {Math.min(page * itemsPerPage, filteredData.length)}
              </span>{' '}
              of <span className="font-semibold text-white">{filteredData.length}</span> entries
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(itemToDelete)}
        title="Delete Record?"
        message="Are you sure you want to delete this record? This action will remove it from the CMS."
        confirmLabel="Delete"
        onConfirm={() => {
          if (itemToDelete && onDelete) {
            onDelete(itemToDelete);
            setItemToDelete(null);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={bulkDeleteConfirm}
        title={`Delete ${selectedIds.length} Selected Records?`}
        message="Are you sure you want to permanently delete all selected records?"
        confirmLabel={`Delete (${selectedIds.length})`}
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkDeleteConfirm(false)}
      />
    </div>
  );
}
