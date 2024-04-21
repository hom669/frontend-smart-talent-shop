import { User } from './../../interfaces/user';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule, SpinnerComponent, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private toastr: ToastrService, private _user_service: UserService, private router: Router, private _errorService: ErrorService) {

  }

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  email: string = '';
  identification: string = '';
  loading: boolean = false;

  ngOnInit(): void {

  }

  addUser() {

    this.loading = true;

    if (this.username == '' || this.password == '' || this.confirmPassword == '' || this.name == '' || this.email == '' || this.identification == '') {
      this.loading = false;
      this.toastr.error('Todos los campos son Obligatorios', 'Error!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las password ingresadas son distintas', 'Error!');
      this.loading = false;
      return;
    }

    const user: User = {
      username: this.username,
      fullName: this.name,
      identification: this.identification,
      email: this.email,
      password: this.password
    }

    this._user_service.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario Registrado')
        this.router.navigate(['/login'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
      complete: () => { console.info('Complete'); this.loading = false; }

    })

  }


}
