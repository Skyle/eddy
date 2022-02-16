const spielfeld = document.getElementById("spielfeld");
const figur = {
  element: document.createElement("div"),
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
figur.element.style.width = "24px";
figur.element.style.height = "24px";
figur.element.style.backgroundColor = "black";
console.log(figur);
const translateString = "translate(" + figur.x + "px, " + figur.y + "px);";
console.log(translateString);
figur.element.style.transform =
  "translate(" + figur.x + "px, " + figur.y + "px);";
spielfeld.append(figur.element);
