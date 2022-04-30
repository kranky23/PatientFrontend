import { Component, OnInit } from '@angular/core';
import { ProgressAndSectionsService } from 'src/app/services/progress-and-sections.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import * as $ from 'jquery'
import {param} from "jquery";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress: number = -1;
  one: boolean = false;
  two: boolean = false;
  three: boolean = false;
  four: boolean = false;
  five: boolean = false;
  six: boolean = false;
  seven: boolean = false;
  eight: boolean = false;

  questionsLoaded = false;
  map = new Map<number,string>(); 
  map1 = new Map<number,string>(); 

  count:number = 0;

  order:any[] = []; //order of the sections a patient has completed.
  

  questions: { id: number; question: string; }[] = [];
  responses: { id: number; response: number; }[] = [];
  answers :string[] = [];
  constructor(private questionService : QuestionsService,private progressAndSectionsService: ProgressAndSectionsService) { }

  ngOnInit(): void {

    this.map.set(1,"Not at all likely");
    this.map.set(2,"Less likely");
    this.map.set(3,"Neutral");
    this.map.set(4,"Likely");
    this.map.set(5,"Highly Likely");

    this.progressAndSectionsService.getCurrentSection().subscribe(
      (data:any) => {
  
        console.log("Current section is ",data);
        this.progress = Number.parseInt(data);
        if(data!="0")
        {
          this.fetchOrder();
        }

        
      },
      (error:any) => {console.log('Error obtaining current section!',error)}
    )
      this.patientProgressReturn();
  }


  patientProgressReturn() 
  {
    if(this.progress==0)
      this.count=0;

      this.progressAndSectionsService.getOrderSet().subscribe(
        (data:any) => 
        {
          var temp = "second";
          console.log("JSON format order obtained is ",data);
          console.log("progress of user is",this.progress);
         
          if (this.progress != 0) 
          {
            if (data.first == 1)
              this.count = 1;
  
            if (data.second == this.progress+"")
              this.count = 2;
            if (data.third == this.progress+"")
              this.count = 3;
              if (data.fourth ==  this.progress+"")
              this.count = 4;
              if (data.fifth ==  this.progress+"")
              this.count = 5;
              if (data.sixth ==  this.progress+"")
              this.count = 6;
              if (data.seventh ==  this.progress+"")
              this.count = 7;
              if (data.eight ==  this.progress+"")
              this.count = 8;
          }
          console.log("Number of sections done are ",this.count);     
          console.log("count is "+this.count)
          if(this.count === 0) this.updateDonutChart('#specificChart', 0, true);
          if(this.count === 1)  this.updateDonutChart('#specificChart', 12.50, true);
          if(this.count === 2)  this.updateDonutChart('#specificChart', 25, true);
          if(this.count === 3)  this.updateDonutChart('#specificChart', 37.50, true);
          if(this.count === 4)  this.updateDonutChart('#specificChart', 50, true);
          if(this.count === 5)  this.updateDonutChart('#specificChart', 62.50, true);
          if(this.count === 6)  this.updateDonutChart('#specificChart', 75, true);
          if(this.count === 7)  this.updateDonutChart('#specificChart', 87.50, true);
          if(this.count === 8)  this.updateDonutChart('#specificChart', 100, true);
  
        
        },
        (error:any) => {console.log('Error calculating the number of sections!',error)}


      )


    
  }

  updateDonutChart(el: string, percent: number, donut: boolean){
    percent = Math.round(percent);
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    var deg = Math.round(360 * (percent / 100));

    if (percent > 50) {
        $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
        $(el + ' .right-side').css('transform', 'rotate(180deg)');
    } else {
        $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
        $(el + ' .right-side').css('transform', 'rotate(0deg)');
    }
    if (donut) {
        $(el + ' .right-side').css('border-width', '0.1em');
        $(el + ' .left-side').css('border-width', '0.1em');
        $(el + ' .shadow').css('border-width', '0.1em');
    } else {
        $(el + ' .right-side').css('border-width', '0.5em');
        $(el + ' .left-side').css('border-width', '0.5em');
        $(el + ' .shadow').css('border-width', '0.5em');
    }
    $(el + ' .num').text(percent);
    $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
    
  }

  
  
  fetchOrder() 
  {
    this.progressAndSectionsService.getOrderSet().subscribe(
      async (data:any) => 
      {
        var temp = "second";
        console.log("JSON format order obtained is ",data);
        console.log("progress of user is",this.progress);
       
        if (this.progress != 0) 
        {

          // if(data.first!=this.progress)
          //   this.one = true;
          // else
          //   return;
          
          // if(data.second!=this.progress)
          //   this.two = true;
          // else 
          // {
          //   this.two = true;
          //   return;
          // }
          
          const data : any = await this.progressAndSectionsService.getOrderSet().toPromise();
          // this.progressAndSectionsService.getOrderSet().subscribe(
          //   (data:any) => 
          //   {
              var temp = "second";
              console.log("JSON format order obtained is ",data);
              console.log("progress of user is",this.progress);
                var index = 0;
                this.order[0]=data.first; this.order[1]= data.second; this.order[2]=data.third; this.order[3]=data.fourth;
                this.order[4]=data.fifth; this.order[5]=data.sixth; this.order[6]=data.seventh; this.order[7]=data.eight;
            //   },
            //   (error:any) => {console.log('Error obtaining progress set orders!',error)}
            // )

            console.log("orders array is ", this.order);

            // if(this.progress==1 && this.progress!=-1)
            // {
            //   this.one = true;
            //   return;
            // }

            for(var i=0;i<8;i++)
            {
              if(this.order[i]==1)
                this.one = true;
              else if(this.order[i]==2)
                this.two = true;
              else if (this.order[i] == 3)
                this.three = true;
              else if (this.order[i] == 4)
                this.four = true;
              else if (this.order[i] == 5)
                this.five = true;
              else if (this.order[i] == 6)
                this.six = true;
              else if (this.order[i] == 7)
                this.seven = true;
              else if (this.order[i] == 8)
                this.eight = true;
              
              if(this.order[i]==this.progress)
                return;
            }












          

            if (data.first == 1)
            {
              this.one = true;
              if(data.first==this.progress)
                return;
            }

            if (data.second == 2 || data.third == 2 || data.fourth == 2 || data.fifth == 2 || data.sixth == 2 || data.seventh == 2 || data.eight == 2)
              this.two = true;
            if (data.second == 3 || data.third == 3 || data.fourth == 3 || data.fifth == 3 || data.sixth == 3 || data.seventh == 3 || data.eight == 3)
              this.three = true;
            if (data.second == 4 || data.third == 4 || data.fourth == 4 || data.fifth == 4 || data.sixth == 4 || data.seventh == 4 || data.eight == 4)
              this.four = true;
            if (data.second == 5 || data.third == 5 || data.fourth == 5 || data.fifth == 5 || data.sixth == 5 || data.seventh == 5 || data.eight == 5)
            {
              this.five = true;
              // if(data.second==this.progress || data.third==this.progress || data.fourth==this.progress || data.fifth==this.progress || data.sixth==this.progress || data.seventh==this.progress || data.eight==this.progress)
              //   return;
            }
            if (data.second == 6 || data.third == 6 || data.fourth == 6 || data.fifth == 6 || data.sixth == 6 || data.seventh == 6 || data.eight == 6)
              this.six = true;
            if (data.second == 7 || data.third == 7 || data.fourth == 7 || data.fifth == 7 || data.sixth == 7 || data.seventh == 7 || data.eight == 7)
              this.seven = true;
            if (data.second == 8 || data.third == 8 || data.fourth == 8 || data.fifth == 8 || data.sixth == 8 || data.seventh == 8 || data.eight == 8)
              this.eight = true;
        }

      
      },
      (error:any) => {console.log('Error obtaining progress set orders!',error)}
    )
  
  }

  async loadSection(sec_id:number)
  {
    const data : any = await this.questionService.getQuestions(sec_id).toPromise();
    console.log(data);
    this.questions = data;
    console.log("questions obtained are" ,this.questions);


    const res : any = await this.progressAndSectionsService.getResponses(sec_id).toPromise();
    console.log("Patient responses are ",res);
    this.responses = res;

    for(var i=0;i<this.responses.length;i++)
    {
      this.answers[i] = this.map.get(this.responses[i].response)!;
      console.log("i value is ",i)
    }
    console.log("only the answers are ",this.answers,i);


    this.questionsLoaded = true;
  }
}

