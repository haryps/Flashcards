import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Fragment } from 'react';
import authService from './AuthorizeService';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class LoginMenu extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isAuthenticated: false,
            userName: "",
            _subscription: 0,
        };
    }
    componentDidMount() {
        this.state._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }
    componentWillUnmount() {
        authService.unsubscribe(this.state._subscription);
    }
    populateState() {
        return __awaiter(this, void 0, void 0, function* () {
            const [isAuthenticated, user] = yield Promise.all([authService.isAuthenticated(), authService.getUser()]);
            this.setState({
                isAuthenticated,
                userName: user && user.name,
                _subscription: this.state._subscription
            });
        });
    }
    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        }
        else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }
    authenticatedView(userName, profilePath, logoutPath) {
        return (React.createElement(Fragment, null,
            React.createElement(NavItem, null,
                React.createElement(NavLink, { tag: Link, style: { color: "#fff" }, to: profilePath },
                    "Hello ",
                    userName)),
            React.createElement(NavItem, null,
                React.createElement(NavLink, { tag: Link, style: { color: "#fff" }, to: logoutPath }, "Logout"))));
    }
    anonymousView(registerPath, loginPath) {
        return (React.createElement(Fragment, null,
            React.createElement(NavItem, null,
                React.createElement(NavLink, { tag: Link, style: { color: "#fff" }, to: registerPath }, "Register")),
            React.createElement(NavItem, null,
                React.createElement(NavLink, { tag: Link, style: { color: "#fff" }, to: loginPath }, "Login"))));
    }
}
//# sourceMappingURL=LoginMenu.js.map