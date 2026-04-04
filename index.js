import express from 'express';
import cors from 'cors';
import rotaPessoas from './Routes/rotaPessoas.js';
import rotaImovel from './Routes/rotaImovel.js';
import rotaTiposImovel from './Routes/rotaTipoImovel.js';

const localhost = '0.0.0.0';
const porta = 3000;
const app = express();

app.use(cors({
    origin: `http://localhost:3001`
}));

app.use(express.json());

app.use("/pessoas", rotaPessoas);
app.use("/imoveis", rotaImovel);
app.use("/tiposImovel", rotaTiposImovel);

app.listen(porta, localhost, () => console.log(`Servidor rodando em http://${localhost}:${porta}`));