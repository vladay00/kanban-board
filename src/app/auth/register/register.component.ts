import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormField, MatInputModule, RouterLink,
    FormsModule, ReactiveFormsModule, MatButtonModule, MatIcon, MatTooltipModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  errorMessage: string = 'Enter correct value';
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }
  Submit(): void {
    const values = this.userForm.getRawValue();
    const email = values.email!;
    const username = values.username!;
    const password = values.password!;
    this.authService.register(email, username, password)
    .subscribe({next: () => {
      this.success = true;
      setTimeout(() => {
        this.router.navigateByUrl('/board')
      }, 50);
    }, error: () => {
      this.errorMessage = "Something went wrong";
    }
    }
    )
  }
}

