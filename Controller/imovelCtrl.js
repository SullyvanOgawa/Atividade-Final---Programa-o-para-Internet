import Imovel from "../Model/imovel.js";
import Pessoa from "../Model/pessoa.js";
import TipoImovel from "../Model/tipoImovel.js";

export default class ImovelCtrl{

    gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const titulo = requisicao.body.titulo;
            const valor = requisicao.body.valor;
            const tipo = requisicao.body.tipo;
            const pessoa = requisicao.body.pessoa;

            if(titulo && valor && pessoa && tipo){
                const tipoImovelObj = new TipoImovel(tipo.id);
                const pessoaObj = new Pessoa(pessoa.id);
                const imovel = new Imovel(null, titulo, valor, tipoImovelObj, pessoaObj);

                imovel.gravar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true, 
                        "mensagem": "Imovel gravado com sucesso!", 
                        "id": imovel.id    
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Nao foi possivel gravar Este Imovel. Tente mais tarde!" + erro
                    });
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!!!"
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
        if(requisicao.method === "PUT" || requisicao.method === "PATCH" && requisicao.is("application/json")){
            const id = requisicao.params.id;

            const titulo = requisicao.body.titulo;
            const valor = requisicao.body.valor;
            const tipo = requisicao.body.tipo;
            const pessoa = requisicao.body.pessoa;

            if(id > 0 && titulo && valor && tipo && pessoa){
                const pessoaObj = new Pessoa(pessoa.id);
                const tipoImovelObj = new TipoImovel(tipo.id);
                const imovel = new Imovel(id, titulo, valor, tipoImovelObj, pessoaObj);

                imovel.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true, 
                        "mensagem": "Imovel editado com sucesso!"
                    });

                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Nao foi possivel editar Este Imovel. Tente mais tarde!" + erro
                    });
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!!!"
                });
            }
            
        }
        else{
                resposta.status(405).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!!!"
                });
        }
    }

    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;

            if(id > 0){
                const imovel = new Imovel(id);
                imovel.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true, 
                        "mensagem": "Imovel excluido com sucesso!"
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        "status": false, 
                        "mensagem": "Nao foi possivel excluir Este Imovel. Tente mais tarde!" + erro
                    });
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os campos devem ser preenchidos!!!"
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

            const imovel = new Imovel();
            imovel.consultar(termoBusca)
            .then((listaImoveis) => {
                resposta.status(200).json({
                    "status": true, 
                    "mensagem": "Segue abaixo a lista de Imóveis.", 
                    "imoveis": listaImoveis
                });
            })
            .catch(erro => {
                resposta.status(500).json({
                    "status": false, 
                    "mensagem": "Não foi possível consultar Este Imóvel. Tente mais tarde!" + erro.message
                });
            });
        }
    }
}