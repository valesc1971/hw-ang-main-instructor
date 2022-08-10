import { Component, OnInit } from '@angular/core';
import {Memo} from 'src/app/Memo'
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-memos',
  templateUrl: './memos.component.html',
  styleUrls: ['./memos.component.css']
})
export class MemosComponent implements OnInit {
  addingMemo: boolean = true
  memos: Memo[] = []
  memoToEditID: number | undefined

  constructor(private uiService:UIService) { // makes memos compnent dependant on uiservice, 
   const doThis = (showAddMemo: boolean) => this.addingMemo = showAddMemo
   
   uiService.whenAddMemoChanges().subscribe(doThis)   // 3. for creating a memo - could be true (add) or false (cancel)

    //  showAddMemo => this.addingMemo = showAddMemo)  // do this when the event whenaddmemo happens
   
   uiService.whenMemosListUpdated().subscribe(memos => this.memos = memos)
   uiService.whenEditingStarts().subscribe(id => this.memoToEditID = id)
   }  

  ngOnInit(): void {

    // when triggers somenthing we do not want it to be in the constructor
    this.uiService.dummyMemosUpdate() // do not assume that this is a cheap operation
  }

// triggers the event becuase it owns the btn



onAddMemoClicked(): void{
  this.uiService.startAddMemo() // 1.- for adding a memo (to uiservice) 
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
