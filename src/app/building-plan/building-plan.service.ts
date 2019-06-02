import { Injectable } from '@angular/core';

const building = [
  {
    floor: 1,
    rooms: [
      {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100,
        "fill": "lightyellow",
        "name": "Room 101"
      },{
        "x": 130,
        "y": 0,
        "width": 300,
        "height": 300,
        "fill": "lightblue",
        "name": "Room 102"
      },{
        "x": 0,
        "y": 100,
        "width": 100,
        "height": 100,
        "fill": "lightyellow",
        "name": "Room 103"
      },{
        "x": 0,
        "y": 200,
        "width": 100,
        "height": 200,
        "fill": "lightyellow",
        "name": "Room 105"
      },{
        "x": 0,
        "y": 400,
        "width": 100,
        "height": 100,
        "fill": "lightyellow",
        "name": "Room 107"
      },{
        "x": 0,
        "y": 500,
        "width": 100,
        "height": 100,
        "fill": "lightyellow",
        "name": "Room 109"
      },{
        "x": 130,
        "y": 330,
        "width": 300,
        "height": 270,
        "fill": "lightblue",
        "name": "Room 104",
        "alert": "Cleaning"
      },{
        "x": 430,
        "y": 330,
        "width": 300,
        "height": 270,
        "fill": "lightblue",
        "name": "Room 106",
        "alert": "Breakfast service"
      },{
        "x": 430,
        "y": 0,
        "width": 300,
        "height": 300,
        "fill": "lightblue",
        "name": "Room 108"
      }
    ],
    stairs: [
      {
        "x": 730,
        "y": 0,
        "width": 70,
        "height": 70,
      },{
        "x": 730,
        "y": 530,
        "width": 70,
        "height": 70
      }
    ]
  },
  {
    floor: 2,
    rooms: [
      {
        x: 0,
        y: 0,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 301"
      },
      {
        x: 0,
        y: 200,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 302"
      },
      {
        x: 0,
        y: 400,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 303"
      },{
        x: 550,
        y: 0,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 304",
        alert:"Wake up call at 6.00 am"
      },
      {
        x: 550,
        y: 200,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 305"
      },
      {
        x: 550,
        y: 400,
        width:250,
        height:200,
        fill:"lightblue",
        name:"Room 306"
      },
      {
        x: 250,
        y: 0,
        width:150,
        height:150,
        fill:"lightyellow",
        name:"Room 307"
      },{
        x: 400,
        y: 0,
        width:150,
        height:150,
        fill:"lightyellow",
        name:"Room 308"
      },{
        x: 325,
        y: 300,
        width:150,
        height:300,
        fill:"lightgreen",
        name:"Room 309",
        alert:"Ressuply"
      }
    ],
    stairs:[
      {
        x:325,
        y:230,
        width:150,
        height:70
      }
    ]
  }
]

@Injectable({
  providedIn: 'root'
})
export class BuildingPlanService {

  constructor() { }

  getRooms(i) {
    return building[i].rooms;
  }

  getStairs(i) {
    return building[i].stairs;
  }

  getfloors() {
    return building.map((v,i)=> i);
  }
}
