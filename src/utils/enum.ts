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
    RouteNotFound = "rota-nao-encontrada",
    UserNotFound = "usuario-nao-encontrado", //Usuario nao encontrado e/ou nao existe
    CategoriaNotFound = "categoria-nao-encontrada", //Categoria nao encontrada e/ou nao existe
    ParcelaNotFound = "parcela-nao-encontrada", //Parcela nao encontrada e/ou nao existe
    FieldNotFound = "campo-nao-encontrado", //Campo nao encontrado e/ou nao existe
    UserAlreadyExists = "usuario-ja-existe", //Usuario ja cadastrado no sistema
    CategoriaAlreadyExists = "categoria-ja-existe", //Categoria ja cadastrada no sistema
    InvalidId = "id-invalido", //Id com formato invalido (diferente de Types.ObjectId)
    InvalidCategoriaId = "id-categoria-invalido", //Id com formato invalido (diferente de Types.ObjectId)
    InvalidParcelaId = "id-parcela-invalido", //Id com formato invalido (diferente de Types.ObjectId)
    InvalidFieldId = "id-field-invalido", //Id com formato invalido (diferente de Types.ObjectId)
    IdNotAllowed = "id-nao-permitido", //Id nao pode estar preenchido (POST ao adicionar novo registro)
    MissingFields = "campos-obrigatorios-nao-preenchidos", //Campos obrigatorios em branco ou tamanho incorreto
    UsernameChanged = "nome-de-usuario-alterado", //Usuario enviado nao pode ser diferente do usuario cadastro no sistema baseado no ID
    EmptyId = "id-nao-preenchido", //Id enviado vazio ou nulo
    Unauthorized = "nao-autorizado", //Nao autorizado ao acesso
    MissingToken = 'token-nao-encontrado', //Token nao encontrado nos headers
    InvalidToken = 'token-invalido', //Token com formato invalido (diferente de um jwt)
    CantParseToken = 'token-formato-invalido', //Nao foi possivel converter o token jwt para json
    InternalServerError = "erro-interno-servidor", //Erro interno do servidor
    InvalidCredentials = 'credenciais-invalidas' //Credencias invalidas (usuario ou senha)
}

//ROLES do sistema para manipular permissoes nas rotas
export enum Roles {
    ADMIN = "admin", //Role de administrador do sistema (geralmente faz tudo)
    USER = "user", //Role de usuario do sistema (uso comum)
    MODERATOR = "moderator" //Role de moderador do sistema (algumas permissoes extras)
}