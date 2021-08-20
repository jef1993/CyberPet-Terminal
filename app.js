const { Rabbit, Wolf, Dragon } = require("./pets");
const inquirer = require("inquirer");
const ui = new inquirer.ui.BottomBar();
const { async } = require("rxjs");

///////////////////////////////////////////////////////////////

const app = async function () {
  let myPet;
  let counter;

  const settings = await inquirer.prompt([
    {
      type: "list",
      message: "Pick your pet:",
      name: "type",
      choices: [
        "Rabbit",
        "Wolf",
        "Dragon",
        new inquirer.Separator(),
        "QUIT GAME",
      ],
    },
  ]);

  if (settings.type === "Rabbit") {
    myPet = new Rabbit();
  } else if (settings.type === "Wolf") {
    myPet = new Wolf();
  } else if (settings.type === "Dragon") {
    myPet = new Dragon();
  } else {
    process.exit(1);
  }

  const gameOver = function () {
    clearInterval(counter);
    ui.updateBottomBar("Game Over!\n");
    app();
  };

  const displayStatus = function () {
    ui.updateBottomBar(
      `Happiness: ${myPet.happiness} Hunger: ${myPet.hunger} Thirst: ${myPet.thirst}`
    );
  };

  const game = async function () {
    const chooseAction = await inquirer.prompt([
      {
        type: "list",
        message: "Your action?",
        name: "action",
        choices: ["Play", "Feed", "Give Drink\n"],
      },
    ]);

    if (chooseAction.action === `Play`) {
      myPet.play();
    }
    if (chooseAction.action === `Feed`) {
      myPet.feed();
    }
    if (chooseAction.action === `Give Drink\n`) {
      myPet.giveDrinks();
    }

    if (myPet.hunger <= 0 || myPet.thirst <= 0 || myPet.happiness <= 0) {
      gameOver();
    } else {
      displayStatus();
      game();
    }
  };

  displayStatus();
  counter = setInterval(function () {
    for (let i = 0; i < 3; i++) {
      myPet[Object.keys(myPet)[i]] -= 1;
    }
    if (myPet.hunger <= 0 || myPet.thirst <= 0 || myPet.happiness <= 0) {
      gameOver();
    } else {
      displayStatus();
    }
  }, 1000 * myPet.decayValue);
  game();
};
app();
