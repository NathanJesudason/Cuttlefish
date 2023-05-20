/**
 * Types and functions related to resetting passwords
 */


/**
 * Model used for resetting password
 */
export class ResetPassword{
    public email!            : string;
    public emailToken!       : string;
    public newPassword!      : string;
    public confirmPassword!  : string;    
}
