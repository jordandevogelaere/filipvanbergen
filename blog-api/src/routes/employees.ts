import { Hono } from "hono";
import type { Env } from "../types";

const employees = new Hono<{ Bindings: Env }>();

employees.get("/", async (c) => {
  const rows = await c.env.DB.prepare(`
    SELECT
      e.id,
      e.name,
      e.initials,
      e.photo_url,
      e."group",
      e.sort_order,
      et.locale,
      et.role,
      et.bio,
      et.languages
    FROM employees e
    LEFT JOIN employee_translations et ON et.employee_id = e.id
    ORDER BY e.sort_order ASC, e.name ASC
  `).all<{
    id: string;
    name: string;
    initials: string;
    photo_url: string | null;
    group: string;
    sort_order: number;
    locale: string | null;
    role: string | null;
    bio: string | null;
    languages: string | null;
  }>();

  const employeeMap = new Map<string, {
    id: string;
    name: string;
    initials: string;
    photo_url: string | null;
    group: string;
    sort_order: number;
    translations: Record<string, { role: string; bio: string | null; languages: string | null }>;
  }>();

  for (const row of rows.results) {
    if (!employeeMap.has(row.id)) {
      employeeMap.set(row.id, {
        id: row.id,
        name: row.name,
        initials: row.initials,
        photo_url: row.photo_url,
        group: row.group,
        sort_order: row.sort_order,
        translations: {},
      });
    }
    if (row.locale && row.role) {
      employeeMap.get(row.id)!.translations[row.locale] = {
        role: row.role,
        bio: row.bio,
        languages: row.languages,
      };
    }
  }

  return c.json({ employees: Array.from(employeeMap.values()) });
});

export default employees;
