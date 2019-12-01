import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class GridDeck extends React.PureComponent<any> {
    public render() {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <Link to="/deck" className="btn btn-sm btn-outline-secondary">
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

export default connect()(GridDeck);
