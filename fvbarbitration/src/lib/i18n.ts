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
      blog: "Blog",
      terms: "Algemene Voorwaarden",
      privacy: "Privacybeleid",
    },
    hero: {
      subtitle: "Arbitrage",
      tagline: "Professionele arbitrage voor een snelle, vertrouwelijke en deskundige beslechting van uw geschillen.",
    },
    mission: {
      title: "Mission Statement",
      questions: [
        "Bent u een aannemer wiens facturen voor uitgevoerde werken nog niet betaald zijn door de opdrachtgever?",
        "Bent u een onderaannemer, wiens facturen aan de aannemer lang blijven open staan door lang aanslepende gerechtelijke procedures?",
        "Bent u een bouwheer/promotor, en stelt u gebreken vast bij uitgevoerde werken?",
      ],
      solution: "Arbitrage kan dan voor u een oplossing bieden.",
      legal: "De tussenkomst van een arbitragecomité is bekrachtigd in het Belgisch Gerechtelijk Wetboek.",
      closing: "Arbitrage kan van toepassing gemaakt worden door de aanpassing van uw contractvoorwaarden. Voor meer informatie, aarzelt u niet om contact op te nemen met Filip.",
      p1: "Filip van Bergen heeft jarenlange ervaring met het voeren van arbitragesprocedures in nationale en internationale geschillen. Hij staat cliënten bij voor diverse arbitrageinstellingen in bouwzaken en handelsgeschillen.",
      p2: "Aarzelt u niet om contact op te nemen met Filip voor meer informatie.",
    },
    advantages: {
      title: "Voordelen",
      items: [
        { title: "Snelheid", description: "Arbitrage biedt een snellere afhandeling dan traditionele gerechtelijke procedures." },
        { title: "Vertrouwelijkheid", description: "De arbitrageprocedure is vertrouwelijk, in tegenstelling tot openbare gerechtelijke procedures." },
        { title: "Expertise", description: "Arbiters worden gekozen op basis van hun specialistische kennis in het relevante rechtsgebied." },
        { title: "Flexibiliteit", description: "Partijen kunnen de procedure aanpassen aan hun specifieke noden en omstandigheden." },
        { title: "Afdwingbaarheid", description: "Arbitrale uitspraken zijn internationaal afdwingbaar onder het Verdrag van New York." },
        { title: "Kostefficiëntie", description: "Op langere termijn kan arbitrage kostenefficiënter zijn dan langdurige gerechtelijke procedures." },
      ],
    },
    contact: { title: "Contact" },
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
      accounts: "Rekeningen",
      officeAccount: "Kantoorrekening",
      thirdPartyAccount: "Derdenrekening",
    },
    seo: {
      home: {
        title: "FVB Arbitrage | Filip van Bergen | Antwerpen",
        description: "FVB Arbitrage - Professionele arbitrage door Filip van Bergen te Antwerpen. Snelle, vertrouwelijke en deskundige beslechting van uw geschillen.",
      },
      terms: {
        title: "Algemene Voorwaarden",
        description: "Algemene voorwaarden van FVB Arbitrage - Filip van Bergen.",
      },
      privacy: {
        title: "Privacybeleid",
        description: "Privacybeleid van FVB Arbitrage - Filip van Bergen.",
      },
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
      blog: "Blog",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
    },
    hero: {
      subtitle: "Arbitration",
      tagline: "Professional arbitration for a fast, confidential and expert resolution of your disputes.",
    },
    mission: {
      title: "Mission Statement",
      questions: [
        "Are you a contractor whose invoices for completed works have not yet been paid by the client?",
        "Are you a subcontractor whose invoices to the contractor remain outstanding due to lengthy court proceedings?",
        "Are you a building owner/developer who has identified defects in completed works?",
      ],
      solution: "Arbitration may then offer you a solution.",
      legal: "The involvement of an arbitration committee is enshrined in the Belgian Judicial Code.",
      closing: "Arbitration can be made applicable by adapting your contractual terms. For more information, do not hesitate to contact Filip.",
      p1: "Filip van Bergen has years of experience conducting arbitration proceedings in national and international disputes. He represents clients before various arbitration institutions in construction and commercial disputes.",
      p2: "Do not hesitate to contact Filip for more information.",
    },
    advantages: {
      title: "Advantages",
      items: [
        { title: "Speed", description: "Arbitration offers faster proceedings than traditional court procedures." },
        { title: "Confidentiality", description: "Arbitration proceedings are confidential, unlike public court proceedings." },
        { title: "Expertise", description: "Arbitrators are chosen based on their specialist knowledge in the relevant field of law." },
        { title: "Flexibility", description: "Parties can tailor the procedure to their specific needs and circumstances." },
        { title: "Enforceability", description: "Arbitral awards are internationally enforceable under the New York Convention." },
        { title: "Cost Efficiency", description: "In the long term, arbitration can be more cost-effective than lengthy court proceedings." },
      ],
    },
    contact: { title: "Contact" },
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
      accounts: "Bank Accounts",
      officeAccount: "Office Account",
      thirdPartyAccount: "Third-Party Account",
    },
    seo: {
      home: {
        title: "FVB Arbitration | Filip van Bergen | Antwerp",
        description: "FVB Arbitration - Professional arbitration by Filip van Bergen in Antwerp. Fast, confidential and expert resolution of your disputes.",
      },
      terms: {
        title: "Terms & Conditions",
        description: "Terms and conditions of FVB Arbitration - Filip van Bergen.",
      },
      privacy: {
        title: "Privacy Policy",
        description: "Privacy policy of FVB Arbitration - Filip van Bergen.",
      },
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
      blog: "Blog",
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
    },
    hero: {
      subtitle: "Arbitrage",
      tagline: "Arbitrage professionnel pour un règlement rapide, confidentiel et expert de vos litiges.",
    },
    mission: {
      title: "Mission",
      questions: [
        "Êtes-vous un entrepreneur dont les factures pour des travaux exécutés n'ont pas encore été payées par le maître d'ouvrage?",
        "Êtes-vous un sous-traitant dont les factures à l'entrepreneur restent longtemps impayées en raison de longues procédures judiciaires?",
        "Êtes-vous un maître d'ouvrage/promoteur qui constate des défauts dans des travaux exécutés?",
      ],
      solution: "L'arbitrage peut alors vous offrir une solution.",
      legal: "L'intervention d'un comité d'arbitrage est consacrée dans le Code judiciaire belge.",
      closing: "L'arbitrage peut être rendu applicable par l'adaptation de vos conditions contractuelles. Pour plus d'informations, n'hésitez pas à contacter Filip.",
      p1: "Filip van Bergen dispose de nombreuses années d'expérience dans la conduite de procédures d'arbitrage dans des litiges nationaux et internationaux. Il assiste des clients devant diverses institutions d'arbitrage dans des affaires de construction et des litiges commerciaux.",
      p2: "N'hésitez pas à contacter Filip pour plus d'informations.",
    },
    advantages: {
      title: "Avantages",
      items: [
        { title: "Rapidité", description: "L'arbitrage offre un traitement plus rapide que les procédures judiciaires traditionnelles." },
        { title: "Confidentialité", description: "La procédure d'arbitrage est confidentielle, contrairement aux procédures judiciaires publiques." },
        { title: "Expertise", description: "Les arbitres sont choisis sur la base de leurs connaissances spécialisées dans le domaine juridique concerné." },
        { title: "Flexibilité", description: "Les parties peuvent adapter la procédure à leurs besoins et circonstances spécifiques." },
        { title: "Force exécutoire", description: "Les sentences arbitrales sont exécutoires au niveau international en vertu de la Convention de New York." },
        { title: "Rentabilité", description: "À long terme, l'arbitrage peut être plus rentable que de longues procédures judiciaires." },
      ],
    },
    contact: { title: "Contact" },
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
      accounts: "Comptes bancaires",
      officeAccount: "Compte du cabinet",
      thirdPartyAccount: "Compte de tiers",
    },
    seo: {
      home: {
        title: "FVB Arbitrage | Filip van Bergen | Anvers",
        description: "FVB Arbitrage - Arbitrage professionnel par Filip van Bergen à Anvers. Règlement rapide, confidentiel et expert de vos litiges.",
      },
      terms: {
        title: "Conditions générales",
        description: "Conditions générales de FVB Arbitrage - Filip van Bergen.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description: "Politique de confidentialité de FVB Arbitrage - Filip van Bergen.",
      },
    },
    legalBanner: "Ce document n'est disponible qu'en néerlandais.",
    termsTitle: "Conditions générales",
    privacyTitle: "Politique de confidentialité",
  };
}
