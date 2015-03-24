$(document).ready(function () {

    'user strict';

    var wordList;

    var fullWordList;

    var currentWord = -1;

    var aciertos = 0;

    var fallos = 0;

    var lastCorrect = false;

    console.log("Document ready");

    readDB(ejercicioUno);




    function ejercicioUno(data) {

        wordList = data;

        fullWordList = wordList.slice();

        setStateOne();

        updateStats();

    }




    function setStateOne() {

        console.log('Enter state 1');

        cleanEvents();

        $('#showTxt').attr('class', '');
        $('#showBtns').attr('class', 'hidden');

        selectNewWord();

        $('#poriginal').text(wordList[currentWord].Spanish);
        $('#ptraducida').text("");

        buttonModeOne();


        function buttonModeOne() {

            $('#dshow').on('click', setStateTwo);

        }

    }


    function setStateTwo() {

        console.log('Enter state 2');

        cleanEvents();

        $('#showTxt').attr('class', 'hidden');
        $('#showBtns').attr('class', '');

        var eusk = wordList[currentWord].Vasque;

        $('#ptraducida').text(eusk);

        buttonModeTwo();


        function buttonModeTwo() {

            $('#bacierto').on('click', function(){aciertos++; lastCorrect = true; updateStats(); setStateOne();});

            $('#bfallo').on('click', function(){fallos++; lastCorrect = false; updateStats(); setStateOne();});

        }

    }

    function cleanEvents() {

        event.stopPropagation();

        $('#dshow').off();
        $('#bacierto').off();
        $('#bfallo').off();

    }


    function selectNewWord() {

        //Check that the word array is not either empty or contains the last used word only (that has to be deleted)

        if (wordList.length > 1) {

            //Check that it is not the first word selection before deleting (no current word yet)
            //Only remove the word if it has been correctly guessed

            if (currentWord > -1 && lastCorrect) {

                wordList.splice(currentWord, 1);

            }

            currentWord = getRandomInt(0, wordList.length - 1);

        } else {


            if (fullWordList.length > 0) {

                // All words have been used, restart list

                wordList = fullWordList;

                currentWord = getRandomInt(0, wordList.length - 1);

            } else {

                console.log("No words available.");

            }
        }

        console.log("array size= " + wordList.length);
        console.log("currentword= " + currentWord);

    }


    function updateStats() {

        $('#dstats').html("Aciertos: " + aciertos + "<br>Fallos: " + fallos);

    }



});
