import httpServices from "./httpServices";

export default class UsuarioService extends httpServices {
  async login(credenciais) {
    const { data } = await this.post("/login", credenciais);
    console.log(data);

    localStorage.setItem("nome", data.nome);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);

    const usuario = await this.get("/usuario");
    localStorage.setItem("id", usuario.data._id);

    if (usuario.data.avatar) {
      localStorage.setItem("avatar", usuario.data.avatar);
    }
  }

  async logout() {
    localStorage.clear();
  }

  async cadastro(dados) {
    return this.post("/cadastro", dados);
  }

  async atualizarPerfil(dados) {
    return this.put(`/usuario/eu`, dados);
  }

  estaAutenticado() {
    return localStorage.getItem("token") !== null;
  }
  async pesquisar(termoDaPesquisa) {
    return this.get("/pesquisa?filtro=" + termoDaPesquisa);
  }

  async obterPerfil(idUsuario) {
    return this.get(`/pesquisa?id=${idUsuario}`);
  }

  obterInformacoesDeUsuarioLogado() {
    return {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
    };
  }
}
