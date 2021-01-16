var bd;

function iniciar(){
    var boton = document.getElementById('recording');
    var recuperar = document.getElementById('recuperar');
    var deleteKey = document.getElementById('deleteKey');
    var showKey = document.getElementById('showKey');
    var deleteAll = document.getElementById('deleteAll');

    /*showKey.addEventListener('click', recuperarClave, false);*/
    boton.addEventListener('click', agregarObjeto, false);
    recuperar.addEventListener('click', recuperarDatos, false);
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

function recuperarDatos(){
    var zonadatos = document.getElementById('zonadatos');
    zonadatos.innerHTML = '';
    var customerObjectStore = bd.transaction('movies', "readwrite").objectStore('movies');
    customerObjectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor){
            zonadatos.innerHTML += "TITLE: " + cursor.value.title + " --- GENRE: " + cursor.value.genre + " - YEAR: " + cursor.value.year + "<br>";
            cursor.continue();
        }else{
        }
    };
    return false;
}

/*function borrarClave(){
    var isbn = document.getElementsByName('deleteISBN')[0].value;
    var customerObjectStore = bd.transaction('movies', "readwrite").objectStore('movies');
    var request = customerObjectStore.delete(isbn);
    request.onsuccess = function(event){
        alert('Registro borrado en la base de datos');
    };
    return false;
}

function borrarTodo(){
    var request = bd.transaction('movies', "readwrite").objectStore('movies');
    var customerObjectStore = bd.transaction('movies', "readwrite").objectStore('movies');
    customerObjectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result; 
        if(cursor){
            customerObjectStore.delete(cursor.value.isbn);
            cursor.continue();
        }else{
            alert('Todo borrado!');
        }
    };
    return false;

}*/


window.addEventListener('load', iniciar, false);