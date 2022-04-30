import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientResponses } from '../patient-responses';



@Injectable({
  providedIn: 'root'
})
export class StoreResponsesService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080"

  saveResponses(patientRespones:PatientResponses ,sec_id:number)
  {
    const pat_id = localStorage.getItem("id");
    console.log(JSON.stringify(patientRespones))
    return this.http.post(`${this.baseUrl}/patient/responses/${pat_id}/${sec_id}`,patientRespones);
  }

  getConsent(pat_id:string){
    return this.http.get(`${this.baseUrl}/consent/${pat_id}`);
  }

  grantPermission(pat_id:string, isConsent:string){
    return this.http.get(`${this.baseUrl}/provideConsent/${pat_id}/${isConsent}`);
  }

}
