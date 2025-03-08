"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/players/page",{

/***/ "(app-pages-browser)/./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./lib/api.js\");\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth,default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n// Create context\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Check if user is logged in on page load\n        const checkAuth = async ()=>{\n            try {\n                // Check if token exists in localStorage\n                const token = localStorage.getItem(\"token\");\n                const storedUser = localStorage.getItem(\"user\");\n                if (token && storedUser) {\n                    setUser(JSON.parse(storedUser));\n                }\n            } catch (error) {\n                console.error(\"Auth check error:\", error);\n            } finally{\n                setLoading(false);\n            }\n        };\n        checkAuth();\n    }, []);\n    // Register user\n    const register = async (username, password)=>{\n        try {\n            // Implement API call here when backend is ready\n            const response = await _lib_api__WEBPACK_IMPORTED_MODULE_3__.authService.register(username, password);\n            if (re) {\n                const data = await response.json();\n                throw new Error(data.message || \"Registration failed\");\n            }\n            return {\n                success: true\n            };\n        } catch (error) {\n            console.error(\"Registration failed:\", error);\n            return {\n                success: false,\n                error: error.message || \"Registration failed\"\n            };\n        }\n    };\n    // Login user\n    const login = async (username, password)=>{\n        try {\n            // Implement API call here when backend is ready\n            const response = await _lib_api__WEBPACK_IMPORTED_MODULE_3__.authService.login(username, password);\n            if (response.status != 200) {\n                const data = await response.data;\n                throw new Error(data.message || \"Login failed\");\n            }\n            const data = await response.data;\n            // Save token and user data to localStorage\n            localStorage.setItem(\"token\", data.token);\n            localStorage.setItem(\"user\", JSON.stringify(data.user));\n            // Set user state\n            setUser(data.user);\n            return {\n                success: true\n            };\n        } catch (error) {\n            console.error(\"Login failed:\", error);\n            return {\n                success: false,\n                error: error.message || \"Login failed\"\n            };\n        }\n    };\n    // Logout user\n    const logout = ()=>{\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n        setUser(null);\n        router.push(\"/login\");\n    };\n    // Context value\n    const value = {\n        user,\n        loading,\n        register,\n        login,\n        logout,\n        isAuthenticated: !!user,\n        isAdmin: (user === null || user === void 0 ? void 0 : user.isAdmin) || false\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/ashidudissanayake/Dev/SpiritX_Scope_02/frontend/context/AuthContext.js\",\n        lineNumber: 106,\n        columnNumber: 10\n    }, undefined);\n};\n_s(AuthProvider, \"J17Kp8z+0ojgAqGoY5o3BCjwWms=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = AuthProvider;\n// Custom hook to use auth context\nconst useAuth = ()=>{\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s1(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthContext);\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUV1RTtBQUMzQjtBQUNKO0FBRXhDLGlCQUFpQjtBQUNqQixNQUFNTSw0QkFBY04sb0RBQWFBO0FBRTFCLE1BQU1PLGVBQWU7UUFBQyxFQUFFQyxRQUFRLEVBQUU7O0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNVLFNBQVNDLFdBQVcsR0FBR1gsK0NBQVFBLENBQUM7SUFDdkMsTUFBTVksU0FBU1QsMERBQVNBO0lBRXhCRixnREFBU0EsQ0FBQztRQUNSLDBDQUEwQztRQUMxQyxNQUFNWSxZQUFZO1lBQ2hCLElBQUk7Z0JBQ0Ysd0NBQXdDO2dCQUN4QyxNQUFNQyxRQUFRQyxhQUFhQyxPQUFPLENBQUM7Z0JBQ25DLE1BQU1DLGFBQWFGLGFBQWFDLE9BQU8sQ0FBQztnQkFFeEMsSUFBSUYsU0FBU0csWUFBWTtvQkFDdkJSLFFBQVFTLEtBQUtDLEtBQUssQ0FBQ0Y7Z0JBQ3JCO1lBQ0YsRUFBRSxPQUFPRyxPQUFPO2dCQUNkQyxRQUFRRCxLQUFLLENBQUMscUJBQXFCQTtZQUNyQyxTQUFVO2dCQUNSVCxXQUFXO1lBQ2I7UUFDRjtRQUVBRTtJQUNGLEdBQUcsRUFBRTtJQUVMLGdCQUFnQjtJQUNoQixNQUFNUyxXQUFXLE9BQU9DLFVBQVVDO1FBQ2hDLElBQUk7WUFDRixnREFBZ0Q7WUFDaEQsTUFBTUMsV0FBVSxNQUFNckIsaURBQVdBLENBQUNrQixRQUFRLENBQUNDLFVBQVVDO1lBRXJELElBQUlFLElBQUk7Z0JBQ04sTUFBTUMsT0FBTyxNQUFNRixTQUFTRyxJQUFJO2dCQUNoQyxNQUFNLElBQUlDLE1BQU1GLEtBQUtHLE9BQU8sSUFBSTtZQUNsQztZQUVBLE9BQU87Z0JBQUVDLFNBQVM7WUFBSztRQUN6QixFQUFFLE9BQU9YLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7WUFDdEMsT0FBTztnQkFDTFcsU0FBUztnQkFDVFgsT0FBT0EsTUFBTVUsT0FBTyxJQUFJO1lBQzFCO1FBQ0Y7SUFDRjtJQUVBLGFBQWE7SUFDYixNQUFNRSxRQUFRLE9BQU9ULFVBQVVDO1FBQzdCLElBQUk7WUFDRixnREFBZ0Q7WUFDaEQsTUFBTUMsV0FBVSxNQUFNckIsaURBQVdBLENBQUM0QixLQUFLLENBQUNULFVBQVVDO1lBRWxELElBQUlDLFNBQVNRLE1BQU0sSUFBSSxLQUFLO2dCQUMxQixNQUFNTixPQUFPLE1BQU1GLFNBQVNFLElBQUk7Z0JBQ2hDLE1BQU0sSUFBSUUsTUFBTUYsS0FBS0csT0FBTyxJQUFJO1lBQ2xDO1lBRUEsTUFBTUgsT0FBTyxNQUFNRixTQUFTRSxJQUFJO1lBR2hDLDJDQUEyQztZQUMzQ1osYUFBYW1CLE9BQU8sQ0FBQyxTQUFTUCxLQUFLYixLQUFLO1lBQ3hDQyxhQUFhbUIsT0FBTyxDQUFDLFFBQVFoQixLQUFLaUIsU0FBUyxDQUFDUixLQUFLbkIsSUFBSTtZQUVyRCxpQkFBaUI7WUFDakJDLFFBQVFrQixLQUFLbkIsSUFBSTtZQUNqQixPQUFPO2dCQUFFdUIsU0FBUztZQUFLO1FBQ3pCLEVBQUUsT0FBT1gsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsaUJBQWlCQTtZQUMvQixPQUFPO2dCQUNMVyxTQUFTO2dCQUNUWCxPQUFPQSxNQUFNVSxPQUFPLElBQUk7WUFDMUI7UUFDRjtJQUNGO0lBRUEsY0FBYztJQUNkLE1BQU1NLFNBQVM7UUFDYnJCLGFBQWFzQixVQUFVLENBQUM7UUFDeEJ0QixhQUFhc0IsVUFBVSxDQUFDO1FBQ3hCNUIsUUFBUTtRQUNSRyxPQUFPMEIsSUFBSSxDQUFDO0lBQ2Q7SUFFQSxnQkFBZ0I7SUFDaEIsTUFBTUMsUUFBUTtRQUNaL0I7UUFDQUU7UUFDQVk7UUFDQVU7UUFDQUk7UUFDQUksaUJBQWlCLENBQUMsQ0FBQ2hDO1FBQ25CaUMsU0FBU2pDLENBQUFBLGlCQUFBQSwyQkFBQUEsS0FBTWlDLE9BQU8sS0FBSTtJQUM1QjtJQUVBLHFCQUFPLDhEQUFDcEMsWUFBWXFDLFFBQVE7UUFBQ0gsT0FBT0E7a0JBQVFoQzs7Ozs7O0FBQzlDLEVBQUU7R0FqR1dEOztRQUdJSCxzREFBU0E7OztLQUhiRztBQW1HYixrQ0FBa0M7QUFDM0IsTUFBTXFDLFVBQVU7O0lBQU16QyxPQUFBQSxpREFBVUEsQ0FBQ0c7QUFBVyxFQUFFO0lBQXhDc0M7QUFFYiwrREFBZXRDLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29udGV4dC9BdXRoQ29udGV4dC5qcz8xMzk4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5pbXBvcnQgeyBhdXRoU2VydmljZSB9IGZyb20gJ0AvbGliL2FwaSc7XG5cbi8vIENyZWF0ZSBjb250ZXh0XG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluIG9uIHBhZ2UgbG9hZFxuICAgIGNvbnN0IGNoZWNrQXV0aCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRva2VuIGV4aXN0cyBpbiBsb2NhbFN0b3JhZ2VcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodG9rZW4gJiYgc3RvcmVkVXNlcikge1xuICAgICAgICAgIHNldFVzZXIoSlNPTi5wYXJzZShzdG9yZWRVc2VyKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGggY2hlY2sgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBjaGVja0F1dGgoKTtcbiAgfSwgW10pO1xuXG4gIC8vIFJlZ2lzdGVyIHVzZXJcbiAgY29uc3QgcmVnaXN0ZXIgPSBhc3luYyAodXNlcm5hbWUsIHBhc3N3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEltcGxlbWVudCBBUEkgY2FsbCBoZXJlIHdoZW4gYmFja2VuZCBpcyByZWFkeVxuICAgICAgY29uc3QgcmVzcG9uc2UgPWF3YWl0IGF1dGhTZXJ2aWNlLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICBcbiAgICAgIGlmIChyZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlIHx8ICdSZWdpc3RyYXRpb24gZmFpbGVkJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignUmVnaXN0cmF0aW9uIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICByZXR1cm4geyBcbiAgICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnUmVnaXN0cmF0aW9uIGZhaWxlZCcgXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICAvLyBMb2dpbiB1c2VyXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKHVzZXJuYW1lLCBwYXNzd29yZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBJbXBsZW1lbnQgQVBJIGNhbGwgaGVyZSB3aGVuIGJhY2tlbmQgaXMgcmVhZHlcbiAgICAgIGNvbnN0IHJlc3BvbnNlID1hd2FpdCBhdXRoU2VydmljZS5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEubWVzc2FnZSB8fCAnTG9naW4gZmFpbGVkJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5kYXRhO1xuXG4gICAgICBcbiAgICAgIC8vIFNhdmUgdG9rZW4gYW5kIHVzZXIgZGF0YSB0byBsb2NhbFN0b3JhZ2VcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIGRhdGEudG9rZW4pO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShkYXRhLnVzZXIpKTtcbiAgICAgIFxuICAgICAgLy8gU2V0IHVzZXIgc3RhdGVcbiAgICAgIHNldFVzZXIoZGF0YS51c2VyKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZmFpbGVkOicsIGVycm9yKTtcbiAgICAgIHJldHVybiB7IFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSwgXG4gICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdMb2dpbiBmYWlsZWQnXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICAvLyBMb2dvdXQgdXNlclxuICBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICBzZXRVc2VyKG51bGwpO1xuICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKTtcbiAgfTtcblxuICAvLyBDb250ZXh0IHZhbHVlXG4gIGNvbnN0IHZhbHVlID0ge1xuICAgIHVzZXIsXG4gICAgbG9hZGluZyxcbiAgICByZWdpc3RlcixcbiAgICBsb2dpbixcbiAgICBsb2dvdXQsXG4gICAgaXNBdXRoZW50aWNhdGVkOiAhIXVzZXIsXG4gICAgaXNBZG1pbjogdXNlcj8uaXNBZG1pbiB8fCBmYWxzZVxuICB9O1xuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XG59O1xuXG4vLyBDdXN0b20gaG9vayB0byB1c2UgYXV0aCBjb250ZXh0XG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoQ29udGV4dDsiXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ29udGV4dCIsInVzZVJvdXRlciIsImF1dGhTZXJ2aWNlIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJyb3V0ZXIiLCJjaGVja0F1dGgiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzdG9yZWRVc2VyIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjb25zb2xlIiwicmVnaXN0ZXIiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVzcG9uc2UiLCJyZSIsImRhdGEiLCJqc29uIiwiRXJyb3IiLCJtZXNzYWdlIiwic3VjY2VzcyIsImxvZ2luIiwic3RhdHVzIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJwdXNoIiwidmFsdWUiLCJpc0F1dGhlbnRpY2F0ZWQiLCJpc0FkbWluIiwiUHJvdmlkZXIiLCJ1c2VBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./context/AuthContext.js\n"));

/***/ })

});