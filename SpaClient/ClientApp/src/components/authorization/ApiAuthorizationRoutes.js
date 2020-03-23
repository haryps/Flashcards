import * as React from 'react';
import { Route } from 'react-router';
import { ApplicationPaths, LoginActions, LogoutActions } from './ApiAuthorizationConstants';
import { Login } from './Login';
import { Logout } from './Logout';
export default class ApiAuthorizationRoutes extends React.PureComponent {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Route, { path: ApplicationPaths.Login, render: () => loginAction(LoginActions.Login) }),
            React.createElement(Route, { path: ApplicationPaths.LoginFailed, render: () => loginAction(LoginActions.LoginFailed) }),
            React.createElement(Route, { path: ApplicationPaths.LoginCallback, render: () => loginAction(LoginActions.LoginCallback) }),
            React.createElement(Route, { path: ApplicationPaths.Profile, render: () => loginAction(LoginActions.Profile) }),
            React.createElement(Route, { path: ApplicationPaths.Register, render: () => loginAction(LoginActions.Register) }),
            React.createElement(Route, { path: ApplicationPaths.LogOut, render: () => logoutAction(LogoutActions.Logout) }),
            React.createElement(Route, { path: ApplicationPaths.LogOutCallback, render: () => logoutAction(LogoutActions.LogoutCallback) }),
            React.createElement(Route, { path: ApplicationPaths.LoggedOut, render: () => logoutAction(LogoutActions.LoggedOut) })));
    }
}
function loginAction(name) {
    return (React.createElement(Login, { action: name }));
}
function logoutAction(name) {
    return (React.createElement(Logout, { action: name }));
}
//# sourceMappingURL=ApiAuthorizationRoutes.js.map