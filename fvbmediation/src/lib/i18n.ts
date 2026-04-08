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
      subtitle: "Bemiddeling",
      tagline: "Professionele bemiddeling voor een efficiënte en duurzame oplossing van uw geschillen.",
    },
    mission: {
      title: "Mission Statement",
      p1: "Filip van Bergen is gediplomeerd bemiddelaar in burgerlijke en handelszaken en hij is erkend bij de Belgische Federale Bemiddelingscommissie (erkenningsnummer 3688, in overeenstemming met het artikel 1727 § 6 Gerechtelijk Wetboek).",
      p2: "Filip is eveneens gediplomeerd in bemiddeling in sociale zaken en familiezaken, hetgeen een meerwaarde biedt bij het behandelen van problemen en discussies in het kader van familiebedrijven.",
    },
    specialties: {
      construction: {
        title: "Bouwconflicten",
        description: "Heeft u als onderaannemer een conflict met een aannemer met wie u nog op andere werven samenwerkt, en wilt u de relatie behouden? Of bent u aannemer en heeft u een geschil met uw bouwheer, met wie u regelmatig opdrachten uitvoegt? Laat mij u helpen om deze problemen op te lossen zonder samenwerking in gevaar te brengen.",
      },
      commercial: {
        title: "Handelsgeschillen",
        description: "Bent u een onderneming die regelmatig goederen afneemt en heeft u een conflict met uw klant en/of leverancier? Of bent u leverancier en wilt u bemiddelen met klanten over prijsverhogingen of andere problemen? Ik sta klaar om u te helpen bij het oplossen van deze geschillen.",
      },
    },
    contact: {
      title: "Contact",
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
      accounts: "Rekeningen",
      officeAccount: "Kantoorrekening",
      thirdPartyAccount: "Derdenrekening",
    },
    seo: {
      home: {
        title: "FVB Mediation | Filip van Bergen | Antwerpen",
        description: "FVB Mediation - Professionele bemiddeling door Filip van Bergen te Antwerpen. Erkend bemiddelaar voor bouwconflicten en handelsgeschillen.",
      },
      terms: {
        title: "Algemene Voorwaarden",
        description: "Algemene voorwaarden van FVB Mediation - Filip van Bergen.",
      },
      privacy: {
        title: "Privacybeleid",
        description: "Privacybeleid van FVB Mediation - Filip van Bergen.",
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
      subtitle: "Mediation",
      tagline: "Professional mediation for an efficient and lasting resolution of your disputes.",
    },
    mission: {
      title: "Mission Statement",
      p1: "Filip van Bergen is a certified mediator in civil and commercial matters, accredited by the Belgian Federal Mediation Commission (accreditation number 3688, in accordance with article 1727 § 6 of the Judicial Code).",
      p2: "Filip is also certified in mediation in social and family matters, which provides added value in dealing with problems and disputes in the context of family businesses.",
    },
    specialties: {
      construction: {
        title: "Construction Disputes",
        description: "Do you, as a subcontractor, have a conflict with a contractor with whom you still work on other projects, and do you want to maintain the relationship? Or are you a contractor with a dispute with your client, with whom you regularly carry out assignments? Let me help you resolve these issues without jeopardizing the collaboration.",
      },
      commercial: {
        title: "Commercial Disputes",
        description: "Are you a company that regularly purchases goods and has a conflict with your customer and/or supplier? Or are you a supplier wanting to mediate with customers about price increases or other issues? I am ready to help you resolve these disputes.",
      },
    },
    contact: {
      title: "Contact",
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
      accounts: "Bank Accounts",
      officeAccount: "Office Account",
      thirdPartyAccount: "Third-Party Account",
    },
    seo: {
      home: {
        title: "FVB Mediation | Filip van Bergen | Antwerp",
        description: "FVB Mediation - Professional mediation by Filip van Bergen in Antwerp. Certified mediator for construction and commercial disputes.",
      },
      terms: {
        title: "Terms & Conditions",
        description: "Terms and conditions of FVB Mediation - Filip van Bergen.",
      },
      privacy: {
        title: "Privacy Policy",
        description: "Privacy policy of FVB Mediation - Filip van Bergen.",
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
      subtitle: "Médiation",
      tagline: "Médiation professionnelle pour une résolution efficace et durable de vos litiges.",
    },
    mission: {
      title: "Mission Statement",
      p1: "Filip van Bergen est médiateur diplômé en matières civiles et commerciales, agréé par la Commission fédérale de médiation belge (numéro d'agrément 3688, conformément à l'article 1727 § 6 du Code judiciaire).",
      p2: "Filip est également diplômé en médiation en matières sociales et familiales, ce qui constitue une valeur ajoutée dans le traitement des problèmes et des discussions dans le cadre des entreprises familiales.",
    },
    specialties: {
      construction: {
        title: "Conflits de construction",
        description: "Avez-vous, en tant que sous-traitant, un conflit avec un entrepreneur avec lequel vous travaillez encore sur d'autres chantiers, et souhaitez-vous maintenir la relation ? Ou êtes-vous entrepreneur et avez-vous un litige avec votre maître d'ouvrage ? Laissez-moi vous aider à résoudre ces problèmes sans mettre en péril la collaboration.",
      },
      commercial: {
        title: "Litiges commerciaux",
        description: "Êtes-vous une entreprise qui achète régulièrement des marchandises et avez-vous un conflit avec votre client et/ou fournisseur ? Ou êtes-vous fournisseur et souhaitez-vous négocier avec vos clients au sujet d'augmentations de prix ? Je suis prêt à vous aider à résoudre ces litiges.",
      },
    },
    contact: {
      title: "Contact",
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
      accounts: "Comptes bancaires",
      officeAccount: "Compte du cabinet",
      thirdPartyAccount: "Compte de tiers",
    },
    seo: {
      home: {
        title: "FVB Médiation | Filip van Bergen | Anvers",
        description: "FVB Médiation - Médiation professionnelle par Filip van Bergen à Anvers. Médiateur agréé pour les conflits de construction et litiges commerciaux.",
      },
      terms: {
        title: "Conditions générales",
        description: "Conditions générales de FVB Médiation - Filip van Bergen.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description: "Politique de confidentialité de FVB Médiation - Filip van Bergen.",
      },
    },
    legalBanner: "Ce document n'est disponible qu'en néerlandais.",
    termsTitle: "Conditions générales",
    privacyTitle: "Politique de confidentialité",
  };
}
