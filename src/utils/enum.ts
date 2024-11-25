//Status Code padronizadas para quaisquer exceptions do sistema
export enum HttpStatusCode {
    OK = 200, //Requisicao realizada com sucesso
    Created = 201, //Registro criado com sucesso
    BadRequest = 400, //Erro validar tipos da requisicao
    Unauthorized = 401, //Token invalida/usuario nao autenticado
    NotFound = 404, //Endpoint nao encontrado
    InternalServerError = 500, //Erro interno do servidor
    ServiceUnavailable = 503, //Endpoint indisponivel
}

//Mensagens padronizadas para quaisquer exceptions do sistema
export enum HttpExceptionMessage {
    UserNotFound = "usuario-nao-encontrado", //Usuario nao encontrado e/ou nao existe
    UserAlreadyExists = "usuario-ja-existe", //Usuario ja cadastrado no sistema
    InvalidId = "id-invalido", //Id com formato invalido (diferente de Types.ObjectId)
    IdNotAllowed = "id-nao-permitido", //Id nao pode estar preenchido (POST ao adicionar novo registro)
    MissingFields = "campos-obrigatorios-nao-preenchidos", //Campos obrigatorios em branco ou tamanho incorreto
    UsernameChanged = "nome-de-usuario-alterado", //Usuario enviado nao pode ser diferente do usuario cadastro no sistema baseado no ID
    EmptyId = "id-nao-preenchido", //Id enviado vazio ou nulo
    Unauthorized = "nao-autorizado",
    InternalServerError = "erro-interno-servidor", //Erro interno do servidor
}