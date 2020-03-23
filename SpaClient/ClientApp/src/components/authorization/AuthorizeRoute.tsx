import * as React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'
import { Component } from 'react';

interface AuthorizeRouteProps {
    action: string;
}

interface AuthorizeRouteState {
    ready: boolean;
    authenticated: boolean;
    _subscription: number;
}

export default class AuthorizeRoute extends React.Component<AuthorizeRouteProps, AuthorizeRouteState> {
    public readonly state: AuthorizeRouteState = {
        ready: false,
        authenticated: false,
        _subscription: 0,
    }

    componentDidMount() {
        console.log(this.state.authenticated);
        this.state._subscription = authService.subscribe(() => this.authenticationChanged());
        this.populateAuthenticationState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this.state._subscription);
    }

    render() {
        const { ready, authenticated } = this.state;
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`
        if (!ready) {
            return <div></div>;
        } else {
            const { ...rest } = this.props;
            return <Route {...rest}
                render={(props) => {
                    if (authenticated) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to={redirectUrl} />
                    }
                }} />
        }
    }

    async populateAuthenticationState() {
        const authenticated = await authService.isAuthenticated();
        this.setState({ ready: true, authenticated });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        await this.populateAuthenticationState();
    }
}
