"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/register/page",{

/***/ "(app-pages-browser)/./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api */ \"(app-pages-browser)/./lib/api.js\");\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth,default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n// Create context\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Check if user is logged in on page load\n        const checkAuth = async ()=>{\n            try {\n                // Check if token exists in localStorage\n                const token = localStorage.getItem(\"token\");\n                const storedUser = localStorage.getItem(\"user\");\n                if (token && storedUser) {\n                    setUser(JSON.parse(storedUser));\n                }\n            } catch (error) {\n                console.error(\"Auth check error:\", error);\n            } finally{\n                setLoading(false);\n            }\n        };\n        checkAuth();\n    }, []);\n    // Register user\n    const register = async (username, password)=>{\n        try {\n            // Implement API call here when backend is ready\n            const response = await _lib_api__WEBPACK_IMPORTED_MODULE_3__.authService.register(username, password);\n            if (response) {\n                const data = await response.json();\n                throw new Error(data.message || \"Registration failed\");\n            }\n            return {\n                success: true\n            };\n        } catch (error) {\n            console.error(\"Registration failed:\", error);\n            return {\n                success: false,\n                error: error.message || \"Registration failed\"\n            };\n        }\n    };\n    // Login user\n    const login = async (username, password)=>{\n        try {\n            // Implement API call here when backend is ready\n            const response = await _lib_api__WEBPACK_IMPORTED_MODULE_3__.authService.login(username, password);\n            if (response.status != 200) {\n                const data = await response.data;\n                throw new Error(data.message || \"Login failed\");\n            }\n            const data = await response.data;\n            // Save token and user data to localStorage\n            localStorage.setItem(\"token\", data.token);\n            localStorage.setItem(\"user\", JSON.stringify(data.user));\n            // Set user state\n            setUser(data.user);\n            return {\n                success: true\n            };\n        } catch (error) {\n            console.error(\"Login failed:\", error);\n            return {\n                success: false,\n                error: error.message || \"Login failed\"\n            };\n        }\n    };\n    // Logout user\n    const logout = ()=>{\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n        setUser(null);\n        router.push(\"/login\");\n    };\n    // Context value\n    const value = {\n        user,\n        loading,\n        register,\n        login,\n        logout,\n        isAuthenticated: !!user,\n        isAdmin: (user === null || user === void 0 ? void 0 : user.isAdmin) || false\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/ashidudissanayake/Dev/SpiritX_Scope_02/frontend/context/AuthContext.js\",\n        lineNumber: 106,\n        columnNumber: 10\n    }, undefined);\n};\n_s(AuthProvider, \"J17Kp8z+0ojgAqGoY5o3BCjwWms=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = AuthProvider;\n// Custom hook to use auth context\nconst useAuth = ()=>{\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s1(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthContext);\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUV1RTtBQUMzQjtBQUNKO0FBRXhDLGlCQUFpQjtBQUNqQixNQUFNTSw0QkFBY04sb0RBQWFBO0FBRTFCLE1BQU1PLGVBQWU7UUFBQyxFQUFFQyxRQUFRLEVBQUU7O0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNVLFNBQVNDLFdBQVcsR0FBR1gsK0NBQVFBLENBQUM7SUFDdkMsTUFBTVksU0FBU1QsMERBQVNBO0lBRXhCRixnREFBU0EsQ0FBQztRQUNSLDBDQUEwQztRQUMxQyxNQUFNWSxZQUFZO1lBQ2hCLElBQUk7Z0JBQ0Ysd0NBQXdDO2dCQUN4QyxNQUFNQyxRQUFRQyxhQUFhQyxPQUFPLENBQUM7Z0JBQ25DLE1BQU1DLGFBQWFGLGFBQWFDLE9BQU8sQ0FBQztnQkFFeEMsSUFBSUYsU0FBU0csWUFBWTtvQkFDdkJSLFFBQVFTLEtBQUtDLEtBQUssQ0FBQ0Y7Z0JBQ3JCO1lBQ0YsRUFBRSxPQUFPRyxPQUFPO2dCQUNkQyxRQUFRRCxLQUFLLENBQUMscUJBQXFCQTtZQUNyQyxTQUFVO2dCQUNSVCxXQUFXO1lBQ2I7UUFDRjtRQUVBRTtJQUNGLEdBQUcsRUFBRTtJQUVMLGdCQUFnQjtJQUNoQixNQUFNUyxXQUFXLE9BQU9DLFVBQVVDO1FBQ2hDLElBQUk7WUFDRixnREFBZ0Q7WUFDaEQsTUFBTUMsV0FBVSxNQUFNckIsaURBQVdBLENBQUNrQixRQUFRLENBQUNDLFVBQVVDO1lBRXJELElBQUlDLFVBQVU7Z0JBQ1osTUFBTUMsT0FBTyxNQUFNRCxTQUFTRSxJQUFJO2dCQUNoQyxNQUFNLElBQUlDLE1BQU1GLEtBQUtHLE9BQU8sSUFBSTtZQUNsQztZQUVBLE9BQU87Z0JBQUVDLFNBQVM7WUFBSztRQUN6QixFQUFFLE9BQU9WLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7WUFDdEMsT0FBTztnQkFDTFUsU0FBUztnQkFDVFYsT0FBT0EsTUFBTVMsT0FBTyxJQUFJO1lBQzFCO1FBQ0Y7SUFDRjtJQUVBLGFBQWE7SUFDYixNQUFNRSxRQUFRLE9BQU9SLFVBQVVDO1FBQzdCLElBQUk7WUFDRixnREFBZ0Q7WUFDaEQsTUFBTUMsV0FBVSxNQUFNckIsaURBQVdBLENBQUMyQixLQUFLLENBQUNSLFVBQVVDO1lBRWxELElBQUlDLFNBQVNPLE1BQU0sSUFBSSxLQUFLO2dCQUMxQixNQUFNTixPQUFPLE1BQU1ELFNBQVNDLElBQUk7Z0JBQ2hDLE1BQU0sSUFBSUUsTUFBTUYsS0FBS0csT0FBTyxJQUFJO1lBQ2xDO1lBRUEsTUFBTUgsT0FBTyxNQUFNRCxTQUFTQyxJQUFJO1lBR2hDLDJDQUEyQztZQUMzQ1gsYUFBYWtCLE9BQU8sQ0FBQyxTQUFTUCxLQUFLWixLQUFLO1lBQ3hDQyxhQUFha0IsT0FBTyxDQUFDLFFBQVFmLEtBQUtnQixTQUFTLENBQUNSLEtBQUtsQixJQUFJO1lBRXJELGlCQUFpQjtZQUNqQkMsUUFBUWlCLEtBQUtsQixJQUFJO1lBQ2pCLE9BQU87Z0JBQUVzQixTQUFTO1lBQUs7UUFDekIsRUFBRSxPQUFPVixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyxpQkFBaUJBO1lBQy9CLE9BQU87Z0JBQ0xVLFNBQVM7Z0JBQ1RWLE9BQU9BLE1BQU1TLE9BQU8sSUFBSTtZQUMxQjtRQUNGO0lBQ0Y7SUFFQSxjQUFjO0lBQ2QsTUFBTU0sU0FBUztRQUNicEIsYUFBYXFCLFVBQVUsQ0FBQztRQUN4QnJCLGFBQWFxQixVQUFVLENBQUM7UUFDeEIzQixRQUFRO1FBQ1JHLE9BQU95QixJQUFJLENBQUM7SUFDZDtJQUVBLGdCQUFnQjtJQUNoQixNQUFNQyxRQUFRO1FBQ1o5QjtRQUNBRTtRQUNBWTtRQUNBUztRQUNBSTtRQUNBSSxpQkFBaUIsQ0FBQyxDQUFDL0I7UUFDbkJnQyxTQUFTaEMsQ0FBQUEsaUJBQUFBLDJCQUFBQSxLQUFNZ0MsT0FBTyxLQUFJO0lBQzVCO0lBRUEscUJBQU8sOERBQUNuQyxZQUFZb0MsUUFBUTtRQUFDSCxPQUFPQTtrQkFBUS9COzs7Ozs7QUFDOUMsRUFBRTtHQWpHV0Q7O1FBR0lILHNEQUFTQTs7O0tBSGJHO0FBbUdiLGtDQUFrQztBQUMzQixNQUFNb0MsVUFBVTs7SUFBTXhDLE9BQUFBLGlEQUFVQSxDQUFDRztBQUFXLEVBQUU7SUFBeENxQztBQUViLCtEQUFlckMsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb250ZXh0L0F1dGhDb250ZXh0LmpzPzEzOTgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IGF1dGhTZXJ2aWNlIH0gZnJvbSAnQC9saWIvYXBpJztcblxuLy8gQ3JlYXRlIGNvbnRleHRcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gb24gcGFnZSBsb2FkXG4gICAgY29uc3QgY2hlY2tBdXRoID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdG9rZW4gZXhpc3RzIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0b2tlbiAmJiBzdG9yZWRVc2VyKSB7XG4gICAgICAgICAgc2V0VXNlcihKU09OLnBhcnNlKHN0b3JlZFVzZXIpKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQXV0aCBjaGVjayBlcnJvcjonLCBlcnJvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNoZWNrQXV0aCgpO1xuICB9LCBbXSk7XG5cbiAgLy8gUmVnaXN0ZXIgdXNlclxuICBjb25zdCByZWdpc3RlciA9IGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gSW1wbGVtZW50IEFQSSBjYWxsIGhlcmUgd2hlbiBiYWNrZW5kIGlzIHJlYWR5XG4gICAgICBjb25zdCByZXNwb25zZSA9YXdhaXQgYXV0aFNlcnZpY2UucmVnaXN0ZXIodXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICAgIFxuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UgfHwgJ1JlZ2lzdHJhdGlvbiBmYWlsZWQnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSZWdpc3RyYXRpb24gZmFpbGVkOicsIGVycm9yKTtcbiAgICAgIHJldHVybiB7IFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSwgXG4gICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdSZWdpc3RyYXRpb24gZmFpbGVkJyBcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8vIExvZ2luIHVzZXJcbiAgY29uc3QgbG9naW4gPSBhc3luYyAodXNlcm5hbWUsIHBhc3N3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEltcGxlbWVudCBBUEkgY2FsbCBoZXJlIHdoZW4gYmFja2VuZCBpcyByZWFkeVxuICAgICAgY29uc3QgcmVzcG9uc2UgPWF3YWl0IGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5kYXRhO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlIHx8ICdMb2dpbiBmYWlsZWQnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgIFxuICAgICAgLy8gU2F2ZSB0b2tlbiBhbmQgdXNlciBkYXRhIHRvIGxvY2FsU3RvcmFnZVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgZGF0YS50b2tlbik7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGRhdGEudXNlcikpO1xuICAgICAgXG4gICAgICAvLyBTZXQgdXNlciBzdGF0ZVxuICAgICAgc2V0VXNlcihkYXRhLnVzZXIpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIHsgXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0xvZ2luIGZhaWxlZCdcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8vIExvZ291dCB1c2VyXG4gIGNvbnN0IGxvZ291dCA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcicpO1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICB9O1xuXG4gIC8vIENvbnRleHQgdmFsdWVcbiAgY29uc3QgdmFsdWUgPSB7XG4gICAgdXNlcixcbiAgICBsb2FkaW5nLFxuICAgIHJlZ2lzdGVyLFxuICAgIGxvZ2luLFxuICAgIGxvZ291dCxcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6ICEhdXNlcixcbiAgICBpc0FkbWluOiB1c2VyPy5pc0FkbWluIHx8IGZhbHNlXG4gIH07XG5cbiAgcmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPjtcbn07XG5cbi8vIEN1c3RvbSBob29rIHRvIHVzZSBhdXRoIGNvbnRleHRcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhDb250ZXh0OyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VDb250ZXh0IiwidXNlUm91dGVyIiwiYXV0aFNlcnZpY2UiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInJvdXRlciIsImNoZWNrQXV0aCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0b3JlZFVzZXIiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJyZWdpc3RlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXNwb25zZSIsImRhdGEiLCJqc29uIiwiRXJyb3IiLCJtZXNzYWdlIiwic3VjY2VzcyIsImxvZ2luIiwic3RhdHVzIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJwdXNoIiwidmFsdWUiLCJpc0F1dGhlbnRpY2F0ZWQiLCJpc0FkbWluIiwiUHJvdmlkZXIiLCJ1c2VBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./context/AuthContext.js\n"));

/***/ })

});