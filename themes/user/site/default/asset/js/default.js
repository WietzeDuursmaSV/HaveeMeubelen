function closeNotification() {
  document.getElementById("topNotification").classList.remove("vissible");
  sessionStorage.setItem("notification", true);
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function toggleInfo(e) {
  let content = document.getElementById("content-" + e);
  let icon = document.getElementById("icon-" + e);

  if (content.classList.contains("open")) {
    content.classList.remove("open");
    icon.classList.add("icofont-plus");
    icon.classList.remove("icofont-minus");
  } else {
    content.classList.add("open");
    icon.classList.remove("icofont-plus");
    icon.classList.add("icofont-minus");
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  let enableNotification = true; // to enable/disable notification
  let notification = sessionStorage.getItem("notification");

  if (notification || !enableNotification) {
    document.getElementById("topNotification").classList.remove("vissible");
  } else {
    setTimeout(function () {
      document.getElementById("topNotification").classList.add("vissible");
    }, 1500);
  }
});
function changeImage(img) {
  const productImage = document.getElementById("product-image");
  productImage.setAttribute("style", "background-image: url(" + img + ");");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function changeProjectImage(img, target) {
  const projectImage = document.getElementById(target);
  projectImage.setAttribute("style", "background-image: url(" + img + ");");
}
function mobileSearch() {
  document.getElementById("search").classList.toggle("vissible");
}
function changeColor(el) {
  const ctaId = document.getElementById("ctaId");
  ctaId.setAttribute("style", "background-color:" + el.id + ";");
}
function showValTop(newVal) {
  badgeTextTop = document.getElementById("badgeText");
  leftValue = document.getElementById("leftValue").value;
  badgeTextTop.setAttribute(
    "style",
    "left:" + leftValue + "px; top:" + newVal + "px;",
  );
}
function showValLeft(newVal) {
  badgeTextLeft = document.getElementById("badgeText");
  topValue = document.getElementById("topValue").value;
  badgeTextLeft.setAttribute(
    "style",
    "left:" + newVal + "px; top:" + topValue + "px;",
  );
}
function editBadge(text) {
  document.getElementById("badgeText").innerHTML = text;
}
