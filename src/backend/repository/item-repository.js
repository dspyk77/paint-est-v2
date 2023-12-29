import DbConnection from '@/backend/config/db-connection';
import ItemMapper from '@/lib/mapper/item-mapper';

export default class ItemRepository {

  static async findAll(roomId) {
    console.log(`[ItemRepository#findAll] ${roomId}`);
    const dbConnection = await DbConnection.getConnection();

    // if (roomId == undefined) roomId = 1;

    let results;

    if (!roomId) {
      results = await dbConnection.execute(`
      SELECT *
      FROM items
    `);
    } else {
      results = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE roomId = ?
    `, [roomId]);
    }

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
      INSERT INTO items (name, width, height, roomId, isPaintable)
      VALUES (?, ?, ?, ?, ?)
    `;

    console.log('[ItemRepository#create] isPaintable:', item.getIsPaintable());

    const values = [
      item.getName(),
      item.getWidth(),
      item.getHeight(),
      item.getRoomId(),
      item.getIsPaintable()
    ];

    console.log('[ItemRepository#create] values:', values);

    await dbConnection.execute(sql, values);
  }

  static async update(item) {
    console.log(`[ItemRepository#update] ${item}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      UPDATE items
      SET name = ?,
          width = ?,
          height = ?,
          roomId= ?,
          isPaintable= ?
      WHERE id = ?
    `;

    const values = [
      item.getName(),
      item.getWidth(),
      item.getHeight(),
      item.getRoomId(),
      item.getIsPaintable(),
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
