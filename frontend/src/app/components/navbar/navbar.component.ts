import { Component } from '@angular/core';
import {AuthService} from '../../service/Auth/auth.service';
import {CommonModule} from '@angular/common';
import {BusquedaService} from '../../service/Filtro/busqueda.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin: boolean = false;
  query: string = '';
  constructor(private authService: AuthService, private busquedaServicio: BusquedaService) {
  }
  ngOnInit(){
    this.authService.userProfile().subscribe(
      user => {
        if (user.rol === 'admin'){
          this.isAdmin = true;
          console.log('Eres admin!')
        }
      }
    );
  }

  filtroBusquedas(){
    this.busquedaServicio.updateBusqueda(this.query);
  }
}
