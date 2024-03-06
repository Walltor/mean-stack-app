import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  if(inject(AuthService).isLogged) {
    return true
  } else {
    inject(Router).navigateByUrl('**', {skipLocationChange: true})
    return false
  }
}