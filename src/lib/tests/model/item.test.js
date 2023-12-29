import Item from '@/lib/model/item';

describe('constructor', () => {

  test('given proper parameters, then constructs successfully', () => {
    const item = new Item(1, 'TEST', 12, 10, 5, true);

    expect(item.getId()).toBe(1);
    expect(item.getName()).toBe('TEST');
    expect(item.getWidth()).toBe(12);
    expect(item.getHeight()).toBe(10);
    expect(item.getIsPaintable()).toBe(true);
    expect(item.getRoomId()).toBe(5);
  });
});
