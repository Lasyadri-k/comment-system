import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setLocalStorageValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public userLoggedIn() {
    const authResult = this.getLocalStorageValue('authResult')
    const userInfo = this.getLocalStorageValue('userInfo');
    return authResult && userInfo;
  }
}
