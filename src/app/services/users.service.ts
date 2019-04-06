import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  /**
   * This method does not return an array of Users. It returns an Observable that
   * will emit an array of Users at some point in time. All methods of http client
   * (get, post, put/patch, delete) return Observable, not the actual data. Since
   * this method returns Observable we will subscribe to it and retrieve the data
   * in the first function inside subscribe method. Here is an example of how we
   * will use this service and this method inside other components:
   * 
   * usersService.getUsers().subscribe(
   *  (users: User[]) => {
   *    console.log(users)
   *  },
   *  (error) => {
   *    console.log(error)
   *  }
   * )
   */
  getUsers(filters: {}): Observable<User[]> {
    const queryString = [];
    for (const key in filters) {
      queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`);
    }
    return this.http.get<User[]>(this.api + '?' + queryString);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  /**
   * Post, Put/Patch methods take data as 2nd argument.
   */
  createUser(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
