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

    gravar(){
        const imovelDB = new ImovelDB();
        imovelDB.gravar(this);
    }

    editar(){
        const imovelDB = new ImovelDB();
        imovelDB.editar(this);
    }

    excluir(){
        const imovelDB = new ImovelDB();
        imovelDB.excluir(this);
    }

    consultar(termoBusca){
        const imovelDB = new ImovelDB();
        return imovelDB.consultar(termoBusca);
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