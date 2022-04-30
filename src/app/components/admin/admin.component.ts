import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from 'src/app/doctor';
import { LoginService } from 'src/app/services/login.service';
import { Specialist } from 'src/app/specialist';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  doctors:Doctor[] = [];
  specialists:Specialist[] = [];

  addDoctor = false;
  addSpecialist = false;

  doctor:Doctor = new Doctor();
  specialist:Specialist = new Specialist();

  doctorsLoaded:boolean = false;
  specialistsLoaded:boolean = false;

  ngOnInit(): void {

  }

  public insertDoctor()
  {
    this.addSpecialist = false;
    console.log("addDoctor called!");
    this.addDoctor = true;
  }

  public insertSpecialist()
  {
    this.addDoctor = false;
    console.log("Insert Specialist called!");
    this.addSpecialist = true;
  }

  public async onAdd(doctorAdd : NgForm)
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

  public async onAddSpecialist(specialistAdd : NgForm)
  {
    console.log(this.specialist);
    
    // if(this.addGamer==)
    let email = document.getElementById("email");

    for(var i=0;i<this.specialists.length;i++)
    {
      if(this.specialists[i].email == this.specialist.email)
      {
        alert("email taken! Try another one");
        this.specialist.email = "";
        return;
      }
    }
    
    const data : any = await this.loginService.addSpecialist(this.specialist).toPromise();
    
    alert("New Specialist added!")
    this.addSpecialist = false;
    this.ngOnInit();
  }

  async showDoctors()
  {
    const data : any = await this.loginService.getDoctors().toPromise();
    this.doctors = data;
    console.log("doctors obtained are! ",this.doctors);
    this.doctorsLoaded = true;
    this.specialistsLoaded =false;
  }

  public logOutUser()
  {
    
    window.location.href = "adminlogin"
    // this.router.navigate(['']);
    // location.reload();
  }


  async showSpecialists()
  {
    const data : any = await this.loginService.getSpecialists().toPromise();
    this.specialists = data;
    console.log("Specialists obtained are! ",this.specialists);
    this.specialistsLoaded = true;
    this.doctorsLoaded = false;
  }
}
