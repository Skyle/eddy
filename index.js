const spielfeld = document.getElementById("spielfeld");
const richtungsMoeglichkeiten = ["N", "O", "S", "W"];

const figur = {
  element: document.createElement("div"),
  x: window.innerWidth / 2 - 12,
  y: window.innerHeight / 2 - 12,
  ausrichtung: richtungsMoeglichkeiten[0],
};
figur.element.style.width = "24px";
figur.element.style.height = "24px";
figur.element.style.backgroundColor = "black";
figur.element.style.transitionProperty = "all";
figur.element.style.transitionDuration = "200ms";

// Sorgt dafür, dass alle Positionsänderungen mit dem nächsten Frame abgebildet werden
function update() {
  translateFigur(figur.x, figur.y);
  window.requestAnimationFrame(update);
}
update();

const inputString = "GGGRGLGGRGGRGGLGLGGRGR";
spielfeld.append(figur.element);

// Animation der Inputsequenz
function animateSequence(sequence) {
  const sequenceAsArray = sequence.split("");
  let index = 0;
  // Jede 650 ms wird der nächste Schritt ausgeführt
  setInterval(() => {
    // Solange wir noch nicht durch das Array durch sind
    if (index < sequenceAsArray.length) {
      if (sequenceAsArray[index] === "R" || sequenceAsArray[index] === "L") {
        rotation(sequenceAsArray[index]);
      } else if (sequenceAsArray[index] === "G") {
        moveForward();
      }
      index++;
    }
  }, 650);
}
animateSequence(inputString);

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
