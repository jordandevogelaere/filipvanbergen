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
      terms: "Algemene Voorwaarden",
      privacy: "Privacybeleid",
    },
    hero: {
      subtitle: "Arbitrage",
      tagline: "Professionele arbitrage voor een snelle, vertrouwelijke en deskundige beslechting van uw geschillen.",
    },
    mission: {
      title: "Mission Statement",
      p1: "Arbitrage Filip van Bergen biedt een professioneel en efficiënt alternatief voor de klassieke gerechtelijke procedure. Als onafhankelijk arbiter zorgt Filip van Bergen voor een snelle, vertrouwelijke en deskundige beslechting van geschillen.",
      p2: "Door zijn uitgebreide ervaring als advocaat en bemiddelaar combineert hij juridische expertise met een pragmatische benadering van conflictoplossing.",
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
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
    },
    hero: {
      subtitle: "Arbitration",
      tagline: "Professional arbitration for a fast, confidential and expert resolution of your disputes.",
    },
    mission: {
      title: "Mission Statement",
      p1: "Arbitration Filip van Bergen offers a professional and efficient alternative to traditional court proceedings. As an independent arbitrator, Filip van Bergen ensures a fast, confidential and expert resolution of disputes.",
      p2: "Through his extensive experience as a lawyer and mediator, he combines legal expertise with a pragmatic approach to conflict resolution.",
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
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
    },
    hero: {
      subtitle: "Arbitrage",
      tagline: "Arbitrage professionnel pour un règlement rapide, confidentiel et expert de vos litiges.",
    },
    mission: {
      title: "Mission",
      p1: "Arbitrage Filip van Bergen offre une alternative professionnelle et efficace aux procédures judiciaires classiques. En tant qu'arbitre indépendant, Filip van Bergen assure un règlement rapide, confidentiel et expert des litiges.",
      p2: "Grâce à sa vaste expérience en tant qu'avocat et médiateur, il combine expertise juridique et approche pragmatique de la résolution des conflits.",
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
