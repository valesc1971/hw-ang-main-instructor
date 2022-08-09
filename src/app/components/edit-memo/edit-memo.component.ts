import { Component, OnInit, Input } from '@angular/core';
import {Memo} from 'src/app/Memo'

@Component({
  selector: 'app-edit-memo',
  templateUrl: './edit-memo.component.html',
  styleUrls: ['./edit-memo.component.css']
})
export class EditMemoComponent implements OnInit {

  //@input does not load the value right away, so it must be initialized  or allow to ' '
  @Input() memo: Memo = {createdOn: new Date, text: ''}
  newText: string =''   // init to the same as input ''

  constructor() { }

  // just before this is calles, this.memo has been loaded with the correct value
  // from the html when loaded
  ngOnInit(): void {
  
  this.newText = this.memo.text
  }

  onApply(): void{
    console.log(this.newText)
  }

  onCancel(): void{
    console.log('Cancel')
  }
}
