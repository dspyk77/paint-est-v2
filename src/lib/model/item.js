export default class Item {

  #id;
  #name;
  #width;
  #height;
  #roomId;
  #isPaintable;

  constructor(id, name, width, height, roomId, isPaintable) {
    this.#id = id;
    this.#name = name;
    this.#height = height;
    this.#width = width;
    this.#roomId = roomId;
    this.#isPaintable = isPaintable;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getHeight() {
    return this.#height;
  }

  getWidth() {
    return this.#width;
  }

  getSqft() {
    const sqft = this.#height * this.#width;
    if (!this.#isPaintable) {
      return -sqft;
    } else {
      return sqft;
    }
  }

  getRoomId() {
    return this.#roomId;
  }

  getIsPaintable() {
    return this.#isPaintable;
  }

  setId(id) {
    this.#id = id;
  }

  setName() {
    return this.#name;
  }

  setHeight() {
    return this.#height;
  }

  setWidth() {
    return this.#width;
  }

  // setSqft() {
  //   return this.#sqft;
  // }

  setRoomId() {
    return this.#roomId;
  }

  setIsPaintable() {
    return this.#isPaintable;
  }

  toString() {
    return 'Item: ' +
      `id=${this.#id}, ` +
      `name=${this.#name}, ` +
      `height=${this.#height}, ` +
      `width=${this.#width}, ` +
      `roomId=${this.#roomId},` +
      `isPaintable=${this.#isPaintable}, `;
  }
}
