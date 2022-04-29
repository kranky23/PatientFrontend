import { HttpClient } from '@angular/common/http';
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
    var patient_id  = parseInt(pat_id);
    return this.http.get<any[]>(`${this.baseUrl}/getMessages/${patient_id}`,{responseType : 'json'});
  }


  public sendMessage(messageToBeSent:Messages)
  {
    var pat_id = localStorage.getItem("id")!;
    var patient_id  = parseInt(pat_id);
    return this.http.post<any>(`${this.baseUrl}/postMessage/${pat_id}/${1}`,messageToBeSent);
  }


  public updateReadReceipt()
  {
    var pat_id = localStorage.getItem("id")!;
    return this.http.post<any>(`${this.baseUrl}/updateReadReceipt/${pat_id}`,true);
  }

}
