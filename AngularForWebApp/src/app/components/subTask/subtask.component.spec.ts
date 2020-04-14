import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskComponent } from './subtask.component';

describe('SubTaskComponent', () => {
  let component: SubTaskComponent;
  let fixture: ComponentFixture<SubTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
