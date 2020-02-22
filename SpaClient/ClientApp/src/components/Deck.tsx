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

class Deck extends React.PureComponent<DeckProps> {
    constructor(props: DeckProps) {
        super(props)
        this.state = {
            isFrontCard: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public componentDidMount() {
        const deckId = parseInt(this.props.match.params.id, 10);
        this.props.requestDeck(deckId);
    }

    handleClick() {
        this.setState({ isFrontCard: !this.props.isFrontCard });
        console.log('isFrontCard: ' + this.props.isFrontCard);
    }

    public render() {

        const isFrontCard = this.props.isFrontCard;
        const className = this.props.isFrontCard ? 'card text-center front-card' : 'card text-center back-card';
        let card;

        if (isFrontCard) {
            card = (
                <React.Fragment>
                    <div className={className} >
                        <div className="card-body">
                            <h5 className="card-title">{this.props.currentCard.word}</h5>
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
                            <h5 className="card-title">{this.props.currentCard.word}</h5>
                            <p className="card-text">{this.props.currentCard.definition}</p>
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

export default connect(
    (state: ApplicationState) => state.deck,
    DeckStore.actionCreators
)(Deck as any);
