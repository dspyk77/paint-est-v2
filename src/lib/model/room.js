export default class Room {

  #id;
  #roomName;
  #roomSqft;

  constructor(id, roomName, roomSqft) {
    this.#id = id;
    this.#roomName = roomName;
    this.#roomSqft = roomSqft;
  }

  getId() {
    return this.#id;
  }

  getRoomName() {
    return this.#roomName;
  }

  getRoomSqft() {
    return this.#roomSqft;
  }

  setId(id) {
    this.#id = id;
  }

  setRoomName() {
    return this.#roomName;
  }

  setRoomSqft() {
    return this.#roomSqft;
  }

  toString() {
    return 'Room: ' +
      `id=${this.#id}, ` +
      `roomName=${this.#roomName}, ` +
      `roomSqft=${this.#roomSqft}, `;
  }
}
