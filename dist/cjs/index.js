/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/effects/applyGrain.ts":
/*!***********************************!*\
  !*** ./src/effects/applyGrain.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyGrain: () => (/* binding */ applyGrain)\n/* harmony export */ });\n/**\n * Applies a \"grain\" effect to a CanvasRenderingContext2D.\n *\n * @param ctx - The CanvasRenderingContext2D to which the grain effect will be applied.\n * @param width - The width of the canvas.\n * @param height - The height of the canvas.\n * @param intensity - The intensity of the grain effect, ranging from 0 (no grain) to 50 (maximum grain).\n */\nfunction applyGrain(ctx, width, height, intensity) {\n    if (!ctx)\n        return; // Return early if context is not available\n    // Create a temporary canvas for the grain effect\n    const grainCanvas = document.createElement(\"canvas\");\n    grainCanvas.width = width;\n    grainCanvas.height = height;\n    const grainCtx = grainCanvas.getContext(\"2d\");\n    if (!grainCtx)\n        return; // Ensure the context is available\n    // Create image data for the grain effect\n    const imageData = grainCtx.createImageData(width, height);\n    const data = imageData.data;\n    // Apply random grain effect to each pixel\n    for (let i = 0; i < data.length; i += 4) {\n        const value = Math.random() * 255; // Random color value\n        data[i] = data[i + 1] = data[i + 2] = value; // RGB\n        data[i + 3] = intensity * 2.55; // Alpha\n    }\n    grainCtx.putImageData(imageData, 0, 0);\n    // Apply the grain effect to the target context\n    ctx.globalCompositeOperation = \"overlay\"; // Apply the grain effect\n    ctx.drawImage(grainCanvas, 0, 0);\n    ctx.globalCompositeOperation = \"source-over\"; // Reset operation to default\n}\n\n\n//# sourceURL=webpack://@prodbyeagle/grainient/./src/effects/applyGrain.ts?");

/***/ }),

/***/ "./src/gradients/Gradient.ts":
/*!***********************************!*\
  !*** ./src/gradients/Gradient.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gradient: () => (/* binding */ Gradient)\n/* harmony export */ });\n/* harmony import */ var _effects_applyGrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../effects/applyGrain */ \"./src/effects/applyGrain.ts\");\n\n/**\n * Creates a gradient on the given canvas element.\n *\n * @param canvas - The canvas element to apply the gradient to.\n * @param options - The options for the gradient.\n */\nfunction Gradient(canvas, options) {\n    const ctx = canvas.getContext(\"2d\");\n    if (!ctx)\n        throw new Error(\"Canvas context is not available.\");\n    const { colors, grain = 0, type = \"linear\", angle = 45 } = options;\n    if (colors.length < 2 || colors.length > 8)\n        throw new Error(\"You need to specify between 2 and 8 colors.\");\n    if (![\"linear\", \"radial\"].includes(type))\n        throw new Error('Gradient type must be \"linear\" or \"radial\".');\n    if (type === \"linear\" &&\n        (typeof angle !== \"number\" || angle < 0 || angle > 90))\n        throw new Error(\"Angle must be a number between 0 and 90 for linear gradients.\");\n    let gradient;\n    if (type === \"linear\") {\n        const x1 = canvas.width * Math.cos((angle * Math.PI) / 180);\n        const y1 = canvas.height * Math.sin((angle * Math.PI) / 180);\n        gradient = ctx.createLinearGradient(0, 0, x1, y1);\n    }\n    else {\n        gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);\n    }\n    const step = 1 / (colors.length - 1);\n    colors.forEach((color, index) => gradient.addColorStop(index * step, color));\n    ctx.fillStyle = gradient;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    if (grain > 0) {\n        (0,_effects_applyGrain__WEBPACK_IMPORTED_MODULE_0__.applyGrain)(ctx, canvas.width, canvas.height, grain);\n    }\n}\n\n\n//# sourceURL=webpack://@prodbyeagle/grainient/./src/gradients/Gradient.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gradient: () => (/* reexport safe */ _gradients_Gradient__WEBPACK_IMPORTED_MODULE_0__.Gradient),\n/* harmony export */   applyGrain: () => (/* reexport safe */ _effects_applyGrain__WEBPACK_IMPORTED_MODULE_1__.applyGrain)\n/* harmony export */ });\n/* harmony import */ var _gradients_Gradient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gradients/Gradient */ \"./src/gradients/Gradient.ts\");\n/* harmony import */ var _effects_applyGrain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effects/applyGrain */ \"./src/effects/applyGrain.ts\");\n\n\n\n\n\n//# sourceURL=webpack://@prodbyeagle/grainient/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;