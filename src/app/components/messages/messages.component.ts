import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private login: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  deleteProfile(){
    this.login.deleteData()
    .subscribe(
      data=>{

        console.log(data.fname);
        this.router.navigate(['home']);

      },
      error=>{
        console.log(error)
      }
    )
  }

}
