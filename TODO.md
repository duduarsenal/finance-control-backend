## BACK-END
- Adicionar campo STATUS na tabela field (referente a status PAGO/RECEBIDO dos ganhos e gastos) 🆗

## FRONT-END
- Adiciona Checkbox STATUS nos campos (referente ao status de pago/recebido dos ganhos e gastos)
- Melhorar UX no MODAL de adicionar campo quando não há categorias registradas (adicionar botão que direciona para o modal de add categoria)
- Melhorar UX no MODAL de adicionar categoria (Adicionar visual que destaca os itens nao salvos)
- Ajustar o filtro de mês para apenas do ano atual (talvez adicionar select para mudança de ano)
- Meses de um field nao estão sendo alterados ao editar gasto/ganho

## Avaliação
- Bloquear a exclusão de alguma parcela do meio de um certo parcelamento, inserir aviso que só é possivel excluir a primeira parcela e/ou ultima parcela (avaliar possibilidade de reorganização das parcelas)
- Adicionar botão para "desabilitar" uma parcela, a parcela não é excluida do registro porem nao é contabilizada na soma mensal/anual
- Bloquear a edição de alguma parcela do meio de um certo parcelamento, inserir aviso que só é póssivel editar a partir da primeira parcela
- Adicionar visual das parcelas mensais ao ativar opção de parcelado no registro/edição de um campo
- Adicionar tela de configurações, que permite o usuario trocar seu nome, trocar senha, adicionar emojis personalizados ou adicionar ganhos/gastos recorrentes
- Ao adicionar um ganho/gasto recorrente, solicitar a usuario o preenchimento do campo validade da recorrente (6 meses, 1 ano, 2 anos, 3 anos, 5 anos e indeterminado)

# ATENÇÃO
- Ao editar uma parcela intermediaria, exibir warning pergutando se a pessoa quer reparcelar (alterando data, valor ou quantidade de parcelas), ou apenas editar a descrição da parcela