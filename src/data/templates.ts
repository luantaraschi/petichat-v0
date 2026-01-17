// Complete list of legal document templates
// Based on CHATADV complete list - 195+ templates across 21 categories

export interface Template {
    id: string
    title: string
    category: string
    description: string
    isPopular?: boolean
}

export const categories = [
    "Todos",
    "Administrativo",
    "Ambiental",
    "Bancário",
    "Cível",
    "Condominial",
    "Consumidor",
    "Digital",
    "Diversos",
    "Eleitoral",
    "Empresarial",
    "Extrajudicial",
    "Família",
    "Licitação",
    "Parecer",
    "Passageiro Aéreo",
    "Penal",
    "Previdenciário",
    "Propriedade Intelectual",
    "Recursos",
    "Startups",
    "Trabalhista",
    "Tributário"
]

export const templates: Template[] = [
    // ADMINISTRATIVO (1-5)
    { id: "1", title: "Abertura de Processo Administrativo", category: "Administrativo", description: "Requeira a instauração de procedimento para apurar condutas e aplicar medidas cabíveis com base nos fatos narrados.", isPopular: true },
    { id: "2", title: "Pedido de Informações", category: "Administrativo", description: "Solicite dados oficiais, resguardando o direito de acesso à informação e à transparência na gestão pública." },
    { id: "3", title: "Pedido de Reconsideração", category: "Administrativo", description: "Solicite nova análise de decisão administrativa, apresentando fundamentos que justifiquem a revisão do ato." },
    { id: "4", title: "Prorrogação de Prazo", category: "Administrativo", description: "Justifique a necessidade de estender prazos administrativos com base em motivos relevantes e fundamentados." },
    { id: "5", title: "Revisão de Ato Administrativo", category: "Administrativo", description: "Busque a correção de decisões estatais que violem direitos, apresentando fundamentos que justifiquem a revisão." },

    // AMBIENTAL (6-8)
    { id: "6", title: "Ação Popular", category: "Ambiental", description: "Instrumento constitucional para anular atos lesivos ao patrimônio público, meio ambiente e moralidade administrativa." },
    { id: "7", title: "Ação de Cancelamento de Multa por Auto de Infração Ambiental", category: "Ambiental", description: "Conteste multas ambientais indevidas, demonstrando irregularidades processuais ou ausência de infração." },
    { id: "8", title: "Ação de Responsabilidade por Danos Ambientais", category: "Ambiental", description: "Busque a reparação de danos causados ao meio ambiente, com base na responsabilidade objetiva." },

    // BANCÁRIO (9-20)
    { id: "9", title: "Ação Declaratória de Inexistência de Débito c/c Indenização por Danos Morais", category: "Bancário", description: "Declare a inexistência de débito indevido e busque indenização pelos danos morais causados.", isPopular: true },
    { id: "10", title: "Ação Revisional de Contrato Bancário", category: "Bancário", description: "Revise cláusulas abusivas em contratos bancários, buscando a redução de juros e encargos ilegais." },
    { id: "11", title: "Ação de Cancelamento de Registro em Cadastro de Inadimplentes", category: "Bancário", description: "Solicite a exclusão de nome em SPC/SERASA quando a negativação for indevida." },
    { id: "12", title: "Ação de Consignação em Pagamento (Contratos Bancários)", category: "Bancário", description: "Deposite judicialmente valores devidos quando o credor se recusa a receber." },
    { id: "13", title: "Ação de Obrigação de Fazer", category: "Bancário", description: "Exija o cumprimento de obrigações contratuais não atendidas pela instituição financeira." },
    { id: "14", title: "Ação de Obrigação de Fazer c/c Indenização (Baixa de Gravame)", category: "Bancário", description: "Exija a baixa de gravame em veículo quitado e indenização pelos prejuízos causados." },
    { id: "15", title: "Ação de Obrigação de Não Fazer", category: "Bancário", description: "Impeça a instituição financeira de praticar atos lesivos aos direitos do consumidor." },
    { id: "16", title: "Ação de Reparação de Danos (Materiais e Morais)", category: "Bancário", description: "Busque indenização por prejuízos materiais e morais causados por condutas bancárias." },
    { id: "17", title: "Ação de Repetição de Indébito Bancário c/c Indenização", category: "Bancário", description: "Solicite a devolução em dobro de valores cobrados indevidamente por instituições financeiras." },
    { id: "18", title: "Ação de Revisão de Juros Abusivos", category: "Bancário", description: "Conteste juros abusivos em contratos de empréstimo ou financiamento." },
    { id: "19", title: "Ação de Sustação de Protesto", category: "Bancário", description: "Impeça ou cancele protesto de título indevido em cartório." },
    { id: "20", title: "Embargos à Execução (Títulos Bancários)", category: "Bancário", description: "Conteste execução de títulos bancários, alegando nulidades ou excesso de cobrança." },

    // CÍVEL (21-52)
    { id: "21", title: "Apelação Cível", category: "Cível", description: "Recurso contra sentença de primeira instância, buscando reforma ou anulação da decisão.", isPopular: true },
    { id: "22", title: "Ação Declaratória", category: "Cível", description: "Declare a existência ou inexistência de relação jurídica, garantindo segurança sobre direitos." },
    { id: "23", title: "Ação Monitória", category: "Cível", description: "Cobre créditos baseados em prova escrita sem eficácia de título executivo." },
    { id: "24", title: "Ação de Despejo", category: "Cível", description: "Solicite a desocupação de imóvel por falta de pagamento ou outros motivos legais." },
    { id: "25", title: "Ação de Execução de Título Extrajudicial", category: "Cível", description: "Execute créditos baseados em títulos extrajudiciais como cheques, notas promissórias e contratos." },
    { id: "26", title: "Ação de Interdito Proibitório", category: "Cível", description: "Previna ameaça de turbação ou esbulho à posse de bem imóvel." },
    { id: "27", title: "Ação de Manutenção de Posse", category: "Cível", description: "Proteja a posse contra turbação, mantendo o possuidor no exercício de seu direito." },
    { id: "28", title: "Ação de Obrigação de Fazer", category: "Cível", description: "Exija o cumprimento de obrigação de fazer assumida contratualmente ou por lei." },
    { id: "29", title: "Ação de Prestação de Contas", category: "Cível", description: "Exija a apresentação de contas de administrador ou gestor de bens ou valores." },
    { id: "30", title: "Cobrança", category: "Cível", description: "Cobre valores devidos com base em contratos, documentos ou relações jurídicas." },
    { id: "31", title: "Consignação em Pagamento", category: "Cível", description: "Deposite judicialmente valores devidos quando há recusa ou dúvida sobre quem deve receber." },
    { id: "32", title: "Contestação Cível", category: "Cível", description: "Apresente defesa em ação cível, impugnando os fatos e fundamentos do autor.", isPopular: true },
    { id: "33", title: "Contrarrazões ao Agravo de Instrumento", category: "Cível", description: "Responda ao agravo de instrumento interposto pela parte contrária." },
    { id: "34", title: "Contrarrazões ao Recurso Especial", category: "Cível", description: "Responda ao recurso especial interposto pela parte contrária perante o STJ." },
    { id: "35", title: "Contrarrazões aos Embargos de Declaração", category: "Cível", description: "Responda aos embargos de declaração opostos pela parte contrária." },
    { id: "36", title: "Contrarrazões de Apelação", category: "Cível", description: "Responda à apelação interposta pela parte contrária, defendendo a sentença." },
    { id: "37", title: "Cumprimento de Sentença", category: "Cível", description: "Inicie a execução de sentença judicial transitada em julgado." },
    { id: "38", title: "Embargos de Declaração", category: "Cível", description: "Esclareça omissão, contradição ou obscuridade em decisão judicial." },
    { id: "39", title: "Embargos de Terceiro", category: "Cível", description: "Defenda direitos de quem não é parte no processo, mas foi atingido por ato judicial." },
    { id: "40", title: "Embargos à Execução", category: "Cível", description: "Conteste execução judicial, alegando nulidades, excesso ou pagamento." },
    { id: "41", title: "Exceção de Pré-Executividade", category: "Cível", description: "Alegue nulidades evidentes em execução sem necessidade de garantia do juízo." },
    { id: "42", title: "Impugnação ao Cumprimento de Sentença", category: "Cível", description: "Conteste o cumprimento de sentença, alegando incorreções ou exceções." },
    { id: "43", title: "Incidente de Desconsideração da Personalidade Jurídica", category: "Cível", description: "Solicite a responsabilização dos sócios por dívidas da pessoa jurídica." },
    { id: "44", title: "Indenização por Danos Morais", category: "Cível", description: "Busque reparação por danos à honra, imagem ou dignidade da pessoa.", isPopular: true },
    { id: "45", title: "Liquidação de Sentença", category: "Cível", description: "Determine o valor exato da condenação quando a sentença for ilíquida." },
    { id: "46", title: "Mandado de Segurança", category: "Cível", description: "Proteja direito líquido e certo contra ato ilegal de autoridade pública." },
    { id: "47", title: "Pedido de Citação por Edital", category: "Cível", description: "Solicite citação por edital quando o réu estiver em local incerto ou não sabido." },
    { id: "48", title: "Petição Inicial", category: "Cível", description: "Inicie processo judicial com exposição dos fatos, fundamentos e pedidos." },
    { id: "49", title: "Petição de Juntada de Documento", category: "Cível", description: "Solicite a juntada de novos documentos aos autos do processo." },
    { id: "50", title: "Reintegração de Posse", category: "Cível", description: "Recupere a posse de bem do qual foi esbulhado, restabelecendo o direito." },
    { id: "51", title: "Réplica à Contestação", category: "Cível", description: "Responda à contestação apresentada pelo réu, refutando suas alegações." },
    { id: "52", title: "Usucapião", category: "Cível", description: "Adquira propriedade de imóvel pela posse prolongada e ininterrupta." },

    // CONDOMINIAL (53-59)
    { id: "53", title: "Ação Declaratória de Inexistência de Débito Condominial", category: "Condominial", description: "Declare a inexistência de dívida condominial cobrada indevidamente." },
    { id: "54", title: "Ação de Cobrança de Taxas Condominiais", category: "Condominial", description: "Cobre taxas condominiais em atraso de condôminos inadimplentes." },
    { id: "55", title: "Ação de Consignação em Pagamento de Taxas Condominiais", category: "Condominial", description: "Deposite valores de taxas condominiais quando há recusa do condomínio." },
    { id: "56", title: "Ação de Destituição de Síndico", category: "Condominial", description: "Solicite a destituição de síndico por má gestão ou irregularidades." },
    { id: "57", title: "Ação de Execução de Taxas Condominiais", category: "Condominial", description: "Execute taxas condominiais em atraso com base em título executivo." },
    { id: "58", title: "Ação de Nulidade de Assembleia Condominial", category: "Condominial", description: "Anule deliberações de assembleia condominial realizadas com vícios." },
    { id: "59", title: "Ação de Prestação de Contas (Síndico)", category: "Condominial", description: "Exija a prestação de contas do síndico sobre a gestão do condomínio." },

    // CONSUMIDOR (60-70)
    { id: "60", title: "Ação de Produto Não Entregue", category: "Consumidor", description: "Exija a entrega de produto adquirido e não entregue, com possível indenização.", isPopular: true },
    { id: "61", title: "Cobrança Indevida", category: "Consumidor", description: "Conteste cobranças indevidas e solicite a devolução em dobro dos valores pagos." },
    { id: "62", title: "Insolvência Civil", category: "Consumidor", description: "Declare a insolvência civil para reorganização de dívidas pessoais." },
    { id: "63", title: "Insolvência Familiar", category: "Consumidor", description: "Busque a reorganização de dívidas familiares em situação de superendividamento." },
    { id: "64", title: "Pedido de Moratória de Dívida", category: "Consumidor", description: "Solicite prazo adicional para pagamento de dívidas em situação de dificuldade." },
    { id: "65", title: "Proteção Contra Superendividamento", category: "Consumidor", description: "Utilize os mecanismos legais de proteção ao consumidor superendividado." },
    { id: "66", title: "Reestruturação de Dívidas", category: "Consumidor", description: "Reorganize dívidas de forma sustentável com base na Lei do Superendividamento." },
    { id: "67", title: "Renegociação de Dívida", category: "Consumidor", description: "Proponha acordo para pagamento de dívidas em condições viáveis." },
    { id: "68", title: "Restituição de Valor Pago Indevidamente", category: "Consumidor", description: "Solicite a devolução de valores pagos sem causa ou em excesso." },
    { id: "69", title: "Revisão de Cláusulas Abusivas em Contratos de Crédito", category: "Consumidor", description: "Revise cláusulas abusivas em contratos de crédito ao consumidor." },
    { id: "70", title: "Revisão de Contrato de Financiamento", category: "Consumidor", description: "Revise contratos de financiamento com cláusulas abusivas ou onerosidade excessiva." },

    // DIGITAL (71-74)
    { id: "71", title: "Bloqueio e Exclusão de Dados Pessoais (LGPD)", category: "Digital", description: "Solicite o bloqueio ou exclusão de dados pessoais com base na LGPD." },
    { id: "72", title: "Habeas Data", category: "Digital", description: "Acesse ou corrija informações pessoais em bancos de dados públicos ou privados." },
    { id: "73", title: "Indenização por Uso Indevido de Imagem na Internet", category: "Digital", description: "Busque reparação por uso não autorizado de imagem em ambiente digital." },
    { id: "74", title: "Reparação por Vazamento de Dados (LGPD)", category: "Digital", description: "Busque indenização por danos causados por vazamento de dados pessoais." },

    // DIVERSOS (75)
    { id: "75", title: "Outros", category: "Diversos", description: "Modelos diversos não classificados em categorias específicas." },

    // ELEITORAL (76-81)
    { id: "76", title: "Ação de Impugnação de Mandato Eletivo", category: "Eleitoral", description: "Conteste mandato obtido mediante abuso de poder ou fraude eleitoral." },
    { id: "77", title: "Ação de Impugnação de Registro de Candidatura", category: "Eleitoral", description: "Impugne registro de candidatura por inelegibilidade ou irregularidades." },
    { id: "78", title: "Ação de Investigação Judicial Eleitoral", category: "Eleitoral", description: "Apure condutas vedadas durante o período eleitoral." },
    { id: "79", title: "Mandado de Segurança Eleitoral", category: "Eleitoral", description: "Proteja direito líquido e certo em matéria eleitoral." },
    { id: "80", title: "Recurso Eleitoral", category: "Eleitoral", description: "Recorra de decisões da Justiça Eleitoral." },
    { id: "81", title: "Representação Eleitoral", category: "Eleitoral", description: "Denuncie irregularidades eleitorais perante a Justiça Eleitoral." },

    // EMPRESARIAL (82-85)
    { id: "82", title: "Cobrança de Títulos de Crédito", category: "Empresarial", description: "Cobre valores devidos com base em títulos de crédito empresariais." },
    { id: "83", title: "Execução de Título Extrajudicial Empresarial", category: "Empresarial", description: "Execute créditos empresariais baseados em títulos extrajudiciais." },
    { id: "84", title: "Falência", category: "Empresarial", description: "Solicite a decretação de falência de devedor empresário insolvente." },
    { id: "85", title: "Recuperação Judicial", category: "Empresarial", description: "Solicite recuperação judicial para viabilizar a superação de crise econômico-financeira." },

    // EXTRAJUDICIAL (86-87)
    { id: "86", title: "Notificação Extrajudicial", category: "Extrajudicial", description: "Comunique formalmente devedor ou parte sobre obrigações ou direitos." },
    { id: "87", title: "Requerimento Administrativo", category: "Extrajudicial", description: "Solicite providências junto a órgãos administrativos sem judicialização." },

    // FAMÍLIA (88-102)
    { id: "88", title: "Ação de Adoção", category: "Família", description: "Solicite a adoção de criança ou adolescente, constituindo vínculo familiar legal." },
    { id: "89", title: "Ação de Alimentos", category: "Família", description: "Solicite pensão alimentícia para suprir necessidades básicas de dependentes.", isPopular: true },
    { id: "90", title: "Ação de Curatela", category: "Família", description: "Solicite a nomeação de curador para pessoa incapaz de gerir seus atos." },
    { id: "91", title: "Ação de Divórcio", category: "Família", description: "Dissolva o vínculo matrimonial de forma consensual ou litigiosa.", isPopular: true },
    { id: "92", title: "Ação de Divórcio Litigioso com Partilha de Bens", category: "Família", description: "Dissolva o casamento com partilha judicial dos bens do casal." },
    { id: "93", title: "Ação de Exoneração de Alimentos", category: "Família", description: "Solicite a extinção da obrigação alimentar quando não mais justificada." },
    { id: "94", title: "Ação de Guarda de Menor", category: "Família", description: "Defina a guarda de filho menor, podendo ser unilateral ou compartilhada." },
    { id: "95", title: "Ação de Interdição", category: "Família", description: "Declare a incapacidade de pessoa para os atos da vida civil." },
    { id: "96", title: "Ação de Inventário", category: "Família", description: "Realize a partilha de bens deixados por pessoa falecida." },
    { id: "97", title: "Ação de Revisão de Alimentos", category: "Família", description: "Solicite aumento ou redução de pensão alimentícia conforme mudanças." },
    { id: "98", title: "Dissolução de União Estável", category: "Família", description: "Declare o fim da união estável com partilha de bens, se houver." },
    { id: "99", title: "Execução de Alimentos", category: "Família", description: "Execute pensão alimentícia em atraso contra alimentante inadimplente." },
    { id: "100", title: "Investigação de Paternidade", category: "Família", description: "Investigue e declare vínculo de paternidade biológica." },
    { id: "101", title: "Reconhecimento de Paternidade", category: "Família", description: "Reconheça formalmente a paternidade de filho." },
    { id: "102", title: "Revisão de Alimentos", category: "Família", description: "Revise valor de pensão alimentícia conforme alteração de circunstâncias." },

    // LICITAÇÃO (103-106)
    { id: "103", title: "Ação Anulatória de Licitação", category: "Licitação", description: "Anule licitação realizada com vícios ou irregularidades." },
    { id: "104", title: "Ação de Cobrança de Contrato Administrativo", category: "Licitação", description: "Cobre valores devidos pela Administração em contratos públicos." },
    { id: "105", title: "Impugnação ao Edital de Licitação", category: "Licitação", description: "Impugne cláusulas restritivas ou ilegais em edital de licitação." },
    { id: "106", title: "Recurso Administrativo em Licitação", category: "Licitação", description: "Recorra de decisões em procedimentos licitatórios." },

    // PARECER (107-109)
    { id: "107", title: "Parecer Jurídico - CAC", category: "Parecer", description: "Análise jurídica sobre questões de Caçador, Atirador e Colecionador." },
    { id: "108", title: "Parecer Jurídico - Licitações", category: "Parecer", description: "Análise jurídica sobre procedimentos licitatórios e contratos administrativos." },
    { id: "109", title: "Parecer Jurídico - Princípios", category: "Parecer", description: "Análise jurídica baseada em princípios gerais do direito." },

    // PASSAGEIRO AÉREO (198-209)
    { id: "198", title: "Ação de Indenização por Atraso de Voo", category: "Passageiro Aéreo", description: "Busque indenização por danos morais e materiais causados por atraso significativo de voo.", isPopular: true },
    { id: "199", title: "Ação de Indenização por Cancelamento de Voo", category: "Passageiro Aéreo", description: "Solicite reparação por cancelamento de voo sem assistência adequada da companhia aérea.", isPopular: true },
    { id: "200", title: "Ação de Indenização por Overbooking", category: "Passageiro Aéreo", description: "Busque indenização por preterição de embarque (overbooking) e seus transtornos." },
    { id: "201", title: "Ação de Indenização por Extravio de Bagagem", category: "Passageiro Aéreo", description: "Solicite reparação por extravio definitivo de bagagem despachada.", isPopular: true },
    { id: "202", title: "Ação de Indenização por Atraso na Entrega de Bagagem", category: "Passageiro Aéreo", description: "Busque compensação por atraso na entrega de bagagem e despesas decorrentes." },
    { id: "203", title: "Ação de Indenização por Danos à Bagagem", category: "Passageiro Aéreo", description: "Solicite reparação por danos causados à bagagem durante o transporte aéreo." },
    { id: "204", title: "Ação de Indenização por Perda de Conexão", category: "Passageiro Aéreo", description: "Busque indenização quando atraso de voo causou perda de conexão e prejuízos." },
    { id: "205", title: "Ação de Indenização por No-Show Indevido", category: "Passageiro Aéreo", description: "Conteste cancelamento de bilhete de retorno por não comparecimento na ida." },
    { id: "206", title: "Ação de Indenização por Downgrade de Classe", category: "Passageiro Aéreo", description: "Solicite reembolso e indenização por rebaixamento involuntário de classe." },
    { id: "207", title: "Ação de Reembolso de Passagem Aérea", category: "Passageiro Aéreo", description: "Exija reembolso de passagem não utilizada ou cancelada pela companhia." },
    { id: "208", title: "Ação de Indenização por Falha na Assistência Material", category: "Passageiro Aéreo", description: "Busque reparação quando a companhia não forneceu alimentação, hospedagem ou comunicação." },
    { id: "209", title: "Ação de Indenização por Perda de Compromisso", category: "Passageiro Aéreo", description: "Solicite indenização por perda de evento, reunião ou compromisso devido a problemas com voo." },

    // PENAL (110-141)
    { id: "110", title: "Agravo em Execução Penal", category: "Penal", description: "Recorra de decisões do juízo de execução penal." },
    { id: "111", title: "Alegações Finais", category: "Penal", description: "Apresente argumentos finais antes da sentença em processo criminal." },
    { id: "112", title: "Apelação Criminal", category: "Penal", description: "Recorra de sentença criminal buscando reforma ou anulação." },
    { id: "113", title: "Defesa Prévia / Resposta à Acusação", category: "Penal", description: "Apresente defesa preliminar após recebimento da denúncia." },
    { id: "114", title: "Embargos Infringentes e de Nulidade", category: "Penal", description: "Recorra de acórdão não unânime em processo criminal." },
    { id: "115", title: "Habeas Corpus", category: "Penal", description: "Proteja a liberdade de locomoção contra coação ilegal ou abuso de poder.", isPopular: true },
    { id: "116", title: "Medida Protetiva", category: "Penal", description: "Solicite proteção contra violência doméstica ou familiar." },
    { id: "117", title: "Pedido de Aplicação de ANPP", category: "Penal", description: "Solicite acordo de não persecução penal quando cabível." },
    { id: "118", title: "Pedido de Indulto ou Comutação de Pena", category: "Penal", description: "Solicite perdão ou redução de pena com base em decreto presidencial." },
    { id: "119", title: "Pedido de Liberdade Provisória", category: "Penal", description: "Solicite liberdade provisória com ou sem fiança." },
    { id: "120", title: "Pedido de Livramento Condicional", category: "Penal", description: "Solicite liberação antecipada do condenado mediante condições." },
    { id: "121", title: "Pedido de Prisão Domiciliar", category: "Penal", description: "Solicite substituição da prisão por recolhimento domiciliar." },
    { id: "122", title: "Pedido de Progressão de Regime", category: "Penal", description: "Solicite passagem para regime prisional mais brando." },
    { id: "123", title: "Pedido de Reconsideração de Prisão Preventiva", category: "Penal", description: "Solicite reanálise da necessidade de prisão preventiva." },
    { id: "124", title: "Pedido de Relaxamento de Prisão", category: "Penal", description: "Solicite relaxamento de prisão ilegal ou realizada com vícios." },
    { id: "125", title: "Pedido de Relaxamento de Prisão Temporária", category: "Penal", description: "Solicite relaxamento de prisão temporária ilegal." },
    { id: "126", title: "Pedido de Remição de Pena", category: "Penal", description: "Solicite redução de pena por trabalho ou estudo." },
    { id: "127", title: "Pedido de Restituição de Coisas Apreendidas", category: "Penal", description: "Solicite devolução de bens apreendidos em inquérito ou processo." },
    { id: "128", title: "Pedido de Revogação de Prisão Preventiva", category: "Penal", description: "Solicite revogação de prisão preventiva por ausência de requisitos." },
    { id: "129", title: "Pedido de Saída Temporária", category: "Penal", description: "Solicite autorização para saída temporária do estabelecimento prisional." },
    { id: "130", title: "Pedido de Substituição de Preventiva por Cautelares", category: "Penal", description: "Solicite medidas cautelares alternativas à prisão preventiva." },
    { id: "131", title: "Pedido de Sursis Processual", category: "Penal", description: "Solicite suspensão condicional do processo quando cabível." },
    { id: "132", title: "Pedido de Trancamento de Inquérito Policial", category: "Penal", description: "Solicite encerramento de inquérito policial por falta de justa causa." },
    { id: "133", title: "Pedido de Unificação de Penas", category: "Penal", description: "Solicite unificação de penas para fins de benefícios na execução." },
    { id: "134", title: "Pedido de Restituição de Armas de Fogo", category: "Penal", description: "Solicite devolução de armas de fogo apreendidas legalmente." },
    { id: "135", title: "Queixa-Crime", category: "Penal", description: "Inicie ação penal privada contra autor de crime de ação privada." },
    { id: "136", title: "Recurso em Sentido Estrito", category: "Penal", description: "Recorra de decisões interlocutórias em processo criminal." },
    { id: "137", title: "Representação para Incidente de Insanidade Mental", category: "Penal", description: "Solicite exame de sanidade mental do acusado." },
    { id: "138", title: "Resposta à Acusação", category: "Penal", description: "Apresente defesa inicial após citação em ação penal." },
    { id: "139", title: "Restituição de Coisas Apreendidas", category: "Penal", description: "Solicite devolução de objetos apreendidos durante investigação." },
    { id: "140", title: "Revisão Criminal", category: "Penal", description: "Solicite revisão de sentença condenatória transitada em julgado." },
    { id: "141", title: "Revogação de Medida Protetiva", category: "Penal", description: "Solicite revogação de medida protetiva quando não mais necessária." },

    // PREVIDENCIÁRIO (142-159)
    { id: "142", title: "Ação de Averbação de Tempo de Contribuição", category: "Previdenciário", description: "Averbe tempo de contribuição rural ou especial para aposentadoria." },
    { id: "143", title: "Ação de Concessão de BPC/LOAS", category: "Previdenciário", description: "Solicite benefício assistencial para idoso ou deficiente de baixa renda.", isPopular: true },
    { id: "144", title: "Ação de Conversão de Aposentadoria em Especial", category: "Previdenciário", description: "Converta aposentadoria por tempo em aposentadoria especial." },
    { id: "145", title: "Ação de Reconhecimento de Atividade Especial", category: "Previdenciário", description: "Reconheça período trabalhado em condições especiais." },
    { id: "146", title: "Ação de Restabelecimento de Benefício", category: "Previdenciário", description: "Restabeleça benefício cessado indevidamente pelo INSS." },
    { id: "147", title: "Ação de Restituição de Descontos Indevidos", category: "Previdenciário", description: "Solicite devolução de descontos indevidos em benefício previdenciário." },
    { id: "148", title: "Ação de Revisão da Vida Toda", category: "Previdenciário", description: "Revise aposentadoria considerando todo o histórico contributivo." },
    { id: "149", title: "Ação de Revisão de Aposentadoria por Tempo", category: "Previdenciário", description: "Revise cálculo de aposentadoria por tempo de contribuição." },
    { id: "150", title: "Concessão de Aposentadoria Especial", category: "Previdenciário", description: "Solicite aposentadoria por exposição a agentes nocivos." },
    { id: "151", title: "Concessão de Aposentadoria por Idade", category: "Previdenciário", description: "Solicite aposentadoria por idade ao INSS ou judicialmente.", isPopular: true },
    { id: "152", title: "Concessão de Aposentadoria por Incapacidade Permanente", category: "Previdenciário", description: "Solicite aposentadoria por invalidez permanente para o trabalho." },
    { id: "153", title: "Concessão de Aposentadoria por Tempo de Contribuição", category: "Previdenciário", description: "Solicite aposentadoria com base no tempo de contribuição." },
    { id: "154", title: "Concessão de Auxílio-Acidente", category: "Previdenciário", description: "Solicite auxílio-acidente por sequelas de acidente de trabalho." },
    { id: "155", title: "Concessão de Auxílio-Doença", category: "Previdenciário", description: "Solicite auxílio-doença por incapacidade temporária para o trabalho." },
    { id: "156", title: "Concessão de Pensão por Morte", category: "Previdenciário", description: "Solicite pensão por morte de segurado do INSS." },
    { id: "157", title: "Concessão de Salário-Maternidade", category: "Previdenciário", description: "Solicite salário-maternidade por nascimento, adoção ou aborto." },
    { id: "158", title: "Mandado de Segurança contra Indeferimento", category: "Previdenciário", description: "Proteja direito líquido e certo contra indeferimento de benefício." },
    { id: "159", title: "Revisão de Benefício Previdenciário", category: "Previdenciário", description: "Revise cálculo ou valor de benefício previdenciário concedido." },

    // PROPRIEDADE INTELECTUAL (160-164)
    { id: "160", title: "Cumprimento de Acordo de Licenciamento", category: "Propriedade Intelectual", description: "Exija cumprimento de acordo de licenciamento de tecnologia." },
    { id: "161", title: "Indenização por Uso Indevido de Software", category: "Propriedade Intelectual", description: "Busque reparação por uso não autorizado de software." },
    { id: "162", title: "Proteção de Segredos Industriais", category: "Propriedade Intelectual", description: "Proteja segredos comerciais e industriais contra apropriação indevida." },
    { id: "163", title: "Violação de Direitos Autorais sobre Software", category: "Propriedade Intelectual", description: "Ação contra violação de direitos autorais de programas de computador." },
    { id: "164", title: "Violação de Patente Tecnológica", category: "Propriedade Intelectual", description: "Ação contra violação de patente de tecnologia registrada." },

    // RECURSOS (165-177)
    { id: "165", title: "Agravo Interno", category: "Recursos", description: "Recorra de decisão monocrática de relator em tribunal." },
    { id: "166", title: "Agravo de Instrumento", category: "Recursos", description: "Recorra de decisão interlocutória diretamente ao tribunal.", isPopular: true },
    { id: "167", title: "Embargos Infringentes", category: "Recursos", description: "Recorra de acórdão não unânime que reforma sentença." },
    { id: "168", title: "Recurso Especial", category: "Recursos", description: "Recorra ao STJ por violação de lei federal." },
    { id: "169", title: "Recurso Extraordinário", category: "Recursos", description: "Recorra ao STF por violação de norma constitucional." },
    { id: "170", title: "Apelação", category: "Recursos", description: "Recorra de sentença de primeira instância ao tribunal." },
    { id: "171", title: "Reclamação", category: "Recursos", description: "Preserve competência de tribunal ou garantir autoridade de suas decisões." },
    { id: "172", title: "Ação Rescisória", category: "Recursos", description: "Rescinda sentença transitada em julgado por vícios graves." },
    { id: "173", title: "Revisão Criminal", category: "Recursos", description: "Revise condenação criminal transitada em julgado." },
    { id: "174", title: "Mandado de Segurança", category: "Recursos", description: "Proteja direito líquido e certo contra ato de autoridade." },
    { id: "175", title: "Habeas Corpus", category: "Recursos", description: "Proteja liberdade de locomoção contra coação ilegal." },
    { id: "176", title: "Habeas Data", category: "Recursos", description: "Acesse ou corrija informações pessoais em bancos de dados." },
    { id: "177", title: "Mandado de Injunção", category: "Recursos", description: "Supra omissão legislativa que impeça exercício de direito constitucional." },

    // STARTUPS (178-182)
    { id: "178", title: "Acordo de Sócios (Startup)", category: "Startups", description: "Estabeleça regras de convivência e governança entre sócios de startup." },
    { id: "179", title: "Contrato de Vesting", category: "Startups", description: "Defina aquisição progressiva de participação societária por colaboradores." },
    { id: "180", title: "Memorando de Entendimentos (MoU)", category: "Startups", description: "Formalize intenções preliminares de negociação entre partes." },
    { id: "181", title: "Termo de Confidencialidade (NDA)", category: "Startups", description: "Proteja informações confidenciais em negociações empresariais." },
    { id: "182", title: "Contrato de Investimento Anjo", category: "Startups", description: "Formalize investimento de capital de risco em startup." },

    // TRABALHISTA (183-190)
    { id: "183", title: "Reclamação Trabalhista", category: "Trabalhista", description: "Reclame direitos trabalhistas não pagos pelo empregador.", isPopular: true },
    { id: "184", title: "Contestação Trabalhista", category: "Trabalhista", description: "Apresente defesa em reclamação trabalhista." },
    { id: "185", title: "Recurso Ordinário Trabalhista", category: "Trabalhista", description: "Recorra de sentença trabalhista ao TRT." },
    { id: "186", title: "Agravo de Petição", category: "Trabalhista", description: "Recorra de decisão em execução trabalhista." },
    { id: "187", title: "Embargos à Execução Trabalhista", category: "Trabalhista", description: "Conteste execução trabalhista por excesso ou nulidades." },
    { id: "188", title: "Mandado de Segurança Trabalhista", category: "Trabalhista", description: "Proteja direito líquido e certo em matéria trabalhista." },
    { id: "189", title: "Ação de Consignação em Pagamento Trabalhista", category: "Trabalhista", description: "Deposite verbas rescisórias quando há recusa do empregado." },
    { id: "190", title: "Inquérito para Apuração de Falta Grave", category: "Trabalhista", description: "Apure falta grave para demissão de empregado estável." },

    // TRIBUTÁRIO (191-197)
    { id: "191", title: "Ação Anulatória de Débito Fiscal", category: "Tributário", description: "Anule lançamento fiscal indevido ou ilegal." },
    { id: "192", title: "Ação Declaratória de Inexistência de Relação Tributária", category: "Tributário", description: "Declare inexistência de obrigação tributária indevida." },
    { id: "193", title: "Ação de Repetição de Indébito Tributário", category: "Tributário", description: "Solicite devolução de tributos pagos indevidamente." },
    { id: "194", title: "Embargos à Execução Fiscal", category: "Tributário", description: "Conteste execução fiscal por nulidades ou pagamento." },
    { id: "195", title: "Exceção de Pré-Executividade Fiscal", category: "Tributário", description: "Alegue nulidades em execução fiscal sem garantia do juízo." },
    { id: "196", title: "Mandado de Segurança Tributário", category: "Tributário", description: "Proteja direito líquido e certo contra exigência tributária ilegal." },
    { id: "197", title: "Ação de Consignação em Pagamento Tributário", category: "Tributário", description: "Deposite tributos quando há divergência sobre o valor devido." },
]

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): Template[] {
    if (category === "Todos") {
        return templates
    }
    return templates.filter(t => t.category === category)
}

// Helper to get template count by category
export function getTemplateCounts(): Record<string, number> {
    const counts: Record<string, number> = { "Todos": templates.length }
    templates.forEach(t => {
        counts[t.category] = (counts[t.category] || 0) + 1
    })
    return counts
}
