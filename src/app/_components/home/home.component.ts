import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "LogIn"

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    if (this.auth.success) {
      this.message = "LogOut"
    }
  }

  logout() {
    this.auth.logout()
  }
}
