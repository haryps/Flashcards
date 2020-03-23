import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants';
import authService from './AuthorizeService';
import { Component } from 'react';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};

export default class AuthorizeRoute extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            ready: false,
            authenticated: false,
            _subscription: 0,
        };
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
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`;
        if (!ready) {
            return React.createElement("div", null);
        }
        else {
            const rest = __rest(this.props, []);
            return React.createElement(Route, Object.assign({}, rest, { render: (props) => {
                    if (authenticated) {
                        return React.createElement(Component, Object.assign({}, props));
                    }
                    else {
                        return React.createElement(Redirect, { to: redirectUrl });
                    }
                } }));
        }
    }
    populateAuthenticationState() {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticated = yield authService.isAuthenticated();
            this.setState({ ready: true, authenticated });
        });
    }
    authenticationChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ ready: false, authenticated: false });
            yield this.populateAuthenticationState();
        });
    }
}
//# sourceMappingURL=AuthorizeRoute.js.map