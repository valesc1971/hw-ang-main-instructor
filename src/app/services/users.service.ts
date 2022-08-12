import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../User';

const httpOptions = {

}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl='http://localhost:5000/Users';
  
constructor(private http: HttpClient) { }



  // create a method to get a particular user by username and password
  get(username: string, password: string): Observable<User | undefined> {
    // make and http request of type GET to http://localhost:5000/users?username=mad&password=pass
    // before I can make an http request, I must have an httpclient object

    return this.http.get<User[]>(`http://localhost:5000/users?username=${username}&password=${password}`) // returns an observable of an array of User objects
      .pipe(map(users => { // map all events from a User[] to a User | undefined 
        //transforms an observable
        // pipe takes multiple functions                             
        if (users.length === 0)
          return undefined
        
        return users[0]
      }))
  }

  

// post request on user/password to fill out the dabatabase

post(username:string,password:string):Observable<any>{
  return this.http.post(this.apiUrl,{username,password})
}

}






