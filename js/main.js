//?--------------- nav ------------ */

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

//?--------- Carrousel-arrows ---------*/
const queue = document.querySelector('.carrousel-container');
const movies = document.querySelectorAll('.movie');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

//? ---- ---- ---- ---- Event Listener for rightArrow ---- ---- ---- ---- 
rightArrow.addEventListener('click', () => {
    queue.scrollLeft += queue.offsetWidth;

    const indicatorActive = document.querySelector('.pointmark .active');
    if(indicatorActive.nextSibling){
        indicatorActive.nextSibling.classList.add('active');
        indicatorActive.classList.remove('active');
    }
});

//? ---- ---- ---- ---- Event Listener for leftArrow ---- ---- ---- ---- 
leftArrow.addEventListener('click', () => {
    queue.scrollLeft -= queue.offsetWidth;

    const indicatorActive = document.querySelector('.pointmark .active');
    if(indicatorActive.previousSibling){
        indicatorActive.previousSibling.classList.add('active');
        indicatorActive.classList.remove('active');
    }
});

//? ---- ---- ---- ---- Pages-carrousel ---- ---- ---- ---- 
const pageNumber = Math.ceil(movies.length / 5);
for(let i = 0; i < pageNumber; i ++){
    const indicator = document.createElement('button');

    if(i === 0){
        indicator.classList.add('active');
    }

    document.querySelector('.pointmark').appendChild(indicator);
    indicator.addEventListener('click', (e) => {
        queue.scrollLeft = i * queue.offsetWidth;

        document.querySelector('.pointmark .active').classList.remove('active');
        e.target.classList.add('active');
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
window.playPause = function(){
document.getElementById("button").onclick = function(){
    if(document.getElementById("video1").paused){
        document.getElementById("video1").play();
        this.innerHTML ="Pause";
        }else{
            document.getElementById("video1").pause();
            this.innerHTML = "Play";
        }
    }
}
//?------------- INFOButton ----------------------*/
function showHide_Info(show){
    if (document.getElementById){ 
        var el = document.getElementById(show);
        el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    }
}
window.onload = function(){
    showHide_Info('infoMovie');
}