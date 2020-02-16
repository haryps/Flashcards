import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import { GridDeck } from './GridDeck';

var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Flashcards extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            decknum: 0
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://localhost:44393/api/deck/decknum';
            const response = yield fetch(url, { mode: 'cors', credentials: 'same-origin' });
            const decknum = yield response.json();
            console.log('Flashcards decknum:' + decknum);
            yield this.setState({ decknum: decknum });
        });
    }
    render() {
        let decks = [];
        console.log('state decknum:' + this.state.decknum);
        for (let i = 1; i <= this.state.decknum; i++) {
            decks.push(React.createElement(GridDeck, { key: i, index: i }));
        }
        return (React.createElement("main", { role: "main" },
            React.createElement(Introduction, null),
            React.createElement("div", { className: "album py-5 bg-light" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "row" },
                        React.createElement(React.Fragment, null, decks))))));
    }
}
export default connect()(Flashcards);
//# sourceMappingURL=Flashcards.js.map