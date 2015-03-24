https://github.com/amaiagar/KlikHasi.git$(document).ready(function () {


    'use strict';

    console.log("document ready");

    readDB(fillList);


    function fillList(data) {

        var newHtml;

        for (var key in data) {

            var eusk = data[key].Vasque;

            var cast = data[key].Spanish;

            newHtml = newHtml + '<tr><td>' + eusk + '</td><td>' + cast + '</td></tr>';

        }

        $('tbody').append(newHtml);

    }


});
