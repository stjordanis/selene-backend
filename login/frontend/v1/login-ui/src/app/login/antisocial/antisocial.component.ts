import { Component, OnInit } from '@angular/core';

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { AuthResponse, AppService } from "../../app.service";

const noDelay = 0;
@Component({
  selector: 'login-antisocial',
  templateUrl: './antisocial.component.html',
  styleUrls: ['./antisocial.component.scss']
})
export class AntisocialComponent implements OnInit {
    public authFailed: boolean;
    public password: string;
    public passwordIcon = faLock;
    private redirectUri: string;
    public username: string;
    public usernameIcon = faUser;

  constructor(private authService: AppService) { }

  ngOnInit() {
        this.authService.extractRedirectURI();
  }

  authorizeUser(): void {
      this.authService.authorizeAntisocial(this.username, this.password).subscribe(
          (response) => {this.onAuthSuccess(response)},
          (response) => {this.onAuthFailure(response)}
      );
  }

  onAuthSuccess(authResponse: AuthResponse): void {
      this.authFailed = false;
      this.authService.generateTokenCookies(authResponse);
      this.authService.navigateToRedirectURI(noDelay);
  }

  onAuthFailure(authorizeUserResponse): void {
      if (authorizeUserResponse.status === 401) {
          this.authFailed = true;
      }
  }

}
