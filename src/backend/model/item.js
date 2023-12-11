export default class Item {

  #id;
  #itemName;
  #itemWidth;
  #itemHeight;
  #itemSqft;
  #roomId;

  constructor(id, itemName, itemWidth, itemHeight, itemSqft) {
    this.#id = id;
    this.#itemName = itemName;
    this.#itemHeight = itemHeight;
    this.#itemWidth = itemWidth;
    this.#itemSqft = itemSqft;
    this.#roomId = roomId;
  }

  getId() {
    return this.#id;
  }

  getItemName() {
    return this.#itemName;
  }

  getItemHeight() {
    return this.#itemHeight;
  }

  getItemWidth() {
    return this.#itemWidth;
  }

  getItemSqft() {
    return this.#itemSqft;
  }

  getRoomId() {
    return this.#roomId;
  }

  setId(id) {
    return this.#id;
  }

  setItemName() {
    return this.#itemName;
  }

  setItemHeight() {
    return this.#itemHeight;
  }

  setItemWidth() {
    return this.#itemWidth;
  }

  setItemSqft() {
    return this.#itemSqft;
  }

  setRoomId() {
    return this.#roomId;
  }

  toString() {
    return 'Item: ' +
      `id=${this.#id}, ` +
      `itemName=${this.#itemName}, ` +
      `itemHeight=${this.#itemHeight}, ` +
      `itemWidtht=${this.#itemWidth}, ` +
      `itemSqft=${this.#itemSqft},` +
      `roomId=${this.#roomId},`;
  }
}
