import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as DeckStore from '../store/Deck';

type DeckProps =
    DeckStore.DeckState &
    typeof DeckStore.actionCreators &
    RouteComponentProps<{ id: string}>;

class Deck extends React.PureComponent<DeckProps> {

    public componentDidMount() {
        this.props.requestDeck(parseInt(this.props.match.params.id, 10));
    }

    public componentDidUpdate() {
        this.props.requestDeck(parseInt(this.props.match.params.id, 10));
    }

    public render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state: ApplicationState) => {     
    //deck: state.deck
};

export default connect(
    mapStateToProps,
    //(state: ApplicationState) => state.deck,
    DeckStore.actionCreators
)(Deck as any);
