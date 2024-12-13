import { Router } from 'express';
import Disponibilidade from '../controllers/Disponibilidade';

const router = new Router();
router.post('/',  Disponibilidade.create);
router.get('/:id', Disponibilidade.show);
router.get('/', Disponibilidade.index);
router.put('/:id', Disponibilidade.update);
router.delete('/:id', Disponibilidade.delete);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
