import TipoImovelDB from "../DB/tipoImovelDB.js";

export default class TipoImovel {
    
    #id;
    #descricao;

     constructor(id, descricao) {
        this.#id = id;
        this.#descricao = descricao;
    }

    get id() {
        return this.#id;
    }

    get descricao() {
        return this.#descricao;
    }

    toString() {
        return `${this.#descricao}`; 
    }

    async consultar(termoBusca){
        const tipoImovelDB = new TipoImovelDB();
        return await tipoImovelDB.consultar(termoBusca);
    }

   
    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao,
           
        }
    }

}