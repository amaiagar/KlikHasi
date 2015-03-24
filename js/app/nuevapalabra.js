$(document).ready(function () {

    'user strict';

    console.log("Document ready");

    $("#guardar").on("click", saveEntry);


    function saveEntry() {

        var cast = document.getElementById("poriginal").value;

        var eusk = $("#ptraducida")[0].value;

        var newEntry = {};

        newEntry.Vasque = eusk;

        newEntry.Spanish = cast;

        pouchInsert(newEntry);

    }


});
