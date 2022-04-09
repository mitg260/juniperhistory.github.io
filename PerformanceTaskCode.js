// variables
var BINGOitemsList = [];
var numItems;
var blankDetected;
var screenId = "selectorScreen";
var dataSet;

// functions
function showItemInputs(items) {
  // shows all list inputs and labels on selectorScreen
  showElement("listNumber1");
  showElement("listNumber2");
  showElement("listNumber3");
  showElement("listNumber4");
  showElement("listNumber5");
  showElement("listNumber6");
  showElement("listNumber7");
  showElement("listNumber8");
  showElement("listNumber9");
  showElement("listInput1");
  showElement("listInput2");
  showElement("listInput3");
  showElement("listInput4");
  showElement("listInput5");
  showElement("listInput6");
  showElement("listInput7");
  showElement("listInput8");
  showElement("listInput9");
  // sets selectorScreen up based on number of inputs
  setText("listTitle", "Input bank of items:");
  hideElement("itemsDropdown");
  hideElement("createInputsButton");
  hideElement("orLabel");
  hideElement("birdCardButton");
  hideElement("stateCardButton");
  if (items == 4) {
    showElement("createCardbutton");
  } else if (items == 5) {
    showElement("createCardbutton");
    showElement("moreItemsButton");
  } else if (items >= 8) {
    showElement("moreItemsButton");
  }
  numItems = items;
}

function createDatasetCard(dataset) {
  numItems = getText("itemsDropdown");
  hideElement("itemsDropdown");
  hideElement("createInputsButton");
  hideElement("orLabel");
  hideElement("birdCardButton");
  hideElement("stateCardButton");
  // sets appropriate card screen
  if (numItems <= 9) {
    setScreen("3x3cardScreen");
  } else if (numItems >=20) {
    setScreen("5x5cardScreen");
  }
  // sets BINGOitemsList to column from specified dataset
  if (dataset == "birds") {
    BINGOitemsList = getColumn("100 Birds of the World","Name");
  } else if (dataset == "states") {
    BINGOitemsList = getColumn("US States","State Name");
  }
  dataSet = dataset;
  randomizeCard(false);
}

function checkInput(listInput) {
  if (getText(listInput) == "") {
    blankDetected = "true";
    setScreen("messageScreen");
    screenId = "messageScreen";
    if (numItems == 4) {
      setText("message", "Please fill out all of the first 8 inputs.");
    } else if (numItems == 5) {
      return true;
    } else if ((numItems == 8 || numItems == 9)) {
      setText("message", "Please fill out all of the first 16 inputs.");
    } else if (numItems == 20) {
      setText("message", "Please fill out all of the first 27 inputs.");
    } else if (numItems >= 24) {
      setText("message", "Please fill out all of the first 30 inputs.");
    }
  } else if (blankDetected == "false") {
    if (numItems <= 9) {
      setScreen("3x3cardScreen");
    } else {
      setScreen("5x5cardScreen");
    }
  }
}

