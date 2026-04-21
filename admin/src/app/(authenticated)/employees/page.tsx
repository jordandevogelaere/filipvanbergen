"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Save, Upload } from "lucide-react";
import { LOCALES } from "@/lib/types";

interface EmployeeTranslation {
  role: string;
  bio: string;
  languages: string;
}

interface Employee {
  id: string;
  name: string;
  initials: string;
  photo_url: string | null;
  group: "partner" | "advocaten" | "team";
  sort_order: number;
  translations: Record<string, EmployeeTranslation>;
}

const emptyTranslations = (): Record<string, EmployeeTranslation> =>
  Object.fromEntries(LOCALES.map((l) => [l, { role: "", bio: "", languages: "" }]));

const GROUP_LABELS: Record<string, string> = {
  partner: "Partner",
  advocaten: "Advocaten",
  team: "Team",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    initials: "",
    photo_url: "",
    group: "team" as "partner" | "advocaten" | "team",
    sort_order: 0,
    translations: emptyTranslations(),
  });
  const [activeLocale, setActiveLocale] = useState<"nl" | "en" | "fr">("nl");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      if (Array.isArray(data)) setEmployees(data);
    } catch {}
    setLoading(false);
  }

  function openAdd() {
    setEditingEmployee(null);
    setForm({ name: "", initials: "", photo_url: "", group: "team", sort_order: 0, translations: emptyTranslations() });
    setActiveLocale("nl");
    setModalOpen(true);
  }

  function openEdit(emp: Employee) {
    setEditingEmployee(emp);
    const translations = emptyTranslations();
    for (const locale of LOCALES) {
      if (emp.translations[locale]) {
        translations[locale] = {
          role: emp.translations[locale].role ?? "",
          bio: emp.translations[locale].bio ?? "",
          languages: emp.translations[locale].languages ?? "",
        };
      }
    }
    setForm({
      name: emp.name,
      initials: emp.initials,
      photo_url: emp.photo_url ?? "",
      group: emp.group,
      sort_order: emp.sort_order,
      translations,
    });
    setActiveLocale("nl");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.initials || !form.translations.nl?.role) return;
    setSaving(true);

    const payload = {
      ...form,
      photo_url: form.photo_url || null,
      translations: Object.fromEntries(
        LOCALES.map((l) => [l, {
          role: form.translations[l].role,
          bio: form.translations[l].bio || null,
          languages: form.translations[l].languages || null,
        }])
      ),
    };

    try {
      const url = editingEmployee ? `/api/employees/${editingEmployee.id}` : "/api/employees";
      const method = editingEmployee ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchEmployees();
        setModalOpen(false);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this employee?")) return;
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (res.ok) setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  function setTranslationField(locale: string, field: keyof EmployeeTranslation, value: string) {
    setForm((f) => ({
      ...f,
      translations: { ...f.translations, [locale]: { ...f.translations[locale], [field]: value } },
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-heading text-navy-900">Employees</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-steel-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-steel-200 bg-steel-100">
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Group</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Role (NL)</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Order</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-navy-500 text-sm">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-navy-500 text-sm">No employees yet.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="border-b border-steel-100 hover:bg-steel-100/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                        {emp.initials}
                      </div>
                      <span className="text-sm font-medium text-navy-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-700">{GROUP_LABELS[emp.group]}</td>
                  <td className="px-6 py-4 text-sm text-navy-900">{emp.translations.nl?.role ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-navy-500">{emp.sort_order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(emp)} className="p-1.5 text-navy-500 hover:text-accent">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="p-1.5 text-navy-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-steel-200">
              <h2 className="text-lg font-bold font-heading text-navy-900">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-navy-500 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-5 flex-1">
              {/* Base fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Filip van Bergen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                    Initials <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.initials}
                    onChange={(e) => setForm({ ...form, initials: e.target.value })}
                    className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="FvB"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                    Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.group}
                    onChange={(e) => setForm({ ...form, group: e.target.value as typeof form.group })}
                    className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <option value="partner">Partner</option>
                    <option value="advocaten">Advocaten</option>
                    <option value="team">Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                  Photo
                </label>
                {form.photo_url ? (
                  <div className="relative inline-block">
                    <img
                      src={form.photo_url}
                      alt="Avatar preview"
                      className="h-24 w-24 rounded-full object-cover border border-steel-200"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, photo_url: "" })}
                      className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow border border-steel-200 hover:bg-red-50"
                    >
                      <X className="w-3.5 h-3.5 text-navy-700" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-steel-300 rounded-lg cursor-pointer hover:border-accent hover:bg-steel-50 transition-colors">
                    <Upload className="w-5 h-5 text-steel-400 mb-1" />
                    <span className="text-sm text-steel-500">
                      {uploadingPhoto ? "Uploading..." : "Click to upload"}
                    </span>
                    <span className="text-xs text-steel-400 mt-0.5">JPEG, PNG, WebP (max 5MB)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      disabled={uploadingPhoto}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingPhoto(true);
                        try {
                          const fd = new FormData();
                          fd.append("file", file);
                          fd.append("folder", "employees");
                          const res = await fetch("/api/upload", { method: "POST", body: fd });
                          const data = await res.json();
                          if (res.ok) setForm((f) => ({ ...f, photo_url: data.url }));
                        } finally {
                          setUploadingPhoto(false);
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Locale tabs */}
              <div>
                <div className="flex gap-1 mb-3">
                  {LOCALES.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => setActiveLocale(locale)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                        activeLocale === locale
                          ? "bg-accent text-white"
                          : "bg-steel-100 text-navy-500 hover:bg-steel-200"
                      }`}
                    >
                      {locale}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 border border-steel-200 rounded-xl p-4">
                  <div>
                    <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                      Role {activeLocale === "nl" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      value={form.translations[activeLocale].role}
                      onChange={(e) => setTranslationField(activeLocale, "role", e.target.value)}
                      className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Advocaat-partner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                      Bio
                    </label>
                    <textarea
                      value={form.translations[activeLocale].bio}
                      onChange={(e) => setTranslationField(activeLocale, "bio", e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y"
                      placeholder="Bio text... Use new lines for multiple paragraphs."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-500 uppercase tracking-wider mb-1">
                      Languages
                    </label>
                    <input
                      type="text"
                      value={form.translations[activeLocale].languages}
                      onChange={(e) => setTranslationField(activeLocale, "languages", e.target.value)}
                      className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Nederlands · Frans · Engels · Duits"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-steel-200">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-navy-600 hover:text-navy-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.initials || !form.translations.nl?.role}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving & deploying…" : "Save & deploy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
