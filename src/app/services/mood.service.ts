import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080';

  storeMood(mood: Number) : Observable<string>
  {
    // return this.http.post<any>(`${this.moodUrl}/token`,mood);
    console.log("mood is " + mood)
    let token = localStorage.getItem("token");
    let pat_id = localStorage.getItem("id");
    let temp = "";
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    const options = {responseType :  'text'}
    // {headers: header}
    return this.http.post<any>(`${this.baseUrl}/patient/mood/${mood}/${pat_id}`,{headers:header,responseType:'json'});
  }

  getBored()
  {
    return this.http.get(`http://www.boredapi.com/api/activity/`);
  }

}
