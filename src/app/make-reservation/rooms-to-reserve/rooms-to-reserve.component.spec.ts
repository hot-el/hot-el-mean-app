import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsToReserveComponent } from './rooms-to-reserve.component';

describe('RoomsToReserveComponent', () => {
  let component: RoomsToReserveComponent;
  let fixture: ComponentFixture<RoomsToReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsToReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsToReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
