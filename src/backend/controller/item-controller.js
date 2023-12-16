import ItemRepository from '@/backend/repository/item-repository';
import ItemMapper from '@/backend/mapper/item-mapper';

export default class ItemController {

  static async index(req, res) {
    console.log('[ItemController#index]');

    const items = await ItemRepository.findAll();

    const response = ItemMapper.toObjectCollection(items);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const { id } = req.query;
    console.log(`[ItemController#show] ${id}`);

    const item = await ItemRepository.findById(id);

    const response = ItemMapper.toObject(item);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async showAllInRoom(req, res) {
    const { roomId } = req.query;
    console.log(`[ItemController#showAllInRoom] ${roomId}`);

    const item = await ItemRepository.findAllByRoomId(roomId);

    const response = ItemMapper.toObjectCollection(item);
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[ItemController#create] ${JSON.stringify(data)}`);

    const item = ItemMapper.fromObject(data);

    await ItemRepository.create(item);

    const response = { msg: 'Created successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const { id } = req.query;
    const data = req.body;
    console.log(`[ItemController#update] ${id}, ${JSON.stringify(data)}`);

    const item = ItemMapper.fromObject(data);

    item.setId(id);

    await ItemRepository.update(item);

    const response = { msg: 'Updated successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const { id } = req.query;
    console.log(`[ItemController#destroy] ${id}`);

    await ItemRepository.destroy(id);

    const response = { msg: 'Deleted successfully' };
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
