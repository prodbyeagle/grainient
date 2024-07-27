import { hexToRgb, initializeCanvas } from "../src/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gradientCanvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas context could not be retrieved.");
    return;
  }

  // Update UI
  const color1Input = document.getElementById("color1");
  const color2Input = document.getElementById("color2");
  const grainAmountInput = document.getElementById("grainAmount");
  const grainAmountValue = document.getElementById("grainAmountValue");
  const applyButton = document.getElementById("applyButton");
  const resetButton = document.getElementById("resetButton");
  const saveButton = document.getElementById("saveButton");

  // Set initial values
  grainAmountValue.textContent = grainAmountInput.value;

  function applyEffects() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const grainIntensity = parseInt(grainAmountInput.value, 10);

    // Ensure canvas dimensions are set
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Log color values and canvas dimensions
    console.log("Applying gradient with colors:", color1, color2);
    console.log("Canvas dimensions:", canvas.width, canvas.height);

    // Initialize canvas with gradient and grain effect
    try {
      initializeCanvas(canvas, color1, color2, grainIntensity, 45, "linear");
    } catch (error) {
      console.error("Error initializing canvas:", error);
    }

    // Log RGB values of a color for demonstration
    console.log("RGB of #00FF00:", hexToRgb("#00FF00"));
  }

  applyButton.addEventListener("click", applyEffects);

  resetButton.addEventListener("click", () => {
    color1Input.value = "#FF0000";
    color2Input.value = "#0000FF";
    grainAmountInput.value = "10";
    grainAmountValue.textContent = "10";
    applyEffects();
  });

  grainAmountInput.addEventListener("input", () => {
    grainAmountValue.textContent = grainAmountInput.value;
  });

  saveButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "gradient.png";
    link.href = canvas.toDataURL();
    link.click();
  });

  // Apply initial effects
  applyEffects();
});
