import { UserManager, WebStorageStateStore, UserManagerSettings, User } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './ApiAuthorizationConstants';

export class AuthorizeService {
    _callbacks = Array();
    _nextSubscriptionId: number = 0;
    _user?: any;
    _isAuthenticated: boolean = false;
    _userManager: UserManager | null | undefined;

    // By default pop ups are disabled because they don't work properly on Edge.
    // If you want to enable pop up authentication simply set this flag to false.
    _popUpDisabled = true;

    //constructor() {
    //    let settings: UserManagerSettings = {
    //        authority: "https://localhost:44350",
    //        client_id: "Flashcards",
    //        redirect_uri: "https://localhost:44337",
    //        response_type: "code",
    //        scope: "openid profile api1",
    //        post_logout_redirect_uri: "https://localhost:4433",
    //    };
    //    //config.automaticSilentRenew = true;
    //    //config.includeIdTokenInSilentRenew = true;
    //    //config.userStore = new WebStorageStateStore({
    //    //    prefix: ApplicationName
    //    //});

    //    this._userManager = new UserManager(settings);

    //    this._userManager.events.addUserSignedOut(async () => {
    //        await this._userManager?.removeUser();
    //        this.updateState(undefined);
    //    });
    //}

    async isAuthenticated(): Promise<boolean> {
        const user = await this.getUser();
        return !!user;
    }

    async getUser(): Promise<any> {
        if (this._user && this._user.profile) {
            return this._user.profile;
        }

        await this.ensureUserManagerInitialized();
        const user = await this._userManager?.getUser();
        return user && user.profile;
    }

    async getAccessToken() {
        await this.ensureUserManagerInitialized();
        const user = await this._userManager?.getUser();
        return user && user.access_token;
    }

    // We try to authenticate the user in three different ways:
    // 1) We try to see if we can authenticate the user silently. This happens
    //    when the user is already logged in on the IdP and is done using a hidden iframe
    //    on the client.
    // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
    //    Pop-Up blocker or the user has disabled PopUps.
    // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
    //    redirect flow.
    async signIn(state: string): Promise<any> {
        await this.ensureUserManagerInitialized();
        try {
            const silentUser = await this._userManager?.signinSilent(this.createArguments());
            this.updateState(silentUser);
            return this.success(state);
        } catch (silentError) {
            // User might not be authenticated, fallback to popup authentication
            console.log("Silent authentication error: ", silentError);

            try {
                if (this._popUpDisabled) {
                    throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
                }

                const popUpUser = await this._userManager?.signinPopup(this.createArguments());
                this.updateState(popUpUser);
                return this.success(state);
            } catch (popUpError) {
                if (popUpError.message === "Popup window closed") {
                    // The user explicitly cancelled the login action by closing an opened popup.
                    return this.error("The user closed the window.");
                } else if (!this._popUpDisabled) {
                    console.log("Popup authentication error: ", popUpError);
                }

                // PopUps might be blocked by the user, fallback to redirect
                try {
                    await this._userManager?.signinRedirect(this.createArguments(state));
                    return this.redirect();
                } catch (redirectError) {
                    console.log("Redirect authentication error: ", redirectError);
                    return this.error(redirectError);
                }
            }
        }       
    }

    async completeSignIn(url: string): Promise<any> {
        try {
            await this.ensureUserManagerInitialized();
            const user = await this._userManager?.signinCallback(url);
            this.updateState(user);
            return this.success(user && user.state);
        } catch (error) {
            console.log('There was an error signing in: ', error);
            return this.error('There was an error signing in.');
        }
    }

    // We try to sign out the user in two different ways:
    // 1) We try to do a sign-out using a PopUp Window. This might fail if there is a
    //    Pop-Up blocker or the user has disabled PopUps.
    // 2) If the method above fails, we redirect the browser to the IdP to perform a traditional
    //    post logout redirect flow.
    async signOut(state: string): Promise<any> {
        await this.ensureUserManagerInitialized();
        try {
            if (this._popUpDisabled) {
                throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
            }

            await this._userManager?.signoutPopup(this.createArguments());
            this.updateState(undefined);
            return this.success(state);
        } catch (popupSignOutError) {
            console.log("Popup signout error: ", popupSignOutError);
            try {
                await this._userManager?.signoutRedirect(this.createArguments(state));
                return this.redirect();
            } catch (redirectSignOutError) {
                console.log("Redirect signout error: ", redirectSignOutError);
                return this.error(redirectSignOutError);
            }
        }
    }

    async completeSignOut(url: string): Promise<any> {
        await this.ensureUserManagerInitialized();
        try {
            const response = await this._userManager?.signoutCallback(url);
            this.updateState(undefined);
            return this.success(response);
        } catch (error) {
            console.log(`There was an error trying to log out '${error}'.`);
            return this.error(error);
        }
    }

    updateState(user: User | undefined) {
        this._user = user;
        this._isAuthenticated = !!this._user;
        this.notifySubscribers();
    }

    resetState() {
        this._user = null;
        this._isAuthenticated = !!this._user;
        this.notifySubscribers();
    }

    subscribe(callback: () => void) {
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId: number) {
        const subscriptionIndex = this._callbacks
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false, index })
            .filter(element => element.found === true);
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        this._callbacks = this._callbacks.splice(subscriptionIndex[0].index, 1);
    }

    notifySubscribers() {
        for (let i = 0; i < this._callbacks.length; i++) {
            const callback = this._callbacks[i].callback;
            callback();
        }
    }

    createArguments(state?: string) {
        return { useReplaceToNavigate: true, data: state };
    }

    error(message: any) {
        return { status: AuthenticationResultStatus.Fail, message };
    }

    success(state: any) {
        return { status: AuthenticationResultStatus.Success, state };
    }

    redirect() {
        return { status: AuthenticationResultStatus.Redirect };
    }

    async ensureUserManagerInitialized(): Promise<void> {
        if (this._userManager !== undefined) {
            return;
        }

        //let response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
        //if (!response.ok) {
        //    throw new Error(`Could not load settings for '${ApplicationName}'`);
        //}

        //let settings = await response.json();
        //settings.automaticSilentRenew = true;
        //settings.includeIdTokenInSilentRenew = true;
        //settings.userStore = new WebStorageStateStore({
        //    prefix: ApplicationName
        //});

        let settings: UserManagerSettings = {
            authority: "https://localhost:44350",
            client_id: "Flashcards",
            redirect_uri: "https://localhost:44337/callback",
            response_type: "code",
            scope: "openid profile api1",
            post_logout_redirect_uri: "https://localhost:44337",
        };
        //config.automaticSilentRenew = true;
        //config.includeIdTokenInSilentRenew = true;
        //config.userStore = new WebStorageStateStore({
        //    prefix: ApplicationName
        //});

        this._userManager = new UserManager(settings);

        this._userManager.events.addUserSignedOut(async () => {
            await this._userManager?.removeUser();
            this.updateState(undefined);
        });
    }

    //static get instance() { return authService }
}

const authService = new AuthorizeService();

export default authService;

export const AuthenticationResultStatus = {
    Redirect: 'redirect',
    Success: 'success',
    Fail: 'fail'
};