// if necessary, fills out BINGOitemsList then
// selects correct number random items from BINGOitemsList
// to display on card
function randomizeCard(inputsGiven) {
  var tempItem;
  var tempItemNum;
  var cardItemsList = [];
  var numDeletions = 1;
  // resets BINGOitemsList with inputs to create new card if no dataset is used
  if (inputsGiven) {
    BINGOitemsList = [];
    if (numItems == 4) {
      for (var x = 1; x <= 9; x++) {
        appendItem(BINGOitemsList, getText("listInput" + x));
        if (getText("listInput" + x) == "") {
          removeItem(BINGOitemsList, x - numDeletions);
          numDeletions ++;
        }
      }
    } else if (numItems == 5) {
      for (var g = 1; g <= 9; g++) {
        appendItem(BINGOitemsList, getText("listInput" + g));
      }
      if (screenId == "extraItemsScreen") {
        for (g = 10; g <= 21; g++) {
          appendItem(BINGOitemsList, getText("input" + g));
          if (getText("input" + g) == "" && BINGOitemsList.length <= g) {
            removeItem(BINGOitemsList, g - numDeletions);
            numDeletions ++;
          }
        }
      }
    } else if ((numItems == 8 || numItems == 9)) {
      for (var h = 1; h <= 9; h++) {
        appendItem(BINGOitemsList, getText("listInput" + h));
      }
      for (h = 10; h <= 16; h++) {
        appendItem(BINGOitemsList, getText("input" + h));
      }
      if (screenId == "extraItemsScreen") {
        for (h = 17; h <= 21; h++) {
          appendItem(BINGOitemsList, getText("input" + h));
          if (getText("input" + h) == "" && BINGOitemsList.length <= h) {
            removeItem(BINGOitemsList, h - numDeletions);
            numDeletions ++;
          }
        }
      }
    } else if (numItems == 20) {
      for (var j = 1; j <= 9; j++) {
        appendItem(BINGOitemsList, getText("listInput" + j));
      }
      for (j = 10; j <= 27; j++) {
        appendItem(BINGOitemsList, getText("input" + j));
      }
      if (screenId == "extraItemsScreen") {
        for (j = 28; j <= 33; j++) {
          appendItem(BINGOitemsList, getText("input" + j));
          if (getText("input" + j) == "" && BINGOitemsList.length <= j) {
            removeItem(BINGOitemsList, j - numDeletions);
            numDeletions ++;
          }
        }
      }
    } else if (numItems >= 24) {
      for (var k = 1; k <= 9; k++) {
        appendItem(BINGOitemsList, getText("listInput" + k));
      }
      for (k = 10; k <= 30; k++) {
        appendItem(BINGOitemsList, getText("input" + k));
      }
      if (screenId == "extraItemsScreen") {
        for (k = 31; k <= 33; k++) {
          appendItem(BINGOitemsList, getText("input" + k));
          if (getText("input" + k) == "" && BINGOitemsList.length <= k) {
            removeItem(BINGOitemsList, k - numDeletions);
            numDeletions ++;
          }
        }
      }
    }
  }
  // fills cardItemsList just long enough to fill the card spaces
  for (var i = 0; i < numItems; i++) {
    tempItemNum = randomNumber(0, BINGOitemsList.length - 1);
    tempItem = BINGOitemsList[tempItemNum];
    appendItem(cardItemsList, tempItem);
    removeItem(BINGOitemsList, tempItemNum);
  }
  // outputs cardItemsList on the card
  if (numItems == 4) {
    // sets font size of non-free spaces
    setProperty("output1", "font-size", 13);
    setProperty("output3", "font-size", 13);
    setProperty("output7", "font-size", 13);
    setProperty("output9", "font-size", 13);
    // sets font size of free spaces
    setProperty("output2", "font-size", 20);
    setProperty("output4", "font-size", 20);
    setProperty("output5", "font-size", 20);
    setProperty("output6", "font-size", 20);
    setProperty("output8", "font-size", 20);
    // fills out free spaces
    setText("output2", "FREE");
    setText("output4", "FREE");
    setText("output5", "FREE");
    setText("output6", "FREE");
    setText("output8", "FREE");
    // fills out item spaces
    setText("output1", cardItemsList[0]);
    setText("output3", cardItemsList[1]);
    setText("output7", cardItemsList[2]);
    setText("output9", cardItemsList[3]);
  } else if (numItems == 5) {
    //sets font size of non-free spaces
    setProperty("output1", "font-size", 13);
    setProperty("output3", "font-size", 13);
    setProperty("output5", "font-size", 13);
    setProperty("output7", "font-size", 13);
    setProperty("output9", "font-size", 13);
    // sets font size of free spaces
    setProperty("output2", "font-size", 20);
    setProperty("output4", "font-size", 20);
    setProperty("output6", "font-size", 20);
    setProperty("output8", "font-size", 20);
    // fills out free spaces
    setText("output2", "FREE");
    setText("output4", "FREE");
    setText("output6", "FREE");
    setText("output8", "FREE");
    // fills out item spaces
    setText("output1", cardItemsList[0]);
    setText("output3", cardItemsList[1]);
    setText("output5", cardItemsList[2]);
    setText("output7", cardItemsList[3]);
    setText("output9", cardItemsList[4]);
  } else if (numItems == 8) {
    // sets font size of all spaces
    for (i = 1; i <= 9; i++) {
      setProperty("output" + i, "font-size", 13);
    }
    // sets font size of free space
    setProperty("output5", "font-size", 20);
    setText("output5", "FREE");
    // fills out 3x3 grid before free square
    for (i = 1; i <= 4; i++) {
      setText("output" + i, cardItemsList[i - 1]);
    }
    // fills out 3x3 grid after free square
    for (i = 6; i <= 9; i++) {
      setText("output" + i, cardItemsList[i - 2]);
    }
  } else if (numItems == 9) {
    // fills out 3x3 grid
    for (i = 1; i <= 9; i++) {
      setProperty("output" + i, "font-size", 13);
    }
    for (i = 1; i <= 9; i++) {
      setText("output" + i, cardItemsList[i - 1]);
    }
  } else if (numItems == 20) {
    // sets font size of all spaces
    for (i = 1; i <= 25; i++) {
      setProperty("output2-" + i, "font-size", 11);
    }
    // fills out free spaces
    setText("output2-1", "FREE");
    setText("output2-5", "FREE");
    setText("output2-13", "FREE");
    setText("output2-21", "FREE");
    setText("output2-25", "FREE");
    // fills out first line of 5x5 grid
    for (i = 2; i <= 4; i++) {
      setText("output2-" + i, cardItemsList[(i - 2)]);
    }
    // fills out second line of 5x5 grid
    for (i = 6; i <= 10; i++) {
      setText("output2-" + i, cardItemsList[(i - 3)]);
    }
    // fills out third line of 5x5 grid
    for (i = 11; i <= 12; i++) {
      setText("output2-" + i, cardItemsList[(i - 3)]);
    }
    for (i = 14; i <= 15; i++) {
      setText("output2-" + i, cardItemsList[(i - 4)]);
    }
    // fills out fourth line of 5x5 grid
    for (i = 16; i <= 20; i++) {
      setText("output2-" + i, cardItemsList[(i - 4)]);
    }
    // fills out fifth line of 5x5 grid
    for (i = 22; i <= 24; i++) {
      setText("output2-" + i, cardItemsList[(i - 5)]);
    }
  } else if (numItems == 24) {
    // sets font size of all spaces
    for (i = 1; i <= 25; i++) {
      setProperty("output2-" + i, "font-size", 11);
    }
    // fills out free space
    setText("output2-13", "FREE");
    // fills out first and second lines of 5x5 grid
    for (i = 1; i <= 10; i++) {
      setText("output2-" + i, cardItemsList[(i - 1)]);
    }
    // fills out first part of third line before free square of 5x5 grid
    for (i = 11; i <= 12; i++) {
      setText("output2-" + i, cardItemsList[(i - 1)]);
    }
    // fills out second part of third line after free square of 5x5 grid
    for (i = 14; i <= 15; i++) {
      setText("output2-" + i, cardItemsList[(i - 2)]);
    }
    // fills out fourth and fifth lines of 5x5 grid
    for (i = 16; i <= 25; i++) {
      setText("output2-" + i, cardItemsList[(i - 3)]);
    }
  } else if (numItems == 25) {
    // sets font size of all spaces
    for (i = 1; i <= 25; i++) {
      setProperty("output2-" + i, "font-size", 11);
    }
    // fills out all of 5x5 grid
    for (i = 1; i <= 25; i++) {
      setText("output2-" + i, cardItemsList[(i - 1)]);
    }
  }
}

