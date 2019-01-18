import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../_models/category';
import { CategoriesService } from '../_services/categories.service';
import { NewRoomComponent } from './new-room/new-room.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-room-category',
  templateUrl: './room-category.component.html',
  styleUrls: ['./room-category.component.scss']
})
export class RoomCategoryComponent implements OnInit {

  categories: Category[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.categoriesService.getCategories()
      .then(
        categories => {
          this.categories = categories;
      });
  }

  openNewRoomForm() {
    this.dialog.open(NewRoomComponent);
  }

}
