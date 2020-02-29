import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
    deckId: number;
    currentValue: number;
    maxValue: number;
}

export class GridDeck extends React.PureComponent<Props> {

    public render() {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <svg height="100%" width="100%">
                            <rect fill="#55595c" x="0" y="0" height="100%" width="100%"></rect>
                            <text x="50%" y="50%" fontWeight="bold" fill="white" fontSize="20px"
                                textAnchor="middle"
                                dominantBaseline="middle">
                                Deck {this.props.deckId}
                            </text>
                        </svg>
                        <div className="card-body">
                            <p style={{ marginBottom: "5px" }}>{this.props.currentValue} of {this.props.maxValue} words mastered</p>
                            <div className="progress" style={{ marginTop: "5px", marginBottom: "10px" }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <Link to={`/deck/${this.props.deckId}`} className="btn btn-sm btn-outline-secondary">
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