onEvent("createInputsButton", "click", function( ) {
  showItemInputs(getNumber("itemsDropdown"));
});

onEvent("birdCardButton", "click", function( ) {
  createDatasetCard("birds");
});

onEvent("stateCardButton", "click", function( ) {
  createDatasetCard("states");
});

onEvent("moreItemsButton", "click", function( ) {
  setScreen("extraItemsScreen");
  screenId = "extraItemsScreen";
  if (numItems <= 9) {
    showElement("createCardButton2");
  } else if ((numItems >= 20)) {
    showElement("moreItemsButton2");
  }
});

onEvent("moreItemsButton2", "click", function( ) {
  setScreen("moreExtraItemsScreen");
  screenId = "moreExtraItemsScreen";
  showElement("createCardButton3");
});

onEvent("createCardbutton", "click", function( ) {
  blankDetected = "false";
  if (numItems == 4) {
    for (var i = 1; i <= 8; i++) {
      checkInput("listInput" + i);
    }
  } else if ((numItems == 5)) {
    for (var e = 1; e <= 9; e++) {
      checkInput("listInput" + e);
      if (checkInput("listInput" + e)) {
        setText("message", "Please fill out all of the first 9 inputs.");
      }
    }
  } else if (numItems == 8 || numItems == 9) {
    for (var a = 1; a <= 9; a++) {
      checkInput("listInput" + a);
    }
    for (a = 10; a <= 16; a++) {
      checkInput("input" + a);
    }
  } else if (numItems == 20) {
    for (var o = 1; o <= 9; o++) {
      checkInput("listInput" + o);
    }
    for (o = 10; o <= 21; o++) {
      checkInput("input" + o);
    }
    for (o = 22; o <= 27; o++) {
      checkInput("input" + o);
    }
  } else if (numItems >= 24) {
    for (var u = 1; u <= 9; u++) {
      checkInput("listInput" + u);
    }
    for (u = 10; u <= 21; u++) {
      checkInput("input" + u);
    }
    for (u = 22; u <= 30; u++) {
      checkInput("input" + u);
    }
  }
  if (screenId != "messageScreen") {
    randomizeCard(true);
  }
});

