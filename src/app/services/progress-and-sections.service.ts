import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientResponses } from '../patient-responses';

@Injectable({
  providedIn: 'root'
})
export class ProgressAndSectionsService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080"

  getOrderSet()
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getOrderSet/${pat_id}`,{headers:header,responseType:'json'});
  }


  getCurrentSection()
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getCurrentSection/${pat_id}`,{headers:header,responseType:'json'});
  }

  getSectionQuestions()
  {

  }


  updateOrderSet(credentials:any)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var pat_id = localStorage.getItem("id");
    return this.http.post(`${this.baseUrl}/updateOrderSet/${pat_id}`,credentials,{headers:header,responseType:'json'});
  }

  saveResponses(patientRespones:PatientResponses ,sec_id:number)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    const pat_id = localStorage.getItem("id");
    console.log(JSON.stringify(patientRespones))
    return this.http.post(`${this.baseUrl}/patient/responses/${pat_id}/${sec_id}`,patientRespones,{headers:header,responseType:'json'});
  }


  updateSection(sec_id:number)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    const pat_id = localStorage.getItem("id");
    return this.http.post(`${this.baseUrl}/storeSection/${pat_id}/${sec_id}`,{headers:header,responseType:'json'});
  }

  getResponses(sec_id:number)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    const pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getPatientResponses/${pat_id}/${sec_id}`,{headers:header,responseType:'json'});
  }
}
