/**
 * Test file for VerifyPasswordService
 */

import { MessageService } from 'primeng/api';

import { VerifyPasswordService } from './verify-password.service';

describe('VerifyPasswordService', () => {
  let verifyPasswordService: VerifyPasswordService;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockMessageService.add.and.returnValue();
    verifyPasswordService = new VerifyPasswordService();
  });

  it('should be created', () => {
    expect(verifyPasswordService).toBeTruthy();
  });

  it('should validate passwords correctly', () => {
    const pw1 = 'Password1';
    const cpw1 = 'Password1!';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw1, cpw1)).withContext('catch when passwords are different').toBeFalse();

    const pw2 = 'P*4c';
    const cpw2 = 'P*4c';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw2, cpw2)).withContext('catch when passwords are too short').toBeFalse();

    const pw3 = 'Password1';
    const cpw3 = 'Password1';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw3, cpw3)).withContext('catch when passwords don\'t have a special character').toBeFalse();

    const pw4 = 'Password!';
    const cpw4 = 'Password!';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw4, cpw4)).withContext('catch when passwords don\'t have a number').toBeFalse();

    const pw5 = 'password1!';
    const cpw5 = 'password1!';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw5, cpw5)).withContext('catch when passwords don\'t have an uppercase letter').toBeFalse();

    const pw6 = 'Password1!';
    const cpw6 = 'Password1!';
    expect(verifyPasswordService.verifyPassword(mockMessageService, pw6, cpw6)).withContext('verify valid passwords').toBeTrue();
  });
});
