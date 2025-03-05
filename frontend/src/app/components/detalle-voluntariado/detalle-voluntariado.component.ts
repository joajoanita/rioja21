import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {VoluntariadoService} from '../../service/Voluntariado/voluntariado.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-detalle-voluntariado',
  imports: [RouterModule, RouterLink, CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './detalle-voluntariado.component.html',
  styleUrl: './detalle-voluntariado.component.css'
})
export class DetalleVoluntariadoComponent {
  actividadVoluntariado: any;
  id: any;
  inscForm: FormGroup;

  constructor(
    private voluntariadoService: VoluntariadoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.inscForm = this.fb.group({
      'email': [],
      'name': [],
      'voluntariado': [],
    })
  }


  ngOnInit():void{
    this.route.params.subscribe(
      params => {
      this.id = +params['id'];
      this.showActivity(this.id);
    });

  }

  showActivity(id:any){
    this.voluntariadoService.showVoluntariado(this.id).subscribe(
      data => {
        this.actividadVoluntariado = data;
        console.log('Data: ', data);
      },
      error => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }

  inscribirseEnVoluntariado(){
    if (this.inscForm.valid){
      const formData = new FormData();
      const voluntariadoId = this.id;
      formData.append('name', this.inscForm.get('name')!.value);
      formData.append('email', this.inscForm.get('email')!.value);

      formData.append('voluntariadoId',this.inscForm.get('voluntariado')?.value);
      console.log(voluntariadoId);
      if (voluntariadoId) {
        formData.append('voluntariado', voluntariadoId);
      } else {
        console.error('No se seleccionó ningun voluntariado');
        return;
      }

      this.voluntariadoService.inscribirseEnVoluntariado(formData).subscribe(
        response => {
          console.log('Usuario Inscrito', response);
          this.inscForm.reset();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        },
        error => {
          console.log('Ha ocurrido un error', error);
        }
      );
    } else {
      console.error('El formulario no es válido');
    }

  }
}
