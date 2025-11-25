 
const cardImages = [
  // Clubs
  'assets/cards/clubs/clubs-2.svg',
  'assets/cards/clubs/clubs-3.svg',
  'assets/cards/clubs/clubs-4.svg',
  'assets/cards/clubs/clubs-5.svg',
  'assets/cards/clubs/clubs-6.svg',
  'assets/cards/clubs/clubs-7.svg',
  'assets/cards/clubs/clubs-8.svg',
  'assets/cards/clubs/clubs-9.svg',
  'assets/cards/clubs/clubs-10.svg',
  'assets/cards/clubs/clubs-ace.svg',
  'assets/cards/clubs/clubs-jack.svg',
  'assets/cards/clubs/clubs-king.svg',
  'assets/cards/clubs/clubs-queen.svg',

  // Diamonds
  'assets/cards/diamonds/diamonds-2.svg',
  'assets/cards/diamonds/diamonds-3.svg',
  'assets/cards/diamonds/diamonds-4.svg',
  'assets/cards/diamonds/diamonds-5.svg',
  'assets/cards/diamonds/diamonds-6.svg',
  'assets/cards/diamonds/diamonds-7.svg',
  'assets/cards/diamonds/diamonds-8.svg',
  'assets/cards/diamonds/diamonds-9.svg',
  'assets/cards/diamonds/diamonds-10.svg',
  'assets/cards/diamonds/diamonds-ace.svg',
  'assets/cards/diamonds/diamonds-jack.svg',
  'assets/cards/diamonds/diamonds-king.svg',
  'assets/cards/diamonds/diamonds-queen.svg',

  //Hearts
  'assets/cards/hearts/hearts-2.svg',
  'assets/cards/hearts/hearts-3.svg',
  'assets/cards/hearts/hearts-4.svg',
  'assets/cards/hearts/hearts-5.svg',
  'assets/cards/hearts/hearts-6.svg',
  'assets/cards/hearts/hearts-7.svg',
  'assets/cards/hearts/hearts-8.svg',
  'assets/cards/hearts/hearts-9.svg',
  'assets/cards/hearts/hearts-10.svg',
  'assets/cards/hearts/hearts-ace.svg',
  'assets/cards/hearts/hearts-jack.svg',
  'assets/cards/hearts/hearts-king.svg',
  'assets/cards/hearts/hearts-queen.svg',

  // Spades
  'assets/cards/spades/spades-2.svg',
  'assets/cards/spades/spades-3.svg',
  'assets/cards/spades/spades-4.svg',
  'assets/cards/spades/spades-5.svg',
  'assets/cards/spades/spades-6.svg',
  'assets/cards/spades/spades-7.svg',
  'assets/cards/spades/spades-8.svg',
  'assets/cards/spades/spades-9.svg',
  'assets/cards/spades/spades-10.svg',
  'assets/cards/spades/spades-ace.svg',
  'assets/cards/spades/spades-jack.svg',
  'assets/cards/spades/spades-king.svg',
  'assets/cards/spades/spades-queen.svg',
];

const questions=[
    "Red or Black?",
    "Higher or Lower?",
    "Between or Outside?",
    "Guess the Suit",
];

/* save counter in local storage */
const counter = document.getElementById("counter");
counter.innerHTML = parseInt(counter.innerHTML);;
let counting = parseInt(localStorage.getItem("counting")) || 0;



var question = document.getElementById("question");

var card1=document.getElementById("card1");
var card2=document.getElementById("card2");
var card3=document.getElementById("card3");
var card4=document.getElementById("card4");

let deck = [...cardImages]; // copy of the original array

const btnTopLeft = document.getElementById("top-left");
const btnTopRight = document.getElementById("top-right");
const btnBottomLeft = document.getElementById("bottom-left");
const btnBottomRight = document.getElementById("bottom-right");

function clearbuttons(){  /* set the source of button image to nothing --> doesnt appear */
    btnTopLeft.style.backgroundImage = "none";
    btnTopRight.style.backgroundImage = "none";
    btnBottomLeft.style.backgroundImage = "none";
    btnBottomRight.style.backgroundImage = "none";
}
function clear(){
    card1.src = "";
    card2.src = "";
    card3.src = "";
    card4.src = "";
}


