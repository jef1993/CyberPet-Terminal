// const Animal = require("./mainClass");

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

module.exports = {
  Rabbit,
  Wolf,
  Dragon,
};
