import express from 'express';
import cors from 'cors';
import rotaPessoas from './Routes/rotaPessoas.js';

const localhost = '0.0.0.0';
const porta = 3000;
const app = express();

app.use(cors({
    origin: `http://localhost:3000`
}));
app.use(express.json());
app.use("/pessoa", rotaPessoas);

app.listen(porta, localhost, () => console.log(`Servidor rodando em http://${localhost}:${porta}`));