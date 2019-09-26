/*-----anonimous function to keep a local variables---*/
(function() {
    var matches = 0; // count the hits

    var images = []; //created to add images to the cards

    var flippedCards = [];

    var modalGameOver = document.querySelector("#modalGameOver");
    
    var imgMatchSign = document.querySelector("#imgMatchSign"); // var created to reference the element.

    for (var i = 0; i < 32; i++) {
        var img = {
            src: "img/medium/" + i + ".jpg",
            id: i % 16
        };

        images.push(img);
    }

    startGame(); // calling the funciton to work the function


    function startGame() {
        
        matches = 0; //reset our hit counter so the game can restart again when clicke on gameOver
        
        flippedCards = []; // makes the game start with empty array

        images = randomSort(images); //random function to ramdom the cards inside the board

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");


        for (var i = 0; i < 32; i++) { //for looping to distribute the cards inside the container ---  while is less than 16 will increment 1 by 1 
            // by every indice we will have a var card that reffer a #card (i could use document.getElementById()).

            frontFaces[i].classList.remove("flipped", "match"); //removing the classes to original configuration to restart the match without ant problem.
            backFaces[i].classList.remove("flipped", "match");

            var card = document.querySelector("#card" + i); // #card + i = idcard plus his number on html 
            card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
            card.style.top = i < 8 ? 5 + "px" : i < 16 ? 180 + "px" : i < 24 ? 355 + "px" : 530 + "px"; //positionig the cards

            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('" + images[i].src + "')"; // creates all cards images to mach the pictures

            frontFaces[i].setAttribute("id", images[i].id); // this will match the cards using the id - id will have values from 0-7.
        }


        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click", startGame, false);

    }

    function randomSort(oldArray) {
        // 1 -Math.floor(Math.random()*11);  // Math.floor = round down number - Math.random = random number - *11 will give a integer numbers between 0 and 10.999 + Math.floor = 0 to 10 integer numbers.
        //2 - var arrTest = ["banana", "morango", "maca"]
        //console.log(arrTest.indexOf("banana"));
        //3- console.log(arrTest.lenght()) -- return the number of elements of the array

        var newArray = [];

        while (newArray.length !== oldArray.length) {
            var i = Math.floor(Math.random() * oldArray.length); // this will create an radom number between 0 - 15 because we have 16 cards in the game

            if (newArray.indexOf(oldArray[i]) < 0) {
                newArray.push(oldArray[i]);
            }
        }

        return newArray;
    }

    //to flipp cards and turn only 2 cards.
    function flipCard() {

        //turning only 2 cards
        if (flippedCards.length < 2) {
            var faces = this.getElementsByClassName("face");

            if (faces[0].classList.length > 2) { //bug fix only one click by card

                return; //dont let the cards turn.
            }

            faces[0].classList.toggle("flipped"); //[0] means back face to flipp the card
            faces[1].classList.toggle("flipped"); // [1] front face 

            flippedCards.push(this);

            if (flippedCards.length === 2) { //check if my array already has 2 cards and see if they combine
                if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) { // index [1] and [3] took it from childNode 
                        flippedCards[0].childNodes[1].classList.toggle("match"); 
                        flippedCards[0].childNodes[3].classList.toggle("match");
                        flippedCards[1].childNodes[1].classList.toggle("match");//all cards that combine will receive a class match
                        flippedCards[1].childNodes[3].classList.toggle("match");
                   
                        matchCardSign();
                        
                        
                        matches++; //counter incremented by 1
                        
                        flippedCards = []; //keep array zero
                        
                        if(matches === 16){ // if all cards have been turned or 16 matches 
                            gameOver();//if yes calling gameover function.
                        }
                        
                }

            }

        }else { //arrays [1][3] - console.log = childNode
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];
        }



    }


    //modal function 
    function gameOver() {
        modalGameOver.style.zIndex = 10; //to come the modal screen to the front. z-index
        modalGameOver.addEventListener("click", startGame, false);
    }
    
    
    //match sign function - to appear the data icon when cards match
    function matchCardSign(){
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + "px";  //styling img match to come and go from our screen
        imgMatchSign.style.opacity = 0;
        
        setTimeout(function(){ // restore the initial settings of the hit so when hit again appears again
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + "px";
            imgMatchSign.style.opacity = 1;
        },1500)//1500 miliseconds trasition time
    }
    
}());
