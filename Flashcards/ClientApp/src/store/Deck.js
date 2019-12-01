"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestDeck: function (deckId) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.deck) {
            fetch('deck')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_DECK', deckId: deckId, cards: data });
            });
            dispatch({ type: 'REQUEST_DECK', deckId: deckId });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { cards: [] };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_DECK':
            return {
                deckId: action.deckId,
                cards: state.cards
            };
        case 'RECEIVE_DECK':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.deckId === state.deckId) {
                return {
                    deckId: action.deckId,
                    cards: action.cards,
                };
            }
            break;
    }
    return state;
};
//# sourceMappingURL=Deck.js.map