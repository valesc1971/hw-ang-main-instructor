import { Component, OnInit } from '@angular/core';
import {Memo} from 'src/app/Memo'
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-memos',
  templateUrl: './memos.component.html',
  styleUrls: ['./memos.component.css']
})
export class MemosComponent implements OnInit {
  addingMemo: boolean = false
  memos: Memo[] = []
  memoToEditID: number | undefined

  constructor(private uiService:UIService) // request that angular gives us the uiservice and makes the memos component dependents on uiservice  --- add a dependency
  { // makes memos compnent dependant on uiservice, 
  
    // 3. memos component told uiservice to call this function (doThis) whenever showCreateMemosSubject (in uiservice) is transitioned (everytime the states changes, the service call this function )
    const doThis = (showAddMemo: boolean) => this.addingMemo = showAddMemo
   // (doThis: accept the current state value and store in the the local state value ---- state value is used to control the app-edit-value component )
   // the end od the state transition triggers the beginning of the listening (showing or hiding the add-memo component in the html)
   uiService.whenAddMemoChanges().subscribe(doThis)
   
   //tells the uiservice that whenaddmemo started, subscribe to that , will receive a boolean 

   // for creating a memo - could be true (add) or false (cancel)
    //  showAddMemo => this.addingMemo = showAddMemo)  // do this when the event whenaddmemo happens
   
   uiService.whenMemosListUpdated().subscribe(memos => this.memos = memos)  // tells the uiservice to do something
   uiService.whenEditingStarts().subscribe(id => this.memoToEditID = id)
   }  

  ngOnInit(): void {

    // when triggers somenthing we do not want it to be in the constructor
    this.uiService.dummyMemosUpdate() // do not assume that this is a cheap operation becuase it is not in the constructor
  }

// this component (memos) triggers the event becuase it owns the btn

onAddMemoClicked(): void{
  this.uiService.startAddMemo() // 1.- for adding a memo (to uiservice) (in html file click onAddMemoClicked())
                                // 2. notifies the uiservice that that event has happened (startAddMemo in uiservice)
}

onCreateMemo(memo:Memo): void{
  this.uiService.applyCreateMemoHappened(memo.text)
}

onCancelCreate(): void{
  this.uiService.cancelAddMemo()
}

onApplyEdit(memo: Memo): void{  // need to modify based on the id
  if (memo.id !== undefined)
    this.uiService.applyTheEdit(memo.id, memo.text)
  else
    console.log('id is undefined and cannot apply edit')
}

onCancelEdit(): void {  // just cancel , do not need to modify
  this.uiService.cancelEditing()
}


}
