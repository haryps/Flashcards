import * as React from 'react';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';
import { LoginActions, QueryParameterNames, ApplicationPaths } from './ApiAuthorizationConstants';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined
        };
    }
    componentDidMount() {
        const action = this.props.action;
        switch (action) {
            case LoginActions.Login:
                this.login(this.getReturnUrl(""));
                break;
            case LoginActions.LoginCallback:
                this.processLoginCallback();
                break;
            case LoginActions.LoginFailed:
                const params = new URLSearchParams(window.location.search);
                const error = params.get(QueryParameterNames.Message);
                this.setState({ message: error });
                break;
            case LoginActions.Profile:
                this.redirectToProfile();
                break;
            case LoginActions.Register:
                this.redirectToRegister();
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }
    render() {
        const action = this.props.action;
        const { message } = this.state;
        if (!!message) {
            return React.createElement("div", null, message);
        }
        else {
            switch (action) {
                case LoginActions.Login:
                    return (React.createElement("div", null, "Processing login"));
                case LoginActions.LoginCallback:
                    return (React.createElement("div", null, "Processing login callback"));
                case LoginActions.Profile:
                case LoginActions.Register:
                    return (React.createElement("div", null));
                default:
                    throw new Error(`Invalid action '${action}'`);
            }
        }
    }
    login(returnUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield authService.signIn(returnUrl);
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
                    throw new Error(`Invalid status result ${result.status}.`);
            }
        });
    }
    processLoginCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = window.location.href;
            const result = yield authService.completeSignIn(url);
            switch (result.status) {
                case AuthenticationResultStatus.Redirect:
                    // There should not be any redirects as the only time completeSignIn finishes
                    // is when we are doing a redirect sign in flow.
                    throw new Error('Should not redirect.');
                case AuthenticationResultStatus.Success:
                    yield this.navigateToReturnUrl(this.getReturnUrl(result.state));
                    break;
                case AuthenticationResultStatus.Fail:
                    this.setState({ message: result.message });
                    break;
                default:
                    throw new Error(`Invalid authentication result status '${result.status}'.`);
            }
        });
    }
    getReturnUrl(state) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            // This is an extra check to prevent open redirects.
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
    }
    redirectToRegister() {
        this.redirectToApiAuthorizationPath(`${ApplicationPaths.IdentityRegisterPath}?${QueryParameterNames.ReturnUrl}=${encodeURI(ApplicationPaths.Login)}`);
    }
    redirectToProfile() {
        this.redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
    }
    redirectToApiAuthorizationPath(apiAuthorizationPath) {
        const redirectUrl = `${window.location.origin}${apiAuthorizationPath}`;
        // It's important that we do a replace here so that when the user hits the back arrow on the
        // browser he gets sent back to where it was on the app instead of to an endpoint on this
        // component.
        window.location.replace(redirectUrl);
    }
    navigateToReturnUrl(returnUrl) {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        window.location.replace(returnUrl);
    }
}
//# sourceMappingURL=Login.js.map