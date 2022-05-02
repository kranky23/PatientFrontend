import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080';

  public getMessages(pat_id:string)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var patient_id  = parseInt(pat_id);
    return this.http.get<any[]>(`${this.baseUrl}/getMessages/${patient_id}`,{headers:header,responseType:'json'});
  }


  public sendMessage(messageToBeSent:Messages)
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var pat_id = localStorage.getItem("id")!;
    var patient_id  = parseInt(pat_id);
    return this.http.post<any>(`${this.baseUrl}/postMessage/${pat_id}/${1}`,messageToBeSent,{headers:header,responseType:'json'});
  }


  public updateReadReceipt()
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
      Authorization : "Bearer " + token
      }
    )
    var pat_id = localStorage.getItem("id")!;
    return this.http.post<any>(`${this.baseUrl}/updateReadReceipt/${pat_id}`,{headers:header,responseType:'json'});
  }

}
