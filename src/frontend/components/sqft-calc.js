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

  static roomSqft(items) {
    let roomSqft = 0;
    for (i = 1; i <= items.length; i++){
      roomSqft += items[i].itemSqft;
    }
    return roomSqft;
  }
}
