// Spielfeld auf dem sich die Figur bewergt
const spielfeld = document.getElementById("spielfeld");
// Alle möglichen Richtungen, in die die Spielfigur schauen kann
const richtungsMoeglichkeiten = ["N", "O", "S", "W"];
// Spielfigur, die sich im Browserfenster bewegt

const figur = {
  element: document.createElement("div"),

  // Die Figur bekommt Koordination, die den Pixeln des Fensters entsprechen

  x: window.innerWidth / 2 - 12,
  y: window.innerHeight / 2 - 12,
  // Der Startwert der Figurausrichtung ist "N"
  ausrichtung: richtungsMoeglichkeiten[0],

  //HilfsFunktion gibt die X-Position zurück
  getPositionX: function () {
    return this.x;
  },
  //HilfsFunktion gibt die Y-Position zurück
  getPositionY: function () {
    return this.y;
  },
};

// Das rudimentäre Design der Figur
figur.element.style.width = "24px";
figur.element.style.height = "24px";
figur.element.style.backgroundColor = "black";
figur.element.style.transitionProperty = "all";
figur.element.style.transitionDuration = "200ms";
figur.element.style.transitionTimingFunction = "ease-in-out";
figur.element.style.zIndex = "10";
// figur.element.style.position = "absolute";

// Die Figur wird dem Spielfeld hinzugefügt
spielfeld.append(figur.element);

// Sorgt dafür, dass alle Positionsänderungen mit dem nächsten Frame abgebildet werden
function update() {
  translateFigur(figur.x, figur.y);
  window.requestAnimationFrame(update);
}
update();

// Animation der Inputsequenz
function animateSequence(sequence) {
  // Aufspaltung der Sequenz in ein Array mit den einzelnen Buchstaben
  const sequenceAsArray = sequence.split("");
  // Wir fangen natürlich mit dem ersten Buchstaben an
  let index = 0;
  // Jede 650 ms wird der nächste Schritt ausgeführt
  const interval = setInterval(() => {
    // Läuft einmal durch das sequenceAsArray
    if (index < sequenceAsArray.length) {
      // Rechts oder links drehen
      if (sequenceAsArray[index] === "R" || sequenceAsArray[index] === "L") {
        rotation(sequenceAsArray[index]);
        // Geradeaus gehen
      } else if (sequenceAsArray[index] === "G") {
        moveForward();
      }
      // Nächster Schritt in sequenceAsArray beim nächsten Interval
      index++;
      // Falls die Sequenz durchlaufen wurde
    } else {
      // Zerstöre das Interval
      clearInterval(interval);
    }
    // Wird alle 650ms aufgerufen
  }, 650);
}

// Die Textsequenz, welche die Bewegungsreihenfolge der Figur bestimmt
let inputString = "GGGLGRG";
// Wir geben den Startschuss!
animateSequence(inputString);

// Rotation um die Ausrichtung unserer Figur zu ändern
function rotation(richtung) {
  const richtungsIndex = richtungsMoeglichkeiten.indexOf(figur.ausrichtung);
  if (richtung === "L") {
    if (richtungsIndex === 0) {
      figur.ausrichtung =
        richtungsMoeglichkeiten[richtungsMoeglichkeiten.length - 1];
    } else {
      figur.ausrichtung = richtungsMoeglichkeiten[richtungsIndex - 1];
    }
  } else if (richtung === "R") {
    if (richtungsIndex === richtungsMoeglichkeiten.length - 1) {
      figur.ausrichtung = richtungsMoeglichkeiten[0];
    } else {
      figur.ausrichtung = richtungsMoeglichkeiten[richtungsIndex + 1];
    }
  }
}

// die runWiggle() Funktion führt die Wiggle Funktion aus .
// Der wiggle-Effekt beinhaltet die Startfunktion und die Endfunktion
// die set Timeout Funktion legt fest wann die End Funktion initialisiert werden soll.
function runWiggle() {
  startWiggle();
  setTimeout(() => {
    endWiggle();
  }, 300);
}

// startWiggle() startet die Wiggle-Funktion

function startWiggle() {
  spielfeld.classList.add("wiggle");
}

// endWiggle() startet die Wiggle-Funktion
function endWiggle() {
  spielfeld.classList.remove("wiggle");
}

// Die Figur wird, abhängig davon in welche Richtung sie schaut,
// einen Schritt nach vorne machen.

