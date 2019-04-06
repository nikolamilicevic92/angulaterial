import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { User } from './../../../../models/user';
import { UsersService } from './../../../../services/users.service';
import { Router } from '@angular/router';
import { UsersDataSource } from '../users-data-source';
import { MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { DeleteUserDialogComponent } from './../../../widgets/delete-user-dialog/delete-user-dialog.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'name', 'email', 'city', 'website', 'actions'];

  public dataSource: UsersDataSource;

  /**
   * We placed a couple sort directives on table headers. We can get a reference
   * to the component behind those directives and listen for sort change events.
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * We have <mat-paginator> in the html. We can get a reference to its component
   * and listen for pagination events that component can emit.
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * This is how we fetch html elements inside component. This is similar to
   * document.getElementById('filter'). There is one difference though, the
   * filter is a wrapper around html element, not the actual element, to
   * access the actual html element we use filter.nativeElement
   */
  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.usersService);
    this.loadUsers();
  }

  ngAfterViewInit() {
     // We will listen for sort events and reset the table to first page
     this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

     // We want to trigger loading of users when either sort event occurs or when
     // pagination event occurs. We can merge those 2 observables into 1 observable
     // and subscribe to it to load users. If we were to write this in javascript it
     // would look something like this:
     // sort.addEventListener('change', () => this.loadUsers())
     // paginator.addEventListener('change', () => this.loadUsers())
     merge(this.sort.sortChange, this.paginator.page)
       .subscribe(() => this.loadUsers());

      // Listen for name filter input and reload the users
      // fromEvent creates an Observable from a regular html event
      // We don't want to send HTTP request on every keystroke, instead
      // we will wait for 300ms after user stoped typing by using debounceTime()
      fromEvent(this.filter.nativeElement, 'keyup').pipe(
        debounceTime(300)
      ).subscribe(() => this.loadUsers());
  }

  private loadUsers() {
    const filters = {
      sortDirection: this.sort.direction ? this.sort.direction : 'desc',
      sortBy: this.sort.active ? this.sort.active : 'id',
      page: this.paginator.pageIndex,
      resultsPerPage: this.paginator.pageSize ? this.paginator.pageSize : 10,  
      name: this.filter.nativeElement.value    
    };
    console.log('Loading users with filters', filters);
    this.dataSource.loadUsers(filters);
  }

  public editUser(user: User): void {
    this.router.navigateByUrl(`/users/${user.id}/edit`);
  }

  public deleteUser(user: User): void {
    this.matDialog.open(DeleteUserDialogComponent, {
      data: { user: user }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteUser(user.id).subscribe(
          () => {
            this.snackBar.open('User Deleted', 'Got It', {
              duration: 2000
            }).afterDismissed().subscribe(() => this.loadUsers());
          },
          (error) => {
            alert('Something went wrong while deleting user');
            console.log(error);
          }
        );
      }
    });
  }

}
