import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CardStore from '../store/Card';

type CardProps =
    CardStore.CardState &
    typeof CardStore.actionCreators &
    RouteComponentProps<{}>;

class Card extends React.PureComponent<CardProps> {
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
    (state: ApplicationState) => state.card,
    CardStore.actionCreators
)(Card);
