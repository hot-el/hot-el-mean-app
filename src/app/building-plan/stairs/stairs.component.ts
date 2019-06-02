import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'svg[stairs]',
  templateUrl: './stairs.component.html',
  styleUrls: ['./stairs.component.scss']
})
export class StairsComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  public no;
  constructor() { }

  ngOnInit() {
    this.no = Array(Math.ceil(this.height / 20)).fill(0).map((x,i) => x = i * 20 + this.y);
    // console.log(this.no);
  }

}
