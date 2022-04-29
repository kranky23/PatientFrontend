import { HttpClient } from '@angular/common/http';
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
    var pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getOrderSet/${pat_id}`);
  }


  getCurrentSection()
  {
    var pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getCurrentSection/${pat_id}`);
  }

  getSectionQuestions()
  {

  }


  updateOrderSet(credentials:any)
  {
    var pat_id = localStorage.getItem("id");
    return this.http.post(`${this.baseUrl}/updateOrderSet/${pat_id}`,credentials);
  }

  saveResponses(patientRespones:PatientResponses ,sec_id:number)
  {
    const pat_id = localStorage.getItem("id");
    console.log(JSON.stringify(patientRespones))
    return this.http.post(`${this.baseUrl}/patient/responses/${pat_id}/${sec_id}`,patientRespones);
  }


  updateSection(sec_id:number)
  {
    const pat_id = localStorage.getItem("id");
    return this.http.post(`${this.baseUrl}/storeSection/${pat_id}/${sec_id}`,{Headers:"Hello"});
  }

  getResponses(sec_id:number)
  {
    const pat_id = localStorage.getItem("id");
    return this.http.get(`${this.baseUrl}/getPatientResponses/${pat_id}/${sec_id}`);
  }
}
