import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as DeckStore from '../store/Deck';
import './Deck.css';
import { MouseEvent } from 'react';

type DeckProps =
    DeckStore.DeckState &
    typeof DeckStore.actionCreators &
    RouteComponentProps<{ id: string }>;

interface DeckState {
    isFrontCard: boolean;
}

class Deck extends React.PureComponent<DeckProps, DeckState> {
    constructor(props: DeckProps) {
        super(props)
        this.state = {
            isFrontCard: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public componentDidMount() {
        this.props.requestDeck(parseInt(this.props.match.params.id, 10));
    }

    handleClick() {
        this.setState({ isFrontCard: !this.state.isFrontCard });
        console.log('isFrontCard: ' + this.state.isFrontCard);
    }

    public render() {

        const isFrontCard = this.state.isFrontCard;
        if (isFrontCard) {
            return (
                <React.Fragment>
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>Click to see meaning →</button>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>&#10003; I knew this word</button>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>&#10005; I didn't know this word</button>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

    }
};

//const mapStateToProps = (state: ApplicationState) => {
//    deck: state.deck
//};

export default connect(
    //mapStateToProps,
    null,
    DeckStore.actionCreators
)(Deck as any);
