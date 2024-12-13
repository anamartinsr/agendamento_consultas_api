import { Router } from 'express';
import Token from '../controllers/Token';

const router = new Router();

router.post('/', Token.store);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
