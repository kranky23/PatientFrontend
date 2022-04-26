import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PatientResponses } from 'src/app/patient-responses';
import { QuestionsService } from 'src/app/services/questions.service';
import { StoreResponsesService } from 'src/app/services/store-responses.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private questionService : QuestionsService,private router : Router
    ,private storeResponseService : StoreResponsesService,private modalService: BsModalService,
    private moodService:MoodService) { }

    template!: TemplateRef<any>; 
    templateLoad: boolean = false;
    ngOnInit(): void 
    {
      if(localStorage.getItem("mood")=="false")
        this.moodSubmitted = false;
      else
      {
        this.moodSubmitted = true;
      }
    //   this.templateLoad = false;
    //   this.openModal(this.template!);
    }
  
  patientResponses: PatientResponses = new PatientResponses();

  questions: { q_no: number; question: string; }[] = [];
 
  responses:number[] = []
  question_ids: number[] = []

  objects: {responses : boolean[] ; questions_ids:number[] } [] = [];

  index = 0;
  section = 0;
  submitted = false;


  option1= false;
  option2= false;
  option3= false;
  
  sec_1 = false;
  sec_2 = false;
  sec_3 = false;

  modalRef?: BsModalRef;
  moodSubmitted: boolean =  false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }
 
  setMood(mood:number): void {
    console.log(mood);
    localStorage.setItem("mood","true");
    this.moodService.storeMood(mood).subscribe(
      (data:any) => {

        console.log('Mood Stored!',data),alert("Mood stored!")
        // window.location.href = "dashboard"
        this.moodSubmitted = true;
      },
      (error:any) => {console.log('Error storing mood!',error)}
    )
    this.modalRef?.hide();
  }

  public section1()
  {    
    this.questionService.getQuestions(1).subscribe(
      (data:any) => {

        console.log('THe obtained list of questions is ',data)
        
        this.submitted = true;
        this.section = 1;
        // window.location.href = "sections"
        this.questions = data;
        console.log("length of data " ,data.length);
        console.log("data of data " ,data[0].id);
        console.log("data of data " ,data[1].id);
        console.log("data of data " ,data[2].id);
        // console.log("data of data " ,data.length);
        // console.log("data of data " ,data.length);

        for (var x = 0; x < data.length; x++) 
        {
          console.log(data[x].id);
          // this.patientResponses.questions.push(data[x].id);
          this.question_ids[x] = data[x].id;
          console.log("patient responses data is  " ,this.question_ids[x]);

          // objects.push(element);
        }

        this.sec_1 = true;
        // this.router.navigate(['sections'])
        // console.log(this.questions[0]);
      },
      (error:any) => {console.log('Error obtaining questions!',error)}
    )
    // window.location.href = "/sections"
  }

  public section2()
  {
    this.questionService.getQuestions(2).subscribe(
      (data:any) => {

        console.log('THe obtained list of questions is ',data)
        
        this.submitted = true;
        this.section = 2;
        // window.location.href = "sections"
        this.questions = data;
        console.log("data of data " ,data[0].id);
        for (var x = 0; x < data.length; x++) 
        {
          this.question_ids[x] = data[x].id;
          // objects.push(element);
        }
        // this.router.navigate(['sections'])
        // console.log(this.questions[0]);
        this.sec_2 = true;

      },
      (error:any) => {console.log('Error obtaining questions!',error)}
    )
  }


  public section3()
  {    
    this.questionService.getQuestions(3).subscribe(
      (data:any) => {

        console.log('THe obtained list of questions is ',data)
        
        this.submitted = true;
        this.section = 1;
        // window.location.href = "sections"
        this.questions = data;

        for (var x = 0; x < data.length; x++) 
        {
          // console.log(this.questions[x].q_no);
          this.question_ids[x] = data[x].id;
          // objects.push(element);
        }
        this.sec_3 = true;


        // this.router.navigate(['sections'])
        // console.log(this.questions[0]);
      },
      (error:any) => {console.log('Error obtaining questions!',error)}
    )
    // window.location.href = "/sections"
  }

  public answer(ans : number,option: number)
  {
    if(option==1)
    {
      this.option1 = true;
    }
    if(option==2)
    {
      this.option2 = true;
    }
    if(option==3)
    {
      this.option3 = true;
    }
    this.responses[this.index] = ans;
    console.log(this.responses[this.index]);
    this.index++;
    
  }

  public submit()
  {

    this.patientResponses.questions = this.question_ids;
    this.patientResponses.responses = this.responses;
    console.log(this.responses);
    console.log(this.question_ids);

    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    // var len = 3
    // var objects = []
    // for (var x = 0; x < len; x++) 
    // {
    //   var element = {
    //                 "q_no" : this.question_ids[x],
    //                 "answer"    : this.responses[x]
    //   };
    //   objects.push(element);
    // }

    this.storeResponseService.saveResponses(this.patientResponses,this.section).subscribe(
      (response:any)=>{

          console.log("responses stored!")

      },
      (error:any)=>{ console.log(error)}
      );
  }


}


