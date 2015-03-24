'use strict';


function readDB(callback) {

    var idbSupported = false;
    var db;


    if ("indexedDB" in window) {
        idbSupported = true;
    }

    if (idbSupported) {
        var openRequest = indexedDB.open("_pouch_hitzak");

        openRequest.onupgradeneeded = function (e) {
            console.log("Upgrading...");
        }

        openRequest.onsuccess = function (e) {
            console.log("Success!");
            db = e.target.result;

            return getAllData(db, callback);

        }

        openRequest.onerror = function (e) {
            console.log("Error" + e.target.errorCode);
            console.dir(e);
        }
    }

}

function getAllData(db, callback) {

    var transaction =
        db.transaction(['by-sequence'], 'readwrite');
    var store = transaction.objectStore('by-sequence');
    var data = [];

    var request = store.openCursor();
    var request = store.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            // value is the stored object
            data.push(cursor.value);
            // get the next object
            cursor.continue();
        } else {
            // we’ve got all the data now, call
            // a success callback and pass the
            // data object in.

            callback(data);

        }
    };

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function pouchInsert(doc) {

    var db = new PouchDB('hitzak');

    db.post(doc);

}
