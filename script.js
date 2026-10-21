
const perguntas = [
    {
        categoria: "PHISHING • GOLPES DIGITAIS",
        pergunta: "Você recebe uma mensagem dizendo que seu CPF está irregular e precisa clicar em um link para evitar problemas. O que fazer?",
        contexto: "A mensagem é urgente, mas você não reconhece o remetente e não sabe para onde o link leva.",
        opcoes: [
            "Clicar rapidamente para resolver o problema.",
            "Responder com meu CPF para confirmar a identidade.",
            "Acessar o canal oficial por conta própria e verificar a informação.",
            "Encaminhar a mensagem para todos os meus contatos."
        ],
        correta: 2,
        explicacao: "Mensagens alarmantes podem ser usadas em golpes. Entre no site ou aplicativo oficial por conta própria, sem usar o link suspeito."
    },
    {
        categoria: "SENHAS • PROTEÇÃO DE CONTAS",
        pergunta: "Uma pessoa que diz trabalhar no governo pede sua senha do Gov.br para ajudar você a emitir um documento. Como agir?",
        contexto: "Ela afirma que precisa da senha para concluir o atendimento mais rápido.",
        opcoes: [
            "Enviar a senha, pois ela trabalha no governo.",
            "Não compartilhar a senha e verificar o atendimento em um canal oficial.",
            "Enviar a senha e trocá-la depois.",
            "Passar a senha somente se a pessoa souber meu nome completo."
        ],
        correta: 1,
        explicacao: "Sua senha é pessoal. Não a compartilhe por mensagem ou telefone. Use os canais oficiais para confirmar a solicitação."
    },
    {
        categoria: "IDENTIDADE • FALSOS PEDIDOS",
        pergunta: "Um amigo manda mensagem de um número novo pedindo dinheiro com urgência. Qual é a atitude mais segura?",
        contexto: "A foto e o nome parecem conhecidos, mas você nunca conversou com aquele número.",
        opcoes: [
            "Transferir o dinheiro imediatamente.",
            "Enviar meus dados bancários para confirmar quem sou.",
            "Verificar a identidade do amigo por outro canal conhecido antes de agir.",
            "Pedir que ele envie uma foto do documento e confiar nela."
        ],
        correta: 2,
        explicacao: "Contas podem ser falsificadas ou invadidas. Confirme o pedido por uma ligação ou outro contato que você já conhece."
    },
    {
        categoria: "AUTENTICAÇÃO • CAMADA EXTRA",
        pergunta: "Para que serve a verificação em duas etapas em uma conta digital?",
        contexto: "Ela acrescenta uma etapa de confirmação além da senha.",
        opcoes: [
            "Adicionar uma camada de proteção ao acesso à conta.",
            "Permitir que qualquer pessoa entre sem senha.",
            "Substituir todas as atualizações de segurança.",
            "Tornar desnecessário proteger o celular."
        ],
        correta: 0,
        explicacao: "A verificação em duas etapas dificulta acessos indevidos, mesmo quando alguém descobre sua senha. Proteja também seus códigos de confirmação."
    },
    {
        categoria: "DOCUMENTOS • SEGUNDA VIA",
        pergunta: "Você precisa solicitar a segunda via de um documento oficial. Qual é o melhor primeiro passo?",
        contexto: "Você encontrou vários anúncios e páginas na internet que prometem emitir o documento.",
        opcoes: [
            "Entrar no primeiro anúncio que aparecer.",
            "Pesquisar o órgão oficial responsável e conferir o endereço do site.",
            "Enviar fotos dos documentos a qualquer perfil que ofereça ajuda.",
            "Pagar uma taxa por transferência para um desconhecido."
        ],
        correta: 1,
        explicacao: "O procedimento depende do documento e do órgão responsável. Procure o portal oficial, confira o endereço e siga as orientações publicadas nele."
    },
    {
        categoria: "CÓDIGOS • CONFIDENCIALIDADE",
        pergunta: "Uma pessoa liga dizendo que precisa do código recebido por SMS para cancelar uma compra. O que você deve fazer?",
        contexto: "Você não iniciou nenhum procedimento de cancelamento.",
        opcoes: [
            "Informar o código, pois a pessoa conhece meu nome.",
            "Enviar uma captura de tela da mensagem.",
            "Compartilhar o código se a pessoa parecer confiável.",
            "Não compartilhar o código e procurar a empresa por um canal oficial."
        ],
        correta: 3,
        explicacao: "Códigos de verificação podem permitir acesso a contas ou confirmar operações. Nunca os compartilhe com alguém que entrou em contato inesperadamente."
    },
    {
        categoria: "PRIVACIDADE • DADOS PESSOAIS",
        pergunta: "Um site desconhecido oferece um prêmio e pede foto do seu documento e vários dados pessoais. Qual é a melhor atitude?",
        contexto: "Você não conhece a empresa e não consegue confirmar a promoção em fontes confiáveis.",
        opcoes: [
            "Enviar tudo para garantir o prêmio.",
            "Publicar os dados nos comentários para confirmar a participação.",
            "Não fornecer os dados e verificar a oferta em canais confiáveis.",
            "Enviar somente a foto do documento, pois ela não é suficiente para causar problemas."
        ],
        correta: 2,
        explicacao: "Dados e imagens de documentos podem ser usados indevidamente. Desconfie de ofertas não verificadas e compartilhe apenas o necessário em serviços legítimos."
    },
    {
        categoria: "WI-FI • SEGURANÇA DE ACESSO",
        pergunta: "Você está usando um computador público para consultar um serviço digital. O que deve fazer ao terminar?",
        contexto: "O computador poderá ser usado por outras pessoas depois de você.",
        opcoes: [
            "Salvar a senha no navegador para a próxima visita.",
            "Sair da conta, não salvar senhas e conferir se encerrou a sessão.",
            "Deixar a conta aberta para não perder o acesso.",
            "Anotar a senha ao lado do computador."
        ],
        correta: 1,
        explicacao: "Em dispositivos compartilhados, encerre a sessão, não salve suas credenciais e feche as janelas com informações pessoais."
    }
];

