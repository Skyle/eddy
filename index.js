// Spielfeld auf dem sich die Figur bewergt
const spielfeld = document.getElementById("spielfeld");
// Alle möglichen Richtungen, in die die Spielfigur schauen kann
const richtungsMoeglichkeiten = ["N", "O", "S", "W"];
// Spielfigur, die sich im Browserfenster bewegt

console.log(document.getElementById("spielfeld").offsetWidth);
console.log(document.getElementById("spielfeld").offsetHeight);
console.log(document.body.offsetWidth);
console.log(document.body.offsetHeight);
const figur = {
  element: document.createElement("spieldfeld"),

  // Die Figur bekommt Koordination, die den Pixeln des Fensters entsprechen
  x: document.getElementById("spielfeld").offsetWidth / 2,

  y: document.getElementById("spielfeld").offsetHeight / 2,

  // Der Startwert der Figurausrichtung ist "N"
  ausrichtung: richtungsMoeglichkeiten[0],
};
// alert(document.getElementById("spielfeld").offsetWidth);
console.log(figur.x, "", figur.y);
// Das rudimentäre Design der Figur
figur.element.style.width = "24px";
figur.element.style.height = "24px";
figur.element.style.backgroundColor = "black";
figur.element.style.transitionProperty = "all";
figur.element.style.transitionDuration = "200ms";
figur.element.style.transitionTimingFunction = "ease-in-out";

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

// Die Figur wird, abhängig davon in welche Richtung sie schaut,
// einen Schritt nach vorne machen.
function moveForward() {
  if (figur.ausrichtung === "N") {
    figur.y -= 24;
  } else if (figur.ausrichtung === "S") {
    figur.y += 24;
  } else if (figur.ausrichtung === "W") {
    figur.x -= 24;
  } else if (figur.ausrichtung === "O") {
    figur.x += 24;
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

//erstelle input im header der seite
const header = document.querySelector("header");

// füge vordefinierte class aus style.css hinzu
header.classList.add("header");

//hole zusätzliches div aus dem html für das hinzufügen des inputs ud textes im header
const headerInput = document.querySelector("#header_input");
let commandLine = `<p> Willkommen bei "Eddy's Robot Walk"! Du kannst Eddy über die Texteingabe und die Pfeiltasten bewegen! <br>
                      Texteingabe: <input type="text" placeholder="zB: GLRGGLG" class="command-line"> <br>
                      G => ein Schritt geradeaus <br>
                      R => Eddy dreht sich nach rechts <br>
                      L => Eddy dreht sich nach links <br>
                  </p>
                  `;
header.innerHTML = commandLine;

//definition des regex
const regex = /^[GLR]*$/;

//das input, dass den roboter bewegen soll
const inputMoveRobot = document.querySelector(".command-line");
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
