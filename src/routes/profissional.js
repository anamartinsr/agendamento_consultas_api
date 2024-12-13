import { Router } from 'express';
import Profissional from '../controllers/Profissional';

const router = new Router();
router.post('/',  Profissional.create);
router.get('/:id', Profissional.show);
router.get('/', Profissional.index);
router.put('/:id', Profissional.update);
router.delete('/:id', Profissional.delete);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
