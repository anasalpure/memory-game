/*
 * Create a list that holds all of your cards
 * by default card have card class only
 * if it match its pair it have  card and match classes
 * if it open when click it have card and open  class  
 */

var deck  = document.querySelector("ul.deck");
var cards = deck.children;

var stars= document.querySelector("ul.stars").children;
var starsNumber=stars.length;

//number of matched images , end game when reach 8
var matched=0;
var winDiv = document.querySelector("#win");
var notWinDiv = document.querySelector("#notWin");
var replay =document.querySelector("#replay");

var counter=0;
var movesCounterLable= document.querySelector("span.moves");
var restartBitton=document.querySelector(".restart");
var wait=false;
//we need 2 varibles to store 2 cards that user select
var first,secound;


var timer=0;
var timerLabel  = document.querySelector(".timer");

var arr=
[
    "fa-cube",
    "fa-anchor",
    "fa-diamond",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o"
];


//initialize 
init();

/*
for(let card of cards){
    card.addEventListener("click",cardClicked);
}
*/
//add listener 
deck.addEventListener("click",cardClicked); 

//replay button listener
replay.addEventListener("click",restart);
//restart game
restartBitton.addEventListener('click',restart);

// stars rate will go down one star every 30 secound
setTimeout(timerRate(),1000);


function cardClicked(event){
    if(event.target.tagName != 'LI') return;
    // 2 cards unmatched => max wait for 500 milisecoind
    if (wait) return;

    let target =event.target;
    let classes = target.classList;
    /* by default card have card class only
    * we'll show the image card to user
    */
    if(classes.length==1){
        counter++;
        movesCounterLable.textContent=counter + "Moves";
        classes.add("open");
        ifUserSelectFirstCard(target);
    }
    /* card has card and match classes 
    *  then we won't do anything
    */
    else if( classes.contains('match') ){
        return 0;
    }
    /* card has card and open classes 
    *  then we won't do anything
    * and user reclick same card then w'll close this card  and put first =null
    */
    else if(classes.contains('open')){
        classes.remove("open");
        first =null;
    }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function init(){

    let images=[...arr,...arr];
    images=shuffle(images);
    for(let i=0 ; i<images.length ; i++){
        cards[i].children[0].className =`fa ${images[i]}`;

    }

    first=null;
    secound=null;
    starsNumber=stars.length; 
    //reset old timer 
    timer=0;
   //reset old matched cards 
    matched=0;
    winDiv.style.display="none"
    notWinDiv.style.display="flex"
    

  
}


function restart(){
    if(confirm("are you sure ")){
        for(let card of cards){
            if(card.classList.length>1){
                card.classList.remove("open");
                card.classList.remove("match");
            }
        }
        counter=0;
        movesCounterLable.textContent=counter + " Moves";
        //put 3 active stars
        for(let star of stars){
            star.children[0].classList.add("green");
        }
        
        init();
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function compare (){
    let f=first.children[0].className;
    let s=secound.children[0].className;
    if(f==s){
        first.classList.add("match");
        secound.classList.add("match");
        first.classList.remove("open");
        secound.classList.remove("open");
        //check if user win
        isPassed();
        first = null;
        secound = null;
    }
    else{
        wait=true;
        first.classList.add("shake");
        secound.classList.add("shake");
        setTimeout( function(){
           
                first.classList.remove("open");
                first.classList.remove("shake");
                first = null;
            
                secound.classList.remove("open");
                secound.classList.remove("shake");
                secound = null
            
            wait=false;
        }
        ,500);
   } 

}

function ifUserSelectFirstCard(card){
    if(first == null){
         first=card;
    }
    else{
         secound=card;
         secound.classList.add("open");
    }
    if(secound != null)
        compare();
}

function isPassed(){
  matched ++;
  if(matched==8){
      let currentStar=starsNumber;
      let currentMoves=counter;
      let currentTime=timer;
      let winMessage=` with ${currentMoves} moves <br> and ${currentStar} stars<br> and ${currentTime} secounds  <br> woooooooooo! <br> `;

      document.querySelector("#message").innerHTML=winMessage;

      winDiv.style.display="flex";
      notWinDiv.style.display="none";
      
  }
}

function timerRate(){
    timer++;
    timerLabel.textContent= timer+" sec";

    if( timer%30==0 && timer <=90 ){
        starsNumber--;
        stars[starsNumber].children[0].classList.remove("green");
    }

    setTimeout(timerRate,1000);
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
