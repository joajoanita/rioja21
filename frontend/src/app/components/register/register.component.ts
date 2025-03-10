import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../service/Auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: any = null;


  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name')!.value);
      formData.append('email', this.registerForm.get('email')!.value);
      formData.append('password', this.registerForm.get('password')!.value);

      this.authService.register(formData).subscribe(
          (response) => {
          console.log('User added successfully!', response);
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
          (error) => {
          this.errorMessage = error.error;
        }
      );
    } else {
      console.error('Formulario no válido o archivo no seleccionado');
    }
  }

}
