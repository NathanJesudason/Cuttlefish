import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class VerifyPasswordService {
  static specialChars: string = '!@#$%^&*()_+={};:|,.<>?';
  static medStrong: string = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${VerifyPasswordService.specialChars}])(?=.{8,})`;
  
  constructor() {}

  verifyPassword(messageService: MessageService, password: string, confirmPassword: string) {
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
