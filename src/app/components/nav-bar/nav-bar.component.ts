import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private loginService : LoginService,private router : Router) { }

  public loggedIn = false;
  fname:string = localStorage.getItem("fname")!;
  
  ngOnInit(): void 
  {
    this.loggedIn = this.loginService.isLoggedIn();
  }

  public logOutUser()
  {
    localStorage.removeItem("mood");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("section"); 

    this.loginService.logOut();
    window.location.href = "home"
    // this.router.navigate(['']);
    // location.reload();
  }

}
