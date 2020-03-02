import * as React from 'react';
import { connect } from 'react-redux';

class Introduction extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <section className="jumbotron text-center" style={{ color: "#1abc9c", backgroundColor: "#1abc9c" }}>
                    <div className="container">
                        <h1 className="jumbotron-heading" style={{ color: "#fff", fontWeight: 500 }}>GRE Vocabulary Flashcards</h1>
                    </div>
                </section>
            </React.Fragment>
        );
    }
};

export default connect()(Introduction);
