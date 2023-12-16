import DbConnection from '@/backend/config/db-connection';
import ItemMapper from '@/backend/mapper/item-mapper';

export default class ItemRepository {

  static async findAll() {
    console.log('[ItemRepository#findAll]');
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM items
    `);

    const itemData = results[0];

    const items = ItemMapper.fromObjectCollection(itemData);

    return items;
  }

  static async findAllByRoomId(roomId) {
    console.log('[ItemRepository#findAllByRoomId]');
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE roomId = ?
    `, [roomId]);

    const itemData = results[0];

    const items = ItemMapper.fromObjectCollection(itemData);

    return items;
  }

  static async findById(id) {
    console.log(`[ItemRepository#findById] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE id = ${id}
    `);

    const itemData = results[0][0];

    const item = ItemMapper.fromObject(itemData);

    return item;
  }

  static async create(item) {
    console.log(`[ItemRepository#create] ${item}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      INSERT INTO items (itemName, itemWidth, itemHeight, itemSqft)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      item.getItemName(),
      item.getItemWidth(),
      item.getItemHeight(),
      item.getItemSqft()
    ];

    await dbConnection.execute(sql, values);
  }

  static async update(item) {
    console.log(`[ItemRepository#update] ${item}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      UPDATE items
      SET itemName = ?,
          itemWidth = ?,
          itemHeight = ?,
          itemSqft = ?,
          roomId= ?
      WHERE id = ?
    `;

    const values = [
      item.getItemName(),
      item.getItemWidth(),
      item.getItemHeight(),
      item.getItemSqft(),
      item.getRoomId(),
      item.getId()
    ];

    await dbConnection.execute(sql, values);
  }

  static async destroy(id) {
    console.log(`[ItemRepository#destroy] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      DELETE FROM items
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);
  }
}
