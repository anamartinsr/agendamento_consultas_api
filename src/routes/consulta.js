import { Router } from 'express';
import Consulta from '../controllers/Consulta';

const router = new Router();
router.post('/',  Consulta.create);
router.get('/:id', Consulta.show);
router.get('/', Consulta.index);
router.put('/:id', Consulta.update);
router.delete('/:id', Consulta.delete);

export default router;

/*
controllers
index - lista os usuarios - GET
store/create - cria um novo usuario - POST
delete - paga um usuario - DELETE
show - mostra um usuario - GET
update - atualiza um usuario - PATCH OU PUT
*/