const totalPerguntas = perguntas.length;
const LIMITE_TEMPO = 20;

let nomeJogador = "Agente";
let indiceAtual = 0;
let respostas = [];
let usarCronometro = false;
let tempoRestante = LIMITE_TEMPO;
let intervalo = null;
let operacaoFinalizada = false;

const $ = (id) => document.getElementById(id);

const telaInicial = $("start-screen");
const telaQuiz = $("quiz-screen");
const telaResultado = $("result-screen");

function mostrarTela(tela) {
    [telaInicial, telaQuiz, telaResultado].forEach((elemento) => {
        elemento.classList.add("hidden");
    });

    tela.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function pararCronometro() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function calcularXP() {
    return respostas.reduce((total, resposta, indice) => {
        if (!resposta || resposta.escolha !== perguntas[indice].correta) {
            return total;
        }

        return total + 100 + (resposta.bonus || 0);
    }, 0);
}

function contarAcertos() {
    return respostas.reduce((total, resposta, indice) => {
        return total + (
            resposta && resposta.escolha === perguntas[indice].correta ? 1 : 0
        );
    }, 0);
}

function obterNivel(xp) {
    if (xp >= 900) return "Lenda Cyber";
    if (xp >= 650) return "Especialista";
    if (xp >= 400) return "Agente Digital";
    if (xp >= 200) return "Aprendiz Cyber";
    return "Iniciante";
}

function atualizarEstatisticas() {
    $("xp").textContent = calcularXP();
    $("level").textContent = obterNivel(calcularXP());
    $("correct-count").textContent = `${contarAcertos()}/${totalPerguntas}`;
}

function iniciarOperacao(evento) {
    evento.preventDefault();

    const nomeDigitado = $("player-name").value.trim();

    if (!nomeDigitado) {
        $("player-name").focus();
        return;
    }

    nomeJogador = nomeDigitado;
    usarCronometro = $("timer-toggle").checked;
    indiceAtual = 0;
    respostas = Array(totalPerguntas).fill(null);
    operacaoFinalizada = false;

    $("display-name").textContent = nomeJogador.toUpperCase();
    $("timer-box").classList.toggle("hidden", !usarCronometro);

    atualizarEstatisticas();
    mostrarTela(telaQuiz);
    mostrarPergunta();
}

function mostrarPergunta() {
    pararCronometro();

    const pergunta = perguntas[indiceAtual];
    const respostaSalva = respostas[indiceAtual];
    const numero = String(indiceAtual + 1).padStart(2, "0");
    const progresso = Math.round((indiceAtual / totalPerguntas) * 100);

    $("question-counter").textContent =
        `DESAFIO ${numero} / ${String(totalPerguntas).padStart(2, "0")}`;

    $("progress-percent").textContent = `${progresso}%`;
    $("progress-bar").style.width = `${progresso}%`;
    $("progress-track").setAttribute("aria-valuenow", progresso);

    $("question-category").textContent = pergunta.categoria;
    $("question-text").textContent = pergunta.pergunta;
    $("question-context").textContent = pergunta.contexto;

    $("options").replaceChildren();
    $("feedback").className = "feedback hidden";
    $("feedback").textContent = "";

    pergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "option-button";

        const letra = document.createElement("span");
        letra.className = "option-letter";
        letra.textContent = String.fromCharCode(65 + indice);

        const texto = document.createElement("span");
        texto.textContent = opcao;

        botao.append(letra, texto);
        botao.addEventListener("click", () => selecionarResposta(indice));

        $("options").appendChild(botao);
    });

    $("back-button").disabled = indiceAtual === 0;
    $("next-button").disabled = !respostaSalva;
    $("next-button").textContent =
        indiceAtual === totalPerguntas - 1
            ? "VER RESULTADO →"
            : "PRÓXIMO DESAFIO →";

    atualizarEstatisticas();

    if (respostaSalva) {
        restaurarResposta(respostaSalva);
    } else if (usarCronometro) {
        iniciarCronometro();
    }
}

