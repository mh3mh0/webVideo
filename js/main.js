//?------------------------------------- nav --------------------------------*/
const headerContainer__toggle = document.querySelector(
  ".headerContainer__toggle"
);
const links = document.querySelector(".navListContainer");

headerContainer__toggle.addEventListener("click", function () {
  links.classList.toggle("show-navListContainer");
});

//?--------------------- VideoPlay --------------------------------------------*/
window.playPause = function () {
  if (document.getElementById("video1").paused) {
    document.getElementById("video1").play();
    document.getElementById("buttonPlay1").innerHTML = "PAUSE";
  } else {
    document.getElementById("video1").pause();
    document.getElementById("buttonPlay1").innerHTML = "PLAY";
  }
};
// //?-------------------- INFOButton --------------------------------------------*/

function showHide_Info(buttonShow) {
  if (document.getElementById) {
    var el = document.getElementById(buttonShow);
    /*el.style.display = (el.style.display == 'none') ? 'block' : 'none';*/
    if (el.style.display == "block") {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }
}
// window.onload = function () {
//   showHide_Info("infoMovie");
// };

//?------------------------------ Recommended Area -----------------------------------*/
//?------------------------- Carrousel-arrows --------------------------
const queue = document.querySelector(".carrouselContainer__items");
const movies = document.querySelectorAll(".movie");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

//? ------ Event Listener for rightArrow ----------
rightArrow.addEventListener("click", () => {
  queue.scrollLeft += queue.offsetWidth;

  const indicatorActive = document.querySelector(".pointmark .active");
  if (indicatorActive.nextSibling) {
    indicatorActive.nextSibling.classList.add("active");
    indicatorActive.classList.remove("active");
  }
});

//? -------------------------- Event Listener for leftArrow -------------
leftArrow.addEventListener("click", () => {
  queue.scrollLeft -= queue.offsetWidth;

  const indicatorActive = document.querySelector(".pointmark .active");
  if (indicatorActive.previousSibling) {
    indicatorActive.previousSibling.classList.add("active");
    indicatorActive.classList.remove("active");
  }
});

//? ---------------------------------- Pages-carrousel -------------------
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

//? ----------------------------------------- indexedDB ---------------------------------*/

var bd;

function iniciar() {
  var boton = document.getElementById("recording");
  var recovery = document.getElementById("recovery");
  var deleteKey = document.getElementById("deleteKey");
  var showKey = document.getElementById("showKey");
  var deleteAll = document.getElementById("deleteAll");

  /*showKey.addEventListener('click', recuperarClave, false);*/
  boton.addEventListener("click", agregarObjeto, false);
  recovery.addEventListener("click", dataRecovery, false);
  /*deleteKey.addEventListener('click', borrarClave, false);*/
  /*deleteAll.addEventListener('click', borrarTodo, false);*/

  var solicitud = indexedDB.open("midb2", 6); // solicitando BS y nombre

  solicitud.onsuccess = function (e) {
    bd = e.target.result;
  };

  solicitud.onupgradeneeded = function (e) {
    bd = e.target.result;
    bd.createObjectStore("movies", { keyPath: "title" });
  };
}

function agregarObjeto(event) {
  event.preventDefault(); //to check¿?
  var title = document.getElementsByName("title")[0].value;
  var genre = document.getElementsByName("genre")[0].value;
  var year = document.getElementsByName("year")[0].value;

  var movies = { title: title, genre: genre, year: year };
  var customerObjectStore = bd
    .transaction("movies", "readwrite")
    .objectStore("movies");

  customerObjectStore.add(movies);
  alert("Movie added into the list");
  document.getElementsByName("title")[0].value = "";
  document.getElementsByName("genre")[0].value = "";
  document.getElementsByName("year")[0].value = "";
  /*if (document.getElementsByName("dataShownTable") != null) {
    dataRecovery();
  }*/
  return false;
}

function dataRecovery() {
  var dataShown = document.getElementById("dataShown");
  dataShown.innerHTML = "";
  var customerObjectStore = bd
    .transaction("movies", "readwrite")
    .objectStore("movies");

  var tableData = document.createElement("table");
  tableData.setAttribute("id", "dataShownTable");
  tableData.setAttribute("class", "dataShown");
  dataShown.appendChild(tableData);

  var header = tableData.createTHead();
  var row = header.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = "<h1>TITLE</h1>";
  cell2.innerHTML = "<h1>GENRE</h1>";
  cell3.innerHTML = "<h1>YEAR</h1>";
  // var textoTitulo1 = document.createTextNode("TITLE");
  // cell1.appendChild(textoTitulo1);

  // var textoTitulo2 = document.createTextNode("GENRE");
  // cell2.appendChild(textoTitulo2);

  // var textoTitulo3 = document.createTextNode("YEAR");
  // cell3.appendChild(textoTitulo3);

  var tblBody = document.createElement("tbody");
  tableData.setAttribute("border", "11");
  tableData.appendChild(tblBody);

  customerObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var hilera = document.createElement("tr");
      var celda1 = document.createElement("td");
      var textoCelda1 = document.createTextNode(cursor.value.title);
      celda1.appendChild(textoCelda1);
      hilera.appendChild(celda1);

      var celda2 = document.createElement("td");
      var textoCelda2 = document.createTextNode(cursor.value.genre);
      celda2.appendChild(textoCelda2);
      hilera.appendChild(celda2);

      var celda3 = document.createElement("td");
      var textoCelda3 = document.createTextNode(cursor.value.year);
      celda3.appendChild(textoCelda3);
      hilera.appendChild(celda3);

      tblBody.appendChild(hilera);
      cursor.continue();
    } else {
    }
  };
  return false;
}

window.addEventListener("load", iniciar, false);

function showHide_data(recovery) {
  if (document.getElementById) {
    var el = document.getElementById(recovery);
    /*el.style.display = (el.style.display == 'none') ? 'block' : 'none';*/
    if (el.style.display == "block") {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }
}

window.onload = function () {
  showHide_data("recovery");
};

//?------------------------------------- Button to Top -----------------------------*/
mybutton = document.getElementById("buttonToTop");

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

// //? ---- ---- ---- ---- Hover ---- ---- ---- ----
// /*movies.forEach((movie) =>{
//     movie.addEventListener('mouseenter', (e) => {
//         const element = e.currentTarget;
//         setTimeout(() =>{
//             movies.forEach(movie => movie.classList.remove('hover'));
//             element.classList.add('hover');
//         }, 300);
//     });
// });

// queue.addEventListener('mouseleave', () => {
//     movies.forEach(movie => movie.classList.remove('hover'));
// })*/
