import httpServices from "./httpServices";

export default class UsuarioService extends httpServices {
    async login(ususario, senha){
        
    }
    async cadastro(dados){
        return this.post('/cadastro', dados);
    }
}