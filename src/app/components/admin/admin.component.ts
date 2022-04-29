import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from 'src/app/doctor';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  doctors:Doctor[] = [];
  addDoctor = false;
  doctor:Doctor = new Doctor();

  doctorsLoaded:boolean = false;

  ngOnInit(): void {

  }

  public addUser()
  {
    console.log("addDoctor called!")
    this.addDoctor = true;
  }

  public async onAdd(gamerAdd : NgForm)
  {
    console.log(this.doctor);
    
    // if(this.addGamer==)
    let email = document.getElementById("email");

    for(var i=0;i<this.doctors.length;i++)
    {
      if(this.doctors[i].username == this.doctor.username)
      {
        alert("Username taken! Try another one");
        this.doctor.username = "";
        return;
      }
    }
    
    const data : any = await this.loginService.addDoctor(this.doctor).toPromise();
    
    alert("New doctor added!")
    this.addDoctor = false;
    this.ngOnInit();
  }

  async showDoctors()
  {
    const data : any = await this.loginService.getDoctors().toPromise();
    this.doctors = data;
    console.log("doctors obtained are! ",this.doctors);
    this.doctorsLoaded = true;
  }

  public logOutUser()
  {
    
    window.location.href = "adminlogin"
    // this.router.navigate(['']);
    // location.reload();
  }

}
