"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/categories/[category]/[product]",{

/***/ "./pages/categories/[category]/[product].tsx":
/*!***************************************************!*\
  !*** ./pages/categories/[category]/[product].tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_storefront_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/storefront/Header */ \"./components/storefront/Header.tsx\");\n/* harmony import */ var _components_storefront_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/storefront/Footer */ \"./components/storefront/Footer.tsx\");\n/* harmony import */ var _components_storefront_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/storefront/Breadcrumbs */ \"./components/storefront/Breadcrumbs.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _lib_addToCart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/addToCart */ \"./lib/addToCart.ts\");\n// pages/categories/[category]/[product].tsx\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst ProductPage = (param)=>{\n    let { user } = param;\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { category, product } = router.query;\n    const [productDetails, setProductDetails] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (product) {\n            fetch(\"/api/products/\".concat(product)).then((res)=>res.json()).then((data)=>setProductDetails(data));\n        }\n    }, [\n        product\n    ]);\n    if (!productDetails) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n        lineNumber: 26,\n        columnNumber: 31\n    }, undefined);\n    const handleAddToCart = ()=>{\n        const productToAdd = {\n            productID: productDetails.productID,\n            productName: productDetails.productName,\n            productPrice: productDetails.productPrice,\n            productQuantity: 1\n        };\n        (0,_lib_addToCart__WEBPACK_IMPORTED_MODULE_7__.addToCart)(productToAdd);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col bg-slate-50 min-h-screen text-slate-800\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_storefront_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                user: user\n            }, void 0, false, {\n                fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-grow\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_storefront_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        links: [\n                            {\n                                title: \"Home\",\n                                href: \"/\"\n                            },\n                            {\n                                title: category,\n                                href: \"/categories/\".concat(category)\n                            },\n                            {\n                                title: productDetails.productName,\n                                href: \"#\"\n                            }\n                        ]\n                    }, void 0, false, {\n                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                        lineNumber: 42,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-wrap justify-center items-center p-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-full md:w-1/2 p-4\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {\n                                    src: productDetails.productImagePath,\n                                    alt: productDetails.productName,\n                                    width: 500,\n                                    height: 500,\n                                    layout: \"responsive\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                    lineNumber: 45,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                lineNumber: 44,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-full md:w-1/2 p-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                        className: \"text-2xl font-bold\",\n                                        children: productDetails.productName\n                                    }, void 0, false, {\n                                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                        lineNumber: 48,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-xl mt-4\",\n                                        children: [\n                                            \"$\",\n                                            productDetails.productPrice.toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                        lineNumber: 49,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-md mt-4\",\n                                        children: productDetails.productDescription\n                                    }, void 0, false, {\n                                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                        lineNumber: 50,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: handleAddToCart,\n                                        className: \"transition hover:scale-105 text-white bg-slate-700 font-bold mt-4 px-4 py-2 rounded hover:bg-slate-600\",\n                                        children: \"Add to Cart\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                        lineNumber: 51,\n                                        columnNumber: 13\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                                lineNumber: 47,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_storefront_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/antonyma/Desktop/4210_WebApp/Ierg4210/pages/categories/[category]/[product].tsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ProductPage, \"LCaZl9yBM/yar181gW0N/b1pmdI=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = ProductPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductPage);\nvar _c;\n$RefreshReg$(_c, \"ProductPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jYXRlZ29yaWVzL1tjYXRlZ29yeV0vW3Byb2R1Y3RdLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTRDOzs7QUFJSjtBQUNXO0FBQ1E7QUFDQTtBQUNVO0FBQ3RDO0FBQ29CO0FBRW5ELE1BQU1TLGNBQWM7UUFBQyxFQUFFQyxJQUFJLEVBQUU7O0lBQzNCLE1BQU1DLFNBQVNYLHNEQUFTQTtJQUN4QixNQUFNLEVBQUVZLFFBQVEsRUFBRUMsT0FBTyxFQUFFLEdBQUdGLE9BQU9HLEtBQUs7SUFDMUMsTUFBTSxDQUFDQyxnQkFBZ0JDLGtCQUFrQixHQUFHYiwrQ0FBUUEsQ0FBQztJQUVyREQsZ0RBQVNBLENBQUM7UUFDUixJQUFJVyxTQUFTO1lBQ1hJLE1BQU0saUJBQXlCLE9BQVJKLFVBQ3BCSyxJQUFJLENBQUMsQ0FBQ0MsTUFBUUEsSUFBSUMsSUFBSSxJQUN0QkYsSUFBSSxDQUFDLENBQUNHLE9BQVNMLGtCQUFrQks7UUFDdEM7SUFDRixHQUFHO1FBQUNSO0tBQVE7SUFFWixJQUFJLENBQUNFLGdCQUFnQixxQkFBTyw4REFBQ087a0JBQUk7Ozs7OztJQUVqQyxNQUFNQyxrQkFBa0I7UUFDdEIsTUFBTUMsZUFBZTtZQUNuQkMsV0FBV1YsZUFBZVUsU0FBUztZQUNuQ0MsYUFBYVgsZUFBZVcsV0FBVztZQUN2Q0MsY0FBY1osZUFBZVksWUFBWTtZQUN6Q0MsaUJBQWlCO1FBQ25CO1FBQ0FwQix5REFBU0EsQ0FBQ2dCO0lBQ1o7SUFFQSxxQkFDRSw4REFBQ0Y7UUFBSU8sV0FBVTs7MEJBQ2IsOERBQUN6QixxRUFBTUE7Z0JBQUNNLE1BQU1BOzs7Ozs7MEJBQ2QsOERBQUNvQjtnQkFBS0QsV0FBVTs7a0NBQ2QsOERBQUN2QiwwRUFBV0E7d0JBQUN5QixPQUFPOzRCQUFDO2dDQUFFQyxPQUFPO2dDQUFRQyxNQUFNOzRCQUFJOzRCQUFHO2dDQUFFRCxPQUFPcEI7Z0NBQVVxQixNQUFNLGVBQXdCLE9BQVRyQjs0QkFBVzs0QkFBRztnQ0FBRW9CLE9BQU9qQixlQUFlVyxXQUFXO2dDQUFFTyxNQUFNOzRCQUFJO3lCQUFFOzs7Ozs7a0NBQzFKLDhEQUFDWDt3QkFBSU8sV0FBVTs7MENBQ2IsOERBQUNQO2dDQUFJTyxXQUFVOzBDQUNiLDRFQUFDdEIsbURBQUtBO29DQUFDMkIsS0FBS25CLGVBQWVvQixnQkFBZ0I7b0NBQUVDLEtBQUtyQixlQUFlVyxXQUFXO29DQUFFVyxPQUFPO29DQUFLQyxRQUFRO29DQUFLQyxRQUFPOzs7Ozs7Ozs7OzswQ0FFaEgsOERBQUNqQjtnQ0FBSU8sV0FBVTs7a0RBQ2IsOERBQUNXO3dDQUFHWCxXQUFVO2tEQUFzQmQsZUFBZVcsV0FBVzs7Ozs7O2tEQUM5RCw4REFBQ2U7d0NBQUVaLFdBQVU7OzRDQUFlOzRDQUFFZCxlQUFlWSxZQUFZLENBQUNlLE9BQU8sQ0FBQzs7Ozs7OztrREFDbEUsOERBQUNEO3dDQUFFWixXQUFVO2tEQUFnQmQsZUFBZTRCLGtCQUFrQjs7Ozs7O2tEQUM5RCw4REFBQ0M7d0NBQU9DLFNBQVN0Qjt3Q0FBaUJNLFdBQVU7a0RBQXlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBTTNKLDhEQUFDeEIscUVBQU1BOzs7Ozs7Ozs7OztBQUdiO0dBL0NNSTs7UUFDV1Qsa0RBQVNBOzs7S0FEcEJTOztBQXVFTiwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9jYXRlZ29yaWVzL1tjYXRlZ29yeV0vW3Byb2R1Y3RdLnRzeD82YmY0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2NhdGVnb3JpZXMvW2NhdGVnb3J5XS9bcHJvZHVjdF0udHN4XHJcbmltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wcyB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQgeyBwYXJzZUNvb2tpZXMgfSBmcm9tICdub29raWVzJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3RvcmVmcm9udC9IZWFkZXInO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3RvcmVmcm9udC9Gb290ZXInO1xyXG5pbXBvcnQgQnJlYWRjcnVtYnMgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zdG9yZWZyb250L0JyZWFkY3J1bWJzJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgeyBhZGRUb0NhcnQgfSBmcm9tICcuLi8uLi8uLi9saWIvYWRkVG9DYXJ0JztcclxuXHJcbmNvbnN0IFByb2R1Y3RQYWdlID0gKHsgdXNlciB9KSA9PiB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgeyBjYXRlZ29yeSwgcHJvZHVjdCB9ID0gcm91dGVyLnF1ZXJ5O1xyXG4gIGNvbnN0IFtwcm9kdWN0RGV0YWlscywgc2V0UHJvZHVjdERldGFpbHNdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICBmZXRjaChgL2FwaS9wcm9kdWN0cy8ke3Byb2R1Y3R9YClcclxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiBzZXRQcm9kdWN0RGV0YWlscyhkYXRhKSk7XHJcbiAgICB9XHJcbiAgfSwgW3Byb2R1Y3RdKTtcclxuXHJcbiAgaWYgKCFwcm9kdWN0RGV0YWlscykgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcclxuXHJcbiAgY29uc3QgaGFuZGxlQWRkVG9DYXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvZHVjdFRvQWRkID0ge1xyXG4gICAgICBwcm9kdWN0SUQ6IHByb2R1Y3REZXRhaWxzLnByb2R1Y3RJRCxcclxuICAgICAgcHJvZHVjdE5hbWU6IHByb2R1Y3REZXRhaWxzLnByb2R1Y3ROYW1lLFxyXG4gICAgICBwcm9kdWN0UHJpY2U6IHByb2R1Y3REZXRhaWxzLnByb2R1Y3RQcmljZSxcclxuICAgICAgcHJvZHVjdFF1YW50aXR5OiAxLCAvLyBEZWZhdWx0IHF1YW50aXR5IHRvIDEgb3IgYW55IGxvZ2ljIHlvdSBoYXZlXHJcbiAgICB9O1xyXG4gICAgYWRkVG9DYXJ0KHByb2R1Y3RUb0FkZCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBiZy1zbGF0ZS01MCBtaW4taC1zY3JlZW4gdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgPEhlYWRlciB1c2VyPXt1c2VyfSAvPlxyXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LWdyb3dcIj5cclxuICAgICAgICA8QnJlYWRjcnVtYnMgbGlua3M9e1t7IHRpdGxlOiAnSG9tZScsIGhyZWY6ICcvJyB9LCB7IHRpdGxlOiBjYXRlZ29yeSwgaHJlZjogYC9jYXRlZ29yaWVzLyR7Y2F0ZWdvcnl9YCB9LCB7IHRpdGxlOiBwcm9kdWN0RGV0YWlscy5wcm9kdWN0TmFtZSwgaHJlZjogJyMnIH1dfSAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHAtNFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzIgcC00XCI+XHJcbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e3Byb2R1Y3REZXRhaWxzLnByb2R1Y3RJbWFnZVBhdGh9IGFsdD17cHJvZHVjdERldGFpbHMucHJvZHVjdE5hbWV9IHdpZHRoPXs1MDB9IGhlaWdodD17NTAwfSBsYXlvdXQ9XCJyZXNwb25zaXZlXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzIgcC00XCI+XHJcbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj57cHJvZHVjdERldGFpbHMucHJvZHVjdE5hbWV9PC9oMT5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCBtdC00XCI+JHtwcm9kdWN0RGV0YWlscy5wcm9kdWN0UHJpY2UudG9GaXhlZCgyKX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbWQgbXQtNFwiPntwcm9kdWN0RGV0YWlscy5wcm9kdWN0RGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUFkZFRvQ2FydH0gY2xhc3NOYW1lPVwidHJhbnNpdGlvbiBob3ZlcjpzY2FsZS0xMDUgdGV4dC13aGl0ZSBiZy1zbGF0ZS03MDAgZm9udC1ib2xkIG10LTQgcHgtNCBweS0yIHJvdW5kZWQgaG92ZXI6Ymctc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgQWRkIHRvIENhcnRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9tYWluPlxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczogR2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGN0eCkgPT4ge1xyXG4gIGNvbnN0IGNvb2tpZXMgPSBwYXJzZUNvb2tpZXMoY3R4KTtcclxuICBjb25zdCB0b2tlbiA9IGNvb2tpZXMuYXV0aDtcclxuICBsZXQgdXNlciA9IG51bGw7XHJcblxyXG4gIGlmICh0b2tlbikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpO1xyXG4gICAgICB1c2VyID0ge1xyXG4gICAgICAgIGlzQWRtaW46IGRlY29kZWQuaXNBZG1pbiB8fCBmYWxzZSwgLy8gRGVmYXVsdCB0byBmYWxzZSBpZiB1bmRlZmluZWRcclxuICAgICAgICB1c2VybmFtZTogZGVjb2RlZC51c2VybmFtZSB8fCAnR3Vlc3QnLCAvLyBEZWZhdWx0IHRvICdHdWVzdCcgaWYgdW5kZWZpbmVkXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB2ZXJpZnlpbmcgSldUOicsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczogeyB1c2VyIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RQYWdlO1xyXG4iXSwibmFtZXMiOlsidXNlUm91dGVyIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkhlYWRlciIsIkZvb3RlciIsIkJyZWFkY3J1bWJzIiwiSW1hZ2UiLCJhZGRUb0NhcnQiLCJQcm9kdWN0UGFnZSIsInVzZXIiLCJyb3V0ZXIiLCJjYXRlZ29yeSIsInByb2R1Y3QiLCJxdWVyeSIsInByb2R1Y3REZXRhaWxzIiwic2V0UHJvZHVjdERldGFpbHMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImRpdiIsImhhbmRsZUFkZFRvQ2FydCIsInByb2R1Y3RUb0FkZCIsInByb2R1Y3RJRCIsInByb2R1Y3ROYW1lIiwicHJvZHVjdFByaWNlIiwicHJvZHVjdFF1YW50aXR5IiwiY2xhc3NOYW1lIiwibWFpbiIsImxpbmtzIiwidGl0bGUiLCJocmVmIiwic3JjIiwicHJvZHVjdEltYWdlUGF0aCIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwibGF5b3V0IiwiaDEiLCJwIiwidG9GaXhlZCIsInByb2R1Y3REZXNjcmlwdGlvbiIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/categories/[category]/[product].tsx\n"));

/***/ })

});