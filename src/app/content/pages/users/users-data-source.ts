import { UsersService } from 'src/app/services/users.service';
import { DataSource } from '@angular/cdk/table';
import { User } from 'src/app/models/user';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class UsersDataSource implements DataSource<User> {

    public usersSubject = new BehaviorSubject<User[]>([]);

    private paginatorTotalSubject = new BehaviorSubject<number>(0);
    public paginatorTotal$: Observable<number>;

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$: Observable<boolean>;

    constructor(private usersService: UsersService) { 
        /**
         * We will use Subjects inside the class to control emiting of data, but
         * we need to expose observables to the table so that it can subscribe
         * to them and update rows and pagination. Now whenever we use loadingSubject.next()
         * inside this class, those who subscribed to loading$ will be notified.
         */
        this.loading$ = this.loadingSubject.asObservable();
        this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    }

    /**
     * This method will be called by table and it needs to return an Observable
     * that will emit users array. We will return usersSubject as observable
     * and then manually call next() on usersSubject to emit new users.
     */
    connect(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    /**
     * This method will be called when table is destroyed and we'll mark all
     * observables as complete so that subscribers stop receiving values.
     */
    disconnect(): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
        this.paginatorTotalSubject.complete();
    }

    loadUsers(filters = {}) {
        // Emit a loading event so that we can display loading indicator until users are fetched
        // We'll subscribe to this loading observable in the html
        this.loadingSubject.next(true);

        this.usersService.getUsers(filters).pipe(
            // We can catch the error before it reaches the subscriber and return
            // a custom value instead, so that everything can continue working normaly
            catchError((error) => {
                console.log(error);
                return of([]);
            }),
            // finalize() will be called after observable emits value, regardless if it was
            // a success or error value. This is good place to stop the loading indicator
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            (users: User[]) => {
                // Paginator total should emit number of all results, for example if we are
                // displaying 0-50 results out of 1000 results, paginatorTotal should emit 1000
                // This fake api always returns 10 users so max results is always array length
                this.paginatorTotalSubject.next(users.length);
                this.usersSubject.next(users);

                // In real world API would return response type { results: User[], count: number }
                // and we would use response.count for paginatorTotal and response.results for usersSubject
            }
        );
    }

}
