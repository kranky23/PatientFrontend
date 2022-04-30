import { Component, OnInit, Input } from '@angular/core';
import { PatientResponses } from 'src/app/patient-responses';
import { ProgressAndSectionsService } from 'src/app/services/progress-and-sections.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  isEnabled:boolean = true
  question_ids: number[] = [];
  responses:number[] = [];
  questions: { id: number; question: string; }[] = [];
  questionsLoaded = false;
  constructor(private questionService : QuestionsService,private progressAndSectionsService: ProgressAndSectionsService) { }

  map = new Map<string, number>(); 
    // @Input() public name;
     credentials={
      first:"1",
      second:"0",
      third:"0",
      fourth:"0",
      fifth:"0",
      sixth:"0",
      seventh:"0",
      eight:"0"
      }
  patientResponses: PatientResponses = new PatientResponses();

  options:string[] = ["Choose an option","Not at all likely","Less likely","Neutral","Likely","Highly Likely"];


  async ngOnInit(): Promise<void> {

    var sec_id = Number.parseInt(localStorage.getItem("section")!);
    
    const data : any = await this.questionService.getQuestions(sec_id).toPromise();

    this.map.set("Not at all likely",1);
    this.map.set("Less likely",2);
    this.map.set("Neutral",3);
    this.map.set("Likely",4);
    this.map.set("Highly Likely",5);

        console.log('THe obtained list of questions is ',data)
        
        this.questions = data;
        console.log("length of data " ,this.questions);

        for (var x = 0; x < data.length; x++) 
        {
          console.log(data[x].id);
          // this.patientResponses.questions.push(data[x].id);
          this.question_ids[x] = data[x].id;
          console.log("questions  " ,this.question_ids[x]);

          // objects.push(element);
        }
        // this.router.navigate(['sections'])
        console.log("questions of the section are ",this.question_ids);
    
        this.questionsLoaded = true;
  }
  

  async onSubmit()
  {
    var sec_id = Number.parseInt(localStorage.getItem("section")!);


    this.patientResponses.questions = this.question_ids;
    this.patientResponses.responses = this.responses;
    console.log("patient resposnes are " ,this.patientResponses.responses);

    const data : any = await this.progressAndSectionsService.saveResponses(this.patientResponses,sec_id).toPromise();

    // this.progressAndSectionsService.saveResponses(this.patientResponses,sec_id).subscribe(
    //   (data:any) => {
    //     console.log("Dummy responses stored successfuly!")
        
    //   },
    //   (error:any) => {console.log('Error storing dummy responses!',error)}
    //   )
  
    const res_1 : any = await this.progressAndSectionsService.updateSection(sec_id).toPromise();
    
    // this.progressAndSectionsService.updateSection(sec_id).subscribe(
    // (res:any) => {
    //   console.log("Section updated as progress successfuly!")
      
    // },
    // (error:any) => {console.log('Error updating progress!',error)}
    // )

    const res : any = await this.progressAndSectionsService.getOrderSet().toPromise();
    
        console.log("Order set before update fetched!")
        console.log(res);
        console.log(res.first);

        if(res.first==sec_id+"")
          console.log("equalled!")

          this.credentials = res;
          console.log("credentials sveneom is ",res);
          if(res.first==sec_id+"" || res.second==sec_id+"" || res.third==sec_id+"" || res.fourth==sec_id+"" ||
          res.fifth==sec_id+"" || res.sixth==sec_id+"" || res.seventh==sec_id+"" || res.eight==sec_id+"")
            {
              console.log("mandatory section completed!",res)
              window.location.href = "tasks"
              return;
            }
          
          if(res.first=="0")
          {
            this.credentials.first=sec_id+"";
            // return;
          }
          else if(res.second=="0")
          {
            this.credentials.second=sec_id+"";
            // return;
          }
          else if(res.third=="0")
          {
            this.credentials.third=sec_id+"";
            // return;
          }
          else if(res.fourth=="0")
          {
            this.credentials.fourth=sec_id+"";
            // return;
          }
          else if(res.fifth=="0")
          {
            this.credentials.fifth=sec_id+"";
            // return;
          }
          else if(res.sixth=="0")
          {
            this.credentials.sixth=sec_id+"";
            // return;
          }
          else if(res.seventh=="0")
          {
            this.credentials.seventh=sec_id+"";
            // return;
          }
          else if(res.eight=="0")
          {
            this.credentials.eight=sec_id+"";
            // return;
          }
          console.log("updated order set after the completion of section is ",this.credentials);

          const res_2 : any = await this.progressAndSectionsService.updateOrderSet(this.credentials).toPromise();

          // this.progressAndSectionsService.updateOrderSet(this.credentials).subscribe(
          //   (res:any) => {
          //     console.log("Order set updated!")
              
          //   },
          //   (error:any) => {console.log('Error updating order set!',error)}
          //   )

    // const res : any = await this.progressAndSectionsService.getOrderSet().toPromise();

        
    // this.progressAndSectionsService.updateOrderSet(this.credentials).subscribe(
    //   (res:any) => {
    //     console.log("Order set updated!")
        
    //   },
    //   (error:any) => {console.log('Error updating order set!',error)}
    //   )
    window.location.href = "tasks"

  }

  pa(value: any){
    console.log("1st question answer is " ,value);
    this.responses[0] = this.map.get(value)!;
    
  }

  qa(value: any){
    console.log("2st question answer is " ,value);
    this.responses[1] = this.map.get(value)!;
  }

  ra(value: any){
    console.log("3st question answer is " ,value);
    this.responses[2] = this.map.get(value)!;
  }


}
