import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  public form: FormGroup;

  public submited = false;

  private names = ['John', 'Mary', 'Mike', 'David', 'Jason'];
  public namesAutocomplete = ['John', 'Mary', 'Mike', 'David', 'Jason'];

  public fruits = ['Apples', 'Oranges', 'Lemons', 'Strawberries', 'Peaches'];

  public cities = ['Belgrade', 'New York', 'New Jersey', 'Moscow', 'Rome'];

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    /**
     * name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      }
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
     */
    this.form = new FormGroup({
      // Min length validation
      name: new FormControl('', [Validators.required, Validators.minLength(2)]), 
      // Email validation     
      email: new FormControl('', [Validators.required, Validators.email]),
      // Custom pattern validation using regular expression
      website: new FormControl('', [Validators.required, Validators.pattern(
        '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-zA-Z0-9]+([\\-\\.]{1}[a-zA-Z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'
      )]),
      fruits: new FormControl(null, Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      city: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue),
    });
  }

  public filterAutocomplete(value: string) {
    value = value.trim().toLowerCase();
    this.namesAutocomplete = this.names.filter(name => {
      return name.trim().toLowerCase().includes(value);
    });
  }

  public onSubmit() {
    this.submited = true;
    if ( ! this.form.valid ) {
      return;
    }
    this.usersService.createUser(this.form.value).subscribe(
      () => {
        this.snackBar.open('User Created', 'Got It', {
          duration: 2000
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/users');
        });
      },
      (error) => {
        console.log(error);
        alert('Something went wrong while creating the user');
      }
    );
  }

}
