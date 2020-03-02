import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import { GridDeck } from './GridDeck';
import { Progress, Card } from '../store/Deck';

interface FlashcardsState {
    decknum: number;
    currentValue: number[];
    maxValue: number[];
    vocabulary: Card[][];
}

class Flashcards extends React.PureComponent<{}, FlashcardsState> {
    public readonly state: FlashcardsState = {
        decknum: 0,
        currentValue: [],
        maxValue: [],
        vocabulary: [],
    }

    public async componentDidMount() {
        const url = 'https://localhost:44393/api/deck/decknum';
        fetch(url, { mode: 'cors', credentials: 'same-origin' })
            .then(response => response.json() as Promise<Card[][]>)
            .then(vocabulary => {

                this.setCurrentProgress(vocabulary);
                //this.requestDeck(vocabulary);
            })
    }

    public render() {

        let decks: JSX.Element[] = [];

        console.log('state decknum:' + this.state.decknum);

        for (let i = 1; i <= this.state.decknum; i++) {
            decks.push(<GridDeck key={i} deckId={i} currentValue={this.state.currentValue[i]}
                maxValue={this.state.maxValue[i]} cards={this.state.vocabulary[i - 1]} />)
        }

        return (
            <main role="main">
                <Introduction />

                <div className="album py-5" style={{ color: "#1abc9c", backgroundColor: "#1abc9c" }}>
                    <div className="container" style={{ color: "#1abc9c", backgroundColor: "#1abc9c" }}>

                        <div className="row" style={{ color: "#1abc9c", backgroundColor: "#1abc9c" }}>
                            <React.Fragment>
                                {decks}
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    private setCurrentProgress(vocabulary: Card[][]) {
        let currentValue = 0;
        let maxValue = 0;
        let currentValueArray: number[] = new Array(vocabulary.length);
        let maxValueArray: number[] = new Array(vocabulary.length);

        if (typeof (Storage) !== "undefined") {
            for (let i = 1; i <= vocabulary.length; i++) {
                let value = localStorage.getItem(`deck${i}_progress`);
                if (value) {

                    let progress: Progress = JSON.parse(value);
                    progress.understandings.map(understanding => {
                        if (understanding.known) {
                            currentValue++;
                        }
                    });
                    maxValue = progress.understandings.length;
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
