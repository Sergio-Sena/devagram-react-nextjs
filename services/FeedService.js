import httpServices from "./httpServices";

export default class FeedService extends httpServices {
    async carregarPostagens(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }
        return this.get(url);
    }
}
