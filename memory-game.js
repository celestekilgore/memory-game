/** Memory game: find matching pairs of cards and flip both of them. */

// declaring constants
const gameBoard = document.querySelector(".game");
const score = document.querySelector(".score");
let revealedCount = 0;
score.textContent = revealedCount;
let activeCard = null;
let awaitingEndOfMove = false;

// shuffling colors
const FOUND_MATCH_WAIT_MSECS = 1000;

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
const colors = shuffle(COLORS);

// creating cards using newly shuffled colors
createCards(colors);

function createCards(colors) {
  // for each color in our shuffled colors arr
  for (let color of colors) {
    // create a card
    const card = document.createElement('div');
    // set class to card, and data-color to the color
    card.style.backgroundColor = "white";
    card.classList.add("card");
    card.setAttribute("data-color",color);
    // set revealed to false (so we know it hasn't revealed yet)
    card.setAttribute("data-revealed","false");
    // add event listener so when clicked, handleCardClick is called
    card.addEventListener("click",handleCardClick);
    // add the card to the gameBoard div
    gameBoard.append(card);
  }
}


// Main function

function handleCardClick(event) {
  // get current card and check it has already been revealed
  const currentCard = event.currentTarget;
  const revealed = currentCard.getAttribute("data-revealed");
// prevents anything from happening in between loading or if card is already revealed/clicked
  if (awaitingEndOfMove || revealed === "true" || currentCard === activeCard) {
    return;
  }
  // get the color and change card to that color
  let color = currentCard.getAttribute("data-color");
  currentCard.style.backgroundColor = color;
  //currentCard.style.backgroundColor = color;
  // if there is no active card, make the current card the active
  // and break in order to get the second card on next function call
  if (!activeCard) {
    activeCard = currentCard;
    return;
  }
  awaitingEndOfMove = true;
  // save color of the active card
  const colorToMatch = activeCard.getAttribute("data-color");
  // if the two cards match..
  if (colorToMatch === color) {
    // set them both to revealed
    activeCard.setAttribute("data-revealed","true");
    currentCard.setAttribute("data-revealed","true");
    activeCard.removeEventListener("click", handleCardClick);
    currentCard.removeEventListener("click", handleCardClick);
    // reset the board
    activeCard = null;
    awaitingEndOfMove = false;
    // incrememnt score
    revealedCount += 2;
    score.textContent = revealedCount;
    // check if game is over
    if (revealedCount === COLORS.length) {
      return alert("You win! Press 'Restart' to play again.");
    }
    return;
  }
  // if the two tiles are not a match...

  //prevents more tiles from being clicked on

  // flip cards back around after 1 sec, reset board
  setTimeout(() => {
    currentCard.style.backgroundColor = null;
    activeCard.style.backgroundColor = null;
    awaitingEndOfMove = false;
    activeCard = null;
    },1000);
  return;
}
