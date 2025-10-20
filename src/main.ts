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

let HPS: number = 0;
const HPS_display = document.createElement("div");
HPS_display.style.fontSize = "24px";
HPS_display.style.marginTop = "10px";
HPS_display.innerHTML = `+ ${HPS} Horsies per Second`;
document.body.appendChild(HPS_display);

function update_horsie_label() {
  counter_label.innerHTML = `${Math.trunc(counter)} horsies`;
  upadate_HPS();
}

button.addEventListener("click", function () {
  counter += 1;
  update_horsie_label();
  check_horsie_upgrades();
});

const horsie_exponent = 1.25;
let horsie_generation = 0;

interface item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
  button?: HTMLButtonElement;
}

const upgrades: item[] = [
  {
    name: "Horsies",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "Purchase 1 singular Horsie",
    button,
  },
  {
    name: "Stable",
    cost: 100,
    rate: 1,
    count: 0,
    description: "House your Horsies",
    button,
  },
  {
    name: "Horse Farm",
    cost: 300,
    rate: 3,
    count: 0,
    description: "A pasture where Horsies can roam",
    button,
  },
  {
    name: "Racetrack",
    cost: 500,
    rate: 7,
    count: 0,
    description: "A place for Horsies to run and thrive!",
    button,
  },
  {
    name: "Glue Factory",
    cost: 1500,
    rate: 20,
    count: 0,
    description: "The ultimate fate of all Horsies",
    button,
  },
  {
    name: "Horsie Heavens",
    cost: 4000,
    rate: 50,
    count: 0,
    description: "Fly high Horsies!",
    button,
  },
];

upgrades.forEach((item) => {
  const item_button = document.createElement("button");
  item_button.innerHTML =
    `Buy ${item.name} (+${item.rate} HPS), <b>Cost: ${item.cost}`;
  item_button.style.display = "block";
  item_button.style.marginTop = "48px";
  item_button.disabled = true;
  document.body.appendChild(item_button);

  const description = document.createElement("div");
  description.style.fontSize = "16px";
  description.style.marginBottom = "12px";
  description.innerHTML = item.description;
  document.body.appendChild(description);

  item.button = item_button;
  item_button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count += 1;
      horsie_generation += item.rate;
      item.cost = Math.trunc(item.cost * horsie_exponent);
      update_horsie_label();
      check_horsie_upgrades();
      item_button.innerHTML =
        `Buy ${item.name} (+${item.rate} HPS), <b>Cost: ${item.cost}`;
    }
  });
});

function check_horsie_upgrades() {
  upgrades.forEach((item) => {
    if (counter >= item.cost) {
      if (item.button) item.button.disabled = false;
    } else {
      if (item.button) item.button.disabled = true;
    }
  });
}

function upadate_HPS() {
  HPS = horsie_generation;
  HPS_display.innerHTML = `+ ${Math.round(HPS * 10) / 10} Horsies per Second`; // found on stack overflow, rounding algo
}

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
