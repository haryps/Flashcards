"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherForecasts = require("./WeatherForecasts");
var Counter = require("./Counter");
var Deck = require("./Deck");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    card: Deck.reducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};
//# sourceMappingURL=index.js.map