import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReservationsComponent } from './active-reservations.component';

describe('ActiveReservationsComponent', () => {
  let component: ActiveReservationsComponent;
  let fixture: ComponentFixture<ActiveReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
