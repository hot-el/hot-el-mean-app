import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOccupiedComponent } from './delete-occupied.component';

describe('DeleteOccupiedComponent', () => {
  let component: DeleteOccupiedComponent;
  let fixture: ComponentFixture<DeleteOccupiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOccupiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOccupiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
