var bd;

function iniciar(){
    var boton = document.getElementById('recording');
    var recovery = document.getElementById('recovery');
    var deleteKey = document.getElementById('deleteKey');
    var showKey = document.getElementById('showKey');
    var deleteAll = document.getElementById('deleteAll');

    /*showKey.addEventListener('click', recuperarClave, false);*/
    boton.addEventListener('click', agregarObjeto, false);
    recovery.addEventListener('click', dataRecovery, false);
    /*deleteKey.addEventListener('click', borrarClave, false);*/
    /*deleteAll.addEventListener('click', borrarTodo, false);*/

    var solicitud = indexedDB.open('midb2', 6); // solicitando BS y nombre

    solicitud.onsuccess = function(e){
        bd = e.target.result;
    }

    solicitud.onupgradeneeded = function(e){
        bd = e.target.result;
        bd.createObjectStore('movies', {keyPath: 'title'});
    }
}

function agregarObjeto(){
    var title = document.getElementsByName('title')[0].value;
    var genre = document.getElementsByName('genre')[0].value;
    var year = document.getElementsByName('year')[0].value;

    var movies = {title: title, genre: genre, year: year};
    var customerObjectStore = bd.transaction('movies', "readwrite").objectStore('movies');

    customerObjectStore.add(movies);
    alert('Movie added into the list');
    return false;
}

function dataRecovery(){
    var dataShown = document.getElementById('dataShown');
    dataShown.innerHTML = '';
    var customerObjectStore = bd.transaction('movies', "readwrite").objectStore('movies');
    customerObjectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor){
            dataShown.innerHTML += "TITLE: " + cursor.value.title + " --- GENRE: " + cursor.value.genre + " - YEAR: " + cursor.value.year + "<br>";
            cursor.continue();
        }else{
        }
    };
    return false;
}

window.addEventListener('load', iniciar, false);