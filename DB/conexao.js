import mysql2 from 'mysql2';

export default async function obterConexao(){
    if(global.poolConexoes){
        return await global.poolConexoes.getConnection();

    }
    else{
        global.poolConexoes = mysql2.createPool({
            host: 'localhost',
            user: 'root',
            database: 'atividade_finaldb', 
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        return await global.poolConexoes.getConnection();
    }
}