/* GAME */
clearbuttons();   /* clear buttons */
clear();          /* clear cards */
first();          /* we call the first phase function */




function draw() {
    if (deck.length === 0) {
        resetDeck();         // auto reset when empty
    }
    let index = Math.floor(Math.random() * deck.length);
    let card = deck[index];
    deck.splice(index, 1);   // remove it so it can't be drawn again
    return card;
}
function resetDeck() {
    deck = [...cardImages];  // refill from the original array
}


function valuate(cardsrc) {
  if (!cardsrc) { throw new Error("valuate(): no card value for src = " + cardsrc); }
  for (let i = 2; i <= 10; i++) {
    if (cardsrc.includes(`-${i}.`)) {
      return i;
    }
  }
  if (cardsrc.includes("jack")){
    return 11;
  }
  else if (cardsrc.includes("queen")){
    return 12;
  }
  else if (cardsrc.includes("king")){
    return 13;
  }
  else if (cardsrc.includes("ace")){
    return 14;
  }
  throw new Error("valuate(): unknown card value for src = " + cardsrc);
}

function suit(cardsrc) {
  if (!cardsrc) { throw new Error("valuate(): no card value for src = " + cardsrc); }
  if (cardsrc.includes("hearts")){
    return "heart";
  }
  else if (cardsrc.includes("clubs")){
    return "club";
  }
  else if (cardsrc.includes("spades")){
    return "spade";
  }
  else if (cardsrc.includes("diamonds")){
    return "diamond";
  }
  throw new Error("valuate(): unknown csuit for src = " + cardsrc);
}

function color(cardsrc) {
  if (!cardsrc) { throw new Error("valuate(): no card value for src = " + cardsrc); }
  if (suit(cardsrc) === "heart" || suit(cardsrc) === "diamond"){
    return "red";
  }
  else if (suit(cardsrc) === "club" || suit(cardsrc) === "spade"){
    return "black";
  }
  throw new Error("valuate(): unknown color for src = " + cardsrc);
}


function first(){

  if (counting > 20) {
    document.body.classList.add("body-shrooms");    // document.body.style.animation = "shrooms 60s linear infinite";
  } 
  else{
    document.body.classList.remove("body-shrooms");
  }

    clearbuttons();
    clear();
    counter.innerHTML = counting;   //eveery time it shows saved counting value
    card1.setAttribute("src", "./assets/cards/card-back.svg");  //set first card to show back
    btnTopLeft.style.backgroundImage = "url('./assets/chips/red_chip.png')";
    btnTopRight.style.backgroundImage = "url('./assets/chips/black_chip.png')"; //set the two buttons
    question.innerHTML = questions[0];  //set the question

    let drawn = draw();
    let drawncolor = color(drawn);
    let colorpick;

    // ⬇ overwrite any old handlers instead of stacking new ones
    btnTopLeft.onclick = () => {
        colorpick = "red";
        handle();
    };
    btnTopRight.onclick = () => {
        colorpick = "black";
        handle();
    };

    function handle(){
        card1.setAttribute("src", drawn);   //shows the first card

        setTimeout(() => {
            if (colorpick === drawncolor) {   //check if drawn color is the picked color --> go to second phase if yes
                second();
            } else {
                first();
                counting++;
                localStorage.setItem("counting", counting);   //calls itself, adds to counter, saves counter
            }
        }, 500); //waits half a second in the beginning so player can understand what happened
    }
   
}

function second(){
    card2.setAttribute("src", "./assets/cards/card-back.svg");
    btnTopLeft.style.backgroundImage = "url('./assets/chips/up.png')";
    btnTopRight.style.backgroundImage = "url('./assets/chips/down.png')";
    question.innerHTML = questions[1];

    let previousnum = valuate(card1.src);
    const drawn = draw();
    let drawnnum = valuate(drawn);
    let where;
    
    btnTopLeft.onclick = () => {
        where = "higher";
        handle2();
    };
    btnTopRight.onclick = () => {
        where = "lower";
        handle2();
    };
  
    function handle2(){
        card2.setAttribute("src", drawn);

        // ⬇ wait before checking the result
        setTimeout(() => {
            if (previousnum >= drawnnum && where === "lower") {
                third();
            }
            else if (previousnum <= drawnnum && where === "higher") {
                third();
            }
            else {
                first();
                counting++;
                localStorage.setItem("counting", counting);
            }
        }, 500); // adjust time if needed
    }

}

