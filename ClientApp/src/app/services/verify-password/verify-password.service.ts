import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

/**
 * Service for verifying passwords
 */
@Injectable({
  providedIn: 'root',
})
export class VerifyPasswordService {
  static specialChars: string = '!@#$%^&*()_+={};:|,.<>?';
  static medStrong: string = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${VerifyPasswordService.specialChars}])(?=.{8,})`;
  
  constructor() {}

  /**
   * Verify that the given password is valid and display errors if it is not
   * 
   * Contains rules related to password strength, including:
   * - Must be at least 8 characters long
   * - Must contain at least one number
   * - Must contain at least one special character
   * - Must contain at least one uppercase letter
   * 
   * @param messageService the message service to use to display errors
   * @param password the password to verify
   * @param confirmPassword the same password, to verify that it matches
   * @returns `true` if the password is valid, `false` otherwise
   */
  verifyPassword(messageService: MessageService, password: string, confirmPassword: string): boolean {
    // check if passwords match
    if (password !== confirmPassword) {
      messageService.add({severity: 'error', summary: 'Passwords do not match', life: 10000});
      return false;
    }

    // check if password is long enough
    if (password.length < 8) {
      messageService.add({severity: 'error', summary: 'Password must be at least 8 characters long', life: 10000});
      return false;
    }

    // check if password has a number
    if (!/\d/.test(password)) {
      messageService.add({severity: 'error', summary: 'Password must contain at least one number', life: 10000});
      return false;
    }

    // check if password has a special character
    if (!(new RegExp(`[${VerifyPasswordService.specialChars}]`)).test(password)) {
      messageService.add({severity: 'error', summary: 'Password must contain at least one special character', life: 10000});
      return false;
    }

    // check if password has an uppercase letter
    if (!/[A-Z]/.test(password)) {
      messageService.add({severity: 'error', summary: 'Password must contain at least one uppercase letter', life: 10000});
      return false;
    }

    return true;
  }
}
