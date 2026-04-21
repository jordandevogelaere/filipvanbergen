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
      blog: "Blog",
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
        { title: "Aansprakelijkheidsrecht", icon: "Shield", description: "Advies en bijstand bij geschillen over aansprakelijkheid, zowel contractueel als buitencontractueel.", details: [
          "U wordt aansprakelijk gesteld wegens een vermeende persoonlijke fout of een nalatigheid in de uitoefening van uw beroep?",
          "U wenst een schadevergoeding omdat u schade heeft geleden ten gevolge van het onrechtmatig gedrag van een andere persoon of overheid?",
        ] },
        { title: "Arbeidsrecht", icon: "Briefcase", description: "Juridische begeleiding bij arbeidsovereenkomsten, ontslag, sociale zekerheid en arbeidsgeschillen.", details: [
          "U bent werkgever en wordt geconfronteerd met een sociale inspectie over overuren of onkostennota's?",
          "U bent werknemer en wordt ontslagen omwille van een dringende reden of omwille van een herstructurering?",
          "U bent werkgever en wenst een werknemer te ontslaan?",
          "U wil een arbeidskaart aanvragen voor een buitenlandse werknemer?",
        ] },
        { title: "Bouwrecht", icon: "Building2", description: "Advies over bouwgeschillen, aannemingsovereenkomsten, stedenbouw en ruimtelijke ordening.", details: [
          "U bent onderaannemer en de hoofdaannemer of de opdrachtgever laat na u te betalen?",
          "U bent aannemer en wenst een aannemingsovereenkomst met een onderaannemer te laten ontbinden wegens wanprestatie bij de uitvoering van zijn werkzaamheden?",
          "U wenst een waterdichte aannemingsovereenkomst op te maken?",
          "Uw architect heeft een conceptuele fout gemaakt bij het tekenen van het ontwerp?",
        ] },
        { title: "Familierecht", icon: "Users", description: "Begeleiding bij echtscheiding, onderhoudsgeld, omgangsrecht en andere familiale aangelegenheden.", details: [
          "U bent betrokken bij een vereffening-verdeling en u wenst daarbij bijgestaan te worden?",
          "U wil de rechtsgeldigheid van een testament aanvechten?",
          "U wil een kindregeling opmaken of wenst bijgestaan te worden bij de opmaak van een overeenkomst echtscheiding in onderlinge toestemming?",
        ] },
        { title: "Handelsrecht", icon: "Scale", description: "Juridisch advies voor ondernemingen: contracten, vennootschapsrecht, handelsgeschillen.", details: [
          "U wenst geadviseerd te worden bij de redactie van een waterdichte overeenkomst om juridische problemen achteraf te vermijden?",
          "U heeft een contractueel geschil met uw medecontractant?",
          "Wenst u een overeenkomst af te dwingen, te ontbinden of nietig te laten verklaren?",
          "U wil beslag leggen bij uw schuldenaar of bij derden?",
          "U wenst betaald te worden voor de door u geleverde prestaties?",
          "U wil advies over de overdracht van een handelsfonds?",
        ] },
        { title: "Huurrecht", icon: "Home", description: "Advies en bijstand bij huurovereenkomsten, huurgeschillen en uithuiszettingen.", details: [
          "U bent verhuurder en uw huurder weigert tijdig te betalen?",
          "U wordt gedagvaard voor de Vrederechter omdat het verhuurder goed zich niet in goede staat zou bevinden?",
          "U wil een handelshuurovereenkomst laten opmaken of nakijken?",
        ] },
        { title: "Insolventierecht", icon: "TrendingDown", description: "Begeleiding bij faillissementen, gerechtelijke reorganisatie en schuldbemiddeling.", details: [
          "U heeft tijdelijke betalingsmoeilijkheden en wenst bescherming tegen uw schuldeisers via de WCO-procedure?",
        ] },
        { title: "Strafrecht", icon: "Gavel", description: "Verdediging in strafzaken, bijstand bij verhoor, slachtofferbijstand.", details: [
          "U wordt gedagvaard voor de Politierechtbank wegens een verkeersinbreuk?",
          "U wenst een schadevergoeding te bekomen omdat u schade heeft geleden ten gevolge van een verkeerd verkeersmanoeuvre?",
        ] },
        { title: "Verzekeringsrecht", icon: "ShieldCheck", description: "Advies bij verzekeringsgeschillen, polisinterpretatie en schadeclaims.", details: [
          "Uw verzekeringsmaatschappij volgt u niet en wenst een second opinion over de slaagkansen van een gerechtelijke procedure?",
          "U heeft een lichamelijk letsel en u wenst de schade te begroten en een correcte schadevergoeding te bekomen?",
          "Oefent een verzekeringsmaatschappij een regresvordering op u uit wegens vastgestelde alcoholintoxicatie of dronkenschap?",
        ] },
        { title: "Administratief recht", icon: "Landmark", description: "Bijstand bij geschillen met overheden, ruimtelijke ordening en milieurecht.", details: [
          "U heeft een bouwvergunning aangevraagd en deze werd door uw gemeente ten onrechte geweigerd?",
          "U bent ambtenaar en u kreeg een tuchtsanctie opgelegd?",
          "U wordt beboet voor een inbreuk op de milieuwetgeving en u wenst dit aan te vechten?",
          "Bedreigt een gemeentelijk ruimtelijk structuurplan of uitvoeringsplan het verder functioneren van uw onderneming?",
          "Wenst u geïnformeerd te worden over uw recht van voorkoop?",
          "Dreigt uw privéperceel of vakantiewoning onteigend te worden?",
        ] },
        { title: "Onroerend goed", icon: "MapPin", description: "Advies en bijstand bij geschillen over onroerend goed en burgerlijk recht.", details: [
          "U heeft een onroerend goed gekocht maar u stelt achteraf verborgen gebreken vast?",
          "U sloot een wederzijdse aankoop-verkoopbelofte maar de kandidaat-koper komt zijn betalingsbeloftes niet na?",
          "U ondervindt ernstige hinder door het gedrag van uw buur en u wil dat dit ophoudt?",
        ] },
        { title: "Appartementsrecht", icon: "Building", description: "Juridische bijstand bij geschillen in mede-eigendom en appartementsgebouwen.", details: [
          "Bent u mede-eigenaar en heeft u bijstand nodig in een conflict met één of meerdere andere mede-bewoners of de syndicus?",
          "Bent u syndicus en wordt u geconfronteerd met leden van de vereniging der mede-eigenaars die de kosten ten onrechte niet betalen?",
        ] },
        { title: "Incasso", icon: "Banknote", description: "Efficiënte invordering van onbetaalde facturen en schuldvorderingen. Wij zorgen voor een snelle en doeltreffende afhandeling van uw incassodossiers." },
        { title: "Leasingmaatschappijen", icon: "FileText", description: "Gespecialiseerde juridische bijstand voor leasingmaatschappijen. Van contractopstelling tot geschillenbeslechting." },
      ],
    },
    whoIsWho: {
      title: "Wie is wie?",
      advocaten: "Advocaten",
      team: "Team",
    },
    vacatures: {
      title: "Vacatures",
      description: "ADVOCATENKANTOOR FILIP van BERGEN is omwille van de expansie van het kantoor steeds op zoek naar hoog gekwalificeerde en gemotiveerde medewerkers, die bereid zijn voor de klanten van het kantoor het grootst mogelijke engagement aan te gaan bij het adviseren en het verlenen van gerechtelijke bijstand.",
      cta: "Solliciteren?",
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
      accounts: "Rekeningen",
      officeAccount: "Kantoorrekening",
      thirdPartyAccount: "Derdenrekening",
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
      blog: "Blog",
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
        { title: "Liability Law", icon: "Shield", description: "Advice and assistance in liability disputes, both contractual and non-contractual.", details: [
          "Are you being held liable for an alleged personal fault or negligence in the exercise of your profession?",
          "Do you wish to obtain compensation because you suffered damage as a result of the unlawful conduct of another person or authority?",
        ] },
        { title: "Employment Law", icon: "Briefcase", description: "Legal guidance on employment contracts, dismissal, social security and labour disputes.", details: [
          "Are you an employer facing a social inspection regarding overtime or expense reports?",
          "Are you an employee being dismissed for urgent reasons or due to restructuring?",
          "Are you an employer wishing to dismiss an employee?",
          "Do you want to apply for a work permit for a foreign employee?",
        ] },
        { title: "Construction Law", icon: "Building2", description: "Advice on construction disputes, contractor agreements, urban planning and spatial planning.", details: [
          "Are you a subcontractor and the main contractor or client fails to pay you?",
          "Are you a contractor wishing to have a subcontractor agreement terminated due to breach of contract?",
          "Do you wish to draft a watertight contractor agreement?",
          "Has your architect made a conceptual error in the design?",
        ] },
        { title: "Family Law", icon: "Users", description: "Guidance in divorce, alimony, visitation rights and other family matters.", details: [
          "Are you involved in a liquidation and division of assets and do you need assistance?",
          "Do you wish to challenge the validity of a will?",
          "Do you want to draft child arrangements or do you need assistance with a mutual consent divorce agreement?",
        ] },
        { title: "Commercial Law", icon: "Scale", description: "Legal advice for businesses: contracts, company law, commercial disputes.", details: [
          "Do you wish to be advised on drafting a watertight contract to avoid legal problems?",
          "Do you have a contractual dispute with your co-contractor?",
          "Do you wish to enforce, terminate or annul a contract?",
          "Do you want to seize assets from your debtor or third parties?",
          "Do you wish to be paid for the services you have rendered?",
          "Do you want advice on the transfer of a business?",
        ] },
        { title: "Tenancy Law", icon: "Home", description: "Advice and assistance with lease agreements, tenancy disputes and evictions.", details: [
          "Are you a landlord and your tenant refuses to pay on time?",
          "Are you being summoned before the Justice of the Peace because the rented property is allegedly not in good condition?",
          "Do you want to have a commercial lease agreement drafted or reviewed?",
        ] },
        { title: "Insolvency Law", icon: "TrendingDown", description: "Guidance in bankruptcies, judicial reorganisation and debt mediation.", details: [
          "Do you have temporary payment difficulties and wish to seek protection from your creditors through judicial reorganisation?",
        ] },
        { title: "Criminal Law", icon: "Gavel", description: "Defence in criminal cases, assistance during interrogation, victim support.", details: [
          "Are you being summoned before the Police Court for a traffic offence?",
          "Do you wish to obtain compensation because you suffered damage as a result of a wrong traffic manoeuvre?",
        ] },
        { title: "Insurance Law", icon: "ShieldCheck", description: "Advice on insurance disputes, policy interpretation and damage claims.", details: [
          "Your insurance company does not follow you and you want a second opinion on the chances of success of legal proceedings?",
          "Have you suffered a bodily injury and do you wish to assess the damage and obtain fair compensation?",
          "Is an insurance company exercising a recourse claim against you due to established alcohol intoxication or drunkenness?",
        ] },
        { title: "Administrative Law", icon: "Landmark", description: "Assistance in disputes with authorities, spatial planning and environmental law.", details: [
          "Have you applied for a building permit that was unjustly refused by your municipality?",
          "Are you a civil servant who has been given a disciplinary sanction?",
          "Are you being fined for an environmental law violation and do you wish to contest this?",
          "Does a municipal spatial structure plan or implementation plan threaten the continued operation of your business?",
          "Do you wish to be informed about your right of pre-emption?",
          "Is your private land or holiday home threatened with expropriation?",
        ] },
        { title: "Real Estate", icon: "MapPin", description: "Advice and assistance in real estate and civil law disputes.", details: [
          "Have you purchased real estate but discovered hidden defects afterwards?",
          "Did you sign a mutual purchase-sale promise but the buyer is not meeting their payment obligations?",
          "Are you experiencing serious nuisance from your neighbour's behaviour and do you want it to stop?",
        ] },
        { title: "Condominium Law", icon: "Building", description: "Legal assistance in co-ownership and apartment building disputes.", details: [
          "Are you a co-owner and do you need assistance in a conflict with one or more co-residents or the building manager?",
          "Are you a building manager facing co-owners who unjustly refuse to pay their share of the costs?",
        ] },
        { title: "Debt Collection", icon: "Banknote", description: "Efficient recovery of unpaid invoices and debts. We ensure a quick and effective handling of your collection cases." },
        { title: "Leasing Companies", icon: "FileText", description: "Specialised legal assistance for leasing companies. From contract drafting to dispute resolution." },
      ],
    },
    whoIsWho: {
      title: "Our Team",
      advocaten: "Lawyers",
      team: "Team",
    },
    vacatures: {
      title: "Careers",
      description: "As a result of the firm's expansion, ADVOCATENKANTOOR FILIP van BERGEN is constantly on the look-out for highly qualified and motivated employees, who are prepared to go the extra mile when providing advice and legal assistance.",
      cta: "Apply?",
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
      accounts: "Bank Accounts",
      officeAccount: "Office Account",
      thirdPartyAccount: "Third-Party Account",
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
      blog: "Blog",
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
        { title: "Droit de la responsabilité", icon: "Shield", description: "Conseil et assistance dans les litiges de responsabilité, tant contractuelle qu'extracontractuelle.", details: [
          "Êtes-vous tenu responsable d'une faute personnelle présumée ou d'une négligence dans l'exercice de votre profession ?",
          "Souhaitez-vous obtenir une indemnisation pour des dommages subis suite au comportement illicite d'un tiers ou d'une autorité ?",
        ] },
        { title: "Droit du travail", icon: "Briefcase", description: "Accompagnement juridique en matière de contrats de travail, licenciement, sécurité sociale et conflits du travail.", details: [
          "Êtes-vous employeur et confronté à une inspection sociale concernant les heures supplémentaires ou les notes de frais ?",
          "Êtes-vous employé et licencié pour motif grave ou suite à une restructuration ?",
          "Êtes-vous employeur et souhaitez-vous licencier un employé ?",
          "Souhaitez-vous demander un permis de travail pour un employé étranger ?",
        ] },
        { title: "Droit de la construction", icon: "Building2", description: "Conseil sur les litiges de construction, contrats d'entreprise, urbanisme et aménagement du territoire.", details: [
          "Êtes-vous sous-traitant et l'entrepreneur principal ou le maître d'ouvrage ne vous paie pas ?",
          "Êtes-vous entrepreneur et souhaitez-vous faire résilier un contrat de sous-traitance pour inexécution ?",
          "Souhaitez-vous rédiger un contrat d'entreprise solide ?",
          "Votre architecte a-t-il commis une erreur conceptuelle dans la conception du projet ?",
        ] },
        { title: "Droit de la famille", icon: "Users", description: "Accompagnement en matière de divorce, pension alimentaire, droit de visite et autres affaires familiales.", details: [
          "Êtes-vous impliqué dans une liquidation-partage et souhaitez-vous être assisté ?",
          "Souhaitez-vous contester la validité d'un testament ?",
          "Souhaitez-vous établir des arrangements pour les enfants ou être assisté lors de la rédaction d'une convention de divorce par consentement mutuel ?",
        ] },
        { title: "Droit commercial", icon: "Scale", description: "Conseils juridiques pour les entreprises : contrats, droit des sociétés, litiges commerciaux.", details: [
          "Souhaitez-vous être conseillé pour la rédaction d'un contrat solide afin d'éviter les problèmes juridiques ?",
          "Avez-vous un litige contractuel avec votre cocontractant ?",
          "Souhaitez-vous faire exécuter, résoudre ou annuler un contrat ?",
          "Souhaitez-vous saisir les biens de votre débiteur ou de tiers ?",
          "Souhaitez-vous être payé pour les prestations que vous avez fournies ?",
          "Souhaitez-vous un conseil sur le transfert d'un fonds de commerce ?",
        ] },
        { title: "Droit du bail", icon: "Home", description: "Conseil et assistance en matière de contrats de bail, litiges locatifs et expulsions.", details: [
          "Êtes-vous bailleur et votre locataire refuse-t-il de payer à temps ?",
          "Êtes-vous cité devant le Juge de Paix parce que le bien loué ne serait pas en bon état ?",
          "Souhaitez-vous faire rédiger ou vérifier un bail commercial ?",
        ] },
        { title: "Droit de l'insolvabilité", icon: "TrendingDown", description: "Accompagnement en matière de faillites, réorganisation judiciaire et médiation de dettes.", details: [
          "Avez-vous des difficultés de paiement temporaires et souhaitez-vous une protection contre vos créanciers via la procédure de réorganisation judiciaire ?",
        ] },
        { title: "Droit pénal", icon: "Gavel", description: "Défense en matière pénale, assistance lors d'interrogatoires, aide aux victimes.", details: [
          "Êtes-vous cité devant le Tribunal de Police pour une infraction routière ?",
          "Souhaitez-vous obtenir une indemnisation pour des dommages subis suite à une manœuvre de circulation incorrecte ?",
        ] },
        { title: "Droit des assurances", icon: "ShieldCheck", description: "Conseil en matière de litiges d'assurance, interprétation de polices et réclamations de dommages.", details: [
          "Votre compagnie d'assurance ne vous suit pas et vous souhaitez un second avis sur les chances de succès d'une procédure judiciaire ?",
          "Avez-vous subi un dommage corporel et souhaitez-vous évaluer le préjudice et obtenir une indemnisation correcte ?",
          "Une compagnie d'assurance exerce-t-elle un recours contre vous pour intoxication alcoolique ou ivresse constatée ?",
        ] },
        { title: "Droit administratif", icon: "Landmark", description: "Assistance dans les litiges avec les autorités, l'aménagement du territoire et le droit de l'environnement.", details: [
          "Avez-vous demandé un permis de bâtir qui a été injustement refusé par votre commune ?",
          "Êtes-vous fonctionnaire et avez-vous reçu une sanction disciplinaire ?",
          "Êtes-vous verbalisé pour une infraction à la législation environnementale et souhaitez-vous la contester ?",
          "Un plan de structure spatial ou un plan d'exécution communal menace-t-il le fonctionnement de votre entreprise ?",
          "Souhaitez-vous être informé de votre droit de préemption ?",
          "Votre terrain privé ou votre maison de vacances risque-t-il d'être exproprié ?",
        ] },
        { title: "Immobilier", icon: "MapPin", description: "Conseil et assistance dans les litiges immobiliers et de droit civil.", details: [
          "Avez-vous acheté un bien immobilier et constatez-vous des vices cachés par la suite ?",
          "Avez-vous conclu une promesse de vente réciproque mais l'acheteur ne respecte pas ses engagements de paiement ?",
          "Subissez-vous des nuisances graves du fait du comportement de votre voisin et souhaitez-vous que cela cesse ?",
        ] },
        { title: "Copropriété", icon: "Building", description: "Assistance juridique dans les litiges de copropriété et d'immeubles à appartements.", details: [
          "Êtes-vous copropriétaire et avez-vous besoin d'assistance dans un conflit avec un ou plusieurs co-résidents ou le syndic ?",
          "Êtes-vous syndic et confronté à des membres de l'association des copropriétaires qui ne paient pas leurs charges ?",
        ] },
        { title: "Recouvrement", icon: "Banknote", description: "Recouvrement efficace des factures impayées et des créances. Nous assurons un traitement rapide et efficace de vos dossiers de recouvrement." },
        { title: "Sociétés de leasing", icon: "FileText", description: "Assistance juridique spécialisée pour les sociétés de leasing. De la rédaction de contrats à la résolution de litiges." },
      ],
    },
    whoIsWho: {
      title: "Notre équipe",
      advocaten: "Avocats",
      team: "Équipe",
    },
    vacatures: {
      title: "Offres d'emploi",
      description: "En raison de son expansion, le CABINET D'AVOCATS FILIP van BERGEN est constamment à la recherche de collaborateurs hautement qualifiés et motivés, prêts à s'engager à fond pour les clients du cabinet en leur apportant conseils et assistance juridique.",
      cta: "Sollicitez?",
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
      accounts: "Comptes bancaires",
      officeAccount: "Compte du cabinet",
      thirdPartyAccount: "Compte de tiers",
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