function selecionarResposta(indiceEscolhido) {
    if (respostas[indiceAtual] || operacaoFinalizada) return;

    pararCronometro();

    const bonus = usarCronometro
        ? Math.max(0, tempoRestante) * 2
        : 0;

    respostas[indiceAtual] = {
        escolha: indiceEscolhido,
        bonus
    };

    mostrarFeedback(indiceEscolhido);
}

function restaurarResposta(resposta) {
    const botoes = $("options").querySelectorAll(".option-button");

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === perguntas[indiceAtual].correta) {
            botao.classList.add("correct");
        }

        if (
            resposta.escolha !== null &&
            indice === resposta.escolha &&
            indice !== perguntas[indiceAtual].correta
        ) {
            botao.classList.add("wrong");
        }
    });

    if (resposta.escolha === null) {
        exibirFeedback(
            false,
            "⏱ TEMPO ESGOTADO!",
            "O tempo terminou. " + perguntas[indiceAtual].explicacao
        );
    } else {
        mostrarFeedback(resposta.escolha);
    }

    $("next-button").disabled = false;
}

function mostrarFeedback(indiceEscolhido) {
    const pergunta = perguntas[indiceAtual];
    const acertou = indiceEscolhido === pergunta.correta;
    const botoes = $("options").querySelectorAll(".option-button");

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === pergunta.correta) {
            botao.classList.add("correct");
        }

        if (indice === indiceEscolhido && !acertou) {
            botao.classList.add("wrong");
        }
    });

    if (acertou) {
        const bonus = respostas[indiceAtual].bonus || 0;
        const textoBonus = bonus > 0 ? ` + ${bonus} bônus de XP` : "";

        exibirFeedback(
            true,
            `✓ ACESSO LIBERADO! +${100} XP${textoBonus}`,
            pergunta.explicacao
        );
    } else {
        exibirFeedback(
            false,
            "✕ ALERTA DE SEGURANÇA!",
            pergunta.explicacao
        );
    }

    $("next-button").disabled = false;
    atualizarEstatisticas();
}

function exibirFeedback(sucesso, titulo, mensagem) {
    const feedback = $("feedback");
    feedback.className = `feedback ${sucesso ? "success" : "error"}`;

    const tituloElemento = document.createElement("strong");
    tituloElemento.textContent = titulo;

    const mensagemElemento = document.createElement("span");
    mensagemElemento.textContent = mensagem;

    feedback.replaceChildren(tituloElemento, mensagemElemento);
}

function iniciarCronometro() {
    pararCronometro();
    tempoRestante = LIMITE_TEMPO;
    atualizarRelogio();

    intervalo = setInterval(() => {
        tempoRestante -= 1;
        atualizarRelogio();

        if (tempoRestante <= 0) {
            pararCronometro();

            if (!respostas[indiceAtual]) {
                respostas[indiceAtual] = {
                    escolha: null,
                    bonus: 0
                };

                restaurarResposta(respostas[indiceAtual]);
            }
        }
    }, 1000);
}

function atualizarRelogio() {
    $("timer").textContent = Math.max(0, tempoRestante);
    $("timer-box").classList.toggle(
        "urgent",
        tempoRestante <= 5
    );
}

