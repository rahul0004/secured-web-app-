import { AppUserAuth } from '../models/app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: "SUPERVIS",
        bearerToken: "i15asdsfedf",
        isAuthenticated: true,
        userAccess: {
            canAccessHome: true,
            canAccessProducts: false
        }
    },
    {
        userName: "ZCARVER",
        bearerToken: "i15OIFJTHedf",
        isAuthenticated: true,
        userAccess: {
            canAccessHome: true,
            canAccessProducts: true
        }
    }
];