import { Injectable } from '@angular/core';
import  * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/base/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth0 = new auth0.WebAuth({
    domain: environment.domain,
    clientID: environment.clientId,
  });

  constructor(
    private storageService: StorageService,
  ) { }

  public login(email: any, password: any, cb: auth0.Auth0Callback<auth0.Auth0Error, any>) {
    this.auth0.client.login({
      realm: environment.realm,
      username: email,
      password,
    }, cb);
  }

  public userInfo(accessToken: string, cb: auth0.Auth0Callback<auth0.Auth0UserProfile> ) {
    this.auth0.client.userInfo(accessToken, cb)
  }

  public logout() {
    this.storageService.clearLocalStorage();
    window.location.href = this.auth0.client.buildLogoutUrl({
      clientID: environment.clientId,
    });
  }
}
