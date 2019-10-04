import { AppUserAccess } from './app-user-access';

export class AppUserAuth {
    userName: string = "";
    bearerToken: string = "";
    isAuthenticated: boolean = false;

    userAccess: AppUserAccess = new AppUserAccess();
}