import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import FetchData from './components/FetchData';
import Flashcards from './components/Flashcards';
import Deck from './components/Deck';
import './custom.css';
import { ApplicationPaths } from './components/authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/authorization/ApiAuthorizationRoutes';
import Callback from './components/authorization/Callback';

export default class App extends React.Component {

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Flashcards} />
                <Route path='/flashcards' component={Flashcards} />
                <Route path='/deck/:id?' component={Deck} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}