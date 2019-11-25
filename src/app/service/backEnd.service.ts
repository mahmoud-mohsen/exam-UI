import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error


@Injectable({
  providedIn: 'root'
})
export class GlobalBackEndService {

  baseUrl: string = 'http://localhost:8080/';

  activeUser
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  options;


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

    return this.http.post(this.baseUrl + url, JSON.stringify(entity), this.options);
  }

  ViewEntities(url: String, callerUserId: string, param?) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'USER_ID': callerUserId
    });

    this.options = { headers: this.httpHeaders, params: param };
    console.log(this.options);

    return this.http.get(this.baseUrl + url, this.options);
  }

  ViewEntity(url: String, callerUserId: string) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'USER_ID': callerUserId
    });
    this.options = { headers: this.httpHeaders };

    return this.http.get(this.baseUrl + url, this.options);
  }
}
