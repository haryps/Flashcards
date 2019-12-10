import * as React from 'react';
import { Container } from 'reactstrap';
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
                <Container>
                    <div className="card text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Click to see the meaning</a>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Click to see the meaning</a>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.deck,
    DeckStore.actionCreators
)(Deck as any);
