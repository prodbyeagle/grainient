import { Gradient, applyGrain } from "../dist/esm/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("testCanvas");
  const ctx = canvas.getContext("2d");
  const colorContainer = document.getElementById("colorContainer");

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(
      "Canvas element not found or not an instance of HTMLCanvasElement"
    );
  }

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  function resizeCanvas() {
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      applySettings();
    } else {
      console.error("Canvas container not found.");
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function getRandomPastelColor() {
    const r = Math.floor(Math.random() * 128) + 127;
    const g = Math.floor(Math.random() * 128) + 127;
    const b = Math.floor(Math.random() * 128) + 127;
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  const MAX_COLORS = 8;

  function createColorInput(color = getRandomPastelColor()) {
    const container = document.createElement("div");
    container.className =
      "color-picker relative rounded-lg p-2 flex items-center";

    const colorBox = document.createElement("div");
    colorBox.className = "w-16 h-16 border border-gray-600 rounded-lg";
    colorBox.style.backgroundColor = color;

    const input = document.createElement("input");
    input.type = "color";
    input.value = color;
    input.className =
      "absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer";

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&times;";
    removeButton.className =
      "absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-300";
    removeButton.onclick = () => {
      container.remove();
      updateColorInputLimit();
    };

    container.appendChild(colorBox);
    container.appendChild(input);
    container.appendChild(removeButton);

    input.addEventListener("input", (event) => {
      const newColor = event.target.value;
      colorBox.style.backgroundColor = newColor;
    });
    return container;
  }

  function updateButtonStyle(button, isDisabled) {
    if (isDisabled) {
      button.className =
        "bg-gray-700 text-white p-2 rounded-lg transition duration-300 opacity-60 cursor-not-allowed";
    } else {
      button.className =
        "bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-300";
    }
  }

  function updateColorInputLimit() {
    const colorInputs = document.querySelectorAll(
      "#colorContainer .color-picker"
    );
    const addColorButton = document.getElementById("addColorButton");

    if (colorInputs.length >= MAX_COLORS) {
      updateButtonStyle(addColorButton, true);
      addColorButton.disabled = true;
    } else {
      updateButtonStyle(addColorButton, false);
      addColorButton.disabled = false;
    }
  }

  updateColorInputLimit();

  function applySettings() {
    const colors = Array.from(
      colorContainer.querySelectorAll('input[type="color"]')
    ).map((input) => input.value).filter(Boolean);

    if (colors.length < 2) {
      return;
    }

    const grainIntensity = parseInt(
      document.getElementById("grainIntensity").value
    );
    const gradientType = document.getElementById("gradientType").value;
    const gradientAngle = parseInt(
      document.getElementById("gradientAngle").value
    );

    const gradientOptions = {
      colors: colors,
      grain: grainIntensity,
      type: gradientType,
      angle: gradientAngle,
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      Gradient(canvas, gradientOptions);
    } catch (error) {
      console.error("Error applying gradient:", error);
    }

    try {
      applyGrain(ctx, canvas.width, canvas.height, grainIntensity);
    } catch (error) {
      console.error("Error applying grain effect:", error);
    }
  }

  function randomizeSettings() {
    const grainIntensity = Math.floor(Math.random() * 26);
    document.getElementById("grainIntensity").value = grainIntensity;

    const gradientType = Math.random() > 0.5 ? "linear" : "radial";
    document.getElementById("gradientType").value = gradientType;

    const gradientAngle = Math.floor(Math.random() * 91);
    document.getElementById("gradientAngle").value = gradientAngle;

    const numColors = Math.min(Math.floor(Math.random() * 4) + 3, MAX_COLORS);
    colorContainer.innerHTML = "";
    for (let i = 0; i < numColors; i++) {
      colorContainer.appendChild(createColorInput());
    }

    updateColorInputLimit();

    applySettings();
  }

  function initializeTryItSection() {
    resizeCanvas();
    randomizeSettings();
  }

  document
    .getElementById("applyButton")
    .addEventListener("click", applySettings);
  document
    .getElementById("randomizeButton")
    .addEventListener("click", randomizeSettings);
  document.getElementById("addColorButton").addEventListener("click", () => {
    const colorInputs = document.querySelectorAll(
      "#colorContainer .color-picker"
    );
    if (colorInputs.length < MAX_COLORS) {
      colorContainer.appendChild(createColorInput());
    }
    updateColorInputLimit();
  });

  initializeTryItSection();

  function generateRandomCircles() {
    const container = document.getElementById("backgroundCircles");

    for (let i = 0; i < 10; i++) {

      const circle = document.createElement("div");
      const size = Math.random() * 200 + 100;

      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.backgroundColor = getRandomPastelColor();
      circle.style.top = `${Math.random() * 100}vh`;
      circle.style.left = `${Math.random() * 100}vw`;


      circle.style.transform = `translate3d(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5
        }px, 0)`;
      circle.style.transition = "transform 0.5s ease-out";

      container.appendChild(circle);
    }
  }


  function handleScroll() {
    const circles = document.querySelectorAll(".background-circles div");
    circles.forEach((circle) => {
      const speed = 0.125;
      const yOffset = window.scrollY * speed;


      circle.style.transform = `translate3d(${circle.style.transform.split(",")[0].split("(")[1]
        }, ${yOffset}px, 0)`;
    });
  }


  generateRandomCircles();
  window.addEventListener("scroll", handleScroll);

  document.getElementById("installCopyButton").addEventListener("click", () => {
    const codeElement = document.getElementById("installCodeBlock");
    const copyButton = document.getElementById("installCopyButton");

    navigator.clipboard
      .writeText(codeElement.textContent.trim())
      .then(() => {
        copyButton.textContent = "Copied!";
        copyButton.disabled = true;

        setTimeout(() => {
          copyButton.textContent = "Copy";
          copyButton.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });

  document.getElementById("usageCopyButton").addEventListener("click", () => {
    const codeElement = document.getElementById("usageCodeBlock");
    const copyButton = document.getElementById("usageCopyButton");

    navigator.clipboard
      .writeText(codeElement.textContent.trim())
      .then(() => {
        copyButton.textContent = "Copied!";
        copyButton.disabled = true;

        setTimeout(() => {
          copyButton.textContent = "Copy";
          copyButton.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });
});
