import "./style.css";

const button = document.createElement("button");
button.innerHTML = "🐴";
button.style.fontSize = "192px";
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
  check_horsie_upgrades();
});

/*setInterval(() => { //constant tick rate
  counter += 1;
  counter_label.innerHTML = `${counter} horsies`;
}, 1000);*/

let horsie_generation = 0;

const upgrade_horsie_button = document.createElement("button");
upgrade_horsie_button.innerHTML = "Upgrade +1 HPS 🐴 (Horsies Per Second)";
upgrade_horsie_button.style.display = "block";
upgrade_horsie_button.style.marginTop = "48px";
upgrade_horsie_button.disabled = true;
document.body.appendChild(upgrade_horsie_button);

const horsie_upgrade_cost = 10;
let num_horsie_upgrades = 0;
const horsies_per_upgrade = 1;

function check_horsie_upgrades() {
  if (counter >= horsie_upgrade_cost) {
    upgrade_horsie_button.disabled = false;
  } else {
    upgrade_horsie_button.disabled = true;
  }
}

upgrade_horsie_button.addEventListener("click", () => {
  if (counter >= horsie_upgrade_cost) {
    num_horsie_upgrades += 1;
    counter -= horsie_upgrade_cost;
    horsie_generation += horsies_per_upgrade;
    check_horsie_upgrades();
    update_horsie_label();
  }
});

let lastTime = performance.now();
function horsie_process(currentTime: number) { // HPS = horsies per second
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += horsie_generation * deltaTime;
  update_horsie_label();
  check_horsie_upgrades();
  requestAnimationFrame(horsie_process);
}

requestAnimationFrame(horsie_process);