function third(){
  card3.setAttribute("src", "./assets/cards/card-back.svg");
  btnTopLeft.style.backgroundImage = "url('./assets/chips/outside.png')";
  btnTopRight.style.backgroundImage = "url('./assets/chips/between.png')";
  question.innerHTML = questions[2];

  let firstnum = valuate(card1.src);
  let secondnum = valuate(card2.src);
  const drawn = draw();
  let drawnnum = valuate(drawn);
  let where;

  btnTopLeft.onclick = () => {
    where = "outside";
    handle3();
  };
  btnTopRight.onclick = () => {
    where = "between";
    handle3();
  };

  
  function handle3(){
    card3.setAttribute("src", drawn);

    if(secondnum < firstnum){     //if second value is higher switch them  eg 10 and 5 --> need to store them this way to compare nicely
      let temp = secondnum;
      secondnum = firstnum;
      firstnum = temp;
    }

    setTimeout(() => {
      if (firstnum <= drawnnum && drawnnum <= secondnum && where === "between") {
        fourth();
      }
      else if (where === "outside" && (firstnum >= drawnnum || secondnum <= drawnnum)) {
        fourth();
      }
      else {
        first();
        counting++;
        localStorage.setItem("counting", counting);
      }
    }, 500); // wait before deciding 
    }
}

function fourth(){
  card4.setAttribute("src", "./assets/cards/card-back.svg");
  btnTopLeft.style.backgroundImage = "url('./assets/chips/heart.png')";
  btnTopRight.style.backgroundImage = "url('./assets/chips/diamond.png')";
  btnBottomLeft.style.backgroundImage = "url('./assets/chips/spade.png')";
  btnBottomRight.style.backgroundImage = "url('./assets/chips/club.png')";
  question.innerHTML = questions[3];

  const drawn = draw();
  const drawnsuit = suit(drawn);   // ✅ drawn is a src string

  let suitpick;

  btnTopLeft.onclick = () => {
    suitpick = "heart";
    handle4();
  };
  btnTopRight.onclick = () => {
    suitpick = "diamond";
    handle4();
  };
  btnBottomLeft.onclick = () => {
    suitpick = "spade";
    handle4();
  };
  btnBottomRight.onclick = () => {
    suitpick = "club";
    handle4();
  };

  function handle4(){
    // reveal the card first
    card4.setAttribute("src", drawn);

    // then wait before deciding
    setTimeout(() => {
      if (suitpick === drawnsuit){
        finish();
      } else {
        first();
        counting++;
        localStorage.setItem("counting", counting);
      }
    }, 500); // same 1s delay as others
  }
}


  function finish() {
    const winEl = document.querySelector('.win');
    if (!winEl) return;

    // show popup and set tries
    winEl.style.display = 'flex';                             //by default it's set to none
    document.getElementById("tries").innerHTML = counting;

    // wire up reset button
    const resetBtnInWin = winEl.querySelector('.reset');
    if (!resetBtnInWin) return;

    resetBtnInWin.addEventListener('click', () => {
      winEl.style.display = 'none';
      counting = 0;

      counter.innerHTML = counting;
      localStorage.setItem("counting", counting);
      first();
    });
}





// JOKER functionality
const jokerCard = document.getElementById('info');
const rulesDiv = document.getElementById('rules');

jokerCard.addEventListener('click', () => {
    rulesDiv.style.display = 'block';       // when joker clicked set the display to block, which means the rules show up//
});

rulesDiv.addEventListener('click', function() {
  rulesDiv.style.display = 'none';   // close the rules overlay when clicking anywhere on it
});

