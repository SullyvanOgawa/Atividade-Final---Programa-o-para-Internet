import obterConexao from "./conexao.js";
import Pessoa from "../Model/pessoa.js";

export default class PessoaDB{
    
    async gravar(pessoa) {
        if(pessoa instanceof Pessoa){
            const sql = `INSERT INTO pessoa(pes_cpf, pes_nome, pes_telefone, pes_email) 
                            VALUES(?, ?, ?, ?)`;

            const parametros = [
                pessoa.cpf, 
                pessoa.nome, 
                pessoa.telefone, 
                pessoa.email
            ];

            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql, parametros);
            pessoa.id = resultado[0].insertId;

            conexao.release();
        }
    }

    async editar(pessoa) {
        if(pessoa instanceof Pessoa){
            const sql = `UPDATE pessoa SET  pes_cpf = ?, 
                                            pes_nome = ?, 
                                            pes_telefone = ?, 
                                            pes_email = ? 
                                        WHERE pes_id = ?`;

            const parametros = [
                pessoa.cpf, 
                pessoa.nome, 
                pessoa.telefone, 
                pessoa.email,
                pessoa.id
            ];

            const conexao = await obterConexao();
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async excluir(pessoa) {
        if(pessoa instanceof Pessoa){
            const sql = `DELETE FROM pessoa WHERE pes_id = ?`;

            const conexao = await obterConexao();
            await conexao.execute(sql, [pessoa.id]);
            conexao.release();
        }
    }

    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];

        if(!isNaN(Number(termoBusca)) && Number(termoBusca) > 0){
            sql = `SELECT   pes_id, 
                            pes_cpf, 
                            pes_nome, 
                            pes_telefone, 
                            pes_email 
                    FROM pessoa WHERE pes_id = ?`;
            
            parametros = [termoBusca];
        }
        else{
            sql = `SELECT   pes_id, 
                            pes_cpf, 
                            pes_nome, 
                            pes_telefone, 
                            pes_email 
                    FROM pessoa WHERE pes_nome LIKE ?`;
            
            parametros = [`%${termoBusca}%`];
        }

        const conexao = await obterConexao();
        const resultados = await conexao.query(sql, parametros);
        conexao.release();

        let listaPessoas = [];  

        for (const resultado of resultados[0]) {
            const pessoa = new Pessoa(resultado.pes_id, 
                                      resultado.pes_cpf, 
                                      resultado.pes_nome, 
                                      resultado.pes_telefone, 
                                      resultado.pes_email);
            
            listaPessoas.push(pessoa);
        }

        return listaPessoas;
    }
}