export type Locale = "nl" | "en" | "fr";
export const locales: Locale[] = ["nl", "en", "fr"];
export const localeLabels: Record<Locale, string> = { nl: "NL", en: "EN", fr: "FR" };

const langMap: Record<Locale, string> = { nl: "nl-BE", en: "en", fr: "fr" };
export function htmlLang(locale: Locale) {
  return langMap[locale] ?? "nl-BE";
}

export type Dictionary = ReturnType<typeof getDictionary>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.nl;
}

const dictionaries: Record<Locale, ReturnType<typeof nl>> = {
  nl: nl(),
  en: en(),
  fr: fr(),
};

function nl() {
  return {
    nav: {
      home: "Home",
      practiceAreas: "Praktijkgebieden",
      whoIsWho: "Wie is wie",
      contact: "Contact",
      vacatures: "Vacatures",
    },
    hero: { subtitle: "Advocatenkantoor" },
    mission: {
      title: "Mission Statement",
      p1: "Advocatenkantoor Filip van Bergen staat garant voor een persoonlijke en resultaatgerichte aanpak. Wij bieden juridisch advies en bijstand op maat, met aandacht voor de specifieke noden van elke cliënt. Ons kantoor combineert jarenlange ervaring met een dynamische visie op het recht.",
      p2: "Gevestigd in het hart van Antwerpen, staan wij u bij in uiteenlopende rechtsgebieden. Wij hechten groot belang aan een transparante communicatie en een efficiënte afhandeling van uw dossier.",
    },
    practiceAreas: {
      title: "Praktijkgebieden",
      areas: [
        { title: "Aansprakelijkheidsrecht", icon: "Shield", description: "Advies en bijstand bij geschillen over aansprakelijkheid, zowel contractueel als buitencontractueel." },
        { title: "Arbeidsrecht", icon: "Briefcase", description: "Juridische begeleiding bij arbeidsovereenkomsten, ontslag, sociale zekerheid en arbeidsgeschillen." },
        { title: "Bouwrecht", icon: "Building2", description: "Advies over bouwgeschillen, aannemingsovereenkomsten, stedenbouw en ruimtelijke ordening." },
        { title: "Familierecht", icon: "Users", description: "Begeleiding bij echtscheiding, onderhoudsgeld, omgangsrecht en andere familiale aangelegenheden." },
        { title: "Handelsrecht", icon: "Scale", description: "Juridisch advies voor ondernemingen: contracten, vennootschapsrecht, handelsgeschillen." },
        { title: "Huurrecht", icon: "Home", description: "Advies en bijstand bij huurovereenkomsten, huurgeschillen en uithuiszettingen." },
        { title: "Insolventierecht", icon: "TrendingDown", description: "Begeleiding bij faillissementen, gerechtelijke reorganisatie en schuldbemiddeling." },
        { title: "Strafrecht", icon: "Gavel", description: "Verdediging in strafzaken, bijstand bij verhoor, slachtofferbijstand." },
        { title: "Transportrecht", icon: "Truck", description: "Juridisch advies bij transportgeschillen, CMR-vervoer, maritiem recht en logistiek." },
        { title: "Verzekeringsrecht", icon: "ShieldCheck", description: "Advies bij verzekeringsgeschillen, polisinterpretatie en schadeclaims." },
        { title: "Incasso", icon: "Banknote", description: "Efficiënte invordering van onbetaalde facturen en schuldvorderingen. Wij zorgen voor een snelle en doeltreffende afhandeling van uw incassodossiers." },
        { title: "Leasingmaatschappijen", icon: "FileText", description: "Gespecialiseerde juridische bijstand voor leasingmaatschappijen. Van contractopstelling tot geschillenbeslechting." },
      ],
    },
    whoIsWho: {
      title: "Wie is wie?",
      advocaten: "Advocaten",
      team: "Team",
      filip: {
        role: "Advocaat-partner",
        bio: "Filip heeft inmiddels meer dan 15 jaar ervaring opgebouwd in zowel het adviseren van cliënten als het verlenen van bijstand in nationale, Europese en internationale gerechtelijke procedures.",
        credentials: [
          "Licentiaat Rechten (cum laude) – VUB",
          "Diploma Bedrijfseconomie – AMS",
          "Le Français Juridique – certificaat",
          "Salduz-opleiding – bijstand bij verhoor",
          "Erkend advocaat Hof van Cassatie",
          "Arbiter – Instituut voor Arbitrage",
          "Redacteur juridische tijdschriften",
          "RvB Advocaten zonder Grenzen",
        ],
        languages: "Nederlands · Engels · Frans",
      },
      jonas: {
        role: "Advocaat",
        bio: "Jonas behaalde zijn Master in de Rechten aan de Universiteit Antwerpen, waarna hij toetrad tot het team van Filip van Bergen. Hij behandelt nationale en internationale geschillen en is een begenadigd litigator.",
        languages: "Nederlands · Frans · Engels · Duits",
      },
      alec: {
        role: "Advocate",
        bio1: "Alec is een getalenteerde en gepassioneerde advocate, die haar Master in de Rechten behaalde aan de Vrije Universiteit Brussel. Zij promoveerde met de Masterthesis over de informatie- en bevorderingsverplichting van de advocaat inzake minnelijke conflictoplossing.",
        bio2: "Tijdens haar studies deed zij reeds rechtbankervaring op bij de Griffier van de Rechtbank van Eerste Aanleg en volgde zij aanvullende universitaire cursussen in de Handelswetenschappen.",
      },
      niels: {
        role: "Legal Assistant & Office Manager",
        bio: "Niels behaalde zijn Bachelor in de rechtsgeleerdheid aan de Universiteit Antwerpen. Hij is een uitstekende kantoormanager en verleent zowel accurate administratieve als juridische bijstand.",
      },
      xander: {
        role: "Legal Assistant",
        bio: "Xander behaalde zijn Bachelor in de rechtsgeleerdheid aan de Universiteit Antwerpen. Hij is gepassioneerd in grondig juridisch onderzoek en assisteert op administratief en juridisch vlak.",
      },
      kaylee: {
        role: "Administratie & Office Manager",
        bio: "Kaylee staat het team op administratief en organisatorisch vlak bij. Door haar accuratesse en stiptheid is zij een absolute meerwaarde voor het kantoor.",
      },
    },
    contact: {
      title: "Contact",
      sendMessage: "Stuur ons een bericht",
      addressLabel: "Adres",
      phoneLabel: "Telefoon",
      emailLabel: "E-mail",
      companyLabel: "Ondernemingsnummer",
    },
    form: {
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mail",
      phone: "Telefoon",
      message: "Bericht",
      submit: "Verstuur bericht",
      sending: "Verzenden...",
      successTitle: "Bedankt voor uw bericht!",
      successSub: "Wij nemen zo snel mogelijk contact met u op.",
      error: "Er ging iets mis. Probeer het later opnieuw.",
    },
    footer: {
      legal: "Juridisch",
      terms: "Algemene Voorwaarden",
      privacy: "Privacybeleid",
      rights: "Alle rechten voorbehouden.",
    },
    seo: {
      home: {
        title: "Advocatenkantoor Filip van Bergen | Antwerpen",
        description: "Advocatenkantoor Filip van Bergen te Antwerpen. Uw vertrouwde partner voor juridisch advies en bijstand in uiteenlopende rechtsgebieden.",
      },
      contact: {
        title: "Contact",
        description: "Neem contact op met Advocatenkantoor Filip van Bergen te Antwerpen. Lange Leemstraat 55, 2018 Antwerpen.",
      },
      terms: {
        title: "Algemene Voorwaarden",
        description: "Algemene voorwaarden van Advocatenkantoor Filip van Bergen.",
      },
      privacy: {
        title: "Privacybeleid",
        description: "Privacybeleid van Advocatenkantoor Filip van Bergen. Hoe wij omgaan met uw persoonsgegevens.",
      },
    },
    cookieBanner: {
      text: "Deze website gebruikt functionele cookies om correct te werken. Meer informatie vindt u in ons",
      privacyLink: "privacybeleid",
      accept: "Akkoord",
    },
    legalBanner: "",
    termsTitle: "Algemene Voorwaarden",
    privacyTitle: "Privacybeleid",
  };
}

