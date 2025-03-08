"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/my-team/page",{

/***/ "(app-pages-browser)/./lib/api.js":
/*!********************!*\
  !*** ./lib/api.js ***!
  \********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authService: function() { return /* binding */ authService; },\n/* harmony export */   chatbotService: function() { return /* binding */ chatbotService; },\n/* harmony export */   playerService: function() { return /* binding */ playerService; },\n/* harmony export */   statsService: function() { return /* binding */ statsService; },\n/* harmony export */   teamService: function() { return /* binding */ teamService; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst API_URL = \"http://localhost:3001/api\" || 0;\n// Create axios instance\nconst api = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: API_URL,\n    headers: {\n        \"Content-Type\": \"application/json\"\n    }\n});\n// Add auth token to requests if available\napi.interceptors.request.use((config)=>{\n    const token = localStorage.getItem(\"token\");\n    if (token) {\n        config.headers.Authorization = \"Bearer \".concat(token);\n    }\n    return config;\n}, (error)=>Promise.reject(error));\n// Authentication services\nconst authService = {\n    register: async (username, password)=>{\n        const response = await api.post(\"/auth/register\", {\n            username,\n            password\n        });\n        console.log(\"Registration response:\", response);\n        if (response.status !== 200) {\n            throw new Error(\"Registration failed\");\n        }\n        localStorage.setItem(\"token\", response.data.token);\n        localStorage.setItem(\"user\", JSON.stringify(response.data.user));\n        console.log(\"User data:\", response.data.user);\n        console.log(\"Token:\", response.data.token);\n        console.log(\"Local storage:\", localStorage.getItem(\"user\"));\n        console.log(\"Local storage token:\", localStorage.getItem(\"token\"));\n        console.log(\"Local storage user:\", localStorage.getItem(\"user\"));\n        console.log(\"Local storage token:\", localStorage.getItem(\"token\"));\n        console.log(\"Local storage user:\", localStorage.getItem(\"user\"));\n        console.log(\"Local storage token:\", localStorage.getItem(\"token\"));\n        return response;\n    },\n    login: async (username, password)=>{\n        const response = await api.post(\"/auth/login\", {\n            username,\n            password\n        });\n        localStorage.setItem(\"token\", response.data.token);\n        localStorage.setItem(\"user\", JSON.stringify(response.data.user));\n        return response;\n    },\n    logout: ()=>{\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n    },\n    getCurrentUser: ()=>{\n        const userStr = localStorage.getItem(\"user\");\n        if (!userStr) return null;\n        return JSON.parse(userStr);\n    },\n    isAuthenticated: ()=>{\n        return localStorage.getItem(\"token\") !== null;\n    },\n    isAdmin: ()=>{\n        const user = authService.getCurrentUser();\n        return user && user.isAdmin;\n    }\n};\n// Player services\nconst playerService = {\n    getAllPlayers: async ()=>{\n        const response = await api.get(\"/players\");\n        return response.data;\n    },\n    getPlayerById: async (id)=>{\n        const response = await api.get(\"/players/\".concat(id));\n        return response.data;\n    },\n    // Admin only functions\n    createPlayer: async (playerData)=>{\n        const response = await api.post(\"/players\", playerData);\n        return response.data;\n    },\n    updatePlayer: async (id, playerData)=>{\n        const response = await api.put(\"/players/\".concat(id), playerData);\n        return response.data;\n    },\n    deletePlayer: async (id)=>{\n        const response = await api.delete(\"/players/\".concat(id));\n        return response.data;\n    }\n};\n// Team services\nconst teamService = {\n    getUserTeam: async ()=>{\n        const response = await api.get(\"/teams/my-team\");\n        return response.data;\n    },\n    addPlayerToTeam: async (playerId)=>{\n        const response = await api.post(\"/teams/add-player/\".concat(playerId));\n        return response.data;\n    },\n    removePlayerFromTeam: async (teamPlayerId)=>{\n        const response = await api.delete(\"/teams/remove-player/\".concat(teamPlayerId));\n        return response.data;\n    },\n    getLeaderboard: async ()=>{\n        const response = await api.get(\"/teams/leaderboard\");\n        return response.data;\n    }\n};\n// Stats services\nconst statsService = {\n    getTournamentSummary: async ()=>{\n        const response = await api.get(\"/stats/tournament-summary\");\n        return response.data;\n    },\n    getAllPlayerStats: async ()=>{\n        const response = await api.get(\"/stats/player-stats\");\n        return response.data;\n    }\n};\n// Chatbot services\nconst chatbotService = {\n    sendQuery: async (query)=>{\n        const response = await api.post(\"/chatbot/query\", {\n            query\n        });\n        return response.data;\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (api);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxzQkFBc0I7UUFDcEIsTUFBTXRDLFdBQVcsTUFBTW5CLElBQUl3QyxHQUFHLENBQUM7UUFDL0IsT0FBT3JCLFNBQVNPLElBQUk7SUFDdEI7SUFFQWdDLG1CQUFtQjtRQUNqQixNQUFNdkMsV0FBVyxNQUFNbkIsSUFBSXdDLEdBQUcsQ0FBQztRQUMvQixPQUFPckIsU0FBU08sSUFBSTtJQUN0QjtBQUNGLEVBQUU7QUFFRixtQkFBbUI7QUFDWixNQUFNaUMsaUJBQWlCO0lBQzVCQyxXQUFXLE9BQU9DO1FBQ2hCLE1BQU0xQyxXQUFXLE1BQU1uQixJQUFJb0IsSUFBSSxDQUFDLGtCQUFrQjtZQUFFeUM7UUFBTTtRQUMxRCxPQUFPMUMsU0FBU08sSUFBSTtJQUN0QjtBQUNGLEVBQUU7QUFFRiwrREFBZTFCLEdBQUdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2FwaS5qcz80NTQyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpJztcblxuLy8gQ3JlYXRlIGF4aW9zIGluc3RhbmNlXG5jb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xuICBiYXNlVVJMOiBBUElfVVJMLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbn0pO1xuXG4vLyBBZGQgYXV0aCB0b2tlbiB0byByZXF1ZXN0cyBpZiBhdmFpbGFibGVcbmFwaS5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoXG4gIChjb25maWcpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9LFxuICAoZXJyb3IpID0+IFByb21pc2UucmVqZWN0KGVycm9yKVxuKTtcblxuLy8gQXV0aGVudGljYXRpb24gc2VydmljZXNcbmV4cG9ydCBjb25zdCBhdXRoU2VydmljZSA9IHtcbiAgcmVnaXN0ZXI6IGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvYXV0aC9yZWdpc3RlcicsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pO1xuICAgIGNvbnNvbGUubG9nKCdSZWdpc3RyYXRpb24gcmVzcG9uc2U6JywgcmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWdpc3RyYXRpb24gZmFpbGVkJyk7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS51c2VyKSk7XG4gICAgY29uc29sZS5sb2coJ1VzZXIgZGF0YTonLCByZXNwb25zZS5kYXRhLnVzZXIpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbjonLCByZXNwb25zZS5kYXRhLnRva2VuKTtcbiAgICBjb25zb2xlLmxvZygnTG9jYWwgc3RvcmFnZTonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICBjb25zb2xlLmxvZygnTG9jYWwgc3RvcmFnZSB0b2tlbjonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgY29uc29sZS5sb2coJ0xvY2FsIHN0b3JhZ2UgdXNlcjonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICBjb25zb2xlLmxvZygnTG9jYWwgc3RvcmFnZSB0b2tlbjonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgY29uc29sZS5sb2coJ0xvY2FsIHN0b3JhZ2UgdXNlcjonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICBjb25zb2xlLmxvZygnTG9jYWwgc3RvcmFnZSB0b2tlbjonLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LFxuICBcbiAgbG9naW46IGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvYXV0aC9sb2dpbicsIHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS51c2VyKSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LFxuICBcbiAgbG9nb3V0OiAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgfSxcbiAgXG4gIGdldEN1cnJlbnRVc2VyOiAoKSA9PiB7XG4gICAgY29uc3QgdXNlclN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gICAgaWYgKCF1c2VyU3RyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VyU3RyKTtcbiAgfSxcbiAgXG4gIGlzQXV0aGVudGljYXRlZDogKCkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSAhPT0gbnVsbDtcbiAgfSxcbiAgXG4gIGlzQWRtaW46ICgpID0+IHtcbiAgICBjb25zdCB1c2VyID0gYXV0aFNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICByZXR1cm4gdXNlciAmJiB1c2VyLmlzQWRtaW47XG4gIH0sXG59O1xuXG4vLyBQbGF5ZXIgc2VydmljZXNcbmV4cG9ydCBjb25zdCBwbGF5ZXJTZXJ2aWNlID0ge1xuICBnZXRBbGxQbGF5ZXJzOiBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvcGxheWVycycpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9LFxuICBcbiAgZ2V0UGxheWVyQnlJZDogYXN5bmMgKGlkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvcGxheWVycy8ke2lkfWApO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9LFxuICBcbiAgLy8gQWRtaW4gb25seSBmdW5jdGlvbnNcbiAgY3JlYXRlUGxheWVyOiBhc3luYyAocGxheWVyRGF0YSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoJy9wbGF5ZXJzJywgcGxheWVyRGF0YSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0sXG4gIFxuICB1cGRhdGVQbGF5ZXI6IGFzeW5jIChpZCwgcGxheWVyRGF0YSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL3BsYXllcnMvJHtpZH1gLCBwbGF5ZXJEYXRhKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbiAgXG4gIGRlbGV0ZVBsYXllcjogYXN5bmMgKGlkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZGVsZXRlKGAvcGxheWVycy8ke2lkfWApO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9LFxufTtcblxuLy8gVGVhbSBzZXJ2aWNlc1xuZXhwb3J0IGNvbnN0IHRlYW1TZXJ2aWNlID0ge1xuICBnZXRVc2VyVGVhbTogYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3RlYW1zL215LXRlYW0nKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbiAgXG4gIGFkZFBsYXllclRvVGVhbTogYXN5bmMgKHBsYXllcklkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgL3RlYW1zL2FkZC1wbGF5ZXIvJHtwbGF5ZXJJZH1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbiAgXG4gIHJlbW92ZVBsYXllckZyb21UZWFtOiBhc3luYyAodGVhbVBsYXllcklkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZGVsZXRlKGAvdGVhbXMvcmVtb3ZlLXBsYXllci8ke3RlYW1QbGF5ZXJJZH1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbiAgXG4gIGdldExlYWRlcmJvYXJkOiBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvdGVhbXMvbGVhZGVyYm9hcmQnKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbn07XG5cbi8vIFN0YXRzIHNlcnZpY2VzXG5leHBvcnQgY29uc3Qgc3RhdHNTZXJ2aWNlID0ge1xuICBnZXRUb3VybmFtZW50U3VtbWFyeTogYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3N0YXRzL3RvdXJuYW1lbnQtc3VtbWFyeScpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9LFxuICBcbiAgZ2V0QWxsUGxheWVyU3RhdHM6IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9zdGF0cy9wbGF5ZXItc3RhdHMnKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSxcbn07XG5cbi8vIENoYXRib3Qgc2VydmljZXNcbmV4cG9ydCBjb25zdCBjaGF0Ym90U2VydmljZSA9IHtcbiAgc2VuZFF1ZXJ5OiBhc3luYyAocXVlcnkpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvY2hhdGJvdC9xdWVyeScsIHsgcXVlcnkgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcGk7Il0sIm5hbWVzIjpbImF4aW9zIiwiQVBJX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiYXBpIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwiY29uZmlnIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiQXV0aG9yaXphdGlvbiIsImVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsImF1dGhTZXJ2aWNlIiwicmVnaXN0ZXIiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVzcG9uc2UiLCJwb3N0IiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsIkVycm9yIiwic2V0SXRlbSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlciIsImxvZ2luIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsImdldEN1cnJlbnRVc2VyIiwidXNlclN0ciIsInBhcnNlIiwiaXNBdXRoZW50aWNhdGVkIiwiaXNBZG1pbiIsInBsYXllclNlcnZpY2UiLCJnZXRBbGxQbGF5ZXJzIiwiZ2V0IiwiZ2V0UGxheWVyQnlJZCIsImlkIiwiY3JlYXRlUGxheWVyIiwicGxheWVyRGF0YSIsInVwZGF0ZVBsYXllciIsInB1dCIsImRlbGV0ZVBsYXllciIsImRlbGV0ZSIsInRlYW1TZXJ2aWNlIiwiZ2V0VXNlclRlYW0iLCJhZGRQbGF5ZXJUb1RlYW0iLCJwbGF5ZXJJZCIsInJlbW92ZVBsYXllckZyb21UZWFtIiwidGVhbVBsYXllcklkIiwiZ2V0TGVhZGVyYm9hcmQiLCJzdGF0c1NlcnZpY2UiLCJnZXRUb3VybmFtZW50U3VtbWFyeSIsImdldEFsbFBsYXllclN0YXRzIiwiY2hhdGJvdFNlcnZpY2UiLCJzZW5kUXVlcnkiLCJxdWVyeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/api.js\n"));

/***/ })

});