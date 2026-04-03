import obterConexao from "./conexao.js";
import TipoImovel from "../Model/tipoImovel.js";


export default class TipoImovelDB {
    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `SELECT   tipo_id,
                            tipo_descricao   
                        FROM tipoImovel 
                        WHERE tipo_id = ?`;
            
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT   tipo_id,
                            tipo_descricao
                    FROM tipoImovel 
                    WHERE tipo_descricao LIKE ?`;
            
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaTiposImovel = []; 
        for(const resultado of resultados[0]){
            const tipoImovel = new TipoImovel(resultado.tipo_id, resultado.tipo_descricao); 
            
            listaTiposImovel.push(tipoImovel);
        }

        return listaTiposImovel;
    }
}