import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {User} from '../../models/user';
import {AuthService} from '../../service/Auth/auth.service';
import {TokenService} from '../../service/Auth/token.service';
import {AuthStateService} from '../../service/Auth/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  user = new User;
  errorMessage: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private tokenService: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      (result) => {
        this.respondeHandler(result);
      },
      (error) => {
        this.errorMessage = error.error;
      },

      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }
    );
  }

  private respondeHandler(data: any) {
    this.tokenService.handleData(data.access_token);
  }
}
