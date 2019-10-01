

startGame();

    function startGame(){
        
        var cardNumbers = 16;
            
        
        
         for(var i=0; i <16; i++){
            var card = document.getElementById("card" + i);
            card.style.left = i % 4 === 0 ? 5 + "px" : i % 4 * 105 + 5 + "px";
            card.style.top = i < 4 ? 5 + "px" : i < 8 ? 125 + "px" : i < 12 ? 250 + "px" : 375 + "px";
}
}


            
  /* (var i=); i <32; i++){
            var card = document.getElementById("card" + i);
            card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
            card.style.top = i < 8 ? 5 + "px" : i < 16 ? 180 + "px" : i < 24 ? 355 + "px" : 530 + "px"; //positionig the cards
         */
    