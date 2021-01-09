const queue = document.querySelector("carrousel-container");
const movies = document.querySelector("movie");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

// ?---- ---- ---- Event Listener to rightArrow. ---- ---- ----//
rightArrow.addEventListener("click", () => {
    queue.scrollLeft += queue.offsetWidth;
})