/**
 * Reference string for users Firebase collection.
 */
export const USER_TABLE = 'users/';

/**
 * User details stored in Firebase.
 */
export interface User {

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    // ngx-auth-firebaseui
    providerId?: string;
    phoneNumber?: string;
    // --
}
