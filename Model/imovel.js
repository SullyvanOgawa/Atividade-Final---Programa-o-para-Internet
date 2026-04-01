import ImovelDB from "../DB/imovelDB.js";



export default class Imovel{
    #id;
    #tituloImovel;
    #imovelTipo;
    #imovelValor;
    #pessoa;
    constructor(id, tituloImovel, imovelTipo, imovelValor, pessoa){
        this.#id = id;
        this.#tituloImovel = tituloImovel;
        this.#imovelTipo = imovelTipo;
        this.#imovelValor = imovelValor;
        this.#pessoa = pessoa;
    }

    get id(){
        return this.#id
    }

    get tituloImovel(){
        return this.#tituloImovel
    }

    get imovelTipo(){
        return this.#imovelTipo
    }

    get imovelValor(){
        return this.#imovelValor
    }

    get pessoa(){
        return this.#pessoa
    }

    toString(){
        return `${this.#tituloImovel} - ${this.#imovelTipo} - ${this.#imovelValor} - ${this.#pessoa}`;
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
            tituloImovel: this.#tituloImovel,
            imovelTipo: this.#imovelTipo,
            imovelValor: this.#imovelValor,
            pessoa: this.#pessoa
        }
    }

    
}