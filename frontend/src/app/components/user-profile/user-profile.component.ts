import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../service/Auth/auth.service';
import {User} from '../../models/user';
import {AuthStateService} from '../../service/Auth/auth-state.service';
import {TokenService} from '../../service/Auth/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(private auth: AuthService,
              private state: AuthStateService,
              private token: TokenService,
              private route: Router) {
  }

  user = new User();
  ngOnInit(){
   this.userProfile();
  }

  userProfile(){
    this.auth.userProfile().subscribe(
      data => {
        this.user = data;
        console.log('usuariO: ', data);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }

  signOut(){
    this.state.setAuthState(false);
    this.token.removeToken();
    this.route.navigate(['/home']);
  }
}
