import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../../model/userModel";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser?:UserModel;

  adminUrl: string="http://localhost:3000/admin";
  customerUrl: string="http://localhost:3000/customer";

  constructor(private http: HttpClient) { }

  getAdminUser(id: string){
    return this.http.get<UserModel>(`${this.adminUrl}/${id}`);
  }
  getCustomerUser(id: string){
    return this.http.get<UserModel>(`${this.customerUrl}/${id}`);
  }

  addAdmin(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.adminUrl, user);
  }

  addCustomer(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.customerUrl, user);
  }

  findUserByEmailAdmin(username:string): Observable<UserModel[]>{
    const params = new HttpParams().set('username',username);
    return this.http.get<UserModel[]>(this.adminUrl,{params});
  }
  findUserByEmailCustomer(username:string): Observable<UserModel[]>{
    const params = new HttpParams().set('username',username);
    return this.http.get<UserModel[]>(this.customerUrl,{params});
  }
}
