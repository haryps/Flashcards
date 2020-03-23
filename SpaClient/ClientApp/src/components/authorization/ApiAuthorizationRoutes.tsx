import * as React from 'react';
import { Route } from 'react-router';
import { ApplicationPaths, LoginActions, LogoutActions } from './ApiAuthorizationConstants';
import { Login } from './Login';
import { Logout } from './Logout';

export default class ApiAuthorizationRoutes extends React.PureComponent<{}, {}> {

    render() {
        return (
            <React.Fragment>
                <Route path={ApplicationPaths.Login} render={() => loginAction(LoginActions.Login)} />
                <Route path={ApplicationPaths.LoginFailed} render={() => loginAction(LoginActions.LoginFailed)} />
                <Route path={ApplicationPaths.LoginCallback} render={() => loginAction(LoginActions.LoginCallback)} />
                <Route path={ApplicationPaths.Profile} render={() => loginAction(LoginActions.Profile)} />
                <Route path={ApplicationPaths.Register} render={() => loginAction(LoginActions.Register)} />
                <Route path={ApplicationPaths.LogOut} render={() => logoutAction(LogoutActions.Logout)} />
                <Route path={ApplicationPaths.LogOutCallback} render={() => logoutAction(LogoutActions.LogoutCallback)} />
                <Route path={ApplicationPaths.LoggedOut} render={() => logoutAction(LogoutActions.LoggedOut)} />
            </React.Fragment>
        );
    }
}

function loginAction(name: string) {
    return (<Login action={name}></Login>);
}

function logoutAction(name: string) {
    return (<Logout action={name}></Logout>);
}
