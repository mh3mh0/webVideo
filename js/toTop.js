//?------------------------------------- Button to Top -----------------------------*/
mybutton = document.getElementById("button__Top");

mybutton.addEventListener("mouseover", function (event) {
  mybutton.style.transform = "scale(2)";
});
mybutton.addEventListener("mouseleave", function (event) {
  mybutton.style.transform = "scale(1)";
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    mybutton.style.transform = "scale(1)";
  } else {
    mybutton.style.transform = "scale(0)";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
