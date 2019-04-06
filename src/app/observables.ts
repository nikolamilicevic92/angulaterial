
    class MyObservable {
        private subscribers = [];
        
        public subscribe(onSuccess = (value: any) => {}, onError = (error: any) => {}, onComplete = () => {}) {
            this.subscribers.push({
                onSuccess: onSuccess, 
                onError: onError, 
                onComplete: onComplete
            });
        }
        public emitValue(value: any) {
            this.subscribers.forEach(subscriber => subscriber.onSuccess(value));
        }
        public throwError(error: any) {
            this.subscribers.forEach(subscriber => subscriber.onError(error));
        }
        public complete() {
            this.subscribers = [];
        }
    }

    // Lets simulate usersService getUsers() method with our custom 'observable'

    class UsersService {

        users = [
            { id: 1, name: 'Jhon' },
            { id: 2, name: 'Mike' },
            { id: 3, name: 'David' },
        ];

        getUsers() {
            const observable = new MyObservable();
            // Simulating asynchronous http request with a setTimeout
            setTimeout(() => {
                observable.emitValue(this.users);
            }, 2000);
            // So we are returning an observable which will emit users after 2 seconds
            return observable;
        }
    }

    // And we can use it the same way we use the real usersService that uses http client
    const usersService = new UsersService();
    usersService.getUsers().subscribe(
        (users) => {
            // console.log(users)
        },
        (error) => console.log(error)
    );
