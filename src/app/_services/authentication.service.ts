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
        console.log("success");
        this.router.navigate(["/home"]);
        this.success = true;
      }
    ).catch((error) => {
      console.log("An error occurred.");
    })
  }

  register(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password).then(() => {
      console.log("sign up success")
      this.router.navigate(['/login'])
    })
      .catch(
        (error: any) => {
          console.log("Sign Up failed: " + error);
        }
      );
  }

  logout() {
    return this.af.signOut().then(
      () => {
        console.log("logged out")
        this.success = false
        this.router.navigate(['/login'])
      }
    )
  }
}


