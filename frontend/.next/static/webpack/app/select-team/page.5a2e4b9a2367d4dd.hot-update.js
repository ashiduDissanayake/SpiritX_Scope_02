"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/select-team/page",{

/***/ "(app-pages-browser)/./components/chatbot/Spiriter.jsx":
/*!*****************************************!*\
  !*** ./components/chatbot/Spiriter.jsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Spiriter; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./lib/api.js\");\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/context/AuthContext */ \"(app-pages-browser)/./context/AuthContext.js\");\n/* harmony import */ var _Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Spiriter.module.css */ \"(app-pages-browser)/./components/chatbot/Spiriter.module.css\");\n/* harmony import */ var _Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Spiriter() {\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            sender: \"bot\",\n            text: \"Hi! I'm Spiriter, your cricket fantasy assistant. How can I help you?\"\n        }\n    ]);\n    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const { isAuthenticated } = (0,_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.useAuth)();\n    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    // Scroll to bottom when messages change\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (messagesEndRef.current) {\n            messagesEndRef.current.scrollIntoView({\n                behavior: \"smooth\"\n            });\n        }\n    }, [\n        messages\n    ]);\n    // Parse text to render bold sections\n    const parseMessageText = (text)=>{\n        const parts = text.split(/(\\*\\*[^*]+\\*\\*)/g); // Split by **bold** markers\n        return parts.map((part, index)=>{\n            if (part.startsWith(\"**\") && part.endsWith(\"**\")) {\n                const boldText = part.slice(2, -2); // Remove ** from start and end\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                    children: boldText\n                }, index, false, {\n                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                    lineNumber: 33,\n                    columnNumber: 16\n                }, this);\n            }\n            return part;\n        });\n    };\n    // Handle sending messages\n    const handleSendMessage = async (e)=>{\n        e.preventDefault();\n        if (!input.trim() || loading || !isAuthenticated) return;\n        // Add user message\n        const userMessage = {\n            sender: \"user\",\n            text: input\n        };\n        setMessages((prev)=>[\n                ...prev,\n                userMessage\n            ]);\n        // Clear input and set loading\n        setInput(\"\");\n        setLoading(true);\n        try {\n            // Send query to chatbot API\n            const response = await _lib_api__WEBPACK_IMPORTED_MODULE_2__.chatbotService.sendQuery(input);\n            // Add bot response\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        sender: \"bot\",\n                        text: response.message\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Error getting chatbot response:\", error);\n            // Add error message\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        sender: \"bot\",\n                        text: \"I don't have enough knowledge to answer that question.\"\n                    }\n                ]);\n        } finally{\n            setLoading(false);\n        }\n    };\n    // Toggle chatbot visibility\n    const toggleChatbot = ()=>{\n        setIsOpen((prev)=>!prev);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().chatbotToggle),\n                onClick: toggleChatbot,\n                children: isOpen ? \"Close Spiriter\" : \"Ask Spiriter\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, this),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().chatbotContainer),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().chatbotHeader),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                className: \"text-white\",\n                                children: \"Spiriter - Cricket Assistant\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 94,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().closeButton),\n                                onClick: toggleChatbot,\n                                children: \"X\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 95,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                        lineNumber: 93,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().messagesContainer),\n                        children: [\n                            messages.map((msg, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"\".concat((_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().message), \" \").concat((_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default())[msg.sender]),\n                                    children: parseMessageText(msg.text)\n                                }, index, false, {\n                                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                    lineNumber: 102,\n                                    columnNumber: 15\n                                }, this)),\n                            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"\".concat((_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().message), \" \").concat((_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().bot)),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().typingIndicator),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                            lineNumber: 113,\n                                            columnNumber: 19\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                            lineNumber: 114,\n                                            columnNumber: 19\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                            lineNumber: 115,\n                                            columnNumber: 19\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                    lineNumber: 112,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 111,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                ref: messagesEndRef\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 120,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                        lineNumber: 100,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().inputContainer),\n                        onSubmit: handleSendMessage,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: input,\n                                onChange: (e)=>setInput(e.target.value),\n                                placeholder: \"Ask about players or team suggestions...\",\n                                disabled: loading || !isAuthenticated\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 124,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                disabled: loading || !input.trim() || !isAuthenticated,\n                                children: \"Send\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                                lineNumber: 131,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                        lineNumber: 123,\n                        columnNumber: 11\n                    }, this),\n                    !isAuthenticated && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_Spiriter_module_css__WEBPACK_IMPORTED_MODULE_4___default().authMessage),\n                        children: \"Please login to use Spiriter\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                        lineNumber: 140,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\DASUN\\\\Desktop\\\\spiritx\\\\q2\\\\SpiritX_Scope_02\\\\frontend\\\\components\\\\chatbot\\\\Spiriter.jsx\",\n                lineNumber: 92,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Spiriter, \"FDo/cVZS6HNe2v9IkYz3pXeGj5o=\", false, function() {\n    return [\n        _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.useAuth\n    ];\n});\n_c = Spiriter;\nvar _c;\n$RefreshReg$(_c, \"Spiriter\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvY2hhdGJvdC9TcGlyaXRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNvRDtBQUNUO0FBQ0s7QUFDTDtBQUU1QixTQUFTTTs7SUFDdEIsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ3JDLE1BQU0sQ0FBQ1MsVUFBVUMsWUFBWSxHQUFHViwrQ0FBUUEsQ0FBQztRQUN2QztZQUNFVyxRQUFRO1lBQ1JDLE1BQU07UUFDUjtLQUNEO0lBQ0QsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdkLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ2UsU0FBU0MsV0FBVyxHQUFHaEIsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxFQUFFaUIsZUFBZSxFQUFFLEdBQUdiLDZEQUFPQTtJQUNuQyxNQUFNYyxpQkFBaUJqQiw2Q0FBTUEsQ0FBQztJQUU5Qix3Q0FBd0M7SUFDeENDLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSWdCLGVBQWVDLE9BQU8sRUFBRTtZQUMxQkQsZUFBZUMsT0FBTyxDQUFDQyxjQUFjLENBQUM7Z0JBQUVDLFVBQVU7WUFBUztRQUM3RDtJQUNGLEdBQUc7UUFBQ1o7S0FBUztJQUViLHFDQUFxQztJQUNyQyxNQUFNYSxtQkFBbUIsQ0FBQ1Y7UUFDeEIsTUFBTVcsUUFBUVgsS0FBS1ksS0FBSyxDQUFDLHFCQUFxQiw0QkFBNEI7UUFDMUUsT0FBT0QsTUFBTUUsR0FBRyxDQUFDLENBQUNDLE1BQU1DO1lBQ3RCLElBQUlELEtBQUtFLFVBQVUsQ0FBQyxTQUFTRixLQUFLRyxRQUFRLENBQUMsT0FBTztnQkFDaEQsTUFBTUMsV0FBV0osS0FBS0ssS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLCtCQUErQjtnQkFDbkUscUJBQU8sOERBQUNDOzhCQUFvQkY7bUJBQVJIOzs7OztZQUN0QjtZQUNBLE9BQU9EO1FBQ1Q7SUFDRjtJQUVBLDBCQUEwQjtJQUMxQixNQUFNTyxvQkFBb0IsT0FBT0M7UUFDL0JBLEVBQUVDLGNBQWM7UUFFaEIsSUFBSSxDQUFDdEIsTUFBTXVCLElBQUksTUFBTXJCLFdBQVcsQ0FBQ0UsaUJBQWlCO1FBRWxELG1CQUFtQjtRQUNuQixNQUFNb0IsY0FBYztZQUFFMUIsUUFBUTtZQUFRQyxNQUFNQztRQUFNO1FBQ2xESCxZQUFZLENBQUM0QixPQUFTO21CQUFJQTtnQkFBTUQ7YUFBWTtRQUU1Qyw4QkFBOEI7UUFDOUJ2QixTQUFTO1FBQ1RFLFdBQVc7UUFFWCxJQUFJO1lBQ0YsNEJBQTRCO1lBQzVCLE1BQU11QixXQUFXLE1BQU1wQyxvREFBY0EsQ0FBQ3FDLFNBQVMsQ0FBQzNCO1lBRWhELG1CQUFtQjtZQUNuQkgsWUFBWSxDQUFDNEIsT0FBUzt1QkFDakJBO29CQUNIO3dCQUFFM0IsUUFBUTt3QkFBT0MsTUFBTTJCLFNBQVNFLE9BQU87b0JBQUM7aUJBQ3pDO1FBQ0gsRUFBRSxPQUFPQyxPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyxtQ0FBbUNBO1lBRWpELG9CQUFvQjtZQUNwQmhDLFlBQVksQ0FBQzRCLE9BQVM7dUJBQ2pCQTtvQkFDSDt3QkFDRTNCLFFBQVE7d0JBQ1JDLE1BQU07b0JBQ1I7aUJBQ0Q7UUFDSCxTQUFVO1lBQ1JJLFdBQVc7UUFDYjtJQUNGO0lBRUEsNEJBQTRCO0lBQzVCLE1BQU00QixnQkFBZ0I7UUFDcEJwQyxVQUFVLENBQUM4QixPQUFTLENBQUNBO0lBQ3ZCO0lBRUEscUJBQ0U7OzBCQUVFLDhEQUFDTztnQkFBT0MsV0FBV3pDLDJFQUFvQjtnQkFBRTJDLFNBQVNKOzBCQUMvQ3JDLFNBQVMsbUJBQW1COzs7Ozs7WUFJOUJBLHdCQUNDLDhEQUFDMEM7Z0JBQUlILFdBQVd6Qyw4RUFBdUI7O2tDQUNyQyw4REFBQzRDO3dCQUFJSCxXQUFXekMsMkVBQW9COzswQ0FDbEMsOERBQUMrQztnQ0FBR04sV0FBVTswQ0FBYzs7Ozs7OzBDQUM1Qiw4REFBQ0Q7Z0NBQU9DLFdBQVd6Qyx5RUFBa0I7Z0NBQUUyQyxTQUFTSjswQ0FBZTs7Ozs7Ozs7Ozs7O2tDQUtqRSw4REFBQ0s7d0JBQUlILFdBQVd6QywrRUFBd0I7OzRCQUNyQ0ksU0FBU2dCLEdBQUcsQ0FBQyxDQUFDOEIsS0FBSzVCLHNCQUNsQiw4REFBQ3NCO29DQUVDSCxXQUFXLEdBQXFCekMsT0FBbEJBLHFFQUFjLEVBQUMsS0FBc0IsT0FBbkJBLDZEQUFNLENBQUNrRCxJQUFJNUMsTUFBTSxDQUFDOzhDQUVqRFcsaUJBQWlCaUMsSUFBSTNDLElBQUk7bUNBSHJCZTs7Ozs7NEJBT1JaLHlCQUNDLDhEQUFDa0M7Z0NBQUlILFdBQVcsR0FBcUJ6QyxPQUFsQkEscUVBQWMsRUFBQyxLQUFjLE9BQVhBLGlFQUFVOzBDQUM3Qyw0RUFBQzRDO29DQUFJSCxXQUFXekMsNkVBQXNCOztzREFDcEMsOERBQUNxRDs7Ozs7c0RBQ0QsOERBQUNBOzs7OztzREFDRCw4REFBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7MENBS1AsOERBQUNUO2dDQUFJVSxLQUFLekM7Ozs7Ozs7Ozs7OztrQ0FHWiw4REFBQzBDO3dCQUFLZCxXQUFXekMsNEVBQXFCO3dCQUFFeUQsVUFBVTdCOzswQ0FDaEQsOERBQUNwQjtnQ0FDQ2tELE1BQUs7Z0NBQ0xDLE9BQU9uRDtnQ0FDUG9ELFVBQVUsQ0FBQy9CLElBQU1wQixTQUFTb0IsRUFBRWdDLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDeENHLGFBQVk7Z0NBQ1pDLFVBQVVyRCxXQUFXLENBQUNFOzs7Ozs7MENBRXhCLDhEQUFDNEI7Z0NBQ0NrQixNQUFLO2dDQUNMSyxVQUFVckQsV0FBVyxDQUFDRixNQUFNdUIsSUFBSSxNQUFNLENBQUNuQjswQ0FDeEM7Ozs7Ozs7Ozs7OztvQkFLRixDQUFDQSxpQ0FDQSw4REFBQ2dDO3dCQUFJSCxXQUFXekMseUVBQWtCO2tDQUFFOzs7Ozs7Ozs7Ozs7OztBQVFoRDtHQTdJd0JDOztRQVVNRix5REFBT0E7OztLQVZiRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL2NoYXRib3QvU3Bpcml0ZXIuanN4P2RmM2IiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjaGF0Ym90U2VydmljZSB9IGZyb20gXCJAL2xpYi9hcGlcIjtcclxuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gXCJAL2NvbnRleHQvQXV0aENvbnRleHRcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9TcGlyaXRlci5tb2R1bGUuY3NzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTcGlyaXRlcigpIHtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGUoW1xyXG4gICAge1xyXG4gICAgICBzZW5kZXI6IFwiYm90XCIsXHJcbiAgICAgIHRleHQ6IFwiSGkhIEknbSBTcGlyaXRlciwgeW91ciBjcmlja2V0IGZhbnRhc3kgYXNzaXN0YW50LiBIb3cgY2FuIEkgaGVscCB5b3U/XCIsXHJcbiAgICB9LFxyXG4gIF0pO1xyXG4gIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgaXNBdXRoZW50aWNhdGVkIH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgbWVzc2FnZXNFbmRSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIC8vIFNjcm9sbCB0byBib3R0b20gd2hlbiBtZXNzYWdlcyBjaGFuZ2VcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKG1lc3NhZ2VzRW5kUmVmLmN1cnJlbnQpIHtcclxuICAgICAgbWVzc2FnZXNFbmRSZWYuY3VycmVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgfVxyXG4gIH0sIFttZXNzYWdlc10pO1xyXG5cclxuICAvLyBQYXJzZSB0ZXh0IHRvIHJlbmRlciBib2xkIHNlY3Rpb25zXHJcbiAgY29uc3QgcGFyc2VNZXNzYWdlVGV4dCA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IHRleHQuc3BsaXQoLyhcXCpcXCpbXipdK1xcKlxcKikvZyk7IC8vIFNwbGl0IGJ5ICoqYm9sZCoqIG1hcmtlcnNcclxuICAgIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChwYXJ0LnN0YXJ0c1dpdGgoXCIqKlwiKSAmJiBwYXJ0LmVuZHNXaXRoKFwiKipcIikpIHtcclxuICAgICAgICBjb25zdCBib2xkVGV4dCA9IHBhcnQuc2xpY2UoMiwgLTIpOyAvLyBSZW1vdmUgKiogZnJvbSBzdGFydCBhbmQgZW5kXHJcbiAgICAgICAgcmV0dXJuIDxzdHJvbmcga2V5PXtpbmRleH0+e2JvbGRUZXh0fTwvc3Ryb25nPjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFydDtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEhhbmRsZSBzZW5kaW5nIG1lc3NhZ2VzXHJcbiAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICghaW5wdXQudHJpbSgpIHx8IGxvYWRpbmcgfHwgIWlzQXV0aGVudGljYXRlZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEFkZCB1c2VyIG1lc3NhZ2VcclxuICAgIGNvbnN0IHVzZXJNZXNzYWdlID0geyBzZW5kZXI6IFwidXNlclwiLCB0ZXh0OiBpbnB1dCB9O1xyXG4gICAgc2V0TWVzc2FnZXMoKHByZXYpID0+IFsuLi5wcmV2LCB1c2VyTWVzc2FnZV0pO1xyXG5cclxuICAgIC8vIENsZWFyIGlucHV0IGFuZCBzZXQgbG9hZGluZ1xyXG4gICAgc2V0SW5wdXQoXCJcIik7XHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFNlbmQgcXVlcnkgdG8gY2hhdGJvdCBBUElcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjaGF0Ym90U2VydmljZS5zZW5kUXVlcnkoaW5wdXQpO1xyXG5cclxuICAgICAgLy8gQWRkIGJvdCByZXNwb25zZVxyXG4gICAgICBzZXRNZXNzYWdlcygocHJldikgPT4gW1xyXG4gICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgeyBzZW5kZXI6IFwiYm90XCIsIHRleHQ6IHJlc3BvbnNlLm1lc3NhZ2UgfSxcclxuICAgICAgXSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2V0dGluZyBjaGF0Ym90IHJlc3BvbnNlOlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAvLyBBZGQgZXJyb3IgbWVzc2FnZVxyXG4gICAgICBzZXRNZXNzYWdlcygocHJldikgPT4gW1xyXG4gICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VuZGVyOiBcImJvdFwiLFxyXG4gICAgICAgICAgdGV4dDogXCJJIGRvbid0IGhhdmUgZW5vdWdoIGtub3dsZWRnZSB0byBhbnN3ZXIgdGhhdCBxdWVzdGlvbi5cIixcclxuICAgICAgICB9LFxyXG4gICAgICBdKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFRvZ2dsZSBjaGF0Ym90IHZpc2liaWxpdHlcclxuICBjb25zdCB0b2dnbGVDaGF0Ym90ID0gKCkgPT4ge1xyXG4gICAgc2V0SXNPcGVuKChwcmV2KSA9PiAhcHJldik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHsvKiBDaGF0Ym90IHRvZ2dsZSBidXR0b24gKi99XHJcbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuY2hhdGJvdFRvZ2dsZX0gb25DbGljaz17dG9nZ2xlQ2hhdGJvdH0+XHJcbiAgICAgICAge2lzT3BlbiA/IFwiQ2xvc2UgU3Bpcml0ZXJcIiA6IFwiQXNrIFNwaXJpdGVyXCJ9XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgey8qIENoYXRib3QgZGlhbG9nICovfVxyXG4gICAgICB7aXNPcGVuICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNoYXRib3RDb250YWluZXJ9PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jaGF0Ym90SGVhZGVyfT5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIiA+U3Bpcml0ZXIgLSBDcmlja2V0IEFzc2lzdGFudDwvaDM+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuY2xvc2VCdXR0b259IG9uQ2xpY2s9e3RvZ2dsZUNoYXRib3R9PlxyXG4gICAgICAgICAgICAgIFhcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2VzQ29udGFpbmVyfT5cclxuICAgICAgICAgICAge21lc3NhZ2VzLm1hcCgobXNnLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5tZXNzYWdlfSAke3N0eWxlc1ttc2cuc2VuZGVyXX1gfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtwYXJzZU1lc3NhZ2VUZXh0KG1zZy50ZXh0KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcblxyXG4gICAgICAgICAgICB7bG9hZGluZyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5tZXNzYWdlfSAke3N0eWxlcy5ib3R9YH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnR5cGluZ0luZGljYXRvcn0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXttZXNzYWdlc0VuZFJlZn0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0Q29udGFpbmVyfSBvblN1Ym1pdD17aGFuZGxlU2VuZE1lc3NhZ2V9PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e2lucHV0fVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5wdXQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQXNrIGFib3V0IHBsYXllcnMgb3IgdGVhbSBzdWdnZXN0aW9ucy4uLlwiXHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmcgfHwgIWlzQXV0aGVudGljYXRlZH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nIHx8ICFpbnB1dC50cmltKCkgfHwgIWlzQXV0aGVudGljYXRlZH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIFNlbmRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICAgeyFpc0F1dGhlbnRpY2F0ZWQgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmF1dGhNZXNzYWdlfT5cclxuICAgICAgICAgICAgICBQbGVhc2UgbG9naW4gdG8gdXNlIFNwaXJpdGVyXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvPlxyXG4gICk7XHJcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJjaGF0Ym90U2VydmljZSIsInVzZUF1dGgiLCJzdHlsZXMiLCJTcGlyaXRlciIsImlzT3BlbiIsInNldElzT3BlbiIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJzZW5kZXIiLCJ0ZXh0IiwiaW5wdXQiLCJzZXRJbnB1dCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiaXNBdXRoZW50aWNhdGVkIiwibWVzc2FnZXNFbmRSZWYiLCJjdXJyZW50Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsInBhcnNlTWVzc2FnZVRleHQiLCJwYXJ0cyIsInNwbGl0IiwibWFwIiwicGFydCIsImluZGV4Iiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiYm9sZFRleHQiLCJzbGljZSIsInN0cm9uZyIsImhhbmRsZVNlbmRNZXNzYWdlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidHJpbSIsInVzZXJNZXNzYWdlIiwicHJldiIsInJlc3BvbnNlIiwic2VuZFF1ZXJ5IiwibWVzc2FnZSIsImVycm9yIiwiY29uc29sZSIsInRvZ2dsZUNoYXRib3QiLCJidXR0b24iLCJjbGFzc05hbWUiLCJjaGF0Ym90VG9nZ2xlIiwib25DbGljayIsImRpdiIsImNoYXRib3RDb250YWluZXIiLCJjaGF0Ym90SGVhZGVyIiwiaDMiLCJjbG9zZUJ1dHRvbiIsIm1lc3NhZ2VzQ29udGFpbmVyIiwibXNnIiwiYm90IiwidHlwaW5nSW5kaWNhdG9yIiwic3BhbiIsInJlZiIsImZvcm0iLCJpbnB1dENvbnRhaW5lciIsIm9uU3VibWl0IiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImRpc2FibGVkIiwiYXV0aE1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/chatbot/Spiriter.jsx\n"));

/***/ })

});