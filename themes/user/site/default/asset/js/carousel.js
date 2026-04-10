var carouselIndex = 0;

const carousel = () => {
  var x = document.getElementsByClassName("carousel__item");
  if (x.length > 0) {
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
      console.log("Hiding carousel item:", x[i]);
    }
    carouselIndex++;
    if (carouselIndex > x.length) {
      carouselIndex = 1;
    }
    x[carouselIndex - 1].style.display = "block";
    setTimeout(carousel, 10000);
  }
};
carousel();
