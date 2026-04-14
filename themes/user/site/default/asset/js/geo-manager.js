document.addEventListener("DOMContentLoaded", function (event) {
  const sessionRegion = sessionStorage.getItem("region");
  const sessionCity = sessionStorage.getItem("city");
  const sessionStatus = sessionStorage.getItem("status");

  if (!sessionRegion) {
    let region = "Utrecht";
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(succes, error, options);

      function succes(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        console.log("locatie: ", lat, long);
        let request = new XMLHttpRequest();
        request.open(
          "get",
          "https://api.geoapify.com/v1/geocode/reverse?lat=" +
            lat +
            "&lon=" +
            long +
            "&format=json&apiKey=0d51a9ff3f0740c78320b67c7b6668e5",
        );
        request.send();
        request.onload = () => {
          locationvar = JSON.parse(request.response);
          region = locationvar.results[0].state;
          city = locationvar.results[0].city;
          console.log(region, "-", city);

          sessionStorage.setItem("region", region);
          sessionStorage.setItem("city", city);
          sessionStorage.setItem("status", 1);
          setRegion(region, city, "1");
        };
      }
      function error(err) {
        console.log("No GeoLocation", err);
        let request = new XMLHttpRequest();
        request.open("get", "https://ipwhois.app/json/");
        request.send();
        request.onload = () => {
          locationvar = JSON.parse(request.response);
          region = locationvar.region;
          city = locationvar.city;
          console.log(locationvar);

          setRegion(region, city, "2");
        };
      }
    } else {
      setRegion("Utrecht", "Amersfort", "3");
    }
  } else {
    setRegion(sessionRegion, sessionCity, sessionStatus);
  }

  function setRegion(region, city, status) {
    console.log("setRegion", region);
    switch (region) {
      case "North Holland":
        region = "Noord Holland";
        break;
      case "South Holland":
        region = "Zuid Holland";
        break;
      case "Utrecht":
        region = "Utrecht";
        break;
      case "Zeeland":
        region = "Zeeland";
        break;
      case "Sealand":
        region = "Zeeland";
        break;
      case "Limburg":
        region = "Limburg";
        break;
      case "North Brabant":
        region = "Noord Brabant";
        break;
      case "Flevoland":
        region = "Flevoland";
        break;
      case "Drenthe":
        region = "Drenthe";
        break;
      case "Gelderland":
        region = "Gelderland";
        break;
      case "Overijsel":
        region = "Overijsel";
        break;
      case "Groningen":
        region = "Groningen";
        break;
      case "Friesland":
        region = "Friesland";
        break;
      default:
        region = "Gelderland";
    }
    let selector = "";
    let span = document.getElementById("dealer-regio");
    let infoSpan = document.getElementById("dealer-information");
    let selectorElement = document.getElementById("dealer-header");

    if (selectorElement) {
      selector = selectorElement.classList.value;
    }
    console.log("status: ", status);
    while (span.firstChild) {
      span.removeChild(span.firstChild);
    }

    span.appendChild(document.createTextNode(region));
    if (status == 2) {
      infoSpan.appendChild(
        document.createTextNode(
          "Disclaimer, de locatie kan afwijken van uw huidige locatie.",
        ),
      );
    }
    if (status == 3) {
      infoSpan.appendChild(
        document.createTextNode(
          "Helaas konden we uw locatie niet vinden en tonen we de standaardlocatie.",
        ),
      );
    }
    let el = document.querySelectorAll('[data-id = "' + region + '"]');

    for (let i = 0; i < el.length; i++) {
      if (selector) {
        if (el[i].classList.contains(capitalize(selector))) {
          el[i].classList.remove("hidden-dealer");
        }
      } else {
        el[i].classList.remove("hidden-dealer");
      }
    }
  }
});