onEvent("createCardButton2", "click", function( ) {
  blankDetected = "false";
  if (numItems == 5) {
    checkInput("input10");
    if (checkInput("input10")) {
      setText("message", "Please fill out all of the first 10 inputs.");
    }
  } else if (numItems == 8 || numItems == 9) {
    for (var a = 1; a <= 9; a++) {
      checkInput("listInput" + a);
    }
    for (a = 10; a <= 16; a++) {
      checkInput("input" + a);
    }
  } else if (numItems == 20) {
    for (var o = 1; o <= 9; o++) {
      checkInput("listInput" + o);
    }
    for (o = 10; o <= 21; o++) {
      checkInput("input" + o);
    }
    for (o = 22; o <= 27; o++) {
      checkInput("input" + o);
    }
  } else if (numItems >= 24) {
    for (var u = 1; u <= 9; u++) {
      checkInput("listInput" + u);
    }
    for (u = 10; u <= 21; u++) {
      checkInput("input" + u);
    }
    for (u = 22; u <= 30; u++) {
      checkInput("input" + u);
    }
  }
  if (screenId != "messageScreen") {
    randomizeCard(true);
  }
});

onEvent("createCardButton3", "click", function( ) {
  blankDetected = "false";
  if (numItems == 8 || numItems == 9) {
    for (var a = 1; a <= 9; a++) {
      checkInput("listInput" + a);
    }
    for (a = 10; a <= 16; a++) {
      checkInput("input" + a);
    }
  } else if (numItems == 20) {
    for (var o = 1; o <= 9; o++) {
      checkInput("listInput" + o);
    }
    for (o = 10; o <= 21; o++) {
      checkInput("input" + o);
    }
    for (o = 22; o <= 27; o++) {
      checkInput("input" + o);
    }
  } else if (numItems >= 24) {
    for (var u = 1; u <= 9; u++) {
      checkInput("listInput" + u);
    }
    for (u = 10; u <= 21; u++) {
      checkInput("input" + u);
    }
    for (u = 22; u <= 30; u++) {
      checkInput("input" + u);
    }
  }
  if (screenId != "messageScreen") {
    randomizeCard(true);
  }
});

onEvent("backButton", "click", function( ) {
  setScreen("selectorScreen");
  screenId = "selectorScreen";
});

onEvent("3x3newCardbutton", "click", function( ) {
  if(BINGOitemsList.length > 13) {
    randomizeCard(false);
    if (dataSet == "birds") {
      BINGOitemsList = getColumn("100 Birds of the World","Name");
    } else if (dataSet == "states") {
      BINGOitemsList = getColumn("US States","State Name");
    }
  } else {
    randomizeCard(true);
  }
});

onEvent("5x5newCardbutton", "click", function( ) {
  if(BINGOitemsList.length > 13) {
    randomizeCard(false);
    if (dataSet == "birds") {
      BINGOitemsList = getColumn("100 Birds of the World","Name");
    } else if (dataSet == "states") {
      BINGOitemsList = getColumn("US States","State Name");
    }
  } else {
    randomizeCard(true);
  }
});

onEvent("3x3homeButton", "click", function( ) {
  // shows selectorScreen
  setScreen("selectorScreen");
  screenId = "selectorScreen";
  //resets selectorScreen to original formatting
  for (var i = 1; i <= 9; i++) {
    hideElement("listInput" + i);
  }
  for (i = 1; i <= 9; i++) {
    hideElement("listNumber" + i);
  }
  for (i = 10; i <= 33; i++) {
    setText("input" + i, "");
  }
  setText("listTitle", "Select # of items per card:");
  showElement("itemsDropdown");
  showElement("createInputsButton");
  showElement("orLabel");
  showElement("birdCardButton");
  showElement("stateCardButton");
  hideElement("createCardbutton");
  hideElement("createCardButton2");
  hideElement("createCardButton3");
  hideElement("moreItemsButton");
  hideElement("moreItemsButton2");
});

onEvent("5x5homeButton", "click", function( ) {
  // shows selectorScreen
  setScreen("selectorScreen");
  screenId = "selectorScreen";
  //resets selectorScreen to original formatting
  for (var i = 1; i <= 9; i++) {
    hideElement("listInput" + i);
  }
  for (i = 1; i <= 9; i++) {
    hideElement("listNumber" + i);
  }
  for (i = 10; i <= 33; i++) {
    setText("input" + i, "");
  }
  setText("listTitle", "Select # of items per card:");
  showElement("itemsDropdown");
  showElement("createInputsButton");
  showElement("orLabel");
  showElement("birdCardButton");
  showElement("stateCardButton");
  hideElement("createCardbutton");
  hideElement("createCardButton2");
  hideElement("createCardButton3");
  hideElement("moreItemsButton");
  hideElement("moreItemsButton2");
});
