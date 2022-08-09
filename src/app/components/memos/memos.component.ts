import { Component, OnInit } from '@angular/core';
import {Memo} from 'src/app/Memo'

@Component({
  selector: 'app-memos',
  templateUrl: './memos.component.html',
  styleUrls: ['./memos.component.css']
})
export class MemosComponent implements OnInit {
  addingMemo: boolean = true
  memos: Memo[] = [
    {createdOn: new Date, text: 'memo1'},
    {createdOn: new Date, text: 'memo2'},
    {createdOn: new Date, text: 'memo3'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
