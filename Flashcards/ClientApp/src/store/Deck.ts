import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DeckState {
    deckId: number;
    cards: Card[];
}

export interface Card {
    deckId: number;
    word: string;
    definition: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface RequestDeckAction {
    type: 'REQUEST_DECK';
    deckId: number;
    deck: Card[];
}

export interface ReceiveDeckAction {
    type: 'RECEIVE_DECK';
    deckId: number;
    cards: Card[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestDeckAction | ReceiveDeckAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestDeck: (deckId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();

        if (appState && appState.deck) {
            const url = 'api/deck/' + deckId;
            fetch(url)
                .then(response => response.json() as Promise<Card[]>)
                .then(data => {
                    dispatch({ type: 'REQUEST_DECK', deckId: deckId, deck: data });
                });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DeckState = { cards: [], deckId: 1 };

export const reducer: Reducer<DeckState> = (state: DeckState | undefined, incomingAction: Action): DeckState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DECK':
            return {
                deckId: action.deckId,
                cards: state.cards
            };
        case 'RECEIVE_DECK':
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
