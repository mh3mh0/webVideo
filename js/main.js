const queue = document.querySelector('.carrousel-container');
const movies = document.querySelector('.movies');

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// ---- ---- ---- Event Listener to rightArrow. ---- ---- ----//
rightArrow.addEventListener('click', () => {
    queue.scrollLeft += queue.offsetWidth;
})