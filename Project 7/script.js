let array = new Array(8).fill(null); 
let secretPattern = [];

window.onload = () => {
  generateSecretPattern();
  renderArray();
};

function renderArray() {
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  array.forEach(val => {
    let div = document.createElement("div");
    div.className = "cell";
    if (val !== null) div.textContent = val;
    container.appendChild(div);
  });
}

function feedback(msg, success = false) {
  const fb = document.getElementById("feedback");
  fb.style.color = success ? "#00ffcc" : "#ff4444";
  fb.textContent = msg;
}

function insert() {
  let idx = parseInt(document.getElementById("indexInput").value);
  let val = parseInt(document.getElementById("valueInput").value);

  if (isNaN(idx) || isNaN(val)) return feedback("Enter valid index and value!");
  if (idx < 0 || idx >= array.length) return feedback("Index out of bounds!");

  for (let i = array.length - 1; i > idx; i--) {
    array[i] = array[i - 1];
  }
  array[idx] = val;
  renderArray();
  feedback(`Inserted ${val} at index ${idx}!`, true);
}

function del() {
  let idx = parseInt(document.getElementById("indexInput").value);
  if (isNaN(idx)) return feedback("Enter a valid index!");
  if (idx < 0 || idx >= array.length) return feedback("Index out of bounds!");

  for (let i = idx; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array[array.length - 1] = null;
  renderArray();
  feedback(`Deleted element at index ${idx}.`, true);
}

function searchPattern() {
  let input = document.getElementById("patternInput").value;
  if (!input) return feedback("Enter a valid pattern (e.g., 1,2,3)");

  let pattern = input.split(",").map(Number);
  let found = false;

  for (let i = 0; i <= array.length - pattern.length; i++) {
    let segment = array.slice(i, i + pattern.length);
    if (JSON.stringify(segment) === JSON.stringify(pattern)) {
      found = true;
      feedback(`Pattern [${pattern}] found at index ${i}!`, true);
      if (JSON.stringify(pattern) === JSON.stringify(secretPattern)) {
        feedback("🎉 Level Complete! You cracked the code!", true);
      }
      break;
    }
  }
  if (!found) feedback(`Pattern [${pattern}] not found.`);
}

function resetArray() {
  array = new Array(8).fill(null);
  renderArray();
  feedback("Array reset!");
}

function generateSecretPattern() {
  secretPattern = Array.from({length: 3}, () => Math.floor(Math.random() * 10));
  document.getElementById("secret").textContent =
    "Secret Pattern: " + secretPattern.join(", ");
}
