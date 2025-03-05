import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminService} from '../../service/Admin/admin.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Voluntariado} from '../../models/voluntariado';
import {EmpresaService} from '../../service/Empresa/empresa.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-editar-voluntariado',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './editar-voluntariado.component.html',
  styleUrl: './editar-voluntariado.component.css'
})
export class EditarVoluntariadoComponent {

  id:any;
  voluntariado = new Voluntariado();
  empresas: any[] = [];
  constructor(private adminS:AdminService,
              private router: Router,
              private route: ActivatedRoute,
              private empresaS: EmpresaService,
  ) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.indexEmpresas();
  }

  updateVoluntariado(){
    console.log(this.id);
    console.log(this.voluntariado);
    this.voluntariado.id = this.id;
    this.adminS.updateVoluntariado(this.id, this.voluntariado).subscribe(
      () => {
        console.log('Información actualizada');
        this.router.navigate(['/gestionVoluntariado']);
      }, error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }

  indexEmpresas(){
    this.empresaS.indexEmpresas().subscribe(
      data => {
        this.empresas = data;
        console.log('No ha habido ningún error', data);
      },
      error => {
         console.log('Ha ocurrido un error', error);
      }
    );
  }
}
