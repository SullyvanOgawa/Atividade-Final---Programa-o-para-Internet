import obterConexao from "./conexao.js";
import Imovel from "../Model/imovel.js";

export default class ImovelDB{
    async gravar(imovel){
        if(imovel instanceof Imovel){
            const sql = `INSERT INTO imovel(imo_id, imo_titulo, imo_tipo, imo_valor, pes_id)                        VALUES(?, ?, ?, ?, ?)`;

            const parametros = [
                imovel.id, 
                imovel.tituloImovel, 
                imovel.imovelTipo, 
                imovel.imovelValor, 
                imovel.pessoa.id
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            imovel.id = resultado[0].insertId;

            conexao.release();
        }

    }

    async editar(imovel){
        if(imovel instanceof Imovel){
            const sql = `UPDATE imovel SET imo_titulo = ?, imo_tipo = ?, imo_valor = ?, pes_id = ? WHERE imo_id = ?`;

            const parametros = [
                imovel.tituloImovel, 
                imovel.imovelTipo, 
                imovel.imovelValor, 
                imovel.pessoa.id,
                imovel.id
            ];

            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async excluir(imovel){
        if(imovel instanceof Imovel){
            const sql = `DELETE FROM imovel WHERE imo_id = ?`;            

            const conexao = await obterConexao();
            await conexao.execute(sql, [imovel.id]);
            conexao.release();
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];

        if(!isNaN(Number(termoBusca) && Number(termoBusca) > 0)){
            sql = `SELECT   imo_id, 
                            imo_titulo, 
                            imo_tipo, 
                            imo_valor, 
                            pes_id
                    FROM imovel WHERE imo_id = ?`;            
            
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT   imo_id, 
                            imo_titulo, 
                            imo_tipo, 
                            imo_valor, 
                            pes_id
                    FROM imovel WHERE imo_titulo LIKE ?`;            
            
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await obterConexao();
        const resultado = await conexao.query(sql, parametros);
        conexao.release();

        let listaImoveis = [];

        for(const linha of resultado[0]){
            const imovel = new Imovel(linha.imo_id, linha.imo_titulo, linha.imo_tipo, linha.imo_valor, linha.pes_id);
            
            listaImoveis.push(imovel);
        }

        return listaImoveis;
    }
}