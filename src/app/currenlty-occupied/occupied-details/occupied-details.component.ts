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
    this.getOccupied();
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

  getOccupied(): void {
    const room_id = this.route.snapshot.paramMap.get('room_id');
    const reservation_id = this.route.snapshot.paramMap.get('reservation_id');
    this.roomService.getReservation(room_id, reservation_id)
      .subscribe(room => {
        this.occupied = room;
        console.log(this.occupied);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
