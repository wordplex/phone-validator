/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! regenerator-runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\n\n//# sourceURL=webpack://wordplex/./node_modules/@babel/runtime/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/autocompleter/autocomplete.js":
/*!****************************************************!*\
  !*** ./node_modules/autocompleter/autocomplete.js ***!
  \****************************************************/
/***/ (function(module) {

eval("(function (global, factory) {\n   true ? module.exports = factory() :\n  0;\n}(this, (function () { 'use strict';\n\n  /*\r\n   * https://github.com/kraaden/autocomplete\r\n   * Copyright (c) 2016 Denys Krasnoshchok\r\n   * MIT License\r\n   */\r\n  function autocomplete(settings) {\r\n      // just an alias to minimize JS file size\r\n      var doc = document;\r\n      var container = settings.container || doc.createElement(\"div\");\r\n      var containerStyle = container.style;\r\n      var userAgent = navigator.userAgent;\r\n      var mobileFirefox = userAgent.indexOf(\"Firefox\") !== -1 && userAgent.indexOf(\"Mobile\") !== -1;\r\n      var debounceWaitMs = settings.debounceWaitMs || 0;\r\n      var preventSubmit = settings.preventSubmit || false;\r\n      var disableAutoSelect = settings.disableAutoSelect || false;\r\n      // 'keyup' event will not be fired on Mobile Firefox, so we have to use 'input' event instead\r\n      var keyUpEventName = mobileFirefox ? \"input\" : \"keyup\";\r\n      var items = [];\r\n      var inputValue = \"\";\r\n      var minLen = 2;\r\n      var showOnFocus = settings.showOnFocus;\r\n      var selected;\r\n      var keypressCounter = 0;\r\n      var debounceTimer;\r\n      if (settings.minLength !== undefined) {\r\n          minLen = settings.minLength;\r\n      }\r\n      if (!settings.input) {\r\n          throw new Error(\"input undefined\");\r\n      }\r\n      var input = settings.input;\r\n      container.className = \"autocomplete \" + (settings.className || \"\");\r\n      // IOS implementation for fixed positioning has many bugs, so we will use absolute positioning\r\n      containerStyle.position = \"absolute\";\r\n      /**\r\n       * Detach the container from DOM\r\n       */\r\n      function detach() {\r\n          var parent = container.parentNode;\r\n          if (parent) {\r\n              parent.removeChild(container);\r\n          }\r\n      }\r\n      /**\r\n       * Clear debouncing timer if assigned\r\n       */\r\n      function clearDebounceTimer() {\r\n          if (debounceTimer) {\r\n              window.clearTimeout(debounceTimer);\r\n          }\r\n      }\r\n      /**\r\n       * Attach the container to DOM\r\n       */\r\n      function attach() {\r\n          if (!container.parentNode) {\r\n              doc.body.appendChild(container);\r\n          }\r\n      }\r\n      /**\r\n       * Check if container for autocomplete is displayed\r\n       */\r\n      function containerDisplayed() {\r\n          return !!container.parentNode;\r\n      }\r\n      /**\r\n       * Clear autocomplete state and hide container\r\n       */\r\n      function clear() {\r\n          // prevent the update call if there are pending AJAX requests\r\n          keypressCounter++;\r\n          items = [];\r\n          inputValue = \"\";\r\n          selected = undefined;\r\n          detach();\r\n      }\r\n      /**\r\n       * Update autocomplete position\r\n       */\r\n      function updatePosition() {\r\n          if (!containerDisplayed()) {\r\n              return;\r\n          }\r\n          containerStyle.height = \"auto\";\r\n          containerStyle.width = input.offsetWidth + \"px\";\r\n          var maxHeight = 0;\r\n          var inputRect;\r\n          function calc() {\r\n              var docEl = doc.documentElement;\r\n              var clientTop = docEl.clientTop || doc.body.clientTop || 0;\r\n              var clientLeft = docEl.clientLeft || doc.body.clientLeft || 0;\r\n              var scrollTop = window.pageYOffset || docEl.scrollTop;\r\n              var scrollLeft = window.pageXOffset || docEl.scrollLeft;\r\n              inputRect = input.getBoundingClientRect();\r\n              var top = inputRect.top + input.offsetHeight + scrollTop - clientTop;\r\n              var left = inputRect.left + scrollLeft - clientLeft;\r\n              containerStyle.top = top + \"px\";\r\n              containerStyle.left = left + \"px\";\r\n              maxHeight = window.innerHeight - (inputRect.top + input.offsetHeight);\r\n              if (maxHeight < 0) {\r\n                  maxHeight = 0;\r\n              }\r\n              containerStyle.top = top + \"px\";\r\n              containerStyle.bottom = \"\";\r\n              containerStyle.left = left + \"px\";\r\n              containerStyle.maxHeight = maxHeight + \"px\";\r\n          }\r\n          // the calc method must be called twice, otherwise the calculation may be wrong on resize event (chrome browser)\r\n          calc();\r\n          calc();\r\n          if (settings.customize && inputRect) {\r\n              settings.customize(input, inputRect, container, maxHeight);\r\n          }\r\n      }\r\n      /**\r\n       * Redraw the autocomplete div element with suggestions\r\n       */\r\n      function update() {\r\n          // delete all children from autocomplete DOM container\r\n          while (container.firstChild) {\r\n              container.removeChild(container.firstChild);\r\n          }\r\n          // function for rendering autocomplete suggestions\r\n          var render = function (item, currentValue) {\r\n              var itemElement = doc.createElement(\"div\");\r\n              itemElement.textContent = item.label || \"\";\r\n              return itemElement;\r\n          };\r\n          if (settings.render) {\r\n              render = settings.render;\r\n          }\r\n          // function to render autocomplete groups\r\n          var renderGroup = function (groupName, currentValue) {\r\n              var groupDiv = doc.createElement(\"div\");\r\n              groupDiv.textContent = groupName;\r\n              return groupDiv;\r\n          };\r\n          if (settings.renderGroup) {\r\n              renderGroup = settings.renderGroup;\r\n          }\r\n          var fragment = doc.createDocumentFragment();\r\n          var prevGroup = \"#9?$\";\r\n          items.forEach(function (item) {\r\n              if (item.group && item.group !== prevGroup) {\r\n                  prevGroup = item.group;\r\n                  var groupDiv = renderGroup(item.group, inputValue);\r\n                  if (groupDiv) {\r\n                      groupDiv.className += \" group\";\r\n                      fragment.appendChild(groupDiv);\r\n                  }\r\n              }\r\n              var div = render(item, inputValue);\r\n              if (div) {\r\n                  div.addEventListener(\"click\", function (ev) {\r\n                      settings.onSelect(item, input);\r\n                      clear();\r\n                      ev.preventDefault();\r\n                      ev.stopPropagation();\r\n                  });\r\n                  if (item === selected) {\r\n                      div.className += \" selected\";\r\n                  }\r\n                  fragment.appendChild(div);\r\n              }\r\n          });\r\n          container.appendChild(fragment);\r\n          if (items.length < 1) {\r\n              if (settings.emptyMsg) {\r\n                  var empty = doc.createElement(\"div\");\r\n                  empty.className = \"empty\";\r\n                  empty.textContent = settings.emptyMsg;\r\n                  container.appendChild(empty);\r\n              }\r\n              else {\r\n                  clear();\r\n                  return;\r\n              }\r\n          }\r\n          attach();\r\n          updatePosition();\r\n          updateScroll();\r\n      }\r\n      function updateIfDisplayed() {\r\n          if (containerDisplayed()) {\r\n              update();\r\n          }\r\n      }\r\n      function resizeEventHandler() {\r\n          updateIfDisplayed();\r\n      }\r\n      function scrollEventHandler(e) {\r\n          if (e.target !== container) {\r\n              updateIfDisplayed();\r\n          }\r\n          else {\r\n              e.preventDefault();\r\n          }\r\n      }\r\n      function keyupEventHandler(ev) {\r\n          var keyCode = ev.which || ev.keyCode || 0;\r\n          var ignore = [38 /* Up */, 13 /* Enter */, 27 /* Esc */, 39 /* Right */, 37 /* Left */, 16 /* Shift */, 17 /* Ctrl */, 18 /* Alt */, 20 /* CapsLock */, 91 /* WindowsKey */, 9 /* Tab */];\r\n          for (var _i = 0, ignore_1 = ignore; _i < ignore_1.length; _i++) {\r\n              var key = ignore_1[_i];\r\n              if (keyCode === key) {\r\n                  return;\r\n              }\r\n          }\r\n          if (keyCode >= 112 /* F1 */ && keyCode <= 123 /* F12 */) {\r\n              return;\r\n          }\r\n          // the down key is used to open autocomplete\r\n          if (keyCode === 40 /* Down */ && containerDisplayed()) {\r\n              return;\r\n          }\r\n          startFetch(0 /* Keyboard */);\r\n      }\r\n      /**\r\n       * Automatically move scroll bar if selected item is not visible\r\n       */\r\n      function updateScroll() {\r\n          var elements = container.getElementsByClassName(\"selected\");\r\n          if (elements.length > 0) {\r\n              var element = elements[0];\r\n              // make group visible\r\n              var previous = element.previousElementSibling;\r\n              if (previous && previous.className.indexOf(\"group\") !== -1 && !previous.previousElementSibling) {\r\n                  element = previous;\r\n              }\r\n              if (element.offsetTop < container.scrollTop) {\r\n                  container.scrollTop = element.offsetTop;\r\n              }\r\n              else {\r\n                  var selectBottom = element.offsetTop + element.offsetHeight;\r\n                  var containerBottom = container.scrollTop + container.offsetHeight;\r\n                  if (selectBottom > containerBottom) {\r\n                      container.scrollTop += selectBottom - containerBottom;\r\n                  }\r\n              }\r\n          }\r\n      }\r\n      /**\r\n       * Select the previous item in suggestions\r\n       */\r\n      function selectPrev() {\r\n          if (items.length < 1) {\r\n              selected = undefined;\r\n          }\r\n          else {\r\n              if (selected === items[0]) {\r\n                  selected = items[items.length - 1];\r\n              }\r\n              else {\r\n                  for (var i = items.length - 1; i > 0; i--) {\r\n                      if (selected === items[i] || i === 1) {\r\n                          selected = items[i - 1];\r\n                          break;\r\n                      }\r\n                  }\r\n              }\r\n          }\r\n      }\r\n      /**\r\n       * Select the next item in suggestions\r\n       */\r\n      function selectNext() {\r\n          if (items.length < 1) {\r\n              selected = undefined;\r\n          }\r\n          if (!selected || selected === items[items.length - 1]) {\r\n              selected = items[0];\r\n              return;\r\n          }\r\n          for (var i = 0; i < (items.length - 1); i++) {\r\n              if (selected === items[i]) {\r\n                  selected = items[i + 1];\r\n                  break;\r\n              }\r\n          }\r\n      }\r\n      function keydownEventHandler(ev) {\r\n          var keyCode = ev.which || ev.keyCode || 0;\r\n          if (keyCode === 38 /* Up */ || keyCode === 40 /* Down */ || keyCode === 27 /* Esc */) {\r\n              var containerIsDisplayed = containerDisplayed();\r\n              if (keyCode === 27 /* Esc */) {\r\n                  clear();\r\n              }\r\n              else {\r\n                  if (!containerIsDisplayed || items.length < 1) {\r\n                      return;\r\n                  }\r\n                  keyCode === 38 /* Up */\r\n                      ? selectPrev()\r\n                      : selectNext();\r\n                  update();\r\n              }\r\n              ev.preventDefault();\r\n              if (containerIsDisplayed) {\r\n                  ev.stopPropagation();\r\n              }\r\n              return;\r\n          }\r\n          if (keyCode === 13 /* Enter */) {\r\n              if (selected) {\r\n                  settings.onSelect(selected, input);\r\n                  clear();\r\n              }\r\n              if (preventSubmit) {\r\n                  ev.preventDefault();\r\n              }\r\n          }\r\n      }\r\n      function focusEventHandler() {\r\n          if (showOnFocus) {\r\n              startFetch(1 /* Focus */);\r\n          }\r\n      }\r\n      function startFetch(trigger) {\r\n          // If multiple keys were pressed, before we get an update from server,\r\n          // this may cause redrawing autocomplete multiple times after the last key was pressed.\r\n          // To avoid this, the number of times keyboard was pressed will be saved and checked before redraw.\r\n          var savedKeypressCounter = ++keypressCounter;\r\n          var val = input.value;\r\n          if (val.length >= minLen || trigger === 1 /* Focus */) {\r\n              clearDebounceTimer();\r\n              debounceTimer = window.setTimeout(function () {\r\n                  settings.fetch(val, function (elements) {\r\n                      if (keypressCounter === savedKeypressCounter && elements) {\r\n                          items = elements;\r\n                          inputValue = val;\r\n                          selected = (items.length < 1 || disableAutoSelect) ? undefined : items[0];\r\n                          update();\r\n                      }\r\n                  }, trigger);\r\n              }, trigger === 0 /* Keyboard */ ? debounceWaitMs : 0);\r\n          }\r\n          else {\r\n              clear();\r\n          }\r\n      }\r\n      function blurEventHandler() {\r\n          // we need to delay clear, because when we click on an item, blur will be called before click and remove items from DOM\r\n          setTimeout(function () {\r\n              if (doc.activeElement !== input) {\r\n                  clear();\r\n              }\r\n          }, 200);\r\n      }\r\n      /**\r\n       * Fixes #26: on long clicks focus will be lost and onSelect method will not be called\r\n       */\r\n      container.addEventListener(\"mousedown\", function (evt) {\r\n          evt.stopPropagation();\r\n          evt.preventDefault();\r\n      });\r\n      /**\r\n       * Fixes #30: autocomplete closes when scrollbar is clicked in IE\r\n       * See: https://stackoverflow.com/a/9210267/13172349\r\n       */\r\n      container.addEventListener(\"focus\", function () { return input.focus(); });\r\n      /**\r\n       * This function will remove DOM elements and clear event handlers\r\n       */\r\n      function destroy() {\r\n          input.removeEventListener(\"focus\", focusEventHandler);\r\n          input.removeEventListener(\"keydown\", keydownEventHandler);\r\n          input.removeEventListener(keyUpEventName, keyupEventHandler);\r\n          input.removeEventListener(\"blur\", blurEventHandler);\r\n          window.removeEventListener(\"resize\", resizeEventHandler);\r\n          doc.removeEventListener(\"scroll\", scrollEventHandler, true);\r\n          clearDebounceTimer();\r\n          clear();\r\n      }\r\n      // setup event handlers\r\n      input.addEventListener(\"keydown\", keydownEventHandler);\r\n      input.addEventListener(keyUpEventName, keyupEventHandler);\r\n      input.addEventListener(\"blur\", blurEventHandler);\r\n      input.addEventListener(\"focus\", focusEventHandler);\r\n      window.addEventListener(\"resize\", resizeEventHandler);\r\n      doc.addEventListener(\"scroll\", scrollEventHandler, true);\r\n      return {\r\n          destroy: destroy\r\n      };\r\n  }\n\n  return autocomplete;\n\n})));\n//# sourceMappingURL=autocomplete.js.map\n\n\n//# sourceURL=webpack://wordplex/./node_modules/autocompleter/autocomplete.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var json_format_highlight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! json-format-highlight */ \"./node_modules/json-format-highlight/dist/json-format-highlight.js\");\n/* harmony import */ var json_format_highlight__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(json_format_highlight__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! autocompleter */ \"./node_modules/autocompleter/autocomplete.js\");\n/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar input = document.getElementById(\"input\");\nvar validateInput = document.getElementById(\"valid\");\nvar countryInput = document.getElementById(\"country-input\");\nvar inputCloseMark = document.getElementById(\"input-close-mark\");\nvar button = document.getElementById(\"button\");\nvar dropBtn = document.getElementById(\"dropBtn\");\nvar dropDown = document.getElementById(\"dropDown\");\nvar jsonBtn = document.getElementById(\"json\");\nvar formBtn = document.getElementById(\"form-btn\");\nvar burgerBtn = document.getElementById(\"burger-btn\");\nvar lineType = document.getElementById(\"line-type\");\nvar countryCode = document.getElementById(\"country-code\");\nvar network = document.getElementById(\"network\");\nvar location = document.getElementById(\"location\");\nvar jsonResults = document.getElementById(\"json-results\");\nvar prettyData = document.getElementById(\"pretty-data\");\nvar formattedResults = document.getElementById(\"formatted-results\");\nvar checkMark = document.getElementById(\"check-mark\");\nvar falseMark = document.getElementById(\"false-mark\");\nvar mobileNavbar = document.getElementById(\"mobile-navbar\");\nvar AssetsArrow = document.getElementById(\"assets-arrow\");\nvar backDrop = document.getElementById(\"backdrop\");\nvar warningMessage = document.getElementById(\"warning-message\");\nvar arrowIcon = document.getElementById(\"arrow-icon\");\nvar isSelectedCountry = false;\nvar selectedCountry = {};\nvar isListOpen = false;\n\n(function fetchingCountries() {\n  fetch(\"https://geo.wordplex.io/v4/countries\").then(function (res) {\n    return res.json();\n  }).then(function (_ref) {\n    var items = _ref.items;\n    autocompleter__WEBPACK_IMPORTED_MODULE_3___default()({\n      input: countryInput,\n      fetch: function fetch(text, update) {\n        countryInput.value ? inputCloseMark.style.display = \"block\" : inputCloseMark.style.display = \"none\";\n        text = text.toLowerCase();\n        var suggestions = items.filter(function (n) {\n          return isSelectedCountry ? true : n.name.toLowerCase().startsWith(text);\n        }).map(function (item) {\n          return {\n            label: item.name,\n            value: item.alpha2Code\n          };\n        });\n        update(suggestions);\n      },\n      showOnFocus: true,\n      minLength: 0,\n      emptyMsg: \"No options\",\n      onSelect: function onSelect(item) {\n        inputCloseMark.style.display = \"block\";\n        isSelectedCountry = true;\n        countryInput.value = item.label;\n        countryInput.blur();\n        selectedCountry = item;\n      }\n    });\n  });\n})();\n\nfunction fetchPhoneNumber() {\n  var phoneNumber = parseInt(input.value, 10);\n  return phoneNumber;\n}\n\nfunction displayData() {\n  return _displayData.apply(this, arguments);\n}\n\nfunction _displayData() {\n  _displayData = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {\n    var phoneNumbers, countryValue, Url;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            phoneNumbers = fetchPhoneNumber();\n            countryValue = selectedCountry.value;\n            Url = \"https://geo.wordplex.io/v4/phone?phone=\".concat(phoneNumbers, \"&country=\").concat(countryValue);\n\n            if (!countryValue && input.value) {\n              Url = \"https://geo.wordplex.io/v4/phone?phone=\".concat(phoneNumbers);\n            }\n\n            fetch(Url).then(function (res) {\n              return res.json();\n            }).then(function (data) {\n              if (!!data.is_number_valid) {\n                checkMark.style.display = \"flex\";\n                checkMark.style.background = \"#82BE18\";\n                falseMark.style.display = \"none\";\n                validateInput.style.color = \"#82BE18\";\n                lineType.value = data.type;\n                countryCode.value = \"+ \".concat(data.number_parts.country_code);\n                network.value = data.carrier.name;\n                location.value = data.location.name;\n              } else {\n                warningMessage.style.display = \"block\";\n                validateInput.style.color = \"#FF5722\";\n                falseMark.style.display = \"flex\";\n                checkMark.style.display = \"none\";\n                lineType.value = \"unknown\";\n                countryCode.value = \"unknown\";\n                network.value = \"unknown\";\n                location.value = \"unknown\";\n              }\n\n              appendData(data);\n              setTimeout(function () {\n                return dataHandler(data);\n              }, 10);\n            });\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _displayData.apply(this, arguments);\n}\n\nfunction keyDown(event) {\n  if (event.keyCode === 27) {\n    event.preventDefault();\n    burgerBtn.blur();\n    button.click();\n    mobileNavbar.style.display = \"none\";\n  }\n}\n\nfunction keyUp(event) {\n  if (event.keyCode === 13) {\n    event.preventDefault();\n    button.click();\n  }\n\n  if (input.value) {\n    button.disabled = false;\n    button.style.backgroundColor = \"#82BE18\";\n    button.style.cursor = \"pointer\";\n  }\n\n  if (input.value === \"\") {\n    button.disabled = true;\n    button.style.backgroundColor = \"#7F9ABE\";\n    warningMessage.style.display = \"none\";\n    button.style.cursor = \"unset\";\n  }\n}\n\nfunction toggleMobileNavbar() {\n  if (!mobileNavbar.offsetWidth) {\n    mobileNavbar.style.display = \"flex\";\n    backDrop.style.display = \"flex\";\n  } else {\n    mobileNavbar.style.display = \"none\";\n    backDrop.style.display = \"none\";\n  }\n}\n\nfunction appendData(data) {\n  var highlightOptions = {\n    keyColor: \"#DFEEFF\",\n    stringColor: \"#82BE18\",\n    trueColor: \"#82BE18\",\n    falseColor: \"red\",\n    numberColor: \"#82BE18\"\n  };\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_2___default()(data, highlightOptions);\n  prettyData.innerHTML = coloredJsonData;\n}\n\n(function inputFocus() {\n  input.focus();\n})();\n\nfunction warningValidateMessage(event) {\n  if (input.value === \"\") {\n    warningMessage.style.display = \"block\";\n  } else if (event.target.value === input.length) {\n    warningMessage.style.display = \"none\";\n  } else {\n    warningMessage.style.display = \"none\";\n  }\n} //event handler\n\n\nfunction clearInputHandler() {\n  selectedCountry = {};\n  countryInput.value = \"\";\n  inputCloseMark.style.display = \"none\";\n}\n\nfunction dataHandler(data) {\n  validateInput.value = data.is_number_valid;\n}\n\nfunction openCountryListHandler() {\n  if (isListOpen) {\n    arrowIcon.style.transform = \"rotate(0deg)\";\n    isListOpen = false;\n  } else {\n    arrowIcon.style.transform = \"rotate(180deg)\";\n    countryInput.select();\n    isListOpen = true;\n  }\n}\n\nfunction changeInputHandler(event) {\n  isSelectedCountry = false;\n}\n\nfunction focusInputHandler(event) {\n  countryInput.select();\n  openCountryListHandler();\n}\n\nfunction blurCountryInputHandler() {\n  openCountryListHandler();\n}\n\nfunction closeMobileNavbarHandler() {\n  mobileNavbar.style.display = \"none\";\n  backDrop.style.display = \"none\";\n}\n\nfunction closeWarningHandler() {\n  warningMessage.style.display = \"none\";\n}\n\nfunction jsonHandler() {\n  jsonResults.style.display = \"flex\";\n  jsonBtn.style.backgroundColor = \"#011A37\";\n  formattedResults.style.display = \"none\";\n  formBtn.style.backgroundColor = \"#002C60\";\n}\n\nfunction formBtnHandler() {\n  formattedResults.style.display = \"flex\";\n  jsonBtn.style.backgroundColor = \"#002C60\";\n  jsonResults.style.display = \"none\";\n  formBtn.style.backgroundColor = \"#011A37\";\n} //attach events\n\n\nwindow.addEventListener(\"keydown\", keyDown);\ncountryInput.addEventListener(\"focus\", focusInputHandler);\ncountryInput.addEventListener(\"blur\", blurCountryInputHandler);\ncountryInput.addEventListener(\"keydown\", changeInputHandler);\ninputCloseMark.addEventListener(\"click\", clearInputHandler);\ninput.addEventListener(\"change\", fetchPhoneNumber);\ninput.addEventListener(\"click\", closeWarningHandler);\ninput.addEventListener(\"keyup\", keyUp);\nbutton.addEventListener(\"click\", displayData);\nbutton.addEventListener(\"click\", warningValidateMessage);\njsonBtn.addEventListener(\"click\", jsonHandler);\nformBtn.addEventListener(\"click\", formBtnHandler);\nburgerBtn.addEventListener(\"click\", toggleMobileNavbar);\nbackDrop.addEventListener(\"click\", closeMobileNavbarHandler);\nmobileNavbar.addEventListener(\"click\", closeMobileNavbarHandler);\narrowIcon.addEventListener(\"click\", openCountryListHandler);\n\n//# sourceURL=webpack://wordplex/./src/scripts/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img.jfif */ \"./src/assets/img.jfif\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  font-family: \\\"Rubik\\\";\\r\\n}\\r\\n\\r\\nhtml {\\r\\n  scroll-behavior: smooth;\\r\\n}\\r\\n\\r\\n.main-wrapper {\\r\\n  background-color: #002046;\\r\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") no-repeat center center fixed;\\r\\n  background-size: cover;\\r\\n  padding-bottom: 60px;\\r\\n  height: 750px;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.main-wrapper .header {\\r\\n  color: white;\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  justify-content: space-between;\\r\\n  padding: 34px 52px;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .backdrop {\\r\\n  position: absolute;\\r\\n  display: none;\\r\\n  height: 100vh;\\r\\n  width: 100%;\\r\\n  top: 0;\\r\\n  left: 0;\\r\\n  z-index: 999;\\r\\n}\\r\\n\\r\\n.main-wrapper .header img.logo {\\r\\n  width: 240px;\\r\\n  height: 32px;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .burger-btn {\\r\\n  display: none;\\r\\n  position: relative;\\r\\n  color: #fff;\\r\\n  background: none;\\r\\n  border: 0;\\r\\n  z-index: 1000;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .fa-bars:before {\\r\\n  content: \\\"\\\\f0c9\\\";\\r\\n  font-size: 21px;\\r\\n  width: 16px;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .mobile-navbar {\\r\\n  display: none;\\r\\n  flex-direction: column;\\r\\n  position: absolute;\\r\\n  right: 20px;\\r\\n  top: 70px;\\r\\n  z-index: 999;\\r\\n  background-color: #00152f;\\r\\n  border-radius: 7px;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropDown {\\r\\n  position: relative;\\r\\n  display: inline-block;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropDown:hover .dropdown-content {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropDown a:hover {\\r\\n  background-color: #ddd;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropBtn {\\r\\n  color: white;\\r\\n  font-size: 13px;\\r\\n  line-height: 15.5px;\\r\\n  background-color: transparent;\\r\\n  background-repeat: no-repeat;\\r\\n  border: none;\\r\\n  cursor: pointer;\\r\\n  overflow: hidden;\\r\\n  outline: none;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropBtn:hover .dropdown-content {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropBtn img {\\r\\n  padding-bottom: 2px;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropdown-content {\\r\\n  display: none;\\r\\n  position: absolute;\\r\\n  top: 8px;\\r\\n  width: 123px;\\r\\n  overflow: auto;\\r\\n  background: #f8fafb;\\r\\n  border-radius: 4px;\\r\\n  z-index: 99;\\r\\n  transform: translate3d(-49px, 8px, 0px) !important;\\r\\n}\\r\\n\\r\\n.main-wrapper .navbar .dropdown-content a {\\r\\n  color: rgba(6, 46, 93, 1);\\r\\n  margin-right: 0;\\r\\n  padding: 9px 10px;\\r\\n  font-size: 13px;\\r\\n  line-height: 15.5px;\\r\\n  text-decoration: none;\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .nav-link {\\r\\n  text-decoration: none;\\r\\n  color: white;\\r\\n  margin-right: 50px;\\r\\n}\\r\\n\\r\\n.main-wrapper .header .navbar {\\r\\n  font-size: 13px;\\r\\n  font-weight: 400;\\r\\n  line-height: 15px;\\r\\n}\\r\\n\\r\\n.main-wrapper .main {\\r\\n  position: relative;\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  justify-content: space-between;\\r\\n  padding: 0 194px;\\r\\n  margin-top: 92px;\\r\\n}\\r\\n\\r\\n.main-wrapper .content {\\r\\n  width: 47%;\\r\\n  position: relative;\\r\\n  margin-bottom: 34px;\\r\\n  margin-right: 48px;\\r\\n  font-weight: 500;\\r\\n  font-size: 50px;\\r\\n  line-height: 59px;\\r\\n  color: #ffffff;\\r\\n}\\r\\n\\r\\n.main-wrapper .content::before {\\r\\n  content: \\\"\\\";\\r\\n  width: 50px;\\r\\n  height: 131px;\\r\\n  left: -42px;\\r\\n  top: 0;\\r\\n  position: absolute;\\r\\n  border-left: 7px solid #0359c0;\\r\\n  padding-right: 10px;\\r\\n}\\r\\n\\r\\n.main-wrapper .content h1 {\\r\\n  font-weight: 500;\\r\\n  font-size: 50px;\\r\\n  line-height: 60px;\\r\\n}\\r\\n\\r\\n.main-wrapper .content p {\\r\\n  font-size: 18px;\\r\\n  line-height: 26px;\\r\\n  font-weight: 400;\\r\\n  color: #deedff;\\r\\n  margin-top: 20px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper {\\r\\n  width: 50%;\\r\\n  z-index: 99;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .country-input {\\r\\n  position: relative;\\r\\n}\\r\\n\\r\\n.main-wrapper .country-input .arrow-icon {\\r\\n  color: gray;\\r\\n  position: absolute;\\r\\n  top: calc(50% - 25px / 2);\\r\\n  font-size: 20px;\\r\\n  right: 20px;\\r\\n  transition: 0.1s;\\r\\n  height: 25px;\\r\\n  width: 25px;\\r\\n  padding-left: 6.5px;\\r\\n}\\r\\n\\r\\n.main-wrapper .country-input .arrow-icon:hover {\\r\\n  background-color: rgb(233, 230, 230);\\r\\n  border-radius: 50%;\\r\\n  cursor: pointer;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n\\r\\n.main-wrapper .country-input .close-icon {\\r\\n  position: absolute;\\r\\n  right: 56px;\\r\\n  height: 25px;\\r\\n  width: 25px;\\r\\n  font-size: 15px;\\r\\n  padding-top: 6px;\\r\\n  padding-left: 7px;\\r\\n  display: none;\\r\\n  top: calc(50% - 22px / 2);\\r\\n  color: gray;\\r\\n}\\r\\n\\r\\n.main-wrapper .country-input .close-icon:hover {\\r\\n  background-color: rgb(233, 230, 230);\\r\\n  border-radius: 50%;\\r\\n  cursor: pointer;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n\\r\\n.validation-input::-webkit-outer-spin-button,\\r\\n.validation-input::-webkit-inner-spin-button {\\r\\n  -webkit-appearance: none;\\r\\n  margin: 0;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .country-input img {\\r\\n  position: absolute;\\r\\n  bottom: 18px;\\r\\n  right: 35px;\\r\\n  font-size: 10px;\\r\\n  display: none;\\r\\n  width: 14px;\\r\\n  height: 14px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .country-input img:hover {\\r\\n  border-radius: 1px;\\r\\n  background-color: rgb(233, 230, 230);\\r\\n  border-radius: 21px;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .validation-input {\\r\\n  display: flex;\\r\\n  font-size: 18px;\\r\\n  width: 100%;\\r\\n  line-height: 36px;\\r\\n  flex-direction: row;\\r\\n  align-items: center;\\r\\n  padding: 0 20px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  height: 50px;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 0px 4px 15px rgba(2, 79, 255, 0.3);\\r\\n  color: #033260;\\r\\n  border-radius: 4px 0 0 4px;\\r\\n  margin: 12px 0px;\\r\\n  border: 0;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .validation-input:nth-child(2) {\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .input-group-with-submit {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  width: 100%;\\r\\n  position: relative;\\r\\n}\\r\\n\\r\\n.main-wrapper .input-group-with-submit .validation-input {\\r\\n  width: 75%;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n}\\r\\n\\r\\n.main-wrapper .input-group-with-submit .warning-message {\\r\\n  color: white;\\r\\n  position: absolute;\\r\\n  top: 65px;\\r\\n  width: 198px;\\r\\n  height: 25px;\\r\\n  z-index: 99;\\r\\n  background: #ff5722;\\r\\n  box-shadow: 0px 4px 15px rgb(2 79 255 / 30%);\\r\\n  border-radius: 4px;\\r\\n  font-size: 14px;\\r\\n  line-height: 11px;\\r\\n  padding: 8px;\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.main-wrapper .input-group-with-submit .warning-message::before {\\r\\n  content: \\\"\\\";\\r\\n  width: 0;\\r\\n  height: 0;\\r\\n  border-left: 10px solid transparent;\\r\\n  border-right: 10px solid transparent;\\r\\n  border-bottom: 10px solid #ff5722;\\r\\n  position: absolute;\\r\\n  top: -10px;\\r\\n  right: 159px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .submit-btn {\\r\\n  width: 25%;\\r\\n  height: 50px;\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  line-height: 36px;\\r\\n  background-color: rgba(127, 154, 190, 1);\\r\\n  cursor: not-allowed;\\r\\n  border-radius: 0px 4px 4px 0px;\\r\\n  border: 0;\\r\\n  color: #fff;\\r\\n  transition-duration: 0.2s;\\r\\n  transition-delay: 0.2s;\\r\\n}\\r\\n\\r\\n.main-wrapper .results .head-validation-box {\\r\\n  display: flex;\\r\\n  margin-top: 27px;\\r\\n}\\r\\n\\r\\n.main-wrapper .results .main-validation-button {\\r\\n  width: 50%;\\r\\n  background: #00152f;\\r\\n  border-radius: 4px 0px;\\r\\n}\\r\\n\\r\\n.main-wrapper .results .formatted-btn,\\r\\n.main-wrapper .results .json-btn {\\r\\n  padding: 0px 20px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  color: white;\\r\\n  width: 100%;\\r\\n  font-size: 14px;\\r\\n  line-height: 36px;\\r\\n  text-align: left;\\r\\n  position: relative;\\r\\n  height: 36px;\\r\\n  background: #00152f;\\r\\n  border: 0;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.main-wrapper .results .json-btn {\\r\\n  background-color: rgb(0, 44, 96);\\r\\n  font-weight: 700;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .formatted-results {\\r\\n  display: flex;\\r\\n  max-height: 200px;\\r\\n  background-color: #011a37;\\r\\n  padding: 28px 20px;\\r\\n}\\r\\n\\r\\n.main-wrapper .formatted-results .formatted-result:nth-child(1) {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  overflow: hidden;\\r\\n  margin-right: 71px;\\r\\n  font-weight: 500;\\r\\n  font-size: 14px;\\r\\n  line-height: 17px;\\r\\n}\\r\\n\\r\\n.main-wrapper .formatted-results .formatted-result:nth-child(2) {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  margin-right: 64px;\\r\\n  overflow: hidden;\\r\\n  font-weight: 500;\\r\\n  font-size: 14px;\\r\\n  line-height: 17px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .validation-text {\\r\\n  display: flex;\\r\\n  margin-bottom: 24px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .formatted-output {\\r\\n  width: 45%;\\r\\n  height: 25px;\\r\\n  margin-right: 20px;\\r\\n  font-weight: 500;\\r\\n  font-size: 14px;\\r\\n  line-height: 17px;\\r\\n  color: #9bafc6;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .formatted-results label {\\r\\n  width: 40%;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .valid-display {\\r\\n  position: relative;\\r\\n  max-width: 100%;\\r\\n  height: 24px;\\r\\n  padding-bottom: 3px;\\r\\n  font-size: 16px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  line-height: 17px;\\r\\n  color: #9bafc6;\\r\\n  background-color: unset;\\r\\n  border: 0;\\r\\n  border-bottom: 1px solid #002c60;\\r\\n  transition: all 400ms ease-in-out;\\r\\n}\\r\\n\\r\\n.main-wrapper .formatted-results span.check-mark {\\r\\n  position: relative;\\r\\n  right: 12px;\\r\\n  width: 17px;\\r\\n  height: 17px;\\r\\n  background: #82be18;\\r\\n  border-radius: 20px;\\r\\n}\\r\\n\\r\\n.main-wrapper .formatted-results .false-mark {\\r\\n  position: relative;\\r\\n  right: 19px;\\r\\n  top: 2px;\\r\\n  width: 15px;\\r\\n  height: 15px;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  display: none;\\r\\n  background: #ff5722;\\r\\n  border-radius: 50%;\\r\\n  transition: all 400ms ease-in-out;\\r\\n}\\r\\n\\r\\n.main-wrapper .formatted-results .true-mark {\\r\\n  position: relative;\\r\\n  transition: all 400ms ease-in-out;\\r\\n}\\r\\n\\r\\n.main-wrapper .results .fa,\\r\\n.fas {\\r\\n  font-weight: 900;\\r\\n  color: white;\\r\\n  font-size: 8px;\\r\\n}\\r\\n\\r\\n.main-wrapper .validation-wrapper .json-results {\\r\\n  display: none;\\r\\n  justify-content: space-between;\\r\\n  flex-direction: column;\\r\\n  flex-wrap: wrap;\\r\\n  max-height: 219px;\\r\\n  background-color: #00152f;\\r\\n  padding: 28px 20px;\\r\\n  color: white;\\r\\n  height: 220px;\\r\\n  overflow-y: scroll;\\r\\n  overflow-x: hidden;\\r\\n}\\r\\n\\r\\n.main-wrapper .json-results pre.prettyprint {\\r\\n  padding: 2px;\\r\\n  border: none;\\r\\n  font-weight: 400;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n}\\r\\n\\r\\n.main-wrapper .json-results::-webkit-scrollbar {\\r\\n  width: 6px;\\r\\n}\\r\\n\\r\\n.main-wrapper .json-results::-webkit-scrollbar-track {\\r\\n  background: #011a37;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n.main-wrapper .json-results::-webkit-scrollbar-thumb {\\r\\n  background: #043459;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n.main-wrapper .phone-shape {\\r\\n  z-index: 1;\\r\\n  position: absolute;\\r\\n  width: 302.39px;\\r\\n  height: 545px;\\r\\n  right: 46.6px;\\r\\n  bottom: -33px;\\r\\n  background: linear-gradient(\\r\\n    194.87deg,\\r\\n    rgba(0, 103, 255, 0.38) 0%,\\r\\n    rgba(24, 160, 251, 0.152) 95.85%\\r\\n  );\\r\\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);\\r\\n  backdrop-filter: blur(15px);\\r\\n  border-radius: 12px;\\r\\n}\\r\\n\\r\\n.main-wrapper .phone-shape-rectangle {\\r\\n  position: absolute;\\r\\n  width: 72.11px;\\r\\n  height: 12.79px;\\r\\n  right: 116.24px;\\r\\n  top: 21.61px;\\r\\n  background: #043459;\\r\\n  opacity: 0.9;\\r\\n  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);\\r\\n  border-radius: 12px;\\r\\n}\\r\\n\\r\\n.main-wrapper .phone-shape-eclipse {\\r\\n  position: absolute;\\r\\n  width: 12.79px;\\r\\n  height: 12.79px;\\r\\n  right: 101px;\\r\\n  top: 21.61px;\\r\\n  background: #043459;\\r\\n  opacity: 0.9;\\r\\n  border-radius: 50%;\\r\\n  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);\\r\\n}\\r\\n\\r\\n.properties-section {\\r\\n  height: 354px;\\r\\n}\\r\\n\\r\\n.properties-section .properties {\\r\\n  padding: 82px 185px;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.properties-section .properties h1 {\\r\\n  font-weight: 500;\\r\\n  font-size: 50px;\\r\\n  line-height: 59px;\\r\\n  color: #062e5d;\\r\\n  margin-bottom: 42px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-items {\\r\\n  display: flex;\\r\\n}\\r\\n\\r\\n.properties-section .properties-items .properties-item {\\r\\n  display: flex;\\r\\n  min-height: 79px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-item .properties-icon {\\r\\n  background-color: #dfeeff;\\r\\n  width: 79px;\\r\\n  height: 79px;\\r\\n  margin: auto;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 4px 4px 4px rgba(2, 79, 255, 0.15);\\r\\n  border-radius: 2px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-icon .properties-validation-icon-img {\\r\\n  display: flex;\\r\\n  width: 79px;\\r\\n  height: 79px;\\r\\n  margin: auto;\\r\\n  padding: 17px 18px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-icon .properties-bolt-icon-img {\\r\\n  display: flex;\\r\\n  width: 79px;\\r\\n  height: 79px;\\r\\n  margin: auto;\\r\\n  padding: 17px 22px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-item .properties-text {\\r\\n  margin-left: 20px;\\r\\n}\\r\\n\\r\\n.properties-section .properties-item .properties-text h2 {\\r\\n  font-weight: 500;\\r\\n  font-size: 24px;\\r\\n  line-height: 28px;\\r\\n  color: #062e5d;\\r\\n  margin: 0;\\r\\n  padding-left: 0;\\r\\n}\\r\\n\\r\\n.properties-section .properties-item .properties-text p {\\r\\n  font-size: 14px;\\r\\n  line-height: 18px;\\r\\n  font-weight: 400;\\r\\n  color: #5d6d7e;\\r\\n  margin-right: 10px;\\r\\n  margin-top: 8px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper {\\r\\n  padding: 63px 181px;\\r\\n  background: linear-gradient(180deg, #002046 0%, #003677 100%);\\r\\n  color: #fff;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper hr.line-break {\\r\\n  border: 1px solid rgba(155, 182, 212, 0.2);\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation h1 {\\r\\n  font-weight: 500;\\r\\n  font-size: 50px;\\r\\n  line-height: 59px;\\r\\n  margin-bottom: 64px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-header {\\r\\n  margin-bottom: 60px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-header h2 {\\r\\n  font-weight: 500;\\r\\n  font-size: 28px;\\r\\n  line-height: 33px;\\r\\n  margin-bottom: 18px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-header p {\\r\\n  font-size: 18px;\\r\\n  line-height: 24px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item {\\r\\n  margin-bottom: 59px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item h3 {\\r\\n  font-weight: 500;\\r\\n  font-size: 28px;\\r\\n  line-height: 33px;\\r\\n  position: relative;\\r\\n  margin-bottom: 37px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item h3::before {\\r\\n  content: \\\"\\\";\\r\\n  width: 50px;\\r\\n  height: 40px;\\r\\n  left: -28px;\\r\\n  top: -4px;\\r\\n  position: absolute;\\r\\n  border-left: 7px solid #0359c0;\\r\\n  padding-right: 10px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item p {\\r\\n  margin-bottom: 12px;\\r\\n  font-size: 18px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item .code-block {\\r\\n  width: 76%;\\r\\n  max-height: 355px;\\r\\n  overflow-y: auto;\\r\\n  overflow-x: hidden;\\r\\n  background-color: #00152f;\\r\\n  padding: 10px 27px;\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  border-radius: 4px;\\r\\n  margin-bottom: 42px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item .code-block::-webkit-scrollbar {\\r\\n  width: 6px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper\\r\\n  .documentation-item\\r\\n  .code-block::-webkit-scrollbar-track {\\r\\n  background: #011a37;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper\\r\\n  .documentation-item\\r\\n  .code-block::-webkit-scrollbar-thumb {\\r\\n  background: #043459;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .documentation-item .code-block p {\\r\\n  margin-bottom: 0px;\\r\\n  padding: 0px 32px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params h4 {\\r\\n  font-weight: 500;\\r\\n  font-size: 28px;\\r\\n  line-height: 33px;\\r\\n  margin-bottom: 22px;\\r\\n  position: relative;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params h4::before {\\r\\n  content: \\\"\\\";\\r\\n  width: 50px;\\r\\n  height: 40px;\\r\\n  left: -28px;\\r\\n  top: -4px;\\r\\n  position: absolute;\\r\\n  border-left: 7px solid hsl(213deg 97% 38%);\\r\\n  padding-right: 10px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .param-row {\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  align-items: center;\\r\\n  margin: 24px 0;\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params .param-name {\\r\\n  width: 25%;\\r\\n}\\r\\n\\r\\n.documentation-wrapper span.colored-code {\\r\\n  color: #82be18;\\r\\n}\\r\\n\\r\\n.documentation-wrapper span.param-colored-code {\\r\\n  color: #82be18;\\r\\n  margin-left: 25%;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .param-name span.json-colored-text {\\r\\n  color: #7f9abe;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params .param-type {\\r\\n  width: 13%;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params .param-desc {\\r\\n  width: 70%;\\r\\n  line-height: 21px;\\r\\n  font-size: 18px;\\r\\n  font-weight: 400;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .params .param-title-json {\\r\\n  font-weight: 500;\\r\\n  font-size: 28px;\\r\\n  line-height: 33px;\\r\\n  margin-top: 77px;\\r\\n  margin-bottom: 35px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-title {\\r\\n  font-weight: 500;\\r\\n  position: relative;\\r\\n  font-size: 28px;\\r\\n  margin-bottom: 34px;\\r\\n  margin-top: 70px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-title::before {\\r\\n  content: \\\"\\\";\\r\\n  width: 50px;\\r\\n  height: 40px;\\r\\n  left: -28px;\\r\\n  top: -3px;\\r\\n  position: absolute;\\r\\n  border-left: 7px solid hsl(213deg 97% 38%);\\r\\n  padding-right: 10px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-sub-title {\\r\\n  margin-bottom: 34px;\\r\\n  font-weight: 400;\\r\\n  font-size: 18px;\\r\\n  line-height: 21px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-row {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  margin: 18px 0;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-name {\\r\\n  padding: 4px 14px;\\r\\n  margin-right: 50px;\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .success {\\r\\n  background-color: #82be18;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .warning {\\r\\n  background-color: #f48032;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .fail {\\r\\n  background-color: #ff5722;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-type {\\r\\n  width: 9%;\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n}\\r\\n\\r\\n.documentation-wrapper .status-params .param-desc {\\r\\n  width: 70%;\\r\\n  font-weight: 400;\\r\\n  margin-left: 46px;\\r\\n  font-size: 18px;\\r\\n  line-height: 21px;\\r\\n}\\r\\n\\r\\n.autocomplete {\\r\\n  z-index: 999;\\r\\n  background-color: hsl(211deg 100% 97%);\\r\\n  max-height: 300px !important;\\r\\n  overflow-y: auto;\\r\\n  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),\\r\\n    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);\\r\\n  border-radius: 4px;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  color: rgba(3, 50, 96, 1);\\r\\n}\\r\\n\\r\\n.autocomplete div {\\r\\n  padding: 10px 0 10px 10px;\\r\\n}\\r\\n\\r\\n.autocomplete div:hover {\\r\\n  border: 0 solid rgb(141, 140, 140);\\r\\n  background-color: #dce2e9;\\r\\n  border-radius: 2px;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.selected {\\r\\n  border: 0 solid rgb(141, 140, 140);\\r\\n  background-color: #dce2e9;\\r\\n}\\r\\n\\r\\n.empty:hover {\\r\\n  background-color: unset !important;\\r\\n}\\r\\n\\r\\n.footer {\\r\\n  display: flex;\\r\\n  max-width: 1903px;\\r\\n  justify-content: space-between;\\r\\n  background-color: #002046;\\r\\n  color: #fff;\\r\\n  padding: 56px 74px;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.footer .logo img {\\r\\n  width: 240px;\\r\\n  height: 32px;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  font-size: 14px;\\r\\n  line-height: 16px;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper .links-wrapper {\\r\\n  margin-bottom: 31px;\\r\\n}\\r\\n\\r\\n.footer .links-wrapper .footer-link {\\r\\n  margin-right: 10px;\\r\\n  cursor: pointer;\\r\\n  text-decoration: none;\\r\\n  color: white;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper .footer-copywrite {\\r\\n  text-align: right;\\r\\n}\\r\\n\\r\\n@media (min-width: 1960px) {\\r\\n  .main-wrapper {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header {\\r\\n    margin: auto;\\r\\n    width: 1550px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main {\\r\\n    margin: auto;\\r\\n    width: 1550px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .phone-shape {\\r\\n    right: 46.6px;\\r\\n    bottom: 0;\\r\\n    top: -29px;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n    padding: 0 194px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n    padding: 0 194px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n    padding: 0 194px;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    max-width: 100%;\\r\\n    justify-content: center;\\r\\n  }\\r\\n\\r\\n  .footer .logo {\\r\\n    margin-right: 507px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1488px) {\\r\\n  .main-wrapper .main {\\r\\n    padding: 0px 50px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .content::before {\\r\\n    content: \\\"\\\";\\r\\n    width: 50px;\\r\\n    height: 131px;\\r\\n    left: -27px;\\r\\n    top: 0;\\r\\n    position: absolute;\\r\\n    border-left: 7px solid hsl(213deg 97% 38%);\\r\\n    padding-right: 4px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-output {\\r\\n    width: 45%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block {\\r\\n    width: 39%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-desc {\\r\\n    width: 45%;\\r\\n    line-height: 21px;\\r\\n    font-size: 18px;\\r\\n    font-weight: 400;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-type {\\r\\n    width: 15%;\\r\\n    font-weight: 500;\\r\\n    font-size: 18px;\\r\\n    line-height: 36px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1220px) {\\r\\n  .properties-section .properties {\\r\\n    padding: 82px 50px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper {\\r\\n    padding: 75px 50px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block {\\r\\n    width: 40%;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    height: auto;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .footer-copywrite {\\r\\n    margin-left: 40px;\\r\\n    margin-bottom: 26px;\\r\\n    text-align: right;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1177px) {\\r\\n  .main-wrapper .main {\\r\\n    padding: 0 50px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header {\\r\\n    padding: 40px 25px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .formatted-results .formatted-result:nth-child(1) {\\r\\n    margin-right: 0;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .formatted-results .formatted-result:nth-child(2) {\\r\\n    margin-right: 0;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-output {\\r\\n    width: 32%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-results {\\r\\n    padding: 20px 9px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block {\\r\\n    width: 50%;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    padding: 56px 55px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 892px) {\\r\\n  .main-wrapper .header {\\r\\n    padding: 40px 25px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .burger-btn {\\r\\n    display: block;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .navbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header a {\\r\\n    margin: 0;\\r\\n    padding: 20px;\\r\\n    transition: all 0.1s ease-in-out;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .nav-link {\\r\\n    margin-left: 0;\\r\\n    margin-right: 0;\\r\\n    font-size: 13px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .nav-link:first-child {\\r\\n    border-radius: 7px 7px 0 0;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .nav-link:last-child {\\r\\n    border-radius: 0 0 7px 7px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .nav-link:hover {\\r\\n    background-color: #002c5f;\\r\\n  }\\r\\n\\r\\n  .main-wrapper {\\r\\n    height: auto;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .content h1 {\\r\\n    max-width: 95%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main {\\r\\n    padding: 0 15px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-evenly;\\r\\n    height: 100%;\\r\\n    margin-top: 0;\\r\\n    align-items: unset;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .formatted-results .formatted-result:nth-child(1) {\\r\\n    margin-right: 19px;\\r\\n    margin-bottom: 15px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .formatted-results .formatted-result:nth-child(2) {\\r\\n    margin-right: 0;\\r\\n    max-width: 98%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-output {\\r\\n    width: 26%;\\r\\n    margin-right: 0;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-results {\\r\\n    padding: 16px 18px;\\r\\n    flex-direction: column;\\r\\n    max-height: 259px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .json-results {\\r\\n    display: none;\\r\\n    flex-wrap: nowrap;\\r\\n    padding: 8px 5px;\\r\\n    height: 287px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .json-btn {\\r\\n    font-size: 14px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .valid-display {\\r\\n    padding-bottom: 2px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .content {\\r\\n    z-index: 9;\\r\\n    width: unset;\\r\\n    padding: 20px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .validation-wrapper {\\r\\n    width: unset;\\r\\n    padding: 20px;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties {\\r\\n    padding: 48px 15px;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties .properties-items {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties-items .properties-item {\\r\\n    margin-bottom: 10px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper {\\r\\n    padding: 82px 15px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-name {\\r\\n    width: 37%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block {\\r\\n    width: 92%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-desc {\\r\\n    margin-left: 11px;\\r\\n    font-size: 15px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-type {\\r\\n    margin-left: 13px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-desc {\\r\\n    margin: 11px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-type {\\r\\n    width: 39%;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    padding: 39px 15px;\\r\\n    height: auto;\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .links-wrapper {\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .footer-copywrite {\\r\\n    margin-top: 30px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 700px) {\\r\\n  .main-wrapper header {\\r\\n    padding: 40px 25px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header img.logo {\\r\\n    width: 240px;\\r\\n    height: 32px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header a {\\r\\n    margin: 0;\\r\\n    padding: 20px;\\r\\n    transition: all 0.1s ease-in-out;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .header .nav-link {\\r\\n    margin-right: 0;\\r\\n    font-size: 13px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper {\\r\\n    height: auto;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main {\\r\\n    padding: 0;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-evenly;\\r\\n    height: 100%;\\r\\n    margin-top: 0;\\r\\n    align-items: unset;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .content::before {\\r\\n    content: \\\"\\\";\\r\\n    height: 159px;\\r\\n    left: 26px;\\r\\n    top: 59px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .formatted-results .formatted-result:nth-child(2) {\\r\\n    margin-right: 0;\\r\\n    max-width: 95%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .content {\\r\\n    line-height: 37px;\\r\\n    z-index: 9;\\r\\n    width: unset;\\r\\n    padding: 49px;\\r\\n    position: relative;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .content h1 {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-results {\\r\\n    padding: 20px 18px;\\r\\n    flex-direction: column;\\r\\n    max-height: 259px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .formatted-output {\\r\\n    width: 42%;\\r\\n    margin-right: 0;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .json-results {\\r\\n    display: none;\\r\\n    flex-wrap: nowrap;\\r\\n    padding: 8px 5px;\\r\\n    height: 287px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .validation-wrapper .valid-display {\\r\\n    padding-bottom: 2px;\\r\\n  }\\r\\n\\r\\n  .main-wrapper .main .validation-wrapper {\\r\\n    width: unset;\\r\\n    padding: 20px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper {\\r\\n    padding: 82px 2px 82px 15px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation h1 {\\r\\n    font-size: 48px;\\r\\n    line-height: 59px;\\r\\n    margin-bottom: 64px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item h3 {\\r\\n    position: relative;\\r\\n    padding-left: 21px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item h3::before {\\r\\n    content: \\\"\\\";\\r\\n    width: 50px;\\r\\n    height: 47px;\\r\\n    left: 0;\\r\\n    top: -9px;\\r\\n    position: absolute;\\r\\n    border-left: 7px solid hsl(213deg 97% 38%);\\r\\n    padding-right: 10px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block p {\\r\\n    margin-bottom: 0px;\\r\\n    padding: 0;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties {\\r\\n    padding: 48px 20px;\\r\\n  }\\r\\n\\r\\n  .properties-section .properties .properties-items {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params h4 {\\r\\n    padding-left: 21px;\\r\\n    position: relative;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params h4::before {\\r\\n    padding-left: 21px;\\r\\n    content: \\\"\\\";\\r\\n    width: 50px;\\r\\n    height: 47px;\\r\\n    left: 0;\\r\\n    top: -9px;\\r\\n    position: absolute;\\r\\n    border-left: 7px solid hsl(213deg 97% 38%);\\r\\n    padding-right: 10px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-row {\\r\\n    flex-shrink: 0;\\r\\n    overflow-x: auto;\\r\\n    column-gap: 41px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .param-row::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-name {\\r\\n    width: 39.2%;\\r\\n    flex-shrink: 0;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-type {\\r\\n    width: 37%;\\r\\n    margin-left: 99px;\\r\\n    flex-shrink: 0;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .params .param-desc {\\r\\n    margin-left: 11px;\\r\\n    flex-shrink: 0;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .documentation-item .code-block {\\r\\n    width: 95%;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-title {\\r\\n    padding-left: 21px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-title::before {\\r\\n    padding-left: 21px;\\r\\n    content: \\\"\\\";\\r\\n    width: 50px;\\r\\n    height: 58px;\\r\\n    left: 0;\\r\\n    top: -13px;\\r\\n    position: absolute;\\r\\n    border-left: 7px solid hsl(213deg 97% 38%);\\r\\n    padding-right: 10px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-row {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    margin: 18px 0;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-desc {\\r\\n    margin: 11px;\\r\\n  }\\r\\n\\r\\n  .documentation-wrapper .status-params .param-type {\\r\\n    width: 39%;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    padding: 39px 15px;\\r\\n    justify-content: flex-start;\\r\\n    height: auto;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n  }\\r\\n\\r\\n  .footer img.footer-logo {\\r\\n    width: 240px;\\r\\n    height: 32px;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper {\\r\\n    margin-top: 12px;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .links-wrapper {\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .footer-copywrite {\\r\\n    text-align: left;\\r\\n    margin-top: 30px;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .footer .links-wrapper .footer-link:not(.footer-link:last-of-type) {\\r\\n    margin-right: 4px;\\r\\n  }\\r\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://wordplex/./src/styles/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/json-format-highlight/dist/json-format-highlight.js":
/*!**************************************************************************!*\
  !*** ./node_modules/json-format-highlight/dist/json-format-highlight.js ***!
  \**************************************************************************/
/***/ (function(module) {

eval("(function (global, factory) {\n\t true ? module.exports = factory() :\n\t0;\n}(this, (function () { 'use strict';\n\nvar defaultColors = {\n  keyColor: 'dimgray',\n  numberColor: 'lightskyblue',\n  stringColor: 'lightcoral',\n  trueColor: 'lightseagreen',\n  falseColor: '#f66578',\n  nullColor: 'cornflowerblue'\n};\n\nvar entityMap = {\n  '&': '&amp;',\n  '<': '&lt;',\n  '>': '&gt;',\n  '\"': '&quot;',\n  \"'\": '&#39;',\n  '`': '&#x60;',\n  '=': '&#x3D;'\n};\n\nfunction escapeHtml(html) {\n  return String(html).replace(/[&<>\"'`=]/g, function (s) {\n    return entityMap[s];\n  });\n}\n\nfunction index (json, colorOptions) {\n  if ( colorOptions === void 0 ) colorOptions = {};\n\n  var valueType = typeof json;\n  if (valueType !== 'string') {\n    json = JSON.stringify(json, null, 2) || valueType;\n  }\n  var colors = Object.assign({}, defaultColors, colorOptions);\n  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');\n  return json.replace(/(\"(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\\"])*\"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+]?\\d+)?)/g, function (match) {\n    var color = colors.numberColor;\n    var style = '';\n    if (/^\"/.test(match)) {\n      if (/:$/.test(match)) {\n        color = colors.keyColor;\n      } else {\n        color = colors.stringColor;\n        match = '\"' + escapeHtml(match.substr(1, match.length - 2)) + '\"';\n        style = 'word-wrap:break-word;white-space:pre-wrap;';\n      }\n    } else {\n      color = /true/.test(match) ? colors.trueColor : /false/.test(match) ? colors.falseColor : /null/.test(match) ? colors.nullColor : color;\n    }\n    return (\"<span style=\\\"\" + style + \"color:\" + color + \"\\\">\" + match + \"</span>\");\n  });\n}\n\nreturn index;\n\n})));\n\n\n//# sourceURL=webpack://wordplex/./node_modules/json-format-highlight/dist/json-format-highlight.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar runtime = (function (exports) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n  function define(obj, key, value) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n    return obj[key];\n  }\n  try {\n    // IE 8 has a broken Object.defineProperty that only works on DOM objects.\n    define({}, \"\");\n  } catch (err) {\n    define = function(obj, key, value) {\n      return obj[key] = value;\n    };\n  }\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    generator._invoke = makeInvokeMethod(innerFn, self, context);\n\n    return generator;\n  }\n  exports.wrap = wrap;\n\n  // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n  function tryCatch(fn, obj, arg) {\n    try {\n      return { type: \"normal\", arg: fn.call(obj, arg) };\n    } catch (err) {\n      return { type: \"throw\", arg: err };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\";\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n  var IteratorPrototype = {};\n  define(IteratorPrototype, iteratorSymbol, function () {\n    return this;\n  });\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n  if (NativeIteratorPrototype &&\n      NativeIteratorPrototype !== Op &&\n      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype =\n    Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = GeneratorFunctionPrototype;\n  define(Gp, \"constructor\", GeneratorFunctionPrototype);\n  define(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction);\n  GeneratorFunction.displayName = define(\n    GeneratorFunctionPrototype,\n    toStringTagSymbol,\n    \"GeneratorFunction\"\n  );\n\n  // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function(method) {\n      define(prototype, method, function(arg) {\n        return this._invoke(method, arg);\n      });\n    });\n  }\n\n  exports.isGeneratorFunction = function(genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor\n      ? ctor === GeneratorFunction ||\n        // For the native GeneratorFunction constructor, the best we can\n        // do is to check its .name property.\n        (ctor.displayName || ctor.name) === \"GeneratorFunction\"\n      : false;\n  };\n\n  exports.mark = function(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      define(genFun, toStringTagSymbol, \"GeneratorFunction\");\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  };\n\n  // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n  exports.awrap = function(arg) {\n    return { __await: arg };\n  };\n\n  function AsyncIterator(generator, PromiseImpl) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n        if (value &&\n            typeof value === \"object\" &&\n            hasOwn.call(value, \"__await\")) {\n          return PromiseImpl.resolve(value.__await).then(function(value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function(err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return PromiseImpl.resolve(value).then(function(unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function(error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new PromiseImpl(function(resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(\n          callInvokeWithMethodAndArg,\n          // Avoid propagating failures to Promises returned by later\n          // invocations of the iterator.\n          callInvokeWithMethodAndArg\n        ) : callInvokeWithMethodAndArg();\n    }\n\n    // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n    this._invoke = enqueue;\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {\n    return this;\n  });\n  exports.AsyncIterator = AsyncIterator;\n\n  // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n    if (PromiseImpl === void 0) PromiseImpl = Promise;\n\n    var iter = new AsyncIterator(\n      wrap(innerFn, outerFn, self, tryLocsList),\n      PromiseImpl\n    );\n\n    return exports.isGeneratorFunction(outerFn)\n      ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function(result) {\n          return result.done ? result.value : iter.next();\n        });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        }\n\n        // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n\n        var record = tryCatch(innerFn, self, context);\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done\n            ? GenStateCompleted\n            : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted;\n          // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  }\n\n  // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n  function maybeInvokeDelegate(delegate, context) {\n    var method = delegate.iterator[context.method];\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method always terminates the yield* loop.\n      context.delegate = null;\n\n      if (context.method === \"throw\") {\n        // Note: [\"return\"] must be used for ES3 parsing compatibility.\n        if (delegate.iterator[\"return\"]) {\n          // If the delegate iterator has a return method, give it a\n          // chance to clean up.\n          context.method = \"return\";\n          context.arg = undefined;\n          maybeInvokeDelegate(delegate, context);\n\n          if (context.method === \"throw\") {\n            // If maybeInvokeDelegate(context) changed context.method from\n            // \"return\" to \"throw\", let that override the TypeError below.\n            return ContinueSentinel;\n          }\n        }\n\n        context.method = \"throw\";\n        context.arg = new TypeError(\n          \"The iterator does not provide a 'throw' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (! info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value;\n\n      // Resume execution at the desired location (see delegateYield).\n      context.next = delegate.nextLoc;\n\n      // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    }\n\n    // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n    context.delegate = null;\n    return ContinueSentinel;\n  }\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  defineIteratorMethods(Gp);\n\n  define(Gp, toStringTagSymbol, \"Generator\");\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  define(Gp, iteratorSymbol, function() {\n    return this;\n  });\n\n  define(Gp, \"toString\", function() {\n    return \"[object Generator]\";\n  });\n\n  function pushTryEntry(locs) {\n    var entry = { tryLoc: locs[0] };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{ tryLoc: \"root\" }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  exports.keys = function(object) {\n    var keys = [];\n    for (var key in object) {\n      keys.push(key);\n    }\n    keys.reverse();\n\n    // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      }\n\n      // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1, next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n\n          return next;\n        };\n\n        return next.next = next;\n      }\n    }\n\n    // Return an iterator with no values.\n    return { next: doneResult };\n  }\n  exports.values = values;\n\n  function doneResult() {\n    return { value: undefined, done: true };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n\n    reset: function(skipTempReset) {\n      this.prev = 0;\n      this.next = 0;\n      // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n\n      this.method = \"next\";\n      this.arg = undefined;\n\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" &&\n              hasOwn.call(this, name) &&\n              !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n\n    stop: function() {\n      this.done = true;\n\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n\n    dispatchException: function(exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !! caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n\n    abrupt: function(type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc <= this.prev &&\n            hasOwn.call(entry, \"finallyLoc\") &&\n            this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry &&\n          (type === \"break\" ||\n           type === \"continue\") &&\n          finallyEntry.tryLoc <= arg &&\n          arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n\n    complete: function(record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" ||\n          record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n\n    finish: function(finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n\n    \"catch\": function(tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n          return thrown;\n        }\n      }\n\n      // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n      throw new Error(\"illegal catch attempt\");\n    },\n\n    delegateYield: function(iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n\n  // Regardless of whether this script is executing as a CommonJS module\n  // or not, return the runtime object so that we can declare the variable\n  // regeneratorRuntime in the outer scope, which allows this module to be\n  // injected easily by `bin/regenerator --include-runtime script.js`.\n  return exports;\n\n}(\n  // If this script is executing as a CommonJS module, use module.exports\n  // as the regeneratorRuntime namespace. Otherwise create a new empty\n  // object. Either way, the resulting object will be used to initialize\n  // the regeneratorRuntime variable at the top of this file.\n   true ? module.exports : 0\n));\n\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  // This module should not be running in strict mode, so the above\n  // assignment should always work unless something is misconfigured. Just\n  // in case runtime.js accidentally runs in strict mode, in modern engines\n  // we can explicitly access globalThis. In older engines we can escape\n  // strict mode using a global Function call. This could conceivably fail\n  // if a Content Security Policy forbids using Function, but in that case\n  // the proper solution is to fix the accidental strict mode problem. If\n  // you've misconfigured your bundler to force strict mode and applied a\n  // CSP to forbid Function, and you're not willing to fix either of those\n  // problems, please detail your unique predicament in a GitHub issue.\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://wordplex/./node_modules/regenerator-runtime/runtime.js?");

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\nif (true) {\n  if (!_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (isNamedExport && p === \"default\") {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (isNamedExport && p === \"default\") {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var isNamedExport = !_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n    var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n\n    module.hot.accept(\n      /*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\",\n      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\");\n(function () {\n        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals, isNamedExport)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n\n              update(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://wordplex/./src/styles/main.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/img.jfif":
/*!*****************************!*\
  !*** ./src/assets/img.jfif ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6a30ad726da2dc22f163.jfif\";\n\n//# sourceURL=webpack://wordplex/./src/assets/img.jfif?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _asyncToGenerator)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\n\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n        args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n\n      _next(undefined);\n    });\n  };\n}\n\n//# sourceURL=webpack://wordplex/./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js?");

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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("index." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("01453481bb839bae6234")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "wordplex:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatewordplex"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/scripts/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/main.css");
/******/ 	
/******/ })()
;