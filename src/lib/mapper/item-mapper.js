import Item from '@/lib/model/item';

export default class ItemMapper {

  static fromObject(object) {
    console.log(`[ItemMapper#fromObject-isPaintable] ${object.isPaintable}`);
    console.log('[ItemMapper#fromObject] Item Data:', object);
    return new Item(
      object.id,
      object.name,
      object.width,
      object.height,
      object.isPaintable,
      object.roomId
    );
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
      name: item.getName(),
      width: item.getWidth(),
      height: item.getHeight(),
      isPaintable: item.getIsPaintable(),
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
