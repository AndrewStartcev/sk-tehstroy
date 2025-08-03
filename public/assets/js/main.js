/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', function () {\n  // Находим все элементы с классом has-submenu\n  const submenuParents = document.querySelectorAll('.menu-parent');\n  const header = document.querySelector('.header');\n\n  function checkHeader() {\n    if (window.scrollY > 30) {\n      header.classList.add('header-show');\n    } else {\n      header.classList.remove('header-show');\n    }\n  }\n\n  submenuParents.forEach(function (parent) {\n    const link = parent.querySelector('.menu-parent__item');\n    const submenu = parent.querySelector('.sub-menu');\n\n    // Показываем подменю при наведении\n    parent.addEventListener('mouseenter', function () {\n      submenu.style.display = 'block';\n      submenu.style.opacity = '0';\n      submenu.style.transition = 'opacity 0.3s ease';\n      link.classList.add('show');\n\n      // Небольшая задержка для плавного появления\n      setTimeout(function () {\n        submenu.style.opacity = '1';\n      }, 10);\n    });\n\n    // Скрываем подменю при уходе курсора\n    parent.addEventListener('mouseleave', function () {\n      submenu.style.opacity = '0';\n\n      // После завершения анимации скрываем полностью\n      setTimeout(function () {\n        if (submenu.style.opacity === '0') {\n          submenu.style.display = 'none';\n          link.classList.remove('show');\n        }\n      }, 300);\n    });\n\n    // Для мобильных устройств - по клику\n    link.addEventListener('click', function (e) {\n      if (window.innerWidth <= 768) {\n        // Мобильное устройство\n        e.preventDefault();\n        const isOpen = submenu.style.display === 'block';\n\n        // Закрываем все открытые подменю\n        document.querySelectorAll('.sub-menu').forEach(function (menu) {\n          if (menu !== submenu) {\n            menu.style.display = 'none';\n            link.classList.add('show');\n          }\n        });\n\n        // Открываем/закрываем текущее\n        submenu.style.display = isOpen ? 'none' : 'block';\n        link.classList.toogle('show');\n      }\n    });\n  });\n\n  document.addEventListener('click', function (e) {\n    if (window.innerWidth <= 768) {\n      const isClickInside = Array.from(submenuParents).some(parent => parent.contains(e.target));\n\n      if (!isClickInside) {\n        document.querySelectorAll('.sub-menu').forEach(function (menu) {\n          menu.style.display = 'none';\n        });\n      }\n    }\n  });\n\n  window.addEventListener('load', checkHeader);\n  window.addEventListener('scroll', checkHeader);\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/main.js"]();
/******/ 	
/******/ })()
;