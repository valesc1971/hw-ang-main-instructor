import { Component, Input, OnInit } from '@angular/core';
import {Memo} from 'src/app/Memo'

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  // need the memo from html template
  // memo still needs to be initialized b/c the constructor will need a value before the html provides the value
  @Input() memo: Memo = {createdOn: new Date, text: 'default text here'} // memos needs to deal with just 1 memo, not with an array of memo
  
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void{
    console.log('edit')
  }

  onDelete(): void{
    console.log('delete')
  }

}
