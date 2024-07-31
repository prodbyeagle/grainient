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
      applySettings(); // Reapply settings when resized
    } else {
      console.error("Canvas container not found.");
    }
  }

  // Set initial canvas size
  resizeCanvas();

  // Resize canvas when the window is resized
  window.addEventListener("resize", resizeCanvas);

  // Function to generate a random pastel color
  function getRandomPastelColor() {
    const r = Math.floor(Math.random() * 128) + 127;
    const g = Math.floor(Math.random() * 128) + 127;
    const b = Math.floor(Math.random() * 128) + 127;
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  function createColorInput(color = getRandomPastelColor()) {
    const container = document.createElement("div");
    container.className = "color-picker flex items-center space-x-2 rounded-md";

    const input = document.createElement("input");
    input.type = "color";
    input.value = color;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&times;";
    removeButton.className =
      "hover:bg-red-500 hover:text-white text-red-300 text-xs p-1 rounded-full w-5 h-5 flex items-center justify-center transition duration-300 absolute top-1 right-1";
    removeButton.onclick = () => {
      container.remove();
    };

    container.appendChild(input);
    container.appendChild(removeButton);

    return container;
  }

  function applySettings() {
    const grainIntensity = parseInt(
      document.getElementById("grainIntensity").value
    );
    const gradientType = document.getElementById("gradientType").value;
    const gradientAngle = parseInt(
      document.getElementById("gradientAngle").value
    );

    const colors = Array.from(
      colorContainer.querySelectorAll('input[type="color"]')
    ).map((input) => input.value);

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

    const numColors = Math.floor(Math.random() * 3) + 2;
    colorContainer.innerHTML = "";
    for (let i = 0; i < numColors; i++) {
      colorContainer.appendChild(createColorInput());
    }

    applySettings();
  }

  function initializeTryItSection() {
    resizeCanvas(); // Resize canvas on load
    randomizeSettings(); // Apply random settings on load
  }

  document
    .getElementById("applyButton")
    .addEventListener("click", applySettings);
  document
    .getElementById("randomizeButton")
    .addEventListener("click", randomizeSettings);
  document.getElementById("addColorButton").addEventListener("click", () => {
    colorContainer.appendChild(createColorInput());
  });

  initializeTryItSection(); // Initialize the Try It section with random settings

  // Function to generate random pastel circles as background
  function generateRandomCircles() {
    const container = document.getElementById("backgroundCircles");

    for (let i = 0; i < 10; i++) {
      // Begrenzung auf 10 Kreise
      const circle = document.createElement("div");
      const size = Math.random() * 200 + 100; // Größe des Kreises zwischen 100px und 300px

      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.backgroundColor = getRandomPastelColor();
      circle.style.top = `${Math.random() * 100}vh`;
      circle.style.left = `${Math.random() * 100}vw`;

      // Anfangsposition und Transparenz der Kreise
      circle.style.transform = `translate3d(${Math.random() * 10 - 5}px, ${
        Math.random() * 10 - 5
      }px, 0)`;
      circle.style.transition = "transform 0.5s ease-out"; // Sanfte Übergänge

      container.appendChild(circle);
    }
  }

  // Parallax-Effekt beim Scrollen
  function handleScroll() {
    const circles = document.querySelectorAll(".background-circles div");
    circles.forEach((circle) => {
      const speed = 0.125; // Geschwindigkeit des Parallax-Effekts
      const yOffset = window.scrollY * speed; // Verwendung von scrollY anstelle von pageYOffset

      // Sanfte Anpassung der y-Position
      circle.style.transform = `translate3d(${
        circle.style.transform.split(",")[0].split("(")[1]
      }, ${yOffset}px, 0)`;
    });
  }

  // Initialize background circles and handle scroll event
  generateRandomCircles();
  window.addEventListener("scroll", handleScroll);
});
