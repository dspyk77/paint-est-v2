import RoomController from '@/backend/controller/room-controller';

async function handler(req, res) {
  console.log(`==> Router: START [${req.method}] ${req.url}`);

  switch(req.method) {
  case 'GET':
    await RoomController.show(req, res);
    break;

  case 'PUT':
    await RoomController.update(req, res);
    break;

  case 'DELETE':
    await RoomController.destroy(req, res);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }

  console.log(`==> Router: END [${req.method}] ${req.url}`);
}

export default handler;
