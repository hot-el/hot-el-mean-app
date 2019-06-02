import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'svg[room]',
  templateUrl: './rect-room.component.html',
  styleUrls: ['./rect-room.component.scss']
})
export class RectRoomComponent implements OnInit {

  @ViewChild("text") text: SVGTextElement;

  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() name: string;
  @Input() fill: string;

  textX: number;
  textY: number;
  alerty: number;
  alertx: number;
  @Input() alert: string;

  constructor() { }

  ngOnInit() {
    this.textX = this.x + this.width / 2;
    this.textY = this.y + this.height / 2;
    this.alertx = this.textX;
    this.alerty = this.textY+ 15;
  }

}
