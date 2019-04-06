import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * FormGroup is a javascript representation of html form. It will handle
   * all validation and allow us to access form values easily. We have
   * access to useful built in validations and can even create our
   * own custom validators.
   */
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      // For each form field we create one FormControl object. First argument is
      // initial value, second argument is array of validators.
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  onSubmit() {
    // To check if our form is valid we can simply access 'valid' property
    if ( !this.form.valid ) {
      // No need to send request to API if form is not valid
      return;
    }
    // To get form data we access 'value' property which will give us
    // { email: ..., password: ...} object

    /**
     * Very important, unless we subscribe to login method the request will
     * never be sent. Observables are lazy, until someone subscribes to
     * them they do nothing. Always remember to subscribe to methods in
     * your services that perform http requests.
     */
    this.authService.login(this.form.value).subscribe(
      // First function inside subscribe method executes on success
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/');
      },
      // Second function executes only on error
      (error) => console.log(error)
    );
  }

}
