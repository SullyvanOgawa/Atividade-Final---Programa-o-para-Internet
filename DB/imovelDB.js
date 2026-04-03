import obterConexao from "./conexao.js";
import Pessoa from "../Model/pessoa.js";
import TipoImovel from "../Model/tipoImovel.js";
import Imovel from "../Model/imovel.js";

export default class ImovelDB{
    async gravar(imovel){
        if(imovel instanceof Imovel){
            const sql = `INSERT INTO imovel(imo_titulo, imo_valor, pes_id, tipo_id) VALUES(?, ?, ?, ?)`;

            const parametros = [ 
                imovel.tituloImovel, 
                imovel.imovelValor, 
                imovel.pessoa.id, 
                imovel.tituloImovel.id
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            imovel.id = resultado[0].insertId;

            conexao.release();
        }

    }

    async editar(imovel){
        if(imovel instanceof Imovel){
            const sql = `UPDATE imovel SET imo_titulo = ?, imo_valor = ?, pes_id = ?, tipo_id = ? WHERE imo_id = ?`;

            const parametros = [
                imovel.tituloImovel, 
                imovel.imovelValor, 
                imovel.pessoa.id,
                imovel.tipoImovel.id,
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

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `SELECT   imo.imo_id, 
                            imo.imo_titulo,  
                            imo.imo_valor, 
                            pes.pes_id, 
                            pes.pes_cpf, 
                            pes.pes_nome, 
                            pes.pes_telefone, 
                            pes.pes_email, 
                            t.tipo_id, 
                            t.tipo_descricao
                    FROM imovel as imo 
                    INNER JOIN pessoa as pes 
                    ON imo.pes_id = pes.pes_id
                    INNER JOIN tipoImovel as t
                    ON imo.tipo_id = t.tip_id
                    WHERE imo.imo_id = ?`;            
            
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT   imo.imo_id, 
                            imo.imo_titulo,  
                            imo.imo_valor, 
                            pes.pes_id, 
                            pes.pes_cpf, 
                            pes.pes_nome, 
                            pes.pes_telefone, 
                            pes.pes_email, 
                            t.tipo_id, 
                            t.tipo_descricao
                    FROM imovel imo
                    INNER JOIN pessoa as pes
                    on imo.pes_id = pes.pes_id
                    INNER JOIN tipoImovel as t
                    on imo.tipo_id = t.tipo_id
                    WHERE imo_titulo LIKE ?`;            
            
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaImoveis = [];

        for(const resultado of resultados[0]){
            const tipoImovel = new TipoImovel(resultado.tipo_id, 
                                                resultado.tipo_descricao);
            const pessoa = new Pessoa(resultado.pes_id, 
                                        resultado.pes_cpf, 
                                        resultado.pes_nome, 
                                        resultado.pes_telefone, 
                                        resultado.pes_email);

            const imovel = new Imovel(resultado.imo_id, 
                                        resultado.imo_titulo,  
                                        resultado.imo_valor, 
                                        pessoa, 
                                        tipoImovel);
            
            listaImoveis.push(imovel);
        }

        return listaImoveis;
    }
}