function irParaProximaPergunta() {
    if (!respostas[indiceAtual]) return;

    if (indiceAtual < totalPerguntas - 1) {
        indiceAtual += 1;
        mostrarPergunta();
    } else {
        finalizarOperacao();
    }
}

function voltarPergunta() {
    if (indiceAtual <= 0) return;

    indiceAtual -= 1;
    mostrarPergunta();
}

function obterMedalhas(acertos) {
    return [
        {
            nome: "Guardião Digital",
            descricao: "Complete a missão.",
            emoji: "🛡️",
            conquistada: true
        },
        {
            nome: "Caçador de Golpes",
            descricao: "Acerte pelo menos 4 perguntas.",
            emoji: "🕵️",
            conquistada: acertos >= 4
        },
        {
            nome: "Mestre das Senhas",
            descricao: "Acerte pelo menos 6 perguntas.",
            emoji: "🔐",
            conquistada: acertos >= 6
        },
        {
            nome: "Lenda Cyber",
            descricao: "Acerte todos os desafios.",
            emoji: "🏆",
            conquistada: acertos === totalPerguntas
        }
    ];
}

function finalizarOperacao() {
    pararCronometro();
    operacaoFinalizada = true;

    const acertos = contarAcertos();
    const xp = calcularXP();
    const porcentagem = Math.round((acertos / totalPerguntas) * 100);
    const nivel = obterNivel(xp);

    $("progress-bar").style.width = "100%";
    $("progress-percent").textContent = "100%";
    $("progress-track").setAttribute("aria-valuenow", 100);

    $("result-title").textContent = `${nomeJogador}, MISSÃO CONCLUÍDA!`;
    $("final-percent").textContent = `${porcentagem}%`;
    $("final-xp").textContent = `${xp} XP`;
    $("final-correct").textContent = `${acertos} de ${totalPerguntas}`;
    $("final-level").textContent = nivel;

    $("score-ring").style?.setProperty("--score-angle", `${porcentagem * 3.6}deg`);
    $("result-icon").textContent =
        acertos === totalPerguntas ? "🏆" :
        acertos >= 5 ? "🛡️" : "💻";

    if (porcentagem === 100) {
        $("result-message").textContent =
            "Desempenho impecável! Você demonstrou excelente atenção à segurança digital.";
    } else if (porcentagem >= 70) {
        $("result-message").textContent =
            "Ótimo trabalho! Você já reconhece muitos riscos. Continue praticando para proteger seus dados.";
    } else if (porcentagem >= 40) {
        $("result-message").textContent =
            "Você está evoluindo! Revise as explicações e tente novamente para fortalecer seus conhecimentos.";
    } else {
        $("result-message").textContent =
            "Todo especialista começa aprendendo. Leia o relatório, revise as dicas e faça uma nova tentativa!";
    }

    $("review-text").textContent =
        `Você acertou ${acertos} de ${totalPerguntas} desafios. ` +
        "Lembre-se: confirme pedidos por outros canais, proteja suas senhas e códigos, " +
        "e consulte os sites oficiais para serviços e documentos.";

    $("badges").replaceChildren();

    obterMedalhas(acertos).forEach((medalha) => {
        const card = document.createElement("div");
        card.className = `badge-card${medalha.conquistada ? "" : " locked"}`;

        const emoji = document.createElement("span");
        emoji.className = "badge-emoji";
        emoji.textContent = medalha.emoji;

        const detalhes = document.createElement("div");
        const titulo = document.createElement("strong");
        titulo.textContent = medalha.nome;

        const descricao = document.createElement("small");
        descricao.textContent = medalha.conquistada
            ? `CONQUISTADA • ${medalha.descricao}`
            : `BLOQUEADA • ${medalha.descricao}`;

        detalhes.append(titulo, descricao);
        card.append(emoji, detalhes);
        $("badges").appendChild(card);
    });

    mostrarTela(telaResultado);
}

function reiniciarOperacao() {
    pararCronometro();
    indiceAtual = 0;
    respostas = [];
    operacaoFinalizada = false;
    tempoRestante = LIMITE_TEMPO;

    $("timer-box").classList.remove("urgent");
    $("player-name").value = nomeJogador;
    mostrarTela(telaInicial);
}

$("start-form").addEventListener("submit", iniciarOperacao);
$("next-button").addEventListener("click", irParaProximaPergunta);
$("back-button").addEventListener("click", voltarPergunta);
$("restart-button").addEventListener("click", reiniciarOperacao);