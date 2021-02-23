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
    let info = document.getElementById(buttonShow);
    if (info.style.display == "block") {
      info.style.display = "none";
    } else {
      info.style.display = "block";
    }
  }
}

//?------------------------------ Recommended Area -----------------------------------*/
//?------------------------- Carrousel-arrows --------------------------
const queue = document.querySelector(".carrouselContainer__items");
const movies = document.querySelectorAll(".movie");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

//? -------------------------- Event Listener for leftArrow -------------
leftArrow &&
  leftArrow.addEventListener("click", () => {
    queue.scrollLeft -= queue.offsetWidth;

    const indicatorActive = document.querySelector(".pointmark .active");
    if (indicatorActive.previousSibling) {
      indicatorActive.previousSibling.classList.add("active");
      indicatorActive.classList.remove("active");
    }
  });
//? ------ Event Listener for rightArrow ----------
rightArrow &&
  rightArrow.addEventListener("click", () => {
    queue.scrollLeft += queue.offsetWidth;

    const indicatorActive = document.querySelector(".pointmark .active");
    if (indicatorActive.nextSibling) {
      indicatorActive.nextSibling.classList.add("active");
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

function start() {
  var button = document.getElementById("recording");
  var recovery = document.getElementById("recovery");

  button.addEventListener("click", addObject, false);
  recovery.addEventListener("click", dataRecovery, false);

  var request = indexedDB.open("midb2", 6);

  request.onsuccess = function (e) {
    bd = e.target.result;
  };

  request.onupgradeneeded = function (e) {
    bd = e.target.result;
    bd.createObjectStore("movies", { keyPath: "title" });
  };
}

function addObject(event) {
  event.preventDefault();
  var title = document.getElementsByName("title")[0].value;
  var genre = document.getElementsByName("genre")[0].value;
  var year = document.getElementsByName("year")[0].value;

  var movies = { title: title, genre: genre, year: year };
  var customerObjectStore = bd
    .transaction("movies", "readwrite")
    .objectStore("movies");

  customerObjectStore.add(movies);

  swal("Great", "Movie added into the list", "success");

  document.getElementsByName("title")[0].value = "";
  document.getElementsByName("genre")[0].value = "";
  document.getElementsByName("year")[0].value = "";

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

  var tblBody = document.createElement("tbody");
  tableData.setAttribute("border", "11");
  tableData.appendChild(tblBody);

  customerObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      var textCell1 = document.createTextNode(cursor.value.title);
      cell1.appendChild(textCell1);
      row.appendChild(cell1);

      var cell2 = document.createElement("td");
      var textCell2 = document.createTextNode(cursor.value.genre);
      cell2.appendChild(textCell2);
      row.appendChild(cell2);

      var cell3 = document.createElement("td");
      var textCell3 = document.createTextNode(cursor.value.year);
      cell3.appendChild(textCell3);
      row.appendChild(cell3);

      tblBody.appendChild(row);
      cursor.continue();
    } else {
    }
  };
  return false;
}

window.addEventListener("load", start, false);

function showHide_data(recovery) {
  if (document.getElementById) {
    let board = document.getElementById(recovery);
    if (board && board.style.display == "block") {
      board.style.display = "none";
    } else {
      board.style.display = "block";
    }
  }
}

window.onload = function () {
  showHide_data("recovery");
};
