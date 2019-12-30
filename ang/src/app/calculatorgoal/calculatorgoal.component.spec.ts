import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorgoalComponent } from './calculatorgoal.component';

describe('CalculatorgoalComponent', () => {
  let component: CalculatorgoalComponent;
  let fixture: ComponentFixture<CalculatorgoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorgoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorgoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
