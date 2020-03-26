import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../store/Deck';

interface Props {
    deckId: number;
    currentValue: number;
    maxValue: number;
    cards: Card[];
}

export class GridDeck extends React.PureComponent<Props> {

    public render() {
        let percentage: number = (this.props.currentValue / this.props.maxValue) * 100;

        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <svg height="100%" width="100%">
                            <rect fill="#563d7c" strokeWidth="0" stroke="#563d7c" x="0" y="0" height="100%" width="100%" style={{}}></rect>
                            <text x="50%" y="50%" fontWeight="bold" fill="white" fontSize="20px"
                                textAnchor="middle"
                                dominantBaseline="middle">
                                Deck {this.props.deckId}
                            </text>
                        </svg>
                        <div className="card-body">
                            <p style={{ color: "#2c3e50", marginBottom: "5px" }}>{this.props.currentValue} of {this.props.maxValue} words mastered</p>
                            <div className="progress" style={{ marginTop: "5px", marginBottom: "10px" }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percentage}%` }}
                                    aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <Link to={{
                                        pathname: `/deck/${this.props.deckId}`,
                                        state: this.props.cards
                                    }} className="btn btn-sm btn-primary">
                                        Practice this deck →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};
