import {Router} from 'express';
import TipoImovelCtrl from '../Controller/tipoImovelCtrl.js';    

const rotaTiposImovel = Router();
const tipoImovelCtrl = new TipoImovelCtrl();

rotaTiposImovel.get('/', tipoImovelCtrl.consultar);
rotaTiposImovel.get('/:id', tipoImovelCtrl.consultar);

export default rotaTiposImovel;