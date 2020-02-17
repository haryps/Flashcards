import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import { GridDeck } from './GridDeck';

interface FlashcardsState {
    decknum: number;
}

class Flashcards extends React.PureComponent<{}, FlashcardsState> {
    public readonly state: FlashcardsState = {
        decknum: 0
    }

    public async componentDidMount() {
        const url = 'https://localhost:44393/api/deck/decknum';
        fetch(url, { mode: 'cors', credentials: 'same-origin' })
            .then(response => response.json() as Promise<number>)
            .then(number => {
                console.log('Flashcards decknum:' + number);

                this.setState({ decknum: number })
            })
    }

    public render() {

        let decks: JSX.Element[] = [];

        console.log('state decknum:' + this.state.decknum);

        for (let i = 1; i <= this.state.decknum; i++) {
            decks.push(<GridDeck key={i} index={i} />)
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
