import { Component, Input, OnInit } from '@angular/core';
import {Memo} from 'src/app/Memo';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  // need the memo from html template
  // memo still needs to be initialized b/c the constructor will need a value before the html provides the value
  @Input() memo: Memo = {createdOn: new Date, text: 'default text here'} // memos needs to deal with just 1 memo, not with an array of memo
  
  // best practice to keep it private same as keeping const instead of vars
  constructor(private uiService: UIService) { }  

  ngOnInit(): void {
  }

  onEdit(): void{
    if (this.memo.id !== undefined)
      this.uiService.startEditing(this.memo.id)
      else
      console.log('id is undefined. cannot start editing')
  }

  onDelete(): void{
    if (this.memo.id !== undefined)
      this.uiService.deleteMemoHappened(this.memo.id)  // if not if/else --- error
    else
      console.log('id is undefined. cannot delete')
  }

}
