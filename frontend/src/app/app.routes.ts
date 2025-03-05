import { Routes } from '@angular/router';
import {HomeComponent} from './views/user/home/home.component';
import {EmpresasComponent} from './views/user/empresas/empresas.component';
import {DetalleVoluntariadoComponent} from './components/detalle-voluntariado/detalle-voluntariado.component';
import {ContactoComponent} from './views/user/contacto/contacto.component';
import {DashboardComponent} from './views/admin/dashboard/dashboard.component';
import {adminGuard} from './guards/admin.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {EmpresaComponent} from './views/admin/empresa/empresa.component';
import {VoluntariadoComponent} from './views/admin/voluntariado/voluntariado.component';
import {InscripcionesComponent} from './views/admin/inscripciones/inscripciones.component';
import {CrearEmpresaComponent} from './components/crear-empresa/crear-empresa.component';
import {EditarEmpresaComponent} from './components/editar-empresa/editar-empresa.component';
import {EditarVoluntariadoComponent} from './components/editar-voluntariado/editar-voluntariado.component';
import {CrearVoluntariadoComponent} from './components/crear-voluntariado/crear-voluntariado.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'empresas', component: EmpresasComponent},
  { path: 'detalleVoluntariado/:id', component: DetalleVoluntariadoComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: 'gestionEmpresas', component: EmpresaComponent, canActivate: [adminGuard]},
  { path: 'gestionVoluntariado', component: VoluntariadoComponent, canActivate: [adminGuard]},
  { path: 'gestionInscripciones', component: InscripcionesComponent, canActivate: [adminGuard]},
  { path: 'crearEmpresa', component: CrearEmpresaComponent, canActivate: [adminGuard]},
  { path: 'editarEmpresa/:id', component: EditarEmpresaComponent, canActivate: [adminGuard]},
  { path: 'editarVoluntariado/:id', component: EditarVoluntariadoComponent, canActivate: [adminGuard]},
  { path: 'crearVoluntariado', component: CrearVoluntariadoComponent, canActivate: [adminGuard]},
];
