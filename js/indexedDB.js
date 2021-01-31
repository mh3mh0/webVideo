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
  var tblBody = document.createElement("tbody");
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
