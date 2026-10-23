// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
  current_lang: "en",
  autoclear_cookies: true, // default: false
  theme_css:
    "https://haveemeubelen.nl/themes/site_themes/havee/css/cookieconsent.css",
  cookie_name: "cc_havee", // default: 'cc_cookie'
  cookie_expiration: 30, // default: 182
  page_scripts: true, // default: false
  force_consent: true, // default: false

  //auto_language: 'browser',                     // default: null; could also be 'browser' or 'document'
  // autorun: true,                           // default: true
  // delay: 0,                                // default: 0
  // hide_from_bots: false,                   // default: false
  // remove_cookie_tables: false              // default: false
  // cookie_domain: location.hostname,        // default: current domain
  // cookie_path: '/',                        // default: root
  // cookie_same_site: 'Lax',
  // use_rfc_cookie: false,                   // default: false
  // revision: 0,                             // default: 0

  gui_options: {
    consent_modal: {
      layout: "cloud", // box,cloud,bar
      position: "bottom center", // bottom,middle,top + left,right,center
      transition: "slide", // zoom,slide
    },
    settings_modal: {
      layout: "bar", // box,bar
      position: "left", // right,left (available only if bar layout selected)
      transition: "slide", // zoom,slide
    },
  },

  /* End new options added in v2.4 */

  onAccept: function (cookie) {
    console.log("onAccept fired ...");
    //disableBtn('btn2');
    //disableBtn('btn3');

    // Delete line below
    document.getElementById("cookie_val") &&
      (document.getElementById("cookie_val").innerHTML = JSON.stringify(
        cookie,
        null,
        2,
      ));
  },

  onChange: function (cookie, changed_preferences) {
    console.log("onChange fired ...");

    // If analytics category's status was changed ...
    if (changed_preferences.indexOf("analytics") > -1) {
      // If analytics category is disabled ...
      if (!cc.allowedCategory("analytics")) {
        // Disable gtag ...
        console.log("disabling gtag");
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          dataLayer.push(arguments);
        }

        gtag("consent", "default", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
    }

    // Delete line below
    document.getElementById("cookie_val") &&
      (document.getElementById("cookie_val").innerHTML = JSON.stringify(
        cookie,
        null,
        2,
      ));
  },

  languages: {
    en: {
      consent_modal: {
        title: "Cookiemelding",
        description:
          "Haveemeubelen.nl maakt gebruik van verschillende soorten cookies waaronder functionele cookies, prestatie en relevantie cookies en social media cookies. Deze cookies worden onder meer gebruikt om het gebruik van de website te analyseren en te verbeteren. Voor meer informatie over het gebruik van de cookies verwijzen wij u graag naar het cookiebeleid van Havee meubelen.nl. Door verder gebruik van deze website gaat u akkoord met de functionele cookies en de andere gekozen opties.",
        primary_btn: {
          text: "Alle cookies accepteren",
          role: "accept_all", //'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: "Voorkeuren",
          role: "settings", //'settings' or 'accept_necessary'
        },
        revision_message:
          "<br><br> Beste gebruiker, de algemene voorwaarden zijn gewijzigd sinds je laatste bezoek!",
      },
      settings_modal: {
        title: "Cookie instellingen",
        save_settings_btn: "Huidige selectie opslaan",
        accept_all_btn: "Alle cookies accepteren",
        reject_all_btn: "Alle cookies afwijzen",
        close_btn_label: "Sluiten",
        cookie_table_headers: [
          { col1: "Name" },
          { col2: "Domain" },
          { col3: "Expiration" },
        ],
        blocks: [
          {
            title: "Cookie gebruik",
            description:
              "Deze website maakt gebruik van verschillende soorten cookies. Sommige cookies worden geplaatst door diensten van derden die op onze paginas worden weergegeven. Je kunt je toestemming op elk moment wijzigen of intrekken.",
          },
          {
            title: "Enkel noodzakelijke cookies",
            description:
              "Noodzakelijke cookies helpen een website bruikbaarder te maken, door basisfuncties als paginanavigatie en toegang tot beveiligde gedeelten van de website mogelijk te maken. Zonder deze cookies kan de website niet naar behoren werken.",
            toggle: {
              value: "necessary",
              enabled: true,
              readonly: true, //cookie categories with readonly=true are all treated as "necessary cookies"
            },
          },
          {
            title: "Cookies voor analyse en prestaties",
            description:
              "Een goede website is nooit af. Met cookies voor statistieken analyseren we hoe bezoekers onze website gebruiken. Zo ontdekken we wat goed werkt Ã©n wat wij nog beter moeten doen.",
            toggle: {
              value: "analytics",
              enabled: false,
              readonly: false,
            },
            cookie_table: [
              {
                col1: "^_ga",
                col2: "haveemeubelen.nl",
                col3: "description ...",
                is_regex: true,
              },
              {
                col1: "_gid",
                col2: "haveemeubelen.nl",
                col3: "description ...",
              },
              {
                col1: "_my_cookie",
                col2: "haveemeubelen.nl",
                col3: "test cookie with custom path ...",
                path: "/demo", // needed for autoclear cookies
              },
            ],
          },
          {
            title: "Cookies voor Advertentie",
            description:
              "Marketingcookies worden gebruikt om bezoekers te volgen wanneer ze verschillende websites bezoeken. Hun doel is advertenties weergeven die zijn toegesneden op en relevant zijn voor de individuele gebruiker. Deze advertenties worden zo waardevoller voor uitgevers en externe adverteerders.",
            toggle: {
              value: "targeting",
              enabled: false,
              readonly: false,
              reload: "on_disable", // New option in v2.4, check readme.md
            },
            cookie_table: [
              {
                col1: "^_cl", // New option in v2.4: regex (microsoft clarity cookies)
                col2: "yourdomain.com",
                col3: "These cookies are set by microsoft clarity",
                // path: '/',               // New option in v2.4
                is_regex: true, // New option in v2.4
              },
            ],
          },
          {
            title: "Meer informatie",
            description:
              "De informatie op deze website(s) wordt beschikbaar gesteld door Havee Meubelen. Hoewel uiterste zorg wordt besteed om de inhoud van deze site zo compleet, correct, actueel en toegankelijk mogelijk te maken blijft het mogelijk dat informatie is opgenomen die incorrect, incompleet of verouderd is. Aan de geboden informatie kunnen geen rechten worden ontleend en Havee Meubelen is niet aansprakelijk voor de gevolgen van het gebruik, op welke wijze dan ook, van de informatie. Het is mogelijk dat via de internetsite(s) van Havee Meubelen toegang wordt geboden tot internetsites en/of informatiebronnen die door derden worden onderhouden. Havee Meubelen kan evenmin aansprakelijk worden gehouden voor de gevolgen van het gebruik van de informatie op deze internetsites en/of pagina.",
          },
        ],
      },
    },
  },
});

function getLoremIpsum() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
}

// DELETE ALL CONTENT BELOW THIS COMMENT!!!
if (cc.validCookie("cc_cookie")) {
  //if cookie is set => disable buttons
  //disableBtn('btn2');
  //disableBtn('btn3');
}

function disableBtn(id) {
  //document.getElementById(id).disabled = true;
  document.getElementById(id).className = "styled_btn disabled";
}

var darkmode = false;

function toggleDarkmode() {
  if (!darkmode) {
    document.getElementById("theme").innerText = "dark theme";
    document.body.className = "d_mode c_darkmode";
    darkmode = true;
  } else {
    document.getElementById("theme").innerText = "light theme";
    document.body.className = "d_mode";
    darkmode = false;
  }
}
