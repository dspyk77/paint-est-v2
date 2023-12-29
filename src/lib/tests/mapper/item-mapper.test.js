import Item from '@/lib/model/item';
import ItemMapper from '@/lib/mapper/item-mapper';

describe('fromObject', () => {

  test('given valid data, then maps successfully', () => {
    const data = {
      id: 1,
      name: 'TEST',
      width: 12,
      height: 10,
      isPaintable: true,
      roomId: 5
    };

    const actual = ItemMapper.fromObject(data);

    const expected = new Item(1, 'TEST', 12, 10, null, 5, true);

    expect(actual).toStrictEqual(expected);
  });
});
