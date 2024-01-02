import DbConnection from '@/backend/config/db-connection';
import RoomMapper from '@/lib/mapper/room-mapper';

export default class RoomRepository {

  static async findAll() {
    console.log('[RoomRepository#findAll]');
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM rooms
    `);

    const roomData = results[0];

    // const rooms = RoomMapper.fromObjectCollection(roomData);

    return roomData;
  }

  static async findById(id) {
    console.log(`[RoomRepository#findById] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM rooms
      WHERE id = ${id}
    `);

    const roomData = results[0][0];

    // const room = RoomMapper.fromObject(roomData);

    return roomData;
  }

  static async create(room) {
    console.log(`[RoomRepository#create] ${room}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      INSERT INTO rooms (name)
      VALUES (?)
    `;

    const values = [
      room.getName()
    ];

    await dbConnection.execute(sql, values);
  }

  static async update(room) {
    console.log(`[RoomRepository#update] ${room}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      UPDATE rooms
      SET roomName = ?
      WHERE id = ?
    `;

    const values = [
      room.getName(),
      room.getId()
    ];

    await dbConnection.execute(sql, values);
  }

  static async destroy(id) {
    console.log(`[RoomRepository#destroy] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      DELETE FROM rooms
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);
  }
}