function en() {
  return {
    nav: {
      home: "Home",
      practiceAreas: "Practice Areas",
      whoIsWho: "Our Team",
      contact: "Contact",
      vacatures: "Careers",
    },
    hero: { subtitle: "Law Firm" },
    mission: {
      title: "Mission Statement",
      p1: "Law Firm Filip van Bergen guarantees a personal and results-oriented approach. We offer tailored legal advice and assistance, with attention to the specific needs of each client. Our firm combines years of experience with a dynamic vision of the law.",
      p2: "Located in the heart of Antwerp, we assist you in various fields of law. We attach great importance to transparent communication and efficient handling of your case.",
    },
    practiceAreas: {
      title: "Practice Areas",
      areas: [
        { title: "Liability Law", icon: "Shield", description: "Advice and assistance in liability disputes, both contractual and non-contractual." },
        { title: "Employment Law", icon: "Briefcase", description: "Legal guidance on employment contracts, dismissal, social security and labour disputes." },
        { title: "Construction Law", icon: "Building2", description: "Advice on construction disputes, contractor agreements, urban planning and spatial planning." },
        { title: "Family Law", icon: "Users", description: "Guidance in divorce, alimony, visitation rights and other family matters." },
        { title: "Commercial Law", icon: "Scale", description: "Legal advice for businesses: contracts, company law, commercial disputes." },
        { title: "Tenancy Law", icon: "Home", description: "Advice and assistance with lease agreements, tenancy disputes and evictions." },
        { title: "Insolvency Law", icon: "TrendingDown", description: "Guidance in bankruptcies, judicial reorganisation and debt mediation." },
        { title: "Criminal Law", icon: "Gavel", description: "Defence in criminal cases, assistance during interrogation, victim support." },
        { title: "Transport Law", icon: "Truck", description: "Legal advice on transport disputes, CMR carriage, maritime law and logistics." },
        { title: "Insurance Law", icon: "ShieldCheck", description: "Advice on insurance disputes, policy interpretation and damage claims." },
        { title: "Debt Collection", icon: "Banknote", description: "Efficient recovery of unpaid invoices and debts. We ensure a quick and effective handling of your collection cases." },
        { title: "Leasing Companies", icon: "FileText", description: "Specialised legal assistance for leasing companies. From contract drafting to dispute resolution." },
      ],
    },
    whoIsWho: {
      title: "Our Team",
      advocaten: "Lawyers",
      team: "Team",
      filip: {
        role: "Partner",
        bio: "Filip has built up more than 15 years of experience in both advising clients and providing assistance in national, European and international legal proceedings.",
        credentials: [
          "LL.B. in Law (cum laude) – VUB",
          "Business Economics Degree – AMS",
          "Le Français Juridique – certificate",
          "Salduz training – suspect interview assistance",
          "Accredited lawyer Court of Cassation",
          "Arbitrator – Institute of Arbitration",
          "Editor of legal journals",
          "Board member Lawyers Without Borders",
        ],
        languages: "Dutch · English · French",
      },
      jonas: {
        role: "Lawyer",
        bio: "Jonas obtained his Master of Laws at the University of Antwerp, after which he joined the team of Filip van Bergen. He handles national and international disputes and is a talented litigator.",
        languages: "Dutch · French · English · German",
      },
      alec: {
        role: "Lawyer",
        bio1: "Alec is a talented and passionate lawyer who obtained her Master of Laws at the Vrije Universiteit Brussel. She graduated with a Master's thesis on the information and promotion obligation of the lawyer in amicable conflict resolution.",
        bio2: "During her studies she gained court experience by assisting the Clerk of the Court of First Instance and took additional university courses in Business Sciences.",
      },
      niels: {
        role: "Legal Assistant & Office Manager",
        bio: "Niels obtained his Bachelor of Law at the University of Antwerp. He is an excellent office manager providing both accurate administrative and legal assistance.",
      },
      xander: {
        role: "Legal Assistant",
        bio: "Xander obtained his Bachelor of Law at the University of Antwerp. He is passionate about thorough legal research and assists on both administrative and legal matters.",
      },
      kaylee: {
        role: "Administration & Office Manager",
        bio: "Kaylee supports the team in administrative and organisational matters. Through her accuracy and punctuality she is an absolute asset to the firm.",
      },
    },
    contact: {
      title: "Contact",
      sendMessage: "Send us a message",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      companyLabel: "Company number",
    },
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Thank you for your message!",
      successSub: "We will contact you as soon as possible.",
      error: "Something went wrong. Please try again later.",
    },
    footer: {
      legal: "Legal",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
    },
    seo: {
      home: {
        title: "Law Firm Filip van Bergen | Antwerp",
        description: "Law Firm Filip van Bergen in Antwerp, Belgium. Your trusted partner for legal advice and assistance across various fields of law.",
      },
      contact: {
        title: "Contact",
        description: "Contact Law Firm Filip van Bergen in Antwerp. Lange Leemstraat 55, 2018 Antwerpen, Belgium.",
      },
      terms: {
        title: "Terms & Conditions",
        description: "Terms and conditions of Law Firm Filip van Bergen.",
      },
      privacy: {
        title: "Privacy Policy",
        description: "Privacy policy of Law Firm Filip van Bergen. How we handle your personal data.",
      },
    },
    cookieBanner: {
      text: "This website uses functional cookies to operate correctly. For more information, please read our",
      privacyLink: "privacy policy",
      accept: "Accept",
    },
    legalBanner: "This document is only available in Dutch.",
    termsTitle: "Terms & Conditions",
    privacyTitle: "Privacy Policy",
  };
}

