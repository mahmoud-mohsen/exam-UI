import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8080/';

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  options = {
    headers: this.httpHeaders
  };


  constructor(private http: HttpClient) {
  }

  createNewEntity(entity: any, url: String, callerUserId: string) {
   this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'USER_ID': callerUserId
    });

    this.httpHeaders.set('USER_ID', callerUserId);
    this.options = { headers: this.httpHeaders };
    console.log(this.baseUrl + url);

    console.log(this.httpHeaders);
    console.log(this.baseUrl + url);



    return this.http.post(this.baseUrl + url, JSON.stringify(entity), this.options);
  }

  ViewEntities(url: String, callerUserId: string) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'USER_ID': callerUserId
    });
    this.options = { headers: this.httpHeaders };

    return this.http.get(this.baseUrl + url, this.options);
  }

  ViewEntity(url: String, entityId: string, callerUserId: string) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'USER_ID': callerUserId
    });
    this.options = { headers: this.httpHeaders };

    return this.http.get(this.baseUrl + url + "/" + entityId, this.options);
  }
}
