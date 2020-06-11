import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }



  private initForm() {
    this.authFormGroup = this.formBuilder.group(
      {

        login: this.formBuilder.group(
          {
            email: ['', [Validators.required, Validators.email]],
            password: ['']
          }
        )

      }
    );
  }



  onSubmit() {
    console.log(this.authFormGroup.get('login').value);
    console.log(this.authFormGroup.get('login').value.email);


    // @ts-ignore
    this.authService.login( this.authFormGroup.get('login').value.email,
                            this.authFormGroup.get('login').value.password );
    this.router.navigate(['/homepage']);
  }
}