function fr() {
  return {
    nav: {
      home: "Accueil",
      practiceAreas: "Domaines",
      whoIsWho: "Notre équipe",
      contact: "Contact",
      vacatures: "Offres d'emploi",
    },
    hero: { subtitle: "Cabinet d'avocats" },
    mission: {
      title: "Mission",
      p1: "Le cabinet d'avocats Filip van Bergen garantit une approche personnelle et axée sur les résultats. Nous offrons des conseils et une assistance juridiques sur mesure, en tenant compte des besoins spécifiques de chaque client. Notre cabinet combine des années d'expérience avec une vision dynamique du droit.",
      p2: "Situés au cœur d'Anvers, nous vous assistons dans divers domaines du droit. Nous attachons une grande importance à une communication transparente et à un traitement efficace de votre dossier.",
    },
    practiceAreas: {
      title: "Domaines de pratique",
      areas: [
        { title: "Droit de la responsabilité", icon: "Shield", description: "Conseil et assistance dans les litiges de responsabilité, tant contractuelle qu'extracontractuelle." },
        { title: "Droit du travail", icon: "Briefcase", description: "Accompagnement juridique en matière de contrats de travail, licenciement, sécurité sociale et conflits du travail." },
        { title: "Droit de la construction", icon: "Building2", description: "Conseil sur les litiges de construction, contrats d'entreprise, urbanisme et aménagement du territoire." },
        { title: "Droit de la famille", icon: "Users", description: "Accompagnement en matière de divorce, pension alimentaire, droit de visite et autres affaires familiales." },
        { title: "Droit commercial", icon: "Scale", description: "Conseils juridiques pour les entreprises : contrats, droit des sociétés, litiges commerciaux." },
        { title: "Droit du bail", icon: "Home", description: "Conseil et assistance en matière de contrats de bail, litiges locatifs et expulsions." },
        { title: "Droit de l'insolvabilité", icon: "TrendingDown", description: "Accompagnement en matière de faillites, réorganisation judiciaire et médiation de dettes." },
        { title: "Droit pénal", icon: "Gavel", description: "Défense en matière pénale, assistance lors d'interrogatoires, aide aux victimes." },
        { title: "Droit des transports", icon: "Truck", description: "Conseil juridique en matière de litiges de transport, transport CMR, droit maritime et logistique." },
        { title: "Droit des assurances", icon: "ShieldCheck", description: "Conseil en matière de litiges d'assurance, interprétation de polices et réclamations de dommages." },
        { title: "Recouvrement", icon: "Banknote", description: "Recouvrement efficace des factures impayées et des créances. Nous assurons un traitement rapide et efficace de vos dossiers de recouvrement." },
        { title: "Sociétés de leasing", icon: "FileText", description: "Assistance juridique spécialisée pour les sociétés de leasing. De la rédaction de contrats à la résolution de litiges." },
      ],
    },
    whoIsWho: {
      title: "Notre équipe",
      advocaten: "Avocats",
      team: "Équipe",
      filip: {
        role: "Avocat-associé",
        bio: "Filip a acquis plus de 15 ans d'expérience tant dans le conseil aux clients que dans l'assistance en procédures judiciaires nationales, européennes et internationales.",
        credentials: [
          "Licencié en Droit (cum laude) – VUB",
          "Diplôme d'économie d'entreprise – AMS",
          "Le Français Juridique – certificat",
          "Formation Salduz – assistance lors d'interrogatoires",
          "Avocat accrédité Cour de Cassation",
          "Arbitre – Institut d'Arbitrage",
          "Rédacteur de revues juridiques",
          "CA Avocats sans Frontières",
        ],
        languages: "Néerlandais · Anglais · Français",
      },
      jonas: {
        role: "Avocat",
        bio: "Jonas a obtenu son Master en Droit à l'Université d'Anvers, après quoi il a rejoint l'équipe de Filip van Bergen. Il traite des litiges nationaux et internationaux et est un plaideur talentueux.",
        languages: "Néerlandais · Français · Anglais · Allemand",
      },
      alec: {
        role: "Avocate",
        bio1: "Alec est une avocate talentueuse et passionnée qui a obtenu son Master en Droit à la Vrije Universiteit Brussel. Elle a défendu sa thèse de master sur l'obligation d'information et de promotion de l'avocat en matière de résolution amiable des conflits.",
        bio2: "Pendant ses études, elle a acquis une expérience juridique auprès du Greffier du Tribunal de Première Instance et a suivi des cours universitaires complémentaires en Sciences Commerciales.",
      },
      niels: {
        role: "Assistant juridique & Office Manager",
        bio: "Niels a obtenu son Bachelor en Droit à l'Université d'Anvers. Il est un excellent gestionnaire de bureau fournissant une assistance administrative et juridique précise.",
      },
      xander: {
        role: "Assistant juridique",
        bio: "Xander a obtenu son Bachelor en Droit à l'Université d'Anvers. Il est passionné par la recherche juridique approfondie et assiste sur le plan administratif et juridique.",
      },
      kaylee: {
        role: "Administration & Office Manager",
        bio: "Kaylee soutient l'équipe sur le plan administratif et organisationnel. Par sa précision et sa ponctualité, elle est un atout absolu pour le cabinet.",
      },
    },
    contact: {
      title: "Contact",
      sendMessage: "Envoyez-nous un message",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      companyLabel: "Numéro d'entreprise",
    },
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Merci pour votre message !",
      successSub: "Nous vous contacterons dans les plus brefs délais.",
      error: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    },
    footer: {
      legal: "Juridique",
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
      rights: "Tous droits réservés.",
    },
    seo: {
      home: {
        title: "Cabinet d'avocats Filip van Bergen | Anvers",
        description: "Cabinet d'avocats Filip van Bergen à Anvers, Belgique. Votre partenaire de confiance pour les conseils et l'assistance juridiques.",
      },
      contact: {
        title: "Contact",
        description: "Contactez le cabinet d'avocats Filip van Bergen à Anvers. Lange Leemstraat 55, 2018 Antwerpen, Belgique.",
      },
      terms: {
        title: "Conditions générales",
        description: "Conditions générales du cabinet d'avocats Filip van Bergen.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description: "Politique de confidentialité du cabinet d'avocats Filip van Bergen.",
      },
    },
    cookieBanner: {
      text: "Ce site web utilise des cookies fonctionnels pour fonctionner correctement. Pour plus d'informations, consultez notre",
      privacyLink: "politique de confidentialité",
      accept: "Accepter",
    },
    legalBanner: "Ce document n'est disponible qu'en néerlandais.",
    termsTitle: "Conditions générales",
    privacyTitle: "Politique de confidentialité",
  };
}
