import * as React from 'react';
import { connect } from 'react-redux';
import { GridDeck } from './GridDeck';

class Grid extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                {this.renderGridDecks()}
            </React.Fragment>
        );
    }

    private renderGridDecks() {

        let decks = [];
        for (let i = 1; i <= 18; i++) {
            decks.push(<GridDeck key={i} index={i} />)
        }

        return decks;
    }
};

export default connect()(Grid);
