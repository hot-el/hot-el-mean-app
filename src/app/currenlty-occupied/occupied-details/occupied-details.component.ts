import { Component, OnInit, Input } from '@angular/core';
import { DeleteOccupiedComponent } from '../delete-occupied/delete-occupied.component';
import { MatDialog } from '@angular/material';
import { RoomService } from '../../_services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CheckOutComponent } from '../check-out/check-out.component';

@Component({
  selector: 'app-occupied-details',
  templateUrl: './occupied-details.component.html',
  styleUrls: ['./occupied-details.component.scss']
})
export class OccupiedDetailsComponent implements OnInit {

  @Input() occupied: any;

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  openDeleteOccupied(room) {
    const dialogRef = this.dialog.open(DeleteOccupiedComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.location.back();
      }
    });
  }

  openCheckout(room) {
    const dialogRef = this.dialog.open(CheckOutComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.router.navigateByUrl('/currently-occupied');
      }
    });

  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        this.occupied = room;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
