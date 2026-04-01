import { Router } from "express";
import ImovelCtrl from "../Controller/imovelCtrl.js";

const rotaImoveis = Router();
const imovelCtrl = new ImovelCtrl();

rotaImoveis.get('/', imovelCtrl.consultar);
rotaImoveis.get('/:id', imovelCtrl.consultar);
rotaImoveis.post('/', imovelCtrl.gravar);
rotaImoveis.put('/:id', imovelCtrl.editar);
rotaImoveis.patch('/:id', imovelCtrl.editar);
rotaImoveis.delete('/:id', imovelCtrl.excluir);

export default rotaImoveis;

