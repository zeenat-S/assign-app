import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message = "LogIn"

  constructor(private auth: AuthenticationService) {
    if (this.auth.success) {
      this.message = "LogOut"
    }
  }

  logout() {
    this.auth.logout()
  }
}
