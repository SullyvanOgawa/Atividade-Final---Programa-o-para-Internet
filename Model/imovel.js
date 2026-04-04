import ImovelDB from "../DB/imovelDB.js";

export default class Imovel{
    #id;
    #titulo;
    #valor;
    #pessoa;
    #tipo;

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get titulo() {
        return this.#titulo;
    }

    get valor() {
        return this.#valor;
    }

    get pessoa() {
        return this.#pessoa;
    }

    get tipo() {
        return this.#tipo;
    }

    constructor(id, titulo,valor, pessoa, tipo){
        this.#id = id;
        this.#titulo = titulo;
        this.#valor = valor;
        this.#pessoa = pessoa;
        this.#tipo = tipo;
    }

    toString(){
        return `${this.#titulo} - ${this.#valor} - ${this.#pessoa} - ${this.#tipo}`;
    }

   async gravar(){
        const imovelDB = new ImovelDB();
       await imovelDB.gravar(this);
    }

   async editar(){
        const imovelDB = new ImovelDB();
       await imovelDB.editar(this);
    }

   async excluir(){
        const imovelDB = new ImovelDB();
       await imovelDB.excluir(this);
    }

    async consultar(termoBusca){
        const imovelDB = new ImovelDB();
        return await imovelDB.consultar(termoBusca);
    }

    toJSON(){
        return {
            id: this.#id,
            titulo: this.#titulo,
            valor: this.#valor,
            pessoa: this.#pessoa, 
            tipo: this.#tipo
        }
    }

    
}