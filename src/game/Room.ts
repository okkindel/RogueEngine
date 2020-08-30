import { Point } from '../entity';

import CONFIG = require('../config.json');

export class Room {
  public center: Point;
  public x1: number;
  public x2: number;
  public y1: number;
  public y2: number;
  public w: number;
  public h: number;

  public static createRoomsWithCorridors(): { rooms: Room[], corridors: Room[] } {
    const corridors: Room[] = [];
    const rooms: Room[] = [];
    let roomNumber = 0;
    while (roomNumber < CONFIG.ROOMS.MAX_ROOMS) {
      const w = (CONFIG.ROOMS.MIN_ROOM_SIZE + Math.random() * (CONFIG.ROOMS.MAX_ROOM_SIZE - CONFIG.ROOMS.MIN_ROOM_SIZE + 1)) >> 0;
      const h = (CONFIG.ROOMS.MIN_ROOM_SIZE + Math.random() * (CONFIG.ROOMS.MAX_ROOM_SIZE - CONFIG.ROOMS.MIN_ROOM_SIZE + 1)) >> 0;
      const x = (Math.random() * (CONFIG.GAME.BOARD_SIZE_X - w - 1) + 1) >> 0;
      const y = (Math.random() * (CONFIG.GAME.BOARD_SIZE_Y - h - 1) + 1) >> 0;
      const room = new Room(x, y, w, h);
      let failed = false;
      rooms.forEach((otherRoom) => { if (room.intersects(otherRoom)) failed = true; });
      if (!failed) {
        if (rooms.length !== 0) {
          var prevCenter = rooms[rooms.length - 1].center;
          if (Math.random() * 2 > 1) {
            corridors.push(this._hCorridor(prevCenter.x, room.center.x, prevCenter.y));
            corridors.push(this._vCorridor(prevCenter.y, room.center.y, room.center.x));
          } else {
            corridors.push(this._vCorridor(prevCenter.y, room.center.y, prevCenter.x));
            corridors.push(this._hCorridor(prevCenter.x, room.center.x, room.center.y));
          }
        }
        rooms.push(room);
        roomNumber += 1;
      }
    }
    return { rooms: rooms, corridors: corridors };
  }

  constructor(x: number, y: number, w: number, h: number) {
    this.x2 = x + w;
    this.y2 = y + h;
    this.x1 = x;
    this.y1 = y;
    this.w = w;
    this.h = h;
    this.center = new Point(
      Math.floor((this.x1 + this.x2) / 2),
      Math.floor((this.y1 + this.y2) / 2)
    );
  }

  public intersects(room: Room): boolean {
    return (
      this.x1 <= room.x2 &&
      this.x2 >= room.x1 &&
      this.y1 <= room.y2 &&
      room.y2 >= room.y1
    );
  }

  private static _hCorridor(x1: number, x2: number, y: number): Room {
    return new Room(Math.min(x1, x2), y, Math.max(x1, x2) - Math.min(x1, x2) + 1, 1);
  }

  private static _vCorridor(y1: number, y2: number, x: number): Room {
    return new Room(x, Math.min(y1, y2), 1, Math.max(y1, y2) - Math.min(y1, y2) + 1);
  }
}
