import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/messages';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages1',
  templateUrl: './messages1.component.html',
  styleUrls: ['./messages1.component.css']
})
export class Messages1Component implements OnInit {

  constructor(private messageService: MessagesService) { }

  messages:Messages[] = [];
  fname: string = localStorage.getItem("fname")!;

  messageToBeSent : Messages = new Messages();
  
  async ngOnInit(): Promise<void> 
  {
    const data : any = await this.messageService.updateReadReceipt().toPromise();

    
    var pat_id = localStorage.getItem("id");
    this.messageService.getMessages(pat_id!).subscribe(
      (data:any) => {
        this.messages = data;
        console.log("Messages obtaiend are hey",this.messages);
        window.scrollTo(0, document.body.scrollHeight);
        // ('.chat-history')[0].scrollTop = ('.chat-history')[0].scrollHeight
      },
      (error:any) => {console.log('Error fetching questions!',error)}
    )

    
  }


  public onSendMessage(messageToBeSent:Messages)
  {
    console.log("messageToBeSent is " , messageToBeSent);
    messageToBeSent.postedBy = true;
    this.messageService.sendMessage(messageToBeSent).subscribe(
      (data:any) => {
        console.log("Message successfully stored!",data);
        messageToBeSent.message = null!;
        // window.scrollTo(0, document.body.scrollHeight);

        this.ngOnInit();
      },
      (error:any) => {console.log('Could not store message!',error)}
    )
   
  }

  loadNewMessages()
  {

    this.ngOnInit();
  }



}
