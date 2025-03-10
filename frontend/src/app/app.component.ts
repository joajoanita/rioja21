import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './service/Auth/auth.service';
import {BusquedaService} from './service/Filtro/busqueda.service';
import {TokenService} from './service/Auth/token.service';
import {AuthStateService} from './service/Auth/auth-state.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  query: string = '';
  isSignedIn!: boolean;
  constructor(
              private busquedaServicio: BusquedaService,
              private token: TokenService,
              private router: Router,
              private authState: AuthStateService
  ) {
  }
  ngOnInit(){
    this.authState.userAuthState.subscribe(
      (val) => {
        this.isSignedIn = val;
      });
  }

  singOut(){
    this.authState.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['home']);
  }

  filtroBusquedas(){
    this.busquedaServicio.updateBusqueda(this.query);
  }
}
