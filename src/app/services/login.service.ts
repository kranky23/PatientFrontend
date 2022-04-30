import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { Doctor } from '../doctor';
import { Patient } from '../patient';
import { Specialist } from '../specialist';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private router: Router, private http: HttpClient) { }

  url = "http://localhost:8080"

  generateToken(patient: Patient) {
    return this.http.post(`${this.url}/token`, patient);
  }

  //to check whether user is logged in or not..
  public isLoggedIn() {
    var token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null)
      return false;
    return true;
  }

  //for the user to logout..
  public logOut() {
    localStorage.removeItem("token");
    // location.reload()
    return true;
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public adminLogin(admin: Admin) {
    return this.http.post(`${this.url}/adminLogin`, admin);
  }

  getDoctors() {
    return this.http.get<any>(`${this.url}/getDoctors`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  getSpecialists() {
    return this.http.get<any>(`${this.url}/getSpecialists`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  addDoctor(doctor: Doctor) {
    return this.http.post(`${this.url}/addDoctor`, doctor);
  }

  addSpecialist(specialist: Specialist) {
    return this.http.post(`${this.url}/addSpecialist`, specialist);
  }

  deleteData(){
    return this.http.get<any>(`${this.url}/deleteData/${localStorage.getItem('id')}`)
  }

}
