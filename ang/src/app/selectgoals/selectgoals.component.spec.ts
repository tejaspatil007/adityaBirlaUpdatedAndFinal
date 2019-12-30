import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectgoalsComponent } from './selectgoals.component';

describe('SelectgoalsComponent', () => {
  let component: SelectgoalsComponent;
  let fixture: ComponentFixture<SelectgoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectgoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
