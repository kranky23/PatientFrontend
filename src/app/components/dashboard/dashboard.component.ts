import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PatientResponses } from 'src/app/patient-responses';
import { QuestionsService } from 'src/app/services/questions.service';
import { StoreResponsesService } from 'src/app/services/store-responses.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoodService } from 'src/app/services/mood.service';

// import { NgbdModalComponent, NgbdModalContent } from './modal-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private questionService: QuestionsService, private router: Router
    , private storeResponseService: StoreResponsesService, private modalService: BsModalService,
    private moodService: MoodService) { }

  template!: TemplateRef<any>;
  templateLoad: boolean = false;
  isConsent: string="0";
  consentDetails={
    fname:"",
    lname:""
  }
  ngOnInit(): void {
    if (localStorage.getItem("mood") == "false")
      this.moodSubmitted = false;
    else {
      this.moodSubmitted = true;
    }
    
    this.storeResponseService.getConsent(localStorage.getItem("id")||"")
    .subscribe(
      (data:any)=>{
        this.isConsent = data.count;
        this.consentDetails.fname = data.fname;
        this.consentDetails.lname = data.lname;
      },
      error=>{
        console.log(error)
      }
    )

  }

  grantPermission(){
    this.storeResponseService.grantPermission(localStorage.getItem('id')||'', this.isConsent).subscribe(
      (data:any)=>{
        this.isConsent = data.count;
        this.consentDetails.fname = data.fname;
        this.consentDetails.lname = data.lname;
      },
      error=>{
        console.log(error);
      }
      
    )
  }
  modalRef?: BsModalRef;
  moodSubmitted: boolean = false;

  activity: string = "";

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  setMood(mood: number): void {
    console.log(mood);
    localStorage.setItem("mood", "true");
    this.moodService.storeMood(mood).subscribe(
      (data: any) => {

        console.log('Mood Stored!', data), alert("Mood stored!")
        // window.location.href = "dashboard"
        this.moodSubmitted = true;
      },
      (error: any) => { console.log('Error storing mood!', error) }
    )
    this.modalRef?.hide();
  }


  bored() {
    this.moodService.getBored().subscribe(
      (data: any) => {
        this.activity = data.activity;
        console.log('Obtained boredom is!', data)

      },
      (error: any) => { console.log('Error storing mood!', error) }
    )
  }



}


