import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmpresaService} from '../../service/Empresa/empresa.service';
import {Router} from '@angular/router';
import {AdminService} from '../../service/Admin/admin.service';

@Component({
  selector: 'app-crear-empresa',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ],
  standalone: true,
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.css'
})
export class CrearEmpresaComponent {
  empresaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private adminService: AdminService
  ) {
    this.empresaForm = this.fb.group({
        name: [],
        description: [],
    });
  }

  onSubmit(){
    if (this.empresaForm.valid){
      const formData = new FormData();
      formData.append('name', this.empresaForm.get('name')!.value);
      formData.append('description', this.empresaForm.get('description')!.value);

      this.adminService.createEmpresa(formData).subscribe(
        response =>{
          console.log('Empresa creada', response);
          this.empresaForm.reset();
          setTimeout(() => {
            this.router.navigate(['/activities']);
          }, 3000);
        },
        error => {
          console.log('Ha ocurrido un error', error)
        }
      );
    }


  }
}
