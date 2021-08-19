const rabbit = document.querySelector("#rabbit");
const game = document.querySelector(".game");
const gameOver = document.querySelector(".game-over");
const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const menu = document.querySelector(".menu");
const radio = document.querySelectorAll(".radio");
const type = document.querySelector(".type");
const btnsChildren = document.querySelectorAll(".btns *");
const values = document.querySelectorAll(".value");

// Parent class
class Animal {
  constructor(happiness = 50, hunger = 50, thirst = 50, decayValue = 5) {
    (this.happiness = happiness),
      (this.hunger = hunger),
      (this.thirst = thirst),
      (this.decayValue = decayValue);
  }

  setValueAll(values) {
    for (let i = 0; i < Object.keys(this).length - 1; i++) {
      values[i] >= 0
        ? this[Object.keys(this)[i]] + values[i] >= 100
          ? (this[Object.keys(this)[i]] = 100)
          : (this[Object.keys(this)[i]] += values[i])
        : this[Object.keys(this)[i]] + values[i] <= 0
        ? (this[Object.keys(this)[i]] = 0)
        : (this[Object.keys(this)[i]] += values[i]);
    }
  }

  play(happiness = 10, hunger = -2, thrist = -2) {
    this.setValueAll([happiness, hunger, thrist]);
  }

  feed(happiness = 2, hunger = 10, thrist = -2) {
    this.setValueAll([happiness, hunger, thrist]);
  }

  giveDrinks(happiness = -2, hunger = -2, thrist = 10) {
    this.setValueAll([happiness, hunger, thrist]);
  }
}

// sub-classes of Animal
class Rabbit extends Animal {
  constructor(hunger, thirst, happiness, decayValue) {
    super(hunger, thirst, happiness, decayValue);
  }

  play() {
    super.play();
  }

  feed() {
    super.feed();
  }

  giveDrinks() {
    super.giveDrinks();
  }
}

class Wolf extends Animal {
  constructor(hunger, thirst, happiness, decayValue = 3) {
    super(hunger, thirst, happiness, decayValue);
  }
  play() {
    super.play(9, -3, -3);
  }

  feed() {
    super.feed(2, 9, -4);
  }

  giveDrinks() {
    super.giveDrinks(-3, -3, 9);
  }
}

class Dragon extends Animal {
  constructor(hunger, thirst, happiness, decayValue = 2) {
    super(hunger, thirst, happiness, decayValue);
  }
  play() {
    super.play(8, -3, -3);
  }

  feed() {
    super.feed(1, 7, -5);
  }

  giveDrinks() {
    super.giveDrinks(-3, -3, 8);
  }
}
///////////////////////////////////////////////////////////////
let currentAnimal;
let myAnimal;
let counter;

// set the default chosen animal
const defaultAnimal = function () {
  currentAnimal = radio[0].value;
  myAnimal = new Rabbit();
  rabbit.checked = "checked";
};

defaultAnimal();

// change my current animal choice by listening on radio button
radio.forEach((el) =>
  el.addEventListener("click", function (e) {
    currentAnimal = e.target.value;
    if (currentAnimal === "rabbit") myAnimal = new Rabbit();
    if (currentAnimal === "wolf") myAnimal = new Wolf();
    if (currentAnimal === "dragon") myAnimal = new Dragon();
  })
);

// Check if any of the attribute
const checkStatus = function () {
  if (myAnimal.hunger <= 0 || myAnimal.thirst <= 0 || myAnimal.happiness <= 0) {
    game.classList.toggle("hidden");
    gameOver.classList.toggle("hidden");
    clearInterval(counter);
  }
};

// Updating data of all attributes
const updateData = function () {
  values.forEach(
    (el, i) => (el.innerHTML = myAnimal[Object.keys(myAnimal)[i]])
  );
  checkStatus();
};

// Attributes decrease on idle
const idle = function () {
  for (let i = 0; i < 3; i++) {
    if (myAnimal[Object.keys(myAnimal)[i]] > 0)
      myAnimal[Object.keys(myAnimal)[i]] -= 1;
  }
  updateData();
};

// Add actions to all buttons on game page
btnsChildren.forEach((el, i) =>
  el.addEventListener("click", function () {
    el.classList.contains("play")
      ? myAnimal.play()
      : el.classList.contains("feed")
      ? myAnimal.feed()
      : myAnimal.giveDrinks();
    updateData();
  })
);

// Add actions to start button on main menu
start.addEventListener("click", () => {
  type.innerHTML = currentAnimal;
  updateData();
  game.classList.toggle("hidden");
  menu.classList.toggle("hidden");
  counter = setInterval(idle, 1000 * myAnimal.decayValue);
});

// Add actions to restart button on game over
restart.addEventListener("click", () => {
  defaultAnimal();
  gameOver.classList.toggle("hidden");
  menu.classList.toggle("hidden");
});
