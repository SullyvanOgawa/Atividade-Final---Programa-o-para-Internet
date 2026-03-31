import PessoaDB from '../DB/pessoaDB.js';
export default class Pessoa{
    #id;
    #cpf; 
    #nome; 
    #telefone; 
    #email;

    constructor(id, cpf, nome, telefone, email){
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
    }

    get id(){
        return this.#id
    }
    get cpf(){
        return this.#cpf
    }
    get nome(){
        return this.#nome
    }
    get telefone(){
        return this.#telefone
    }
    get email(){
        return this.#email
    }

    set id(novoId){
        this.#id = novoId
    }
    set cpf(novoCpf){
        this.#cpf = novoCpf
    }

    set nome(novoNome){
        this.#nome = novoNome
    }
    set telefone(novoTelefone){
        this.#telefone = novoTelefone
    }
    set email(novoEmail){
        this.#email = novoEmail
    }

    toString(){
        return `${this.#nome} - ${this.#cpf} - ${this.#telefone} - ${this.#email}`
    }

    async gravar(){
        const pessoaDB = new PessoaDB();
        await pessoaDB.gravar(this);
    }

    async editar(){
        const pessoaDB = new PessoaDB();
        await pessoaDB.editar(this);
    }

    async excluir(){
        const pessoaDB = new PessoaDB();
        await pessoaDB.excluir(this);
    }

    async consultar(termoBusca){
        const pessoaDB = new PessoaDB();
        return await pessoaDB.consultar(termoBusca);
    }

    toJSON(){
        return {
            id: this.#id,
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            email: this.#email
        }
    }
}