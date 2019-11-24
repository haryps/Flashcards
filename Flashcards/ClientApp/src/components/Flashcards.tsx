import * as React from 'react';
import { connect } from 'react-redux';
import './album.css';
import Introduction from './Introduction';
import Grid from './Grid';

const Flashcards = () => (
    <main role="main">
        <Introduction />

        <div className="album py-5 bg-light">
            <div className="container">

                <div className="row">
                    <Grid />
                </div>
            </div>
        </div>
    </main>
);

export default connect()(Flashcards);
