import { Router } from 'express';
import Historico from '../controllers/Historico';
// import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.post('/', Historico.create);
router.get('/:id', Historico.show);
router.get('/', Historico.index);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
