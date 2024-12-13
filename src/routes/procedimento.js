import { Router } from 'express';
import Procedimento from '../controllers/Procedimento';

const router = new Router();
router.post('/',  Procedimento.create);
router.get('/:id', Procedimento.show);
router.get('/', Procedimento.index);
router.put('/:id', Procedimento.update);
router.delete('/:id', Procedimento.delete);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
