import { Inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private auth: Auth,
  ) { }

  signIn(params: any){
  }

  isLoggedIn(): boolean {
    return false;
  }
}
