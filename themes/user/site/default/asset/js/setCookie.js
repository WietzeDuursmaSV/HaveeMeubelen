document.addEventListener("DOMContentLoaded", function (event) {
  //get cookie
  let newView;
  let valueView = getCookie("view");
  let valueViewObj;
  let checkObj;

  if (valueView) {
    valueViewObj = JSON.parse(valueView);
    checkObj = JSON.parse(valueView);
    showViewed(valueViewObj);
  }
  console.log(" setCookie.js loaded");
  const model = document.getElementById("modelName");
  const img = document.getElementById("product-image");
  const newModel = model.dataset.id;
  const newUrl = model.dataset.url;
  const newImage = img.dataset.img;

  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  if (valueView !== "") {
    let newArray = { model: newModel, image: newImage, url: newUrl };
    let stringifyArray = JSON.stringify(newArray);
    let newObj = JSON.parse(stringifyArray);
    valueViewObj.unshift(newObj);
    valueViewObj.length > 5 ? (valueViewObj.length = 5) : valueViewObj.length;
    newView = JSON.stringify(valueViewObj);
    alreadyInView(newModel)
      ? true
      : (document.cookie = "view=" + newView + ";" + expires + ";path=/");
  } else {
    let array = [{ model: newModel, image: newImage, url: newUrl }];
    let stringifyArray = JSON.stringify(array);
    newView = stringifyArray;
    document.cookie = "view=" + newView + ";" + expires + ";path=/";
  }

  //document.cookie = "view=" + newView ;

  function getCookie(cname) {
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
  function alreadyInView(model) {
    return checkObj.some(function (el) {
      return el.model === model;
    });
  }

  function showViewed(Objview) {
    let contentView = "";
    if (Objview) {
      for (let i = 0; i < Objview.length; i++) {
        contentView += "<a href = " + Objview[i].url + ">";
        contentView +=
          '<div class="viewed-item-container" style="background-image: url(' +
          Objview[i].image +
          '); ">';
        contentView += "</div>";
        contentView += '<div class="viewed-item-label">';
        contentView += Objview[i].model;
        contentView += "</div>";
        contentView += "</a>";
      }
      document.getElementById("viewed-header").innerHTML = "Laatst bekeken:";
    }

    document.getElementById("viewed-container").innerHTML = contentView;
  }
});
