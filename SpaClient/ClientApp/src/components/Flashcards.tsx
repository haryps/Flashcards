import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import { GridDeck } from './GridDeck';
import { Progress } from '../store/Deck';

interface FlashcardsState {
    decknum: number;
    currentValue: number[];
    maxValue: number[];
}

class Flashcards extends React.PureComponent<{}, FlashcardsState> {
    public readonly state: FlashcardsState = {
        decknum: 0,
        currentValue: [],
        maxValue: []
    }

    public async componentDidMount() {
        const url = 'https://localhost:44393/api/deck/decknum';
        fetch(url, { mode: 'cors', credentials: 'same-origin' })
            .then(response => response.json() as Promise<number>)
            .then(number => {
                console.log('Flashcards decknum:' + number);

                this.setState({ decknum: number })

                let currentValue = 0;
                let maxValue = 0;
                let currentValueArray: number[] = new Array(number);
                let maxValueArray: number[] = new Array(number);
                if (typeof (Storage) !== "undefined") {
                    for (let i = 1; i <= this.state.decknum; i++) {
                        let value = localStorage.getItem(`deck${i}_progress`);
                        if (value) {
                            console.log(value);
                            let progress: Progress = JSON.parse(value);
                            progress.understandings.map(understanding => {
                                if (understanding.known) {
                                    currentValue++;
                                }
                            });
                            maxValue = progress.understandings.length;

                            currentValueArray[i] = currentValue;
                            maxValueArray[i] = maxValue;
                        } else {
                            currentValueArray[i] = 0;
                            maxValueArray[i] = 0;   // Fix this
                        }
                    }
                    this.setState({ currentValue: currentValueArray, maxValue: maxValueArray });
                } else {
                    throw "Sorry, your browser does not support web storage...";
                }
            })


    }

    public render() {

        let decks: JSX.Element[] = [];

        console.log('state decknum:' + this.state.decknum);

        for (let i = 1; i <= this.state.decknum; i++) {
            decks.push(<GridDeck key={i} deckId={i} currentValue={this.state.currentValue[i]} maxValue={this.state.maxValue[i]} />)
        }

        return (
            <main role="main">
                <Introduction />

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row">
                            <React.Fragment>
                                {decks}
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

}

export default connect()(Flashcards);
