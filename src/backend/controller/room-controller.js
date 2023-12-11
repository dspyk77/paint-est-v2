import RoomRepository from '@/backend/repository/room-repository';
import RoomMapper from '@/backend/mapper/room-mapper';

export default class RoomController {

  static async index(req, res) {
    console.log('[RoomController#index]');

    const rooms = await RoomRepository.findAll();

    const response = RoomMapper.toObjectCollection(rooms);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const { id } = req.query;
    console.log(`[RoomController#show] ${id}`);

    const room = await RoomRepository.findById(id);

    const response = RoomMapper.toObject(room);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[RoomController#create] ${JSON.stringify(data)}`);

    const room = RoomMapper.fromObject(data);

    await RoomRepository.create(room);

    const response = { msg: 'Created successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const { id } = req.query;
    const data = req.body;
    console.log(`[RoomController#update] ${id}, ${JSON.stringify(data)}`);

    const room = RoomMapper.fromObject(data);
    room.setId(id);

    await RoomRepository.update(room);

    const response = { msg: 'Updated successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const { id } = req.query;
    console.log(`[RoomController#destroy] ${id}`);

    await RoomRepository.destroy(id);

    const response = { msg: 'Deleted successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
