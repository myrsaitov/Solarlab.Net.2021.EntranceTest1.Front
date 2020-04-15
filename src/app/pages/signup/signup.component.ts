import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {confirmPasswordValidator} from '../../directives/confirm-password-validator.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit() {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*]).{6,20}/g;

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(pattern)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    }, {validators: confirmPasswordValidator});
  }

  get email() {
    return this.form.get('email');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.accountService.register(this.form.value).subscribe(res => console.log(res));
  }
}
