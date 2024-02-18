import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  auth: Auth = inject(Auth);
  constructor(
  ) { }

  signIn(params: any){
    return signInWithEmailAndPassword(this.auth, params.email, params.password);
  }

  isLoggedIn(): boolean {
    const  userToken = localStorage.getItem("authorization")
    if (!userToken){
      return false;
    }
    return true;
  }


}
