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

    handleClick(event: MouseEvent) {

        const innerText = event.currentTarget.innerHTML;
        if (innerText.includes("I know this word")) {

            this.props.updateProgress(this.props.deckId, this.props.cards, this.props.isFrontCard,
                this.props.currentCard, true, this.props.progress);

        } else if (innerText.includes("I don't know this word")) {

            this.props.updateProgress(this.props.deckId, this.props.cards, this.props.isFrontCard,
                this.props.currentCard, false, this.props.progress);

        } else if (innerText.includes("Click to see meaning")) {

            this.props.flipTheCard(this.props.isFrontCard, this.props.currentCard);

        }
    }

    public render() {

        const isFrontCard = this.props.isFrontCard;

        const className = isFrontCard
            ? 'card card__face card__face--front-card'
            : 'card card__face card__face--back-card';

        const innerCardClassName = isFrontCard ? 'card-inner w3-animate-right' : 'card-inner is-flipped';

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
                            <p className="card-text"><b>definition: </b>{this.props.currentCard.definition}</p>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>&#10003; I know this word</button>
                        </div>
                        <div className="card-footer text-muted">
                            <button className="btn btn-primary" onClick={this.handleClick}>&#10005; I don't know this word</button>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div className="card-container">
                <div className={innerCardClassName}>
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
