import { Component, OnInit } from '@angular/core';
import { ProgressAndSectionsService } from 'src/app/services/progress-and-sections.service';
import { QuestionsService } from 'src/app/services/questions.service';

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
  
  }


  
  fetchOrder() 
  {
    this.progressAndSectionsService.getOrderSet().subscribe(
      (data:any) => 
      {
        var temp = "second";
        console.log("JSON format order obtained is ",data);
        console.log("progress of user is",this.progress);
       
        if (this.progress != 0) 
        {
          if (data.first == 1)
            this.one = true;

          if (data.second == 2 || data.third == 2 || data.fourth == 2 || data.fifth == 2 || data.sixth == 2 || data.seventh == 2 || data.eigth == 2)
            this.two = true;
          if (data.second == 3 || data.third == 3 || data.fourth == 3 || data.fifth == 3 || data.sixth == 3 || data.seventh == 3 || data.eigth == 3)
            this.three = true;
          if (data.second == 4 || data.third == 4 || data.fourth == 4 || data.fifth == 4 || data.sixth == 4 || data.seventh == 4 || data.eigth == 4)
            this.four = true;
          if (data.second == 5 || data.third == 5 || data.fourth == 5 || data.fifth == 5 || data.sixth == 5 || data.seventh == 5 || data.eigth == 5)
            this.five = true;
          if (data.second == 6 || data.third == 6 || data.fourth == 6 || data.fifth == 6 || data.sixth == 6 || data.seventh == 6 || data.eigth == 6)
            this.six = true;
          if (data.second == 7 || data.third == 7 || data.fourth == 7 || data.fifth == 7 || data.sixth == 7 || data.seventh == 7 || data.eigth == 7)
            this.seven = true;
          if (data.second == 8 || data.third == 8 || data.fourth == 8 || data.fifth == 8 || data.sixth == 8 || data.seventh == 8 || data.eigth == 8)
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


