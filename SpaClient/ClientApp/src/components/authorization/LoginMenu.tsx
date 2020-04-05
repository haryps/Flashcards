import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Fragment } from 'react';
import authService from './AuthorizeService';

interface LoginMenuState {
    isAuthenticated?: boolean | null;
    userName: string;
    _subscription: number;
}

export class LoginMenu extends React.PureComponent<{}, LoginMenuState> {
    public readonly state: LoginMenuState = {
        isAuthenticated: false,
        userName: "",
        _subscription: 0,
    }
    

    componentDidMount() {
        this.state._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this.state._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        console.log(isAuthenticated);
        console.log(user);
        this.setState({
            isAuthenticated,
            userName: user && user.name,
            _subscription: this.state._subscription
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName: any, profilePath: any, logoutPath: any) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} style={{ color: "#fff" }} to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} style={{ color: "#fff" }} to={logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath: string, loginPath: string) {
        return (
            <Fragment>
                <NavItem>
                    <NavLink tag={Link} style={{ color: "#fff" }} to={registerPath}>Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} style={{ color: "#fff" }} to={loginPath}>Login</NavLink>
                </NavItem>
            </Fragment>
        );
    }
}

