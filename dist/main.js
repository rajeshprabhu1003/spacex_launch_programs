!function(s){var t={};function a(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=s,a.c=t,a.d=function(e,n,s){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(n,e){if(1&e&&(n=a(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)a.d(s,t,function(e){return n[e]}.bind(null,t));return s},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="",a(a.s="./src/js/index.js")}({"./src/css/styles.scss":
/*!*****************************!*\
  !*** ./src/css/styles.scss ***!
  \*****************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/styles.scss?")},"./src/js/http-requests.js":
/*!*********************************!*\
  !*** ./src/js/http-requests.js ***!
  \*********************************/
/*! no static exports found */function(module,exports){eval("module.exports = class HttpRequests {\n  async get(url) {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  }\n\n};\n\n//# sourceURL=webpack:///./src/js/http-requests.js?")},"./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/styles.scss */ "./src/css/styles.scss");\n/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\n//CSS Imports\n //JS Imports\n\nconst Launch = __webpack_require__(/*! ./launch */ "./src/js/launch.js");\n\nconst HttpRequests = __webpack_require__(/*! ./http-requests */ "./src/js/http-requests.js");\n\nconst http = new HttpRequests(); //variable declarations\n\nlet baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100";\n$(window).resize(function () {\n  /*If browser resized, check width again */\n  if ($(window).width() > 620) {\n    $(".filter-body").show();\n  }\n});\n$(document).ready(function () {\n  populateLaunchYears();\n  populateLaunches(baseUrl); //Event Handlers\n\n  $(".launch-year .filter-button").on("click", function () {\n    let filterBy = "launch_year";\n    let elements = ".launch-year .filter-button";\n    filterData(this, filterBy, elements);\n  });\n  $(".launch-success .filter-button").on("click", function () {\n    let filterBy = "launch_success";\n    let elements = ".launch-success .filter-button";\n    filterData(this, filterBy, elements);\n  });\n  $(".landing-success .filter-button").on("click", function () {\n    let filterBy = "land_success";\n    let elements = ".landing-success .filter-button";\n    filterData(this, filterBy, elements);\n  });\n  $(".toggleFilter").click(function () {\n    if ($(".toggleFilter .arrow").hasClass(\'up\')) $(".toggleFilter .arrow").removeClass(\'up\').addClass("down");else $(".toggleFilter .arrow").removeClass(\'down\').addClass("up");\n    $(".filter-body").slideToggle();\n  });\n}); //Function Declarations\n\nfunction showLoader(flag) {\n  flag ? $(".page-loader").show().fadeIn() : $(".page-loader").hide().fadeOut();\n}\n\nfunction populateLaunchYears() {\n  const startYear = 2006;\n  const currentYear = new Date().getFullYear();\n\n  for (let i = startYear; i <= currentYear; i++) {\n    let elem = `<div class="filter-button launchYear">${i}</div>`;\n    $(".sub-filter-content.launch-year").append(elem);\n  }\n}\n\nfunction filterData(elem, filterBy, elements) {\n  const value = $(elem).text().toLowerCase();\n  const isActive = $(elem).hasClass("active");\n  $(elements).removeClass("active");\n  baseUrl = removeQueryStringParam(baseUrl, filterBy);\n\n  if (!isActive) {\n    $(elem).addClass("active");\n    baseUrl += `&${filterBy}=${value}`;\n  }\n\n  populateLaunches(baseUrl);\n}\n\nfunction populateLaunches(url) {\n  $(".programs-content").html("");\n  showLoader(true);\n  http.get(url).then(res => {\n    if (res.length > 0) {\n      res.map(item => {\n        const launchItem = new Launch(item.mission_name, item.flight_number, item.mission_id, item.links.mission_patch_small, item.launch_year, item.launch_success, item.land_success);\n        let missionTemplate = createMissionTemplate(launchItem);\n        $(".programs-content").append(missionTemplate);\n      });\n    } else {\n      $(".programs-content").html("<div class=\'no-data\'><span>No Missions Found.</span></div>");\n    }\n\n    showLoader(false);\n  });\n}\n\nfunction createMissionTemplate(launchItem) {\n  return `<div class="mission">\n                <div class="img-container">\n                    <img class="logo" src="${launchItem.logo || \'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png\'}" alt="SpaceX Mission">\n                </div>\n                <div class="text-container">\n                    <p class="mission-name">${launchItem.missonName} #${launchItem.flightNo}</p>\n                    <div class="mission-table">\n                        <div class="tr mission-ids">\n                            <div class="td label">Mission Ids: </div>\n                            <div class="td id output"><ul>${launchItem.ids.length > 0 ? launchItem.ids.map(id => `<li>${id}</li>`).join(\'\') : \'N/A\'}</ul></div>\n                        </div>\n                        <div class="tr mission-year">\n                            <div class="td label">Launch Year: </div>\n                            <div class="td output">${launchItem.launchYear}</div>\n                        </div>\n                        <div class="tr mission-launch">\n                            <div class="td label">Successful Launch: </div>\n                            <div class="td output">${launchItem.launchSuccess}</div>\n                        </div>\n                        <div class="tr mission-landing">\n                            <div class="td label">Successful Landing: </div>\n                            <div class="td output">${launchItem.launchSuccess}</div>\n                        </div>\n                    </div> \n                </div>\n            </div>`;\n}\n\nfunction removeQueryStringParam(url, key) {\n  return url.replace(new RegExp(\'&\' + key + "=\\\\w+"), "").replace("?&", "?");\n}\n\n//# sourceURL=webpack:///./src/js/index.js?')},"./src/js/launch.js":
/*!**************************!*\
  !*** ./src/js/launch.js ***!
  \**************************/
/*! no static exports found */function(module,exports){eval("module.exports = class Launch {\n  constructor(missonName, flightNo, ids, logo, launchYear, launchSuccess, landSuccess) {\n    this.missonName = missonName;\n    this.flightNo = flightNo;\n    this.ids = ids;\n    this.logo = logo;\n    this.launchYear = launchYear;\n    this.launchSuccess = launchSuccess;\n    this.landSuccess = landSuccess;\n  }\n\n};\n\n//# sourceURL=webpack:///./src/js/launch.js?")}});