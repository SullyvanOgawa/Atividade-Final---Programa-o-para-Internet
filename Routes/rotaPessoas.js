import {Router} from 'express';
import PessoaCtrl from '../Controller/pessoaCtrl.js';

const rotaPessoas = Router();
const pessoaCtrl = new PessoaCtrl();

rotaPessoas.get('/', pessoaCtrl.consultar);
rotaPessoas.get('/:id', pessoaCtrl.consultar);
rotaPessoas.post('/', pessoaCtrl.gravar);
rotaPessoas.put('/:id', pessoaCtrl.editar);
rotaPessoas.patch('/:id', pessoaCtrl.editar);
rotaPessoas.delete('/:id', pessoaCtrl.excluir);

export default rotaPessoas;