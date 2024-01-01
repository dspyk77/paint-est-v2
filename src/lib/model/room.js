import Item from '@/lib/model/item';

export default class Room {

  #id;
  #name;
  #items = [];

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getNetPaintableSqft() {
    let netSqft = 0;

    for (const item of this.#items) {
      netSqft += item.getSqft();
    }

    return netSqft;
  }

  addItem(item) {
    this.#items.push(item);
  }

  setId(id) {
    this.#id = id;
  }

  setRoomName(name) {
    this.#name = name;
  }

  setItems(items) {
    this.#items = items;
  }

  toString() {
    return 'Room: ' +
      `id=${this.#id}, ` +
      `roomName=${this.#name}, ` +
      `items=${JSON.stringify(this.#items)}, `;
  }
}
