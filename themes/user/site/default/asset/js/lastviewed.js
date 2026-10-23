document.addEventListener("DOMContentLoaded", function (event) {
  //get cookie
  let valueViewhome = getCookiehome("view");
  let valueViewhomeObj;

  if (valueViewhome) {
    valueViewhomeObj = JSON.parse(valueViewhome);
    showViewedhome(valueViewhomeObj);
  }

  function getCookiehome(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function showViewedhome(Objviewhome) {
    let contentView = "";
    console.log("showViewedhome loaded");
    if (Objviewhome) {
      for (let i = 0; i < Objviewhome.length; i++) {
        contentView += "<a href = '/new/model/" + Objviewhome[i].url + "'>";
        contentView +=
          '<div class="viewed-item-container" style="background-image: url(' +
          Objviewhome[i].image +
          '); ">';
        contentView += "</div>";
        contentView += '<div class="viewed-item-label">';
        contentView += Objviewhome[i].model;
        contentView += "</div>";
        contentView += "</a>";
      }
      document.getElementById("viewed-header").innerHTML = "Laatst bekeken:";
    }
    document.getElementById("viewed-container").innerHTML = contentView;
  }
});
