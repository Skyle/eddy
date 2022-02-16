const spielfeld = document.getElementById("spielfeld");
const figur = {
  element: document.createElement("div"),
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  ausrichtung: "N",
};
figur.element.style.width = "24px";
figur.element.style.height = "24px";
figur.element.style.backgroundColor = "black";
translateFigur(figur.x, figur.y);
figur.x += 100;
figur.y += 100;
translateFigur(figur.x, figur.y);

spielfeld.append(figur.element);

function moveForward() {
  if (figur.ausrichtung === "N") {
    figur.y - 24;
  } else if (figur.ausrichtung === "S") {
  }
}

function translateFigur(x, y) {
  figur.element.style.transform = "translate(" + x + "px ," + y + "px)";
}
