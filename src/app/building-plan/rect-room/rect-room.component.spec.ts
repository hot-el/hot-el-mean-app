import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectRoomComponent } from './rect-room.component';

describe('RectRoomComponent', () => {
  let component: RectRoomComponent;
  let fixture: ComponentFixture<RectRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
