import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminService} from '../../service/Admin/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Empresa} from '../../models/empresa';

@Component({
  selector: 'app-editar-empresa',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './editar-empresa.component.html',
  styleUrl: './editar-empresa.component.css'
})

export class EditarEmpresaComponent {
  id: any;
  empresa = new Empresa();
  constructor(private adminS: AdminService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
  }
  updateEmpresa(){
    this.adminS.updateEmpresa(this.id, this.empresa).subscribe(
      () => {
        console.log('Información actualizada');
        setTimeout(() => {
          this.router.navigate(['/gestionEmpresas']);
        }, 3000);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }
}
