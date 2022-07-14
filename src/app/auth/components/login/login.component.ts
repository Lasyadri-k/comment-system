import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../../base/services/storage/storage.service';
import { Auth0Error, Auth0UserProfile } from 'auth0-js';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public isLoggingIn = false;
  public errorMsg: string = '';
  public matcher = new MyErrorStateMatcher();
  public hidePassword = true;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.storageService.userLoggedIn()) {
      this.redirectUser();
    }
    this.form.valueChanges.subscribe(() => {
      const emailCtrl = this.form.get('email');
      const passwordCtrl = this.form.get('password');
      if (emailCtrl?.hasError('wrongEmail')) {
        emailCtrl.setErrors({ wrongEmail: null });
        emailCtrl.updateValueAndValidity();
      }
      if (passwordCtrl?.hasError('wrongPassword')) {
        passwordCtrl.setErrors({ wrongPassword: null });
        passwordCtrl.updateValueAndValidity();
      }
    })
  }

  public submit() {
    const { email, password } = this.form.value;
    this.isLoggingIn = true;
    this.authService.login(email, password, (err: Auth0Error, authResult: any) => {
      if (err) {
        this.form.get('email')?.setErrors({ wrongEmail: true });
        this.form.get('password')?.setErrors({ wrongPassword: true });
        this.isLoggingIn = false;
        return
      }
      this.storageService.setLocalStorageValue('authResult', JSON.stringify(authResult));
      this.authService.userInfo(authResult.accessToken, this.userInfoCb.bind(this));
    })
  }

  private userInfoCb(err: Auth0Error | null, userInfo: Auth0UserProfile) {
    if (err) {
      console.error('User info failed..', err);
      this.errorMsg = 'Unable to fetch user info';
      this.isLoggingIn = false;
      return;
    }
    this.storageService.setLocalStorageValue('userInfo', JSON.stringify(userInfo));
    this.redirectUser();
  }

  private redirectUser() {
    this.router.navigateByUrl('/comments');
  }
}
