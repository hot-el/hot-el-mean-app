import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenltyOccupiedComponent } from './currenlty-occupied.component';

describe('CurrenltyOccupiedComponent', () => {
  let component: CurrenltyOccupiedComponent;
  let fixture: ComponentFixture<CurrenltyOccupiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenltyOccupiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenltyOccupiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
