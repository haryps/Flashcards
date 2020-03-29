import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import { GridDeck } from './GridDeck';
import { ApiBaseUrl } from '../Constants';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
            decknum: 0,
            currentValue: [],
            maxValue: [],
            vocabulary: [],
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = ApiBaseUrl + '/api/deck/decknum';
            fetch(url, { mode: 'cors', credentials: 'same-origin' })
                .then(response => response.json())
                .then(vocabulary => {
                this.setCurrentProgress(vocabulary);
            });
        });
    }
    render() {
        let decks = [];
        //console.log('state decknum:' + this.state.decknum);
        for (let i = 1; i <= this.state.decknum; i++) {
            decks.push(React.createElement(GridDeck, { key: i, deckId: i, currentValue: this.state.currentValue[i], maxValue: this.state.maxValue[i], cards: this.state.vocabulary[i - 1] }));
        }
        return (React.createElement("main", { role: "main" },
            React.createElement(Introduction, null),
            React.createElement("div", { className: "album py-5", style: { color: "#1abc9c", backgroundColor: "#1abc9c" } },
                React.createElement("div", { className: "container", style: { color: "#1abc9c", backgroundColor: "#1abc9c" } },
                    React.createElement("div", { className: "row", style: { color: "#1abc9c", backgroundColor: "#1abc9c" } },
                        React.createElement(React.Fragment, null, decks))))));
    }
    setCurrentProgress(vocabulary) {
        let currentValueArray = new Array(vocabulary.length);
        let maxValueArray = new Array(vocabulary.length);
        if (typeof (Storage) !== "undefined") {
            for (let i = 1; i <= vocabulary.length; i++) {
                let currentValue = 0;
                let value = localStorage.getItem(`deck${i}_progress`);
                if (value) {
                    let progress = JSON.parse(value);
                    progress.understandings.map(understanding => {
                        if (understanding.known) {
                            currentValue++;
                        }
                    });
                    currentValueArray[i] = currentValue;
                }
                else {
                    currentValueArray[i] = 0;
                }
                maxValueArray[i] = vocabulary[i - 1].length;
                this.setState({ decknum: i, currentValue: currentValueArray, maxValue: maxValueArray, vocabulary: vocabulary });
            }
        }
        else {
            throw "Sorry, your browser does not support web storage...";
        }
    }
}
export default connect()(Flashcards);
//# sourceMappingURL=Flashcards.js.map