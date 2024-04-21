import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router, private _errorService: ErrorService) {

  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    if (this.username == '' || this.password == '') {
      this.toastr.error(`Todos los campos son obligatorios`, 'Error')
      this.loading = false;
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (data) => {
        this.loading = false;
        this.router.navigate(['/dashboard'])
        localStorage.setItem("token", data.token)
        localStorage.setItem("profile", data.profile)
        localStorage.setItem("user", data.user)
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })
  }


}
