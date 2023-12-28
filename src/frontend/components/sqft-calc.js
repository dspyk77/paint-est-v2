import Item from '@/lib/model/item';
import Room from '@/lib/model/room';

// const item = new Item(id, itemName, itemWidth, itemHeight, roomId);

export default class CalculateSqft {
  static addItemSqft(itemWidth, itemHeight){
    let itemSqft = itemWidth * itemHeight;
    return itemSqft;
  }

  // static addItemSqft(item){
  //   item.itemSqft = item.itemWidth * item.itemHeight;
  //   return item.itemSqft;
  // }

  static subtractItemSqft(itemWidth, itemHeight){
    let itemSqft = itemWidth * itemHeight;
    itemSqft = -itemSqft;
    return itemSqft;
  }

  // static subtractItemSqft(item){
  //   item.itemSqft = item.itemWidth * item.itemHeight;
  //   itemSqft = -itemSqft;
  //   return itemSqft;
  // }

  static roomSqft(items, rooms) {
    let roomSqft = 0;
    if (items.roomId == rooms.id) {
      for (let i = 0; i < items.length; i++) {
        roomSqft += items[i].itemSqft;
      }
    }
    return roomSqft;
  }
}
