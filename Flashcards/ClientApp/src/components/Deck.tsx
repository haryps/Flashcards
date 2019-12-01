import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as DeckStore from '../store/Deck';

type DeckProps =
    DeckStore.DeckState &
    typeof DeckStore.actionCreators &
    RouteComponentProps<{}>;

class Deck extends React.PureComponent<DeckProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.deck,
    DeckStore.actionCreators
)(Deck as any);
