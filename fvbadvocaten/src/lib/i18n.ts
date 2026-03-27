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
        fullText: [
          "Filip heeft inmiddels meer dan 20 jaar ervaring opgebouwd in zowel het adviseren van cliënten als het verlenen van bijstand in nationale, Europese en internationale gerechtelijke procedures.",
          "Hij studeerde cum laude af als Licentiaat in de Rechten aan de Vrije Universiteit Brussel, na kandidaturen aan de Universiteit Antwerpen, waarna hij onmiddellijk toetrad tot de Antwerpse balie.",
          "Filip behaalde zijn diploma Bedrijfseconomie aan de Antwerp Management School.",
          "Hij ontving bovendien het erkend certificaat Le Français Juridique van de Franse Kamer van Koophandel en Nijverheid voor het Vlaams Gewest.",
          "Filip volgde de bijzondere Salduz-opleiding betreffende de bijstand bij verhoor van verdachten in strafzaken georganiseerd door de Orde van Advocaten te Antwerpen.",
          "Hij is erkend als advocaat bij het Hof van Cassatie in strafzaken en is houder van het getuigschrift Bijzondere Opleiding Cassatieprocedure in Strafzaken.",
          "Filip is aanvaard als Arbiter in het Instituut voor Arbitrage.",
          "Hij is redacteur van verschillende juridische bijdragen in verschillende juridische tijdschriften en geeft op regelmatige basis voordrachten aan zowel advocaten als professionals actief in KMO's.",
          "In het jaar 2007-2008 was Filip verantwoordelijke stage van de Vlaamse Conferentie bij de balie te Antwerpen.",
          "Sinds 2008 is hij lid van de Raad van Bestuur van Advocaten zonder Grenzen.",
          "Talen: Nederlands, Engels, Frans",
        ],
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
        fullText: [
          "Filip has built up more than 20 years of experience in both advising clients and providing assistance in national, European and international legal proceedings.",
          "He graduated cum laude with a Licentiate in Law from the Vrije Universiteit Brussel, after completing his candidatures at the University of Antwerp, after which he immediately joined the Antwerp bar.",
          "Filip obtained his Business Economics degree from the Antwerp Management School.",
          "He also received the recognized certificate Le Français Juridique from the French Chamber of Commerce and Industry for the Flemish Region.",
          "Filip completed the special Salduz training on the assistance during interrogation of suspects in criminal cases, organized by the Order of Lawyers in Antwerp.",
          "He is accredited as a lawyer at the Court of Cassation in criminal cases and holds the certificate of Special Training in Cassation Procedure in Criminal Cases.",
          "Filip is accepted as an Arbitrator at the Institute of Arbitration.",
          "He is an editor of various legal contributions in several legal journals and regularly gives lectures to both lawyers and professionals active in SMEs.",
          "In the year 2007-2008, Filip was the internship coordinator of the Flemish Conference at the Antwerp bar.",
          "Since 2008, he has been a member of the Board of Directors of Lawyers Without Borders.",
          "Languages: Dutch, English, French",
        ],
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
        fullText: [
          "Filip a acquis plus de 20 ans d'expérience tant dans le conseil aux clients que dans l'assistance en procédures judiciaires nationales, européennes et internationales.",
          "Il a obtenu son diplôme de Licencié en Droit cum laude à la Vrije Universiteit Brussel, après ses candidatures à l'Université d'Anvers, après quoi il a immédiatement rejoint le barreau d'Anvers.",
          "Filip a obtenu son diplôme d'Économie d'Entreprise à l'Antwerp Management School.",
          "Il a en outre reçu le certificat reconnu Le Français Juridique de la Chambre de Commerce et d'Industrie Française pour la Région Flamande.",
          "Filip a suivi la formation spéciale Salduz concernant l'assistance lors de l'interrogatoire de suspects dans des affaires pénales, organisée par l'Ordre des Avocats d'Anvers.",
          "Il est reconnu comme avocat à la Cour de Cassation en matière pénale et est titulaire du certificat de Formation Spéciale en Procédure de Cassation en Matière Pénale.",
          "Filip est accepté comme Arbitre à l'Institut d'Arbitrage.",
          "Il est rédacteur de diverses contributions juridiques dans plusieurs revues juridiques et donne régulièrement des conférences tant aux avocats qu'aux professionnels actifs dans les PME.",
          "Au cours de l'année 2007-2008, Filip était responsable de stage de la Conférence Flamande au barreau d'Anvers.",
          "Depuis 2008, il est membre du Conseil d'Administration d'Avocats sans Frontières.",
          "Langues : Néerlandais, Anglais, Français",
        ],
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
