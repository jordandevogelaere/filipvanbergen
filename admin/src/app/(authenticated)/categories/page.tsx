"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { LOCALES } from "@/lib/types";

interface CategoryRow {
  id: string;
  slug: string;
  translations: Record<string, string>;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSlug, setNewSlug] = useState("");
  const [newNames, setNewNames] = useState({ nl: "", en: "", fr: "" });
  const [editSlug, setEditSlug] = useState("");
  const [editNames, setEditNames] = useState({ nl: "", en: "", fr: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch {}
    setLoading(false);
  }

  async function handleAdd() {
    if (!newSlug || !newNames.nl) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: newSlug, translations: newNames }),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories((prev) => [...prev, cat]);
      setIsAdding(false);
      setNewSlug("");
      setNewNames({ nl: "", en: "", fr: "" });
    }
  }

  function startEdit(cat: CategoryRow) {
    setEditingId(cat.id);
    setEditSlug(cat.slug);
    setEditNames({
      nl: cat.translations.nl || "",
      en: cat.translations.en || "",
      fr: cat.translations.fr || "",
    });
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    const res = await fetch(`/api/categories/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: editSlug, translations: editNames }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? updated : c))
      );
      setEditingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-heading text-navy-900">Categories</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-steel-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-steel-200 bg-steel-100">
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Slug</th>
              {LOCALES.map((locale) => (
                <th key={locale} className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">
                  {locale.toUpperCase()}
                </th>
              ))}
              <th className="text-right px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="border-b border-steel-100 bg-accent/5">
                <td className="px-6 py-3">
                  <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="category-slug" className="w-full px-2 py-1 border border-steel-200 rounded text-sm" />
                </td>
                {LOCALES.map((locale) => (
                  <td key={locale} className="px-6 py-3">
                    <input type="text" value={newNames[locale]} onChange={(e) => setNewNames({ ...newNames, [locale]: e.target.value })} placeholder={`Name (${locale})`} className="w-full px-2 py-1 border border-steel-200 rounded text-sm" />
                  </td>
                ))}
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={handleAdd} className="p-1.5 text-green-600 hover:text-green-700"><Save className="w-4 h-4" /></button>
                    <button onClick={() => setIsAdding(false)} className="p-1.5 text-navy-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            )}
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-navy-500 text-sm">Loading...</td></tr>
            ) : categories.length === 0 && !isAdding ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-navy-500 text-sm">No categories yet. Add your first category.</td></tr>
            ) : (
              categories.map((cat) =>
                editingId === cat.id ? (
                  <tr key={cat.id} className="border-b border-steel-100 bg-accent/5">
                    <td className="px-6 py-3">
                      <input type="text" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="w-full px-2 py-1 border border-steel-200 rounded text-sm" />
                    </td>
                    {LOCALES.map((locale) => (
                      <td key={locale} className="px-6 py-3">
                        <input type="text" value={editNames[locale]} onChange={(e) => setEditNames({ ...editNames, [locale]: e.target.value })} className="w-full px-2 py-1 border border-steel-200 rounded text-sm" />
                      </td>
                    ))}
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={handleSaveEdit} className="p-1.5 text-green-600 hover:text-green-700"><Save className="w-4 h-4" /></button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 text-navy-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={cat.id} className="border-b border-steel-100 hover:bg-steel-100/50">
                    <td className="px-6 py-4 text-sm font-mono text-navy-700">{cat.slug}</td>
                    {LOCALES.map((locale) => (
                      <td key={locale} className="px-6 py-4 text-sm text-navy-900">{cat.translations[locale]}</td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => startEdit(cat)} className="p-1.5 text-navy-500 hover:text-accent"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-navy-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
