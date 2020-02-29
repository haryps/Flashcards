import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import authService from '../components/api-authorization/AuthorizeService';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DeckState {
    deckId: number;
    cards: Card[];
    isFrontCard: boolean;
    currentCard: Card;
    progress: Progress;
}

export interface Card {
    word: string;
    definition: string;
}

export interface Progress {
    deckId: number;
    understandings: Understanding[];
}

export interface Understanding {
    card: Card;
    known: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface RequestDeckAction {
    type: 'REQUEST_DECK';
    deckId: number;
    cards: Card[];
    currentCard: Card;
}

export interface GetCurrentCard {
    type: 'GET_CURRENT_CARD';
    deckId: number;
    currentCard: Card;
}

export interface FlipCardState {
    type: 'FLIP_THE_CARD';
    isFrontCard: boolean;
    currentCard: Card;
}

export interface UpdateProgress {
    type: 'UPDATE_PROGRESS';
    isFrontCard: boolean;
    currentCard: Card;
    progress: Progress;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestDeckAction | GetCurrentCard | FlipCardState | UpdateProgress;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestDeck: (deckId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const appState = getState();

        if (appState && appState.deck) {

            var signedIn: boolean = false;  //Later, use authService to check whether the user is already signed in or not
            if (signedIn) {
                //authService.getAccessToken().then(token => {
                //    console.log(token);
                //    const url = 'api/deck/' + deckId;
                //    fetch(url, {
                //        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                //    })
                //        .then(response => response.json() as Promise<Card[]>)
                //        .then(data => {
                //            dispatch({ type: 'REQUEST_DECK', deckId: deckId, deck: data });
                //        });
                //});
            } else {
                const url = 'https://localhost:44393/api/deck/decknum/' + deckId;
                fetch(url, { mode: 'cors', credentials: 'same-origin' })
                    .then(response => response.json() as Promise<Card[]>)
                    .then(cards => {

                        let currentCard = cards[0];
                        //Find the first word whose meaning is not known
                        if (typeof (Storage) !== "undefined") {
                            let value = localStorage.getItem(`deck${deckId}_progress`);
                            if (value) {
                                let i = 0;
                            } else {
                                currentCard = cards[0];
                            }
                        } else {
                            throw "Sorry, your browser does not support web storage...";
                        }

                        dispatch({ type: 'REQUEST_DECK', deckId: deckId, cards: cards, currentCard: currentCard });
                    });
            }

        }
    },

    getCurrentCard: (deckId: number, cards: Card[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.deck) {

            let currentCard = cards[0];
            //Find the first word whose meaning is not known
            if (typeof (Storage) !== "undefined") {
                let value = localStorage.getItem(`deck${deckId}_progress`);
                if (value) {
                    let i = 0;
                } else {
                    currentCard = cards[0];
                }
            } else {
                throw "Sorry, your browser does not support web storage...";
            }

            dispatch({ type: 'GET_CURRENT_CARD', deckId: deckId, currentCard: currentCard });
        }

    },

    flipTheCard: (isFrontCard: boolean, currentCard: Card): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.deck) {
            dispatch({ type: 'FLIP_THE_CARD', isFrontCard: !isFrontCard, currentCard: currentCard });
        }
    },

    updateProgress:
        (deckId: number, cards: Card[], isFrontCard: boolean, currentCard: Card, known: boolean, progress: Progress):
            AppThunkAction<KnownAction> => (dispatch, getState) => {
                const appState = getState();
                if (appState && appState.deck) {

                    if (typeof (Storage) !== "undefined") {
                        let value = localStorage.getItem(`deck${deckId}_progress`);
                        if (value) {

                            progress.understandings
                                .map(understanding => {
                                    if (understanding.card.word === currentCard.word) {
                                        understanding.known = known;
                                        return;
                                    }
                                });

                        } else {

                            progress = <Progress>{};
                            progress.deckId = deckId;
                            let understandings: Understanding[] = new Array(cards.length);
                            cards.map((card, index) => {
                                let understanding: Understanding = {
                                    card: card,
                                    known: currentCard.word === card.word ? known : false,
                                };

                                understandings[index] = understanding;
                            });

                            progress.understandings = understandings;
                        }

                        localStorage.setItem(`deck${deckId}_progress`, JSON.stringify(progress));

                        //Find the first word whose meaning is not known
                        let currentUnderstandingIndex: number = 0;
                        for (let i = 0; i < progress.understandings.length; i++) {
                            if (progress.understandings[i].card.word === currentCard.word) {
                                currentUnderstandingIndex = i;
                                break;
                            }
                        }
                        let nextCard: Card = progress.understandings[0].card;
                        for (let j = currentUnderstandingIndex + 1; j < progress.understandings.length; j++) {
                            if (!progress.understandings[j].known) {
                                nextCard = progress.understandings[j].card;
                                break;
                            }
                        }

                        dispatch({
                            type: 'UPDATE_PROGRESS',
                            progress: progress, currentCard: nextCard,
                            isFrontCard: !isFrontCard
                        });
                    } else {
                        throw "Sorry, your browser does not support web storage...";
                    }


                }
            },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DeckState = {
    cards: [], deckId: 1, isFrontCard: true, currentCard: { definition: '', word: '' },
    progress: { deckId: 1, understandings: [] }
};

export const reducer: Reducer<DeckState> = (state: DeckState | undefined, incomingAction: Action): DeckState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DECK':
            return {
                deckId: action.deckId,
                cards: action.cards,
                isFrontCard: state.isFrontCard,
                currentCard: action.currentCard,
                progress: state.progress,
            };
        case 'GET_CURRENT_CARD':
            return Object.assign({}, state, {
                currentCard: action.currentCard
            });
        case 'FLIP_THE_CARD':
            return Object.assign({}, state, {
                isFrontCard: action.isFrontCard,
                currentCard: action.currentCard
            });
        case 'UPDATE_PROGRESS':
            return {
                deckId: state.deckId,
                cards: state.cards,
                isFrontCard: action.isFrontCard,
                currentCard: action.currentCard,
                progress: action.progress,
            };
        default:
            return state;
    }
};
