import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import FetchData from './components/FetchData';
import Flashcards from './components/Flashcards';
import Deck from './components/Deck';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';

export default () => (
    <Layout>
        <Route exact path='/' component={Flashcards} />
        <AuthorizeRoute path='/flashcards' component={Flashcards} />
        <AuthorizeRoute path='/deck/:id?' component={Deck} />
        <AuthorizeRoute path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
    </Layout>
);
