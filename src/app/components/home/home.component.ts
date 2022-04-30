import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/patient';
import { LoginService } from 'src/app/services/login.service';
import { RegistrationService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private loginService: LoginService, private registrationService : RegistrationService,
    private router:Router) { }
  
  login:boolean = false;
  signup: boolean = true;
  link: string = "";
  docId: string = "";

  patient: Patient = new Patient();

  ngOnInit(): void {
    this.link = this.router.url;
    console.log(this.link);
    var splitted = this.link.split("=");
    console.log(splitted);

    if(splitted.length>1){
      var arr = splitted[1].split(":");
      console.log(arr)
      this.docId = arr[0]
      this.patient.email = arr[1];
      this.patient.firstName = arr[2];
    }
  }

  activateLogin()
  {

    this.login = true;
    this.signup = false;
  }

  activateSignUp()
  {
    this.login = false;
    this.signup = true;
  }
  // isloggedIn : boolean = true
  // login function
  public onLogin(patientLogin : NgForm)
  {
    console.log(this.patient.email,this.patient.password)

    this.loginService.generateToken(this.patient).subscribe(
      (response:any)=>{
        
        console.log(response.token);
        console.log("patient_id is " + response.id);
        console.log("patient email  is " + response.email);
        console.log("patient first name is " + response.fname);
        console.log("patient last name is " + response.lname);
        localStorage.setItem("id",response.id);
        localStorage.setItem("email",response.email);
        localStorage.setItem("fname",response.fname);
        localStorage.setItem("lname",response.lname);
        localStorage.setItem("mood","false");
        this.loginUser(response.token)
        window.location.href = "/dashboard"
        // this.router.navigate(['mood']) // this works like crazy
        
      },
      error=>{ console.log(error),alert("Wrong credentials!")}
    );
  }

  public loginUser(token : string)
  {
    
    localStorage.setItem("token" ,token);
    return true;
  }


  // register function for a user

  public onSubmit(patientSignUp : NgForm)
  {
    console.log(this.patient);
    this.registrationService.enroll(this.patient,this.docId)
    .subscribe(
      (data:any) => {

        console.log('Success!',data),alert("Registration Success! Check your email to confirm your account! ")
        window.location.href = "home"

      },
      error => {console.log('Error!',error),alert("Email error! ")
      window.location.href = "home"
    }
      
    )
    // this.registrationService.enroll(this.patient)
    // .subscribe(
    //   data => {console.log('Success!',data),alert("Registration Success! Check your email to confirm your account! ")},
    //   error => {console.log('Error!',error),alert("Invalid Email or Password.. Try again")}
    // )
  }

  

}
