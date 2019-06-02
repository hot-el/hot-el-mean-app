import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StairsComponent } from './stairs.component';

describe('StairsComponent', () => {
  let component: StairsComponent;
  let fixture: ComponentFixture<StairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
