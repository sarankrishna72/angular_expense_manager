import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
  ) { }

  signIn(params: any){
  }

  isLoggedIn(): boolean {
    return false;
  }
}
