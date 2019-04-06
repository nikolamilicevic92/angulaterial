import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../../services/users.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  private user: User;

  public form: FormGroup;

  private names = ['John', 'Mary', 'Mike', 'David', 'Jason'];
  public namesAutocomplete = ['John', 'Mary', 'Mike', 'David', 'Jason'];

  constructor(
    // ActivatedRoute is used for getting url parameters and query string parameters
    private route: ActivatedRoute,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    // This is how we get url parameters
    this.route.paramMap.subscribe(params => {
      const userId = +params.get('id');
      this.usersService.getUser(userId).subscribe(
        (user: User) => {
          this.user = user;
          // Very common scenario when we want to fill the form with received data
          // Instead of manually setting each value, we can use for in to loop through object
          for (const key in this.form.controls) {
            this.form.get(key).setValue(user[key]);
          }
        },
        (error: HttpErrorResponse) => {
          // Here we can check error.status or error.message and notify the user
          console.log(error);
        }
      );
    });
  }

  public filterAutocomplete(value: string) {
    value = value.trim().toLowerCase();
    this.namesAutocomplete = this.names.filter(name => {
      return name.trim().toLowerCase().includes(value);
    });
  }

  public onSubmit() {
    if ( ! this.form.valid ) {
      return;
    }
    this.usersService.updateUser(this.user.id, this.form.value).subscribe(
      () => {
        this.snackBar.open('User Updated', 'Got It', {
          duration: 2000
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/users');
        });
      },
      (error: HttpErrorResponse) => {
        // Tell user something went wrong
        console.log(error);
      }
    );
  }

}
