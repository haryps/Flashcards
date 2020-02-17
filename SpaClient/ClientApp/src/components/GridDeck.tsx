import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
    index: number;
}

export class GridDeck extends React.PureComponent<Props> {

    public render() {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <svg height="225px" width="100%">
                            <rect fill="#55595c" x="0" y="0" height="225px" width="100%"></rect>
                            <text x="50%" y="50%" fontWeight="bold" fill="white" fontSize="20px"
                                textAnchor="middle"
                                dominantBaseline="middle">
                                Deck {this.props.index}
                            </text>
                        </svg>
                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <Link to={`/deck/${this.props.index}`} className="btn btn-sm btn-outline-secondary">
                                        Practice this deck {this.props.index} →
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
