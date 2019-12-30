import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdityabirlaComponent } from './adityabirla.component';

describe('AdityabirlaComponent', () => {
  let component: AdityabirlaComponent;
  let fixture: ComponentFixture<AdityabirlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdityabirlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdityabirlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
