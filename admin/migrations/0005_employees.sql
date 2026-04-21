-- Migration: 0005_employees
-- Description: Create employees and employee_translations tables

CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  photo_url TEXT,
  "group" TEXT NOT NULL CHECK ("group" IN ('partner', 'advocaten', 'team')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE employee_translations (
  employee_id TEXT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('nl', 'en', 'fr')),
  role TEXT NOT NULL,
  bio TEXT,
  languages TEXT,
  PRIMARY KEY (employee_id, locale)
);

CREATE INDEX idx_employees_group ON employees("group");
CREATE INDEX idx_employees_sort_order ON employees(sort_order);

-- Seed: existing employees
INSERT INTO employees (id, name, initials, photo_url, "group", sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Filip van Bergen', 'FvB', NULL, 'partner',   0),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Jonas Maes',       'JM',  NULL, 'advocaten', 0),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Xander Buylaert',  'XB',  NULL, 'team',      0),
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'Kaylee Smagge',    'KS',  NULL, 'team',      1);

INSERT INTO employee_translations (employee_id, locale, role, bio, languages) VALUES
  -- Filip NL
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'nl', 'Advocaat-partner',
   'Filip heeft inmiddels meer dan 20 jaar ervaring opgebouwd in zowel het adviseren van cliënten als het verlenen van bijstand in nationale, Europese en internationale gerechtelijke procedures.
Hij studeerde cum laude af als Licentiaat in de Rechten aan de Vrije Universiteit Brussel, na kandidaturen aan de Universiteit Antwerpen, waarna hij onmiddellijk toetrad tot de Antwerpse balie.
Filip behaalde zijn diploma Bedrijfseconomie aan de Antwerp Management School.
Hij ontving bovendien het erkend certificaat Le Français Juridique van de Franse Kamer van Koophandel en Nijverheid voor het Vlaams Gewest.
Filip volgde de bijzondere Salduz-opleiding betreffende de bijstand bij verhoor van verdachten in strafzaken georganiseerd door de Orde van Advocaten te Antwerpen.
Hij is erkend als advocaat bij het Hof van Cassatie in strafzaken en is houder van het getuigschrift Bijzondere Opleiding Cassatieprocedure in Strafzaken.
Filip is aanvaard als Arbiter in het Instituut voor Arbitrage.
Hij is redacteur van verschillende juridische bijdragen in verschillende juridische tijdschriften en geeft op regelmatige basis voordrachten aan zowel advocaten als professionals actief in KMO''s.
In het jaar 2007-2008 was Filip verantwoordelijke stage van de Vlaamse Conferentie bij de balie te Antwerpen.
Sinds 2008 is hij lid van de Raad van Bestuur van Advocaten zonder Grenzen.
Talen: Nederlands, Engels, Frans',
   NULL),
  -- Filip EN
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'en', 'Partner',
   'Filip has built up more than 20 years of experience in both advising clients and providing assistance in national, European and international legal proceedings.
He graduated cum laude with a Licentiate in Law from the Vrije Universiteit Brussel, after completing his candidatures at the University of Antwerp, after which he immediately joined the Antwerp bar.
Filip obtained his Business Economics degree from the Antwerp Management School.
He also received the recognized certificate Le Français Juridique from the French Chamber of Commerce and Industry for the Flemish Region.
Filip completed the special Salduz training on the assistance during interrogation of suspects in criminal cases, organized by the Order of Lawyers in Antwerp.
He is accredited as a lawyer at the Court of Cassation in criminal cases and holds the certificate of Special Training in Cassation Procedure in Criminal Cases.
Filip is accepted as an Arbitrator at the Institute of Arbitration.
He is an editor of various legal contributions in several legal journals and regularly gives lectures to both lawyers and professionals active in SMEs.
In the year 2007-2008, Filip was the internship coordinator of the Flemish Conference at the Antwerp bar.
Since 2008, he has been a member of the Board of Directors of Lawyers Without Borders.
Languages: Dutch, English, French',
   NULL),
  -- Filip FR
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'fr', 'Avocat-associé',
   'Filip a acquis plus de 20 ans d''expérience tant dans le conseil aux clients que dans l''assistance en procédures judiciaires nationales, européennes et internationales.
