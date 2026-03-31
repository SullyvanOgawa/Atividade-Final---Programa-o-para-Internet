import Pessoa from '../Model/pessoa.js';

export default class PessoaCtrl{
    gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;
            
            if( cpf && nome && telefone && email){
                const pessoa = new Pessoa(null, cpf, nome, telefone, email);
                pessoa.gravar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true, 
                        "mensagem": "Pessoa gravada com sucesso!", 
                        "id": pessoa.id
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Não foi possível gravar Esta Pessoa. Tente mais tarde!" + erro
                    });
                });
            }
             else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas os campos devem ser preenchidas!!!"
                });
            }
            
        }
        else{
            resposta.status(405).json({
                "status": false, 
                "mensagem": "Metodo não permitido!"
            });
        }

    }

    editar(requisicao, resposta){
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            const id = requisicao.params.id;
            
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if(id > 0 && nome && cpf && telefone && email){
                const pessoa = new Pessoa(id, cpf, nome, telefone, email);
                pessoa.editar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true, 
                        "mensagem": "Pessoa editada com sucesso!"
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Não foi possível editar Esta Pessoa. Tente mais tarde!" + erro
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas os campos devem ser preenchidas!!!"
                });
            }
            
        }
        else{
                resposta.status(405).json({
                    "status": false, 
                    "mensagem": "Metodo não permitido!"
                });
        }
    }

    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;
            
            if(id > 0){
                const pessoa = new Pessoa(id);
                pessoa.excluir()
                .then(() => {
                    resposta.status(201).json({
                        "status": true, 
                        "mensagem": "Pessoa excluida com sucesso!"
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Não foi possível excluir Esta Pessoa. Tente mais tarde!" + erro.message
                    });
                });
            }
             else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas os campos devem ser preenchidas!!!"
                });
            }
            
        }
        else{
            resposta.status(405).json({
                "status": false, 
                "mensagem": "Metodo não permitido!"
            });
        }


    }

    consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
            let termoBusca;

            const id = requisicao.params.id;
            if(!isNaN(id)){
                termoBusca = id;
            }
            else{
                termoBusca = '';
            }

            const pessoa = new Pessoa();
            pessoa.consultar(termoBusca)
            .then(listaPessoas => {
                resposta.status(200).json({
                    "status": true, 
                    "mensagem": "Segue abaixo a lista de Pessoas.", 
                    "pessoa": listaPessoas
                });
            })
            .catch(erro => {
                resposta.status(500).json({
                    "status": false, 
                    "mensagem": "Não foi possível consultar Esta Pessoa. Tente mais tarde!" + erro.message
                });
            });
        
        }
    }

}