//?------------------------------------- Button to Top -----------------------------*/
mybutton = document.getElementById("button__Top");

mybutton.addEventListener("mouseover", function (event) {
  mybutton.style.transform = "scale(2)";
});
mybutton.addEventListener("mouseleave", function (event) {
  mybutton.style.transform = "scale(1)";
});

// When the user scrolls down 20px from the top of the document, show the button
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

//When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
