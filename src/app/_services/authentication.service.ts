import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  success = false;

  constructor(
    private af: AngularFireAuth,
    private router: Router) { }

  login(email: string, pass: string) {
    return this.af.signInWithEmailAndPassword(email, pass).then(
      () => {
        this.router.navigate(["/home"]);
        this.success = true;
      }
    ).catch((error) => {
        window.alert("Something went wrong. Try Again!")
    })
  }

  logout() {
    return this.af.signOut().then(
      () => {
        this.success = false
        this.router.navigate(['/login'])
      }
    )
  }
}


