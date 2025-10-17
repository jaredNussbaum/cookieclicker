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

function update_horsie_label() {
  counter_label.innerHTML = `${Math.trunc(counter)} horsies`;
}

button.addEventListener("click", function () {
  counter += 1;
  update_horsie_label();
});

/*setInterval(() => { //constant tick rate
  counter += 1;
  counter_label.innerHTML = `${counter} horsies`;
}, 1000);*/

let horsie_generation = 0;

let lastTime = performance.now();

function calculate_HPS(currentTime: number) { // HPS = horsies per second
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += horsie_generation * deltaTime;
  requestAnimationFrame(calculate_HPS);
  update_horsie_label();
}
requestAnimationFrame(calculate_HPS);
