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
moveForward();
moveForward();
moveForward();
moveForward();
moveForward();
moveForward();
console.log(figur);
rotation("L");
console.log(figur);
rotation("R");
console.log(figur);
rotation("R");
rotation("R");
console.log(figur);

translateFigur(figur.x, figur.y);

const inputString = "GGGRGLGGRLGRLLGGRGR";
spielfeld.append(figur.element);

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

function translateFigur(x, y) {
  figur.element.style.transform = "translate(" + x + "px ," + y + "px)";
}
