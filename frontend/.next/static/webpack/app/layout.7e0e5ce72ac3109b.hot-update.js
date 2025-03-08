"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./components/common/Header.jsx":
/*!**************************************!*\
  !*** ./components/common/Header.jsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/context/AuthContext */ \"(app-pages-browser)/./context/AuthContext.js\");\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Header.module.css */ \"(app-pages-browser)/./components/common/Header.module.css\");\n/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Header() {\n    _s();\n    const [isMenuOpen, setIsMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const { isAuthenticated, user, logout } = (0,_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__.useAuth)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();\n    const toggleMenu = ()=>{\n        setIsMenuOpen(!isMenuOpen);\n    };\n    const closeMenu = ()=>{\n        setIsMenuOpen(false);\n    };\n    const isActive = (path)=>{\n        if (path === \"/admin\") {\n            return pathname === path; // Exact match for Dashboard\n        }\n        return pathname === path || pathname.startsWith(\"\".concat(path, \"/\")); // Subpath match for others\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().header),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().logo),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        href: \"/\",\n                        children: \"Spirit11\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                        lineNumber: 32,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().menuToggle),\n                    onClick: toggleMenu,\n                    \"aria-label\": \"Toggle menu\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                            lineNumber: 40,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                    lineNumber: 35,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                    className: \"\".concat((_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().nav), \" \").concat(isMenuOpen ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().open) : \"\"),\n                    children: isAuthenticated ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            user.isAdmin ? // Admin navigation\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/admin\",\n                                        className: isActive(\"/admin\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Dashboard\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 51,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/admin/players\",\n                                        className: isActive(\"/admin/players\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Players\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 58,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/admin/tournament-summary\",\n                                        className: isActive(\"/admin/tournament-summary\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Tournament\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 65,\n                                        columnNumber: 19\n                                    }, this)\n                                ]\n                            }, void 0, true) : // User navigation\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/players\",\n                                        className: isActive(\"/players\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Players\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/select-team\",\n                                        className: isActive(\"/select-team\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Select Team\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 83,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/my-team\",\n                                        className: isActive(\"/my-team\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"My Team\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 90,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        href: \"/leaderboard\",\n                                        className: isActive(\"/leaderboard\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                        onClick: closeMenu,\n                                        children: \"Leaderboard\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 97,\n                                        columnNumber: 19\n                                    }, this)\n                                ]\n                            }, void 0, true),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().userMenu),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().username),\n                                        children: [\n                                            \"Hello, \",\n                                            user.username\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 108,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().logoutButton),\n                                        onClick: ()=>{\n                                            logout();\n                                            closeMenu();\n                                        },\n                                        children: \"Logout\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                        lineNumber: 109,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                lineNumber: 107,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true) : // Not authenticated\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                href: \"/login\",\n                                className: isActive(\"/login\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                onClick: closeMenu,\n                                children: \"Login\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                lineNumber: 123,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                href: \"/register\",\n                                className: isActive(\"/register\") ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().active) : \"\",\n                                onClick: closeMenu,\n                                children: \"Register\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                                lineNumber: 130,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n            lineNumber: 30,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\common\\\\Header.jsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, this);\n}\n_s(Header, \"dc3MXxEB1l2MwtfHTw1FUGTkrvU=\", false, function() {\n    return [\n        _context_AuthContext__WEBPACK_IMPORTED_MODULE_4__.useAuth,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDaUM7QUFDSjtBQUNpQjtBQUNFO0FBQ1A7QUFFMUIsU0FBU0s7O0lBQ3RCLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHUCwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLEVBQUVRLGVBQWUsRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUUsR0FBR1AsNkRBQU9BO0lBQ2pELE1BQU1RLFdBQVdULDREQUFXQTtJQUU1QixNQUFNVSxhQUFhO1FBQ2pCTCxjQUFjLENBQUNEO0lBQ2pCO0lBRUEsTUFBTU8sWUFBWTtRQUNoQk4sY0FBYztJQUNoQjtJQUVBLE1BQU1PLFdBQVcsQ0FBQ0M7UUFDaEIsSUFBSUEsU0FBUyxVQUFVO1lBQ3JCLE9BQU9KLGFBQWFJLE1BQU0sNEJBQTRCO1FBQ3hEO1FBQ0EsT0FBT0osYUFBYUksUUFBUUosU0FBU0ssVUFBVSxDQUFDLEdBQVEsT0FBTEQsTUFBSyxPQUFLLDJCQUEyQjtJQUMxRjtJQUVBLHFCQUNFLDhEQUFDRTtRQUFPQyxXQUFXZCxrRUFBYTtrQkFDOUIsNEVBQUNlO1lBQUlELFdBQVdkLHFFQUFnQjs7OEJBQzlCLDhEQUFDZTtvQkFBSUQsV0FBV2QsZ0VBQVc7OEJBQ3pCLDRFQUFDSCxpREFBSUE7d0JBQUNxQixNQUFLO2tDQUFJOzs7Ozs7Ozs7Ozs4QkFHakIsOERBQUNDO29CQUNDTCxXQUFXZCxzRUFBaUI7b0JBQzVCcUIsU0FBU2I7b0JBQ1RjLGNBQVc7O3NDQUVYLDhEQUFDQzs7Ozs7c0NBQ0QsOERBQUNBOzs7OztzQ0FDRCw4REFBQ0E7Ozs7Ozs7Ozs7OzhCQUdILDhEQUFDQztvQkFBSVYsV0FBVyxHQUFpQlosT0FBZEYsK0RBQVUsRUFBQyxLQUFpQyxPQUE5QkUsYUFBYUYsZ0VBQVcsR0FBRzs4QkFDekRJLGdDQUNDOzs0QkFDR0MsS0FBS3FCLE9BQU8sR0FDWCxtQkFBbUI7MENBQ25COztrREFDRSw4REFBQzdCLGlEQUFJQTt3Q0FDSHFCLE1BQUs7d0NBQ0xKLFdBQVdKLFNBQVMsWUFBWVYsa0VBQWEsR0FBRzt3Q0FDaERxQixTQUFTWjtrREFDVjs7Ozs7O2tEQUdELDhEQUFDWixpREFBSUE7d0NBQ0hxQixNQUFLO3dDQUNMSixXQUFXSixTQUFTLG9CQUFvQlYsa0VBQWEsR0FBRzt3Q0FDeERxQixTQUFTWjtrREFDVjs7Ozs7O2tEQUdELDhEQUFDWixpREFBSUE7d0NBQ0hxQixNQUFLO3dDQUNMSixXQUFXSixTQUFTLCtCQUErQlYsa0VBQWEsR0FBRzt3Q0FDbkVxQixTQUFTWjtrREFDVjs7Ozs7OzsrQ0FLSCxrQkFBa0I7MENBQ2xCOztrREFDRSw4REFBQ1osaURBQUlBO3dDQUNIcUIsTUFBSzt3Q0FDTEosV0FBV0osU0FBUyxjQUFjVixrRUFBYSxHQUFHO3dDQUNsRHFCLFNBQVNaO2tEQUNWOzs7Ozs7a0RBR0QsOERBQUNaLGlEQUFJQTt3Q0FDSHFCLE1BQUs7d0NBQ0xKLFdBQVdKLFNBQVMsa0JBQWtCVixrRUFBYSxHQUFHO3dDQUN0RHFCLFNBQVNaO2tEQUNWOzs7Ozs7a0RBR0QsOERBQUNaLGlEQUFJQTt3Q0FDSHFCLE1BQUs7d0NBQ0xKLFdBQVdKLFNBQVMsY0FBY1Ysa0VBQWEsR0FBRzt3Q0FDbERxQixTQUFTWjtrREFDVjs7Ozs7O2tEQUdELDhEQUFDWixpREFBSUE7d0NBQ0hxQixNQUFLO3dDQUNMSixXQUFXSixTQUFTLGtCQUFrQlYsa0VBQWEsR0FBRzt3Q0FDdERxQixTQUFTWjtrREFDVjs7Ozs7Ozs7MENBTUwsOERBQUNNO2dDQUFJRCxXQUFXZCxvRUFBZTs7a0RBQzdCLDhEQUFDdUI7d0NBQUtULFdBQVdkLG9FQUFlOzs0Q0FBRTs0Q0FBUUssS0FBS3dCLFFBQVE7Ozs7Ozs7a0RBQ3ZELDhEQUFDVjt3Q0FDQ0wsV0FBV2Qsd0VBQW1CO3dDQUM5QnFCLFNBQVM7NENBQ1BmOzRDQUNBRzt3Q0FDRjtrREFDRDs7Ozs7Ozs7Ozs7Ozt1Q0FNTCxvQkFBb0I7a0NBQ3BCOzswQ0FDRSw4REFBQ1osaURBQUlBO2dDQUNIcUIsTUFBSztnQ0FDTEosV0FBV0osU0FBUyxZQUFZVixrRUFBYSxHQUFHO2dDQUNoRHFCLFNBQVNaOzBDQUNWOzs7Ozs7MENBR0QsOERBQUNaLGlEQUFJQTtnQ0FDSHFCLE1BQUs7Z0NBQ0xKLFdBQVdKLFNBQVMsZUFBZVYsa0VBQWEsR0FBRztnQ0FDbkRxQixTQUFTWjswQ0FDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU2Y7R0F2SXdCUjs7UUFFb0JGLHlEQUFPQTtRQUNoQ0Qsd0RBQVdBOzs7S0FITkciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9jb21tb24vSGVhZGVyLmpzeD9hYzVjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcclxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7IHVzZVBhdGhuYW1lIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcclxuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJ0AvY29udGV4dC9BdXRoQ29udGV4dCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9IZWFkZXIubW9kdWxlLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoKSB7XHJcbiAgY29uc3QgW2lzTWVudU9wZW4sIHNldElzTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgaXNBdXRoZW50aWNhdGVkLCB1c2VyLCBsb2dvdXQgfSA9IHVzZUF1dGgoKTtcclxuICBjb25zdCBwYXRobmFtZSA9IHVzZVBhdGhuYW1lKCk7XHJcbiAgXHJcbiAgY29uc3QgdG9nZ2xlTWVudSA9ICgpID0+IHtcclxuICAgIHNldElzTWVudU9wZW4oIWlzTWVudU9wZW4pO1xyXG4gIH07XHJcbiAgXHJcbiAgY29uc3QgY2xvc2VNZW51ID0gKCkgPT4ge1xyXG4gICAgc2V0SXNNZW51T3BlbihmYWxzZSk7XHJcbiAgfTtcclxuICBcclxuICBjb25zdCBpc0FjdGl2ZSA9IChwYXRoKSA9PiB7XHJcbiAgICBpZiAocGF0aCA9PT0gXCIvYWRtaW5cIikge1xyXG4gICAgICByZXR1cm4gcGF0aG5hbWUgPT09IHBhdGg7IC8vIEV4YWN0IG1hdGNoIGZvciBEYXNoYm9hcmRcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRobmFtZSA9PT0gcGF0aCB8fCBwYXRobmFtZS5zdGFydHNXaXRoKGAke3BhdGh9L2ApOyAvLyBTdWJwYXRoIG1hdGNoIGZvciBvdGhlcnNcclxuICB9O1xyXG4gIFxyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlcn0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxvZ299PlxyXG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5TcGlyaXQxMTwvTGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubWVudVRvZ2dsZX1cclxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZU1lbnV9XHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiVG9nZ2xlIG1lbnVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBcclxuICAgICAgICA8bmF2IGNsYXNzTmFtZT17YCR7c3R5bGVzLm5hdn0gJHtpc01lbnVPcGVuID8gc3R5bGVzLm9wZW4gOiAnJ31gfT5cclxuICAgICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAge3VzZXIuaXNBZG1pbiA/IChcclxuICAgICAgICAgICAgICAgIC8vIEFkbWluIG5hdmlnYXRpb25cclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvYWRtaW5cIiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzQWN0aXZlKCcvYWRtaW4nKSA/IHN0eWxlcy5hY3RpdmUgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU1lbnV9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBEYXNoYm9hcmRcclxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICA8TGluayBcclxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiL2FkbWluL3BsYXllcnNcIiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzQWN0aXZlKCcvYWRtaW4vcGxheWVycycpID8gc3R5bGVzLmFjdGl2ZSA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlTWVudX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllcnNcclxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICA8TGluayBcclxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiL2FkbWluL3RvdXJuYW1lbnQtc3VtbWFyeVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNBY3RpdmUoJy9hZG1pbi90b3VybmFtZW50LXN1bW1hcnknKSA/IHN0eWxlcy5hY3RpdmUgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU1lbnV9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBUb3VybmFtZW50XHJcbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAvLyBVc2VyIG5hdmlnYXRpb25cclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvcGxheWVyc1wiIFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNBY3RpdmUoJy9wbGF5ZXJzJykgPyBzdHlsZXMuYWN0aXZlIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VNZW51fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyc1xyXG4gICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvc2VsZWN0LXRlYW1cIiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzQWN0aXZlKCcvc2VsZWN0LXRlYW0nKSA/IHN0eWxlcy5hY3RpdmUgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU1lbnV9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBTZWxlY3QgVGVhbVxyXG4gICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvbXktdGVhbVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNBY3RpdmUoJy9teS10ZWFtJykgPyBzdHlsZXMuYWN0aXZlIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VNZW51fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgTXkgVGVhbVxyXG4gICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvbGVhZGVyYm9hcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzQWN0aXZlKCcvbGVhZGVyYm9hcmQnKSA/IHN0eWxlcy5hY3RpdmUgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU1lbnV9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBMZWFkZXJib2FyZFxyXG4gICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudXNlck1lbnV9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMudXNlcm5hbWV9PkhlbGxvLCB7dXNlci51c2VybmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5sb2dvdXRCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2dvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZU1lbnUoKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgTG9nb3V0XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAvLyBOb3QgYXV0aGVudGljYXRlZFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxMaW5rIFxyXG4gICAgICAgICAgICAgICAgaHJlZj1cIi9sb2dpblwiIFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpc0FjdGl2ZSgnL2xvZ2luJykgPyBzdHlsZXMuYWN0aXZlIDogJyd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZU1lbnV9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgPExpbmsgXHJcbiAgICAgICAgICAgICAgICBocmVmPVwiL3JlZ2lzdGVyXCIgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzQWN0aXZlKCcvcmVnaXN0ZXInKSA/IHN0eWxlcy5hY3RpdmUgOiAnJ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlTWVudX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBSZWdpc3RlclxyXG4gICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvaGVhZGVyPlxyXG4gICk7XHJcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJMaW5rIiwidXNlUGF0aG5hbWUiLCJ1c2VBdXRoIiwic3R5bGVzIiwiSGVhZGVyIiwiaXNNZW51T3BlbiIsInNldElzTWVudU9wZW4iLCJpc0F1dGhlbnRpY2F0ZWQiLCJ1c2VyIiwibG9nb3V0IiwicGF0aG5hbWUiLCJ0b2dnbGVNZW51IiwiY2xvc2VNZW51IiwiaXNBY3RpdmUiLCJwYXRoIiwic3RhcnRzV2l0aCIsImhlYWRlciIsImNsYXNzTmFtZSIsImRpdiIsImNvbnRhaW5lciIsImxvZ28iLCJocmVmIiwiYnV0dG9uIiwibWVudVRvZ2dsZSIsIm9uQ2xpY2siLCJhcmlhLWxhYmVsIiwic3BhbiIsIm5hdiIsIm9wZW4iLCJpc0FkbWluIiwiYWN0aXZlIiwidXNlck1lbnUiLCJ1c2VybmFtZSIsImxvZ291dEJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/common/Header.jsx\n"));

/***/ })

});