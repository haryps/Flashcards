import * as React from 'react';
import { connect } from 'react-redux';

class Introduction extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">GRE Vocabulary Flashcards</h1>
                    </div>
                </section>
            </React.Fragment>
        );
    }
};

export default connect()(Introduction);
