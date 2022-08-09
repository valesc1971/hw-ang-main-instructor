import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemosComponent } from './memos.component';

describe('MemosComponent', () => {
  let component: MemosComponent;
  let fixture: ComponentFixture<MemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
