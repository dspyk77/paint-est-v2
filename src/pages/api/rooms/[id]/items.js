import ItemController from '@/backend/controller/item-controller';

async function handler(req, res) {
  console.log(`==> Router: START [${req.method}] ${req.url}`);

  switch(req.method) {
  case 'GET':
    await ItemController.showAllInRoom(req, res);
    break;

    // case 'PUT':
    //   await ItemController.update(req, res);
    //   break;

    // case 'DELETE':
    //   await ItemController.destroy(req, res);
    //   break;

    // case 'POST':
    //   await ItemController.create(req, res);
    //   break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }

  console.log(`==> Router: END [${req.method}] ${req.url}`);
}

export default handler;
