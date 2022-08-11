import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username: string = 'default' // need to get it from the ui service / subscribe  1. define  username


  constructor( private uiService: UIService) { //  2. to have access to the ui service 
    //console.log('constructor')
    //this.uiService.whenUsernameChanges().subscribe...  -- better practice to use this.
    uiService.whenUsernameChanges().subscribe(username => {  // 3. from the uiservice, needs to bring the observable
     
      if (username !== undefined)
        this.username = username
      
      
  })
 
} 

  ngOnInit(): void {

    this.uiService.dummyUsernameUpdate()   // 4. to update the username after it is initialized
  }


  onLogOut(): void{
    this.uiService.logout()
  }
}
