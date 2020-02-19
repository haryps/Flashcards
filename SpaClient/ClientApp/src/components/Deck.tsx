import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as DeckStore from '../store/Deck';
import { MouseEvent } from 'react';
import './Deck.css';

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
        const className = this.state.isFrontCard ? 'card text-center front-card' : 'card text-center back-card';
        let card;

        if (isFrontCard) {
            card = (
                <React.Fragment>
                    <div className={className} >
                        <div className="card-body">
                            <h5 className="card-title">Front Card</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>Click to see meaning →</button>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            card = (
                <React.Fragment>
                    <div className={className}>
                        <div className="card-body">
                            <h5 className="card-title">Back Card</h5>
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

        return (
            <div className="card-container">
                <div className="card-inner">
                    {card}
                </div>
            </div>
        );

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
