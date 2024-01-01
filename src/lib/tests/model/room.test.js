import Item from '@/lib/model/item';
import Room from '@/lib/model/room';

describe('getSqft', () => {

  test('given no items, then returns 0', () => {
    const room = new Room('TEST');

    expect(room.getNetPaintableSqft()).toBe(0);
  });

  describe('given 1 item', () => {

    test('when item is non-paintable, then returns negative sqft', () => {
      const room = new Room(1, 'TEST');

      const item = new Item(1, 'TEST', 12, 10, false, 1);

      console.log('----------------------------------------');
      console.log(item.toString());

      room.addItem(item);

      expect(room.getNetPaintableSqft()).toBe(-120);
    });

    test('when item is paintable, then returns sqft of that item', () => {
      const room = new Room(1, 'TEST');

      const item = new Item(1, 'TEST', 12, 10, true, 1);

      room.addItem(item);

      expect(room.getNetPaintableSqft()).toBe(120);
    });
  });

  describe('given multiple items', () => {

    test('when all items are paintable, then returns sum of all item sqft', () => {
      const room = new Room(1, 'TEST');

      const item1 = new Item(1, 'TEST', 10, 10, true, 1);

      const item2 = new Item(2, 'TEST', 10, 10, true, 1);

      const item3 = new Item(3, 'TEST', 10, 10, true, 1);

      room.setItems([item1, item2, item3]);

      expect(room.getNetPaintableSqft()).toBe(300);
    });

    test('then returns sum of all paintable item sqft minus non-paintable', () => {
      const room = new Room(1, 'TEST');

      const item1 = new Item(1, 'TEST', 10, 10, true, 1);

      const item2 = new Item(2, 'TEST', 10, 10, false, 1);

      const item3 = new Item(3, 'TEST', 10, 10, true, 1);

      room.setItems([item1, item2, item3]);

      expect(room.getNetPaintableSqft()).toBe(100);
    });
  });
});
