import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFreeRoomsComponent } from './search-free-rooms.component';

describe('SearchFreeRoomsComponent', () => {
  let component: SearchFreeRoomsComponent;
  let fixture: ComponentFixture<SearchFreeRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFreeRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFreeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
