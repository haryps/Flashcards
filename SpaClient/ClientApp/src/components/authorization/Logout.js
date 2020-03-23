import * as React from 'react';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';
import { QueryParameterNames, LogoutActions, ApplicationPaths } from './ApiAuthorizationConstants';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined,
            isReady: false,
            authenticated: false
        };
    }
    componentDidMount() {
        const action = this.props.action;
        switch (action) {
            case LogoutActions.Logout:
                if (!!window.history.state.state.local) {
                    this.logout(this.getReturnUrl(""));
                }
                else {
                    // This prevents regular links to <app>/authentication/logout from triggering a logout
                    this.setState({ isReady: true, message: "The logout was not initiated from within the page." });
                }
                break;
            case LogoutActions.LogoutCallback:
                this.processLogoutCallback();
                break;
            case LogoutActions.LoggedOut:
                this.setState({ isReady: true, message: "You successfully logged out!" });
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }
        this.populateAuthenticationState();
    }
    render() {
        const { isReady, message } = this.state;
        if (!isReady) {
            return React.createElement("div", null);
        }
        if (!!message) {
            return (React.createElement("div", null, message));
        }
        else {
            const action = this.props.action;
            switch (action) {
                case LogoutActions.Logout:
                    return (React.createElement("div", null, "Processing logout"));
                case LogoutActions.LogoutCallback:
                    return (React.createElement("div", null, "Processing logout callback"));
                case LogoutActions.LoggedOut:
                    return (React.createElement("div", null, message));
                default:
                    throw new Error(`Invalid action '${action}'`);
            }
        }
    }
    logout(returnUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const isauthenticated = yield authService.isAuthenticated();
            if (isauthenticated) {
                const result = yield authService.signOut(returnUrl);
                switch (result.status) {
                    case AuthenticationResultStatus.Redirect:
                        break;
                    case AuthenticationResultStatus.Success:
                        yield this.navigateToReturnUrl(returnUrl);
                        break;
                    case AuthenticationResultStatus.Fail:
                        this.setState({ message: result.message });
                        break;
                    default:
                        throw new Error("Invalid authentication result status.");
                }
            }
            else {
                this.setState({ message: "You successfully logged out!" });
            }
        });
    }
    processLogoutCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = window.location.href;
            const result = yield authService.completeSignOut(url);
            switch (result.status) {
                case AuthenticationResultStatus.Redirect:
                    // There should not be any redirects as the only time completeAuthentication finishes
                    // is when we are doing a redirect sign in flow.
                    throw new Error('Should not redirect.');
                case AuthenticationResultStatus.Success:
                    yield this.navigateToReturnUrl(this.getReturnUrl(result.state));
                    break;
                case AuthenticationResultStatus.Fail:
                    this.setState({ message: result.message });
                    break;
                default:
                    throw new Error("Invalid authentication result status.");
            }
        });
    }
    populateAuthenticationState() {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticated = yield authService.isAuthenticated();
            this.setState({ isReady: true, authenticated });
        });
    }
    getReturnUrl(state) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            // This is an extra check to prevent open redirects.
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            `${window.location.origin}${ApplicationPaths.LoggedOut}`;
    }
    navigateToReturnUrl(returnUrl) {
        return window.location.replace(returnUrl);
    }
}
//# sourceMappingURL=Logout.js.map