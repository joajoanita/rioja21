import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminService} from '../../service/Admin/admin.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EmpresaService} from '../../service/Empresa/empresa.service';

@Component({
  selector: 'app-crear-voluntariado',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './crear-voluntariado.component.html',
  styleUrl: './crear-voluntariado.component.css'
})
export class CrearVoluntariadoComponent {

  voluntariadoForm: FormGroup;
  empresas: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private empresaService: EmpresaService,
  ) {
    this.voluntariadoForm = this.fb.group({
      city: [],
      description: [],
      id_empresa: [],
    })
  }
  ngOnInit(){
    this.indexEmpresas();
  }
  onSubmit(){
    if (this.voluntariadoForm.valid){
      const formData = new FormData();

      formData.append('city', this.voluntariadoForm.get('city')!.value);
      formData.append('description', this.voluntariadoForm.get('description')!.value);

      const empresaId = this.voluntariadoForm.get('id_empresa')!.value;
      console.log(empresaId);
      formData.append('id_empresa', empresaId);

      this.adminService.createVoluntariado(formData).subscribe(
        response => {
          console.log('Se ha creado con éxito el voluntariado', response);
          this.voluntariadoForm.reset();
          setTimeout(() => {
            this.router.navigate(['/gestionVoluntariado']);
          }, 3000);
        },
        error => {
          console.log('No se ha podido crear el voluntariado', error)
        }
      );
    }
  }

  indexEmpresas(){
    this.empresaService.indexEmpresas().subscribe(
      data =>{
        this.empresas = data;
        console.log('Empresas', data);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }
}
