import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientResponses } from 'src/app/patient-responses';
import { ProgressAndSectionsService } from 'src/app/services/progress-and-sections.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { StoreResponsesService } from 'src/app/services/store-responses.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private questionService : QuestionsService,private router : Router
    ,private storeResponseService : StoreResponsesService , private progressAndSectionsService: ProgressAndSectionsService) { }

    progress:number = 0;
    order:any[] = [];

    one:boolean = false;
    two:boolean = false;
    three:boolean = false;
    four:boolean = false;
    five:boolean = false;
    six:boolean = false;
    seven:boolean = false;
    eight:boolean = false;

  ngOnInit(): void {
    this.checkProgress();
  }



checkProgress()
{
  this.progressAndSectionsService.getCurrentSection().subscribe(
    (data:any) => {

      console.log("Current section is ",data);
      this.progress = data;
      
    },
    (error:any) => {console.log('Error obtaining current section!',error)}
  )

  this.progressAndSectionsService.getOrderSet().subscribe(
    (data:any) => 
    {
      var temp = "second";
      console.log("JSON format order obtained is ",data);
      console.log("progress of user is",this.progress);
      
      if(this.progress==0) //change this to == 0
      {
        localStorage.setItem("section",1+"");
        //enable only 1st section
        this.one = true;
        // this.loadSection(1);
      }
      else
      {
        var index = 0;
        this.order[0]=data.first; this.order[1]= data.second; this.order[2]=data.third; this.order[3]=data.fourth;
        this.order[4]=data.fifth; this.order[5]=data.sixth; this.order[6]=data.seventh; this.order[7]=data.eight;
        // delete this.order[4];

        if(this.order[4]==undefined)
          console.log("I am undefined");

        console.log("Array of order is ",this.order);

        for(var i=0;i<this.order.length-1;i++)
        {
          if(this.order[i]==this.progress+"") // if user completed all the mandatory sections
          {
            
            if(this.order[i+1]=="0") // all mandatory sections are done! enable all faltu sections and disable the completed sections
            {
              console.log("entered faltu sectoin")
              //disable order[i]
              this.loadAllRemSections(i+1);
              break;
            }
            else // there are still mandatory sectoins to be completed
            {
              //store the next section to load this in section component.
              localStorage.setItem("section",this.order[i+1]+"");
              if (this.order[i+1] == 1)
                this.one = true;
              else if (this.order[i+1] == 2)
                this.two = true;
              else if (this.order[i+1] == 3)
                this.three = true;
              else if (this.order[i+1] == 4)
                this.four = true;
              else if (this.order[i+1] == 5)
                this.five = true;
              else if (this.order[i+1] == 6)
                this.six = true;
              else if (this.order[i+1] == 7)
                this.seven = true;
              else if (this.order[i+1] == 8)
                this.eight = true;

              if (this.order[i] == 1)
                this.one = false;
              else if (this.order[i] == 2)
                this.two = false;
              else if (this.order[i] == 3)
                this.three = false;
              else if (this.order[i] == 4)
                this.four = false;
              else if (this.order[i] == 5)
                this.five = false;
              else if (this.order[i] == 6)
                this.six = false;
              else if (this.order[i] == 7)
                this.seven = false;
              else if (this.order[i] == 8)
                this.eight = false;

            }
          }
        }
      }
    },
    (error:any) => {console.log('Error obtaining progress set orders!',error)}
  )

}




loadSection(sec_id:number)
{
  localStorage.setItem("section",sec_id+"");
  this.router.navigate(['sections']);
}





loadAllRemSections(i:number)
{
  var rem: number[] = [1,2,3,4,5,6,7,8]
// disable the completed sections
  for(var j=0;j<=i+1;j++)
  {
    if(this.order[j]==1)
    {
      this.one = false;
      delete rem[0];
    }
    else if(this.order[j]==2)
    {
      this.two = false;
      delete rem[1];
    }
    else if(this.order[j]==3)
    {
      this.three = false;
      delete rem[2];
    }
    else if(this.order[j]==4)
    {
      this.four = false;
      delete rem[3];
    }
    else if(this.order[j]==5)
    {
      this.five = false;
      delete rem[4];
    }
    else if(this.order[j]==6)
    {
      this.six = false;
      delete rem[5];
    }
    else if(this.order[j]==7)
    {
      this.seven = false;
      delete rem[6];
    }
    else if(this.order[j]==8)
    {
      this.eight = false;
      delete rem[7];
    }
  }
// enable the remaining sections other than the disabled
  for(var j=0;j<rem.length;j++)
  {
    if(rem[j]!=undefined)
    {
      if(rem[j]==1)
        this.one = true;
      else if(rem[j]==2)
        this.two = true;
      else if(rem[j]==3)
        this.three = true;
      else if(rem[j]==4)
        this.four = true;
      else if(rem[j]==5)
        this.five = true;
      else if(rem[j]==6)
        this.six = true;
      else if(rem[j]==7)
        this.seven = true;
      else if(rem[j]==8)
        this.eight = true;
    }
    
  }
  console.log("rem sections array is ",rem);

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


  // public loadSection()
  // {
  //   this.router.navigate(['sections']);
  // }


}
