import Item from '@/lib/model/item';

export default class ItemMapper {

  static fromObject(object) {
    return new Item(
      object.id,
      object.name,
      object.width,
      object.height,
      object.roomId,
      object.isPaintable);
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
      itemName: item.getName(),
      itemWidth: item.getWidth(),
      itemHeight: item.getHeight(),
      roomId: item.getRoomId(),
      isPaintable: item.getIsPaintable()
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
