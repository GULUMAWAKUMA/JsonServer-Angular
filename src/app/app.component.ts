import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck {

  title = 'JsonServer';
  ismenurequired = false;
  isadminuser = false;
  constructor(private router: Router, private service: AuthService) { }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }
    if (this.service.GetUserrole() === 'admin') {
      this.isadminuser = true;
    } else {
      this.isadminuser = false;
    }
  }
}
