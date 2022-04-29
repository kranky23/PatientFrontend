import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/admin';
import { Patient } from 'src/app/patient';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router:Router,private loginService: LoginService) { }
  
  patient: Patient = new Patient();
  admin: Admin = new Admin();
  
  ngOnInit(): void {
  }


  public onLogin(patientLogin : NgForm)
  {
    console.log(this.admin.username,this.admin.password)

    this.loginService.adminLogin(this.admin).subscribe(
      (response:any)=>{
        
        
        window.location.href = "/adminhome"
        // this.router.navigate(['mood']) // this works like crazy
        
      },
      error=>{ console.log(error),alert("Bad credentials")}
    );
  }

}
