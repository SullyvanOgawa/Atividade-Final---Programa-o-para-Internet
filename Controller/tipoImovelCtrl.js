
import TipoImovel from "../Model/tipoImovel.js";

export default class TipoImovelCtrl{
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

            const tipoImovel = new TipoImovel();
            tipoImovel.consultar(termoBusca)
            .then((listaTiposImovel) => {
                resposta.status(200).json({
                    "status": true, 
                    "mensagem": "Segue abaixo a lista de Tipos de Imóveis.", 
                    "tiposImovel": listaTiposImovel
                });
            })
            .catch(erro => {
                resposta.status(500).json({
                    "status": false, 
                    "mensagem": "Não foi possível consultar Este Tipo de Imovel. Tente mais tarde!" + erro.message
                });
            });
        }
    }

}