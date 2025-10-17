import "./style.css";

const button = document.createElement("button");
button.innerHTML = "🐴";
button.style.fontSize = "96px";
document.body.appendChild(button);

let counter: number = 0;
const counter_label = document.createElement("div");
counter_label.style.fontSize = "48px";
counter_label.style.marginTop = "10px";
counter_label.innerHTML = `${counter} horsies`;
document.body.appendChild(counter_label);

button.addEventListener("click", function () {
  counter += 1;
  counter_label.innerHTML = `${counter} horsies`;
});

setInterval(() => { //constant tick rate
  counter += 1;
  counter_label.innerHTML = `${counter} horsies`;
}, 1000);
