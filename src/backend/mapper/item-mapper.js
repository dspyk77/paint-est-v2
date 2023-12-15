import Item from '@/backend/model/item';

export default class ItemMapper {

  static fromObject(object) {
    return new Item(
      object.id,
      object.itemName,
      object.itemWidth,
      object.itemHeight,
      object.itemSqft,
      object.roomId);
  }

  static fromObjectCollection(objectCollection) {
    const results = [];

    for (let object of objectCollection) {
      results.push(this.fromObject(object));
    }

    return results;
  }

  static toObject(item) {
    const object = {
      id: item.getId(),
      itemName: item.getItemName(),
      itemWidth: item.getItemWidth(),
      itemHeight: item.getItemHeight(),
      itemSqft: item.getItemSqft(),
      roomId: item.getRoomId()
    };

    return object;
  }

  static toObjectCollection(items) {
    const objects = [];

    for (let item of items) {
      const object = this.toObject(item);

      objects.push(object);
    }

    return objects;
  }
}
