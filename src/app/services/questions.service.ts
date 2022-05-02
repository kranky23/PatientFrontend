import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestionsUrl = "http://localhost:8080";

  public getQuestions(sec_id: Number)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    let pat_id = localStorage.getItem("id");  
    return this.http.get<any>(`${this.getQuestionsUrl}/questions/${pat_id}/${sec_id}`,{headers:header,responseType:'json'})
  }



}


