export enum HttpStatusCode {
    OK = 200, //Requisicao realizada com sucesso
    Created = 201, //Registro criado com sucesso
    BadRequest = 400, //Erro validar tipos da requisicao
    Unauthorized = 401, //Token invalida/usuario nao autenticado
    NotFound = 404, //Endpoint nao encontrado
    InternalServerError = 500, //Erro interno do servidor
    ServiceUnavailable = 503, //Endpoint indisponivel
}