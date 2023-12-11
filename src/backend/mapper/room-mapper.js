import Room from '@/backend/model/room';

export default class RoomMapper {

  static fromObject(object) {
    return new Room(
      object.id,
      object.roomName,
      object.roomSqft,
      object.objectName,
      object.objectWidth,
      object.objectHeight,
      object.objectSqft);
  }

  static fromObjectCollection(objectCollection) {
    const results = [];

    for (let object of objectCollection) {
      results.push(this.fromObject(object));
    }

    return results;
  }

  static toObject(room) {
    const object = {
      id: room.getId(),
      roomName: room.getRoomName(),
      roomSqft: room.getRoomSqft(),
      objectName: room.getObjectName(),
      objectWidth: room.getObjectWidth(),
      objectHeight: room.getObjectHeight(),
      objectSqft: room.getObjectSqft(),
    };

    return object;
  }

  static toObjectCollection(rooms) {
    const objects = [];

    for (let room of rooms) {
      const object = this.toObject(room);

      objects.push(object);
    }

    return objects;
  }
}