function moveForward() {
  if (figur.ausrichtung === "N" && figur.getPositionY() > 0) {
    figur.y -= 24;

    if (figur.getPositionY() < 0) {
      console.log("Danger!!! Du bist an die Grnezen deiner Welt gestoßen!!!");
      runWiggle();
      figur.y = 2;
    }
  } else if (
    figur.ausrichtung === "S" &&
    figur.getPositionY() < window.innerHeight
  ) {
    figur.y += 24;

    if (figur.getPositionY() > window.innerHeight - 12) {
      console.log("Danger!!! Du bist an die Grnezen deiner Welt gestoßen!!!");
      runWiggle();
      figur.y = window.innerHeight - 26;
    }
  } else if (figur.ausrichtung === "W" && figur.getPositionX() > 0) {
    figur.x -= 24;
    if (figur.getPositionX() < 0) {
      console.log("Danger!!! Du bist an die Grnezen deiner Welt gestoßen!!!");
      runWiggle();
      figur.x = 2;
    }
  } else if (
    figur.ausrichtung === "O" &&
    figur.getPositionX() < window.innerWidth
  ) {
    figur.x += 24;
    if (figur.getPositionX() > window.innerWidth - 12) {
      console.log("Danger!!! Du bist an die Grnezen deiner Welt gestoßen!!!");
      runWiggle();
      console.log(figur.getPositionY());
      console.log(figur.getPositionX());
      figur.x = window.innerWidth - 26;
    }
  }
}

// Die Bewegung unserer Figur erfolgt über CSS transform translate
function translateFigur(x, y) {
  figur.element.style.transform = "translate(" + x + "px ," + y + "px)";
}

// Hinzufügen des KeyEventListeners
document.addEventListener("keydown", (e) => {
  //Pfeil Up-Taste
  if (e.key === "ArrowUp") {
    moveForward();
    //Pfeil Pfeil-Right-Taste
  } else if (e.key === "ArrowRight") {
    rotation("R");
    // Pfeil-Left-Taste
  } else if (e.key === "ArrowLeft") {
    rotation("L");
  }
});

//selektiert das P-Tag aus dem DOM und speichtert es in der Variable p
const p = document.querySelector("p");

// füge vordefinierte class aus style.css hinzu der Variablen p hinzu
p.classList.add("p");

// fügt der Variablen p einen Text-Content hinzu

p.textContent =
  "Willkommen bei 'Eddy:s Robot Walk'! Du kannst Eddy über die Texteingabe und die Pfeiltasten bewegen!";

// erstellt ein input-Tag und speichert es in der Variablen input
const input = document.createElement("input");
// füge vordefinierte class aus style.css hinzu der Variablen p hinzu
input.classList.add("command-line");
//fügt dem input-Element die Eigenschaft text hinzu
input.type = "text";
//fügt dem input-Element die Eigenschaft placeholder hinzu
input.placeholder = "z.B GLRGGLG";
//fügt dem input-Element die Eigenschaft lable hinzu
input.labels = "Texteingabe";
//fügt das input als Kind von dem Tag-p im DOM an
p.appendChild(input);

// erstellt einen Tag p und fügt es der variablen help hinzu
const help = document.createElement("p");
help.classList.add("help");

input.addEventListener("focusin", (e) => {
  help.innerHTML =
    "G => ein Schritt geradeaus <br> R => Eddy dreht sich nach rechts <br> L => Eddy dreht sich nach links <br>";
  p.appendChild(help);
  gsap.from(".help", { duration: 1, y: "100%", ease: "bounce" });
});

input.addEventListener("focusout", (e) => {
  const p = e.target.parentElement;
  help.textContent = "";
});

// let showHelpText =
//   "G => ein Schritt geradeaus <br> R => Eddy dreht sich nach rechts <br> L => Eddy dreht sich nach links <br>";

// const help = document.forms["input"];

// help.addEventListener("click", (e) => {
//   // e.preventDefault();
//   console.log("ficker");
//   // e.innerHTML += showHelpText;
// });

// showText();
// input.addEventListener("mouseout", (e) => {
//   if (e) {
//     e.preventDefault();
//     p.innerHTML += commandLine;
//     console.log("Fick Dich");
//   }
// });

const regex = /^[GLR]*$/;

//das input, dass den roboter bewegen soll
const inputMoveRobot = document.querySelector("input");
inputMoveRobot.value = inputString;

//added the event for listening on enter and if regex matches the input.value
inputMoveRobot.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log(inputMoveRobot.value);

    if (inputMoveRobot.value.match(regex)) {
      // reassign the inputstring with the value
      inputString = inputMoveRobot.value;
      //reactivate the sequence
      animateSequence(inputString);
    } else {
      alert("Falsche Eingabe Buddy!");
    }
  }
});
