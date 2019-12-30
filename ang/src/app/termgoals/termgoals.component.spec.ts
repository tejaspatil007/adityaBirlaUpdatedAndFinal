import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermgoalsComponent } from './termgoals.component';

describe('TermgoalsComponent', () => {
  let component: TermgoalsComponent;
  let fixture: ComponentFixture<TermgoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermgoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
