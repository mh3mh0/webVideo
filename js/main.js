//?--------------- nav ------------ */

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

//?--------- Carrousel-arrows ---------*/
const queue = document.querySelector(".carrousel-container");
const movies = document.querySelectorAll(".movie");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

//? ---- ---- ---- ---- Event Listener for rightArrow ---- ---- ---- ----
rightArrow.addEventListener("click", () => {
  queue.scrollLeft += queue.offsetWidth;

  const indicatorActive = document.querySelector(".pointmark .active");
  if (indicatorActive.nextSibling) {
    indicatorActive.nextSibling.classList.add("active");
    indicatorActive.classList.remove("active");
  }
});

//? ---- ---- ---- ---- Event Listener for leftArrow ---- ---- ---- ----
leftArrow.addEventListener("click", () => {
  queue.scrollLeft -= queue.offsetWidth;

  const indicatorActive = document.querySelector(".pointmark .active");
  if (indicatorActive.previousSibling) {
    indicatorActive.previousSibling.classList.add("active");
    indicatorActive.classList.remove("active");
  }
});

//? ---- ---- ---- ---- Pages-carrousel ---- ---- ---- ----
const pageNumber = Math.ceil(movies.length / 5);
for (let i = 0; i < pageNumber; i++) {
  const indicator = document.createElement("button");

  if (i === 0) {
    indicator.classList.add("active");
  }

  document.querySelector(".pointmark").appendChild(indicator);
  indicator.addEventListener("click", (e) => {
    queue.scrollLeft = i * queue.offsetWidth;

    document.querySelector(".pointmark .active").classList.remove("active");
    e.target.classList.add("active");
  });
}

//? ---- ---- ---- ---- Hover ---- ---- ---- ----
/*movies.forEach((movie) =>{
    movie.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget;
        setTimeout(() =>{
            movies.forEach(movie => movie.classList.remove('hover'));
            element.classList.add('hover');
        }, 300);
    });
});

queue.addEventListener('mouseleave', () => {
    movies.forEach(movie => movie.classList.remove('hover'));
})*/

//?--------------------- VideoPlay -----------------------
window.playPause = function () {
  if (document.getElementById("video1").paused) {
    document.getElementById("video1").play();
    document.getElementById("button").innerHTML = "Pause";
  } else {
    document.getElementById("video1").pause();
    document.getElementById("button").innerHTML = "Play";
  }
};
//?------------- INFOButton ----------------------*/
function showHide_Info(show) {
  if (document.getElementById) {
    var el = document.getElementById(show);
    /*el.style.display = (el.style.display == 'none') ? 'block' : 'none';*/
    if (el.style.display == "none") {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }
}

window.onload = function () {
  showHide_Info("infoMovie");
};

//?------------- Button to Up ----------------------*/
document.getElementById("button__up").addEventListener("click", scrollUp);

function scrollUp() {
  var currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0) {
    //window.requestAnimationFrame(scrollUp);
    //window.scrollTo(0, currentScroll - currentScroll / 2);
    window.scrollTo(0, 0);
  }
}

/*buttonUp = document.getElementById("button__Up");

window.onscroll = function () {
  var scroll = document.documentElement.scrollTop;
  if (scroll > 500) {
    buttonUp.style.transform = "scale(1)";
  } else if (scroll < 500) {
    buttonUp.style.transform = "scale(0)";
  }
};
*/