Il a obtenu son diplôme de Licencié en Droit cum laude à la Vrije Universiteit Brussel, après ses candidatures à l''Université d''Anvers, après quoi il a immédiatement rejoint le barreau d''Anvers.
Filip a obtenu son diplôme d''Économie d''Entreprise à l''Antwerp Management School.
Il a en outre reçu le certificat reconnu Le Français Juridique de la Chambre de Commerce et d''Industrie Française pour la Région Flamande.
Filip a suivi la formation spéciale Salduz concernant l''assistance lors de l''interrogatoire de suspects dans des affaires pénales, organisée par l''Ordre des Avocats d''Anvers.
Il est reconnu comme avocat à la Cour de Cassation en matière pénale et est titulaire du certificat de Formation Spéciale en Procédure de Cassation en Matière Pénale.
Filip est accepté comme Arbitre à l''Institut d''Arbitrage.
Il est rédacteur de diverses contributions juridiques dans plusieurs revues juridiques et donne régulièrement des conférences tant aux avocats qu''aux professionnels actifs dans les PME.
Au cours de l''année 2007-2008, Filip était responsable de stage de la Conférence Flamande au barreau d''Anvers.
Depuis 2008, il est membre du Conseil d''Administration d''Avocats sans Frontières.
Langues : Néerlandais, Anglais, Français',
   NULL),

  -- Jonas NL
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'nl', 'Advocaat',
   'Jonas behaalde zijn Master in de Rechten aan de Universiteit Antwerpen, waarna hij toetrad tot het team van Filip van Bergen. Hij behandelt nationale en internationale geschillen en is een begenadigd litigator.',
   'Nederlands · Frans · Engels · Duits'),
  -- Jonas EN
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'en', 'Lawyer',
   'Jonas obtained his Master of Laws at the University of Antwerp, after which he joined the team of Filip van Bergen. He handles national and international disputes and is a talented litigator.',
   'Dutch · French · English · German'),
  -- Jonas FR
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'fr', 'Avocat',
   'Jonas a obtenu son Master en Droit à l''Université d''Anvers, après quoi il a rejoint l''équipe de Filip van Bergen. Il traite des litiges nationaux et internationaux et est un plaideur talentueux.',
   'Néerlandais · Français · Anglais · Allemand'),

  -- Xander NL
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'nl', 'Legal Assistant',
   'Xander behaalde zijn Bachelor in de rechtsgeleerdheid aan de Universiteit Antwerpen. Hij is gepassioneerd in grondig juridisch onderzoek en assisteert op administratief en juridisch vlak.',
   NULL),
  -- Xander EN
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'en', 'Legal Assistant',
   'Xander obtained his Bachelor of Law at the University of Antwerp. He is passionate about thorough legal research and assists on both administrative and legal matters.',
   NULL),
  -- Xander FR
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'fr', 'Assistant juridique',
   'Xander a obtenu son Bachelor en Droit à l''Université d''Anvers. Il est passionné par la recherche juridique approfondie et assiste sur le plan administratif et juridique.',
   NULL),

  -- Kaylee NL
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'nl', 'Administratie & Office Manager',
   'Kaylee staat het team op administratief en organisatorisch vlak bij. Door haar accuratesse en stiptheid is zij een absolute meerwaarde voor het kantoor.',
   NULL),
  -- Kaylee EN
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'en', 'Administration & Office Manager',
   'Kaylee supports the team in administrative and organisational matters. Through her accuracy and punctuality she is an absolute asset to the firm.',
   NULL),
  -- Kaylee FR
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'fr', 'Administration & Office Manager',
   'Kaylee soutient l''équipe sur le plan administratif et organisationnel. Par sa précision et sa ponctualité, elle est un atout absolu pour le cabinet.',
   NULL);
