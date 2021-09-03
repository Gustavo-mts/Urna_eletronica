// recebe a frase 'seu voto para'
let seuVotoPara = document.querySelector('.d-1-1 span');
// recebe o cargo (vereador ou prefeito)
let cargo = document.querySelector('.d-1-2 span');
// recebe a descrição nome, partido e vice-prefeito
let descricao = document.querySelector('.d-1-4');
// recebe a parte dos avisos que fica na parye inferior da tela
let aviso = document.querySelector('.d-2');
// lateral recebe as informações de imagem e titulo do cadidato
let lateral = document.querySelector('.d-1-right');
// recebe o quadradinho dos números
let numeros = document.querySelector('.d-1-3');

// VARIÁVEIS DE CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    // armazena os números digitados
    numero = '';
    votoBranco = false;

    // emite uma quantidade determinada de quadradinhos
    for(let i=0;i<etapa.numeros;i++) {
        // 
        if(i === 0) {
            // o primeiro quadrado fica piscando
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            // os outros (que não estão em primeiro) não piscam
            numeroHtml += '<div class="numero"></div>';
        }
    }

    // votoPara com a informação do texto "seu voto vai para" não aparece
    seuVotoPara.style.display = 'none';
    // o cargo (seja vereador, seja prefeito) aparece 
    cargo.innerHTML = etapa.titulo;
    // não haverá descrição
    descricao.innerHTML = '';
    // o aviso não aparece
    aviso.style.display = 'none';
    // a lateral ( com a foto dos candidatos) também não aparece
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    // irá filtrar para ver se há algum candidato com esse número
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    // verifica se há mesmo candidato
    if(candidato.length > 0) {
        candidato = candidato[0];
        //'Seu voto para' aparece em tela
        seuVotoPara.style.display = 'block';
        // os avisos aparecem em tela
        aviso.style.display = 'block';
        // as descrição com o nome e o partido do candidato aparecem
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            // fotosHtml recebe uma div com a imagem e a descrição do candidato
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        // imprimi-se na lateral as informações em fotosHtml
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        // caso não haja candidato, informamos que o voto foi nulo
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    // recebe o quadrado que pisca
    let elNumero = document.querySelector('.numero.pisca');
    // se o quadrado que for diferente de null, ele pode preencher
    if(elNumero !== null) {
        // digita o número no quadrado
        elNumero.innerHTML = n;
        // concatena os números
        numero = `${numero}${n}`;

        // após digitar o número no quadradinho, ele para de piscar
        elNumero.classList.remove('pisca');
        // se o próximo elemento (quadrado) existir (for diferente de null)
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            //caso não exista algum elemento a seguir, quer dizer que todos foram completados. Sendo assim, podemos atualizar a interface
            atualizaInterface();
        }
    }
}
function branco() {
    numero = '';
    votoBranco = true;

    // deixa na tela "SEU VOTO PARA"
    seuVotoPara.style.display = 'block';
    //deixa na tela os avisos
    aviso.style.display = 'block';
    // nada armazenamos em numeros(nas caixas de numeros)
    numeros.innerHTML = '';
    // em descrição nós adicionamos "VOTO EM BRANCO"
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    // não há imagem de candidatos
    lateral.innerHTML = '';
}
function corrige() {
    // quando corrige, reiniciamos a etapa de votação no candidato
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        // se voto branco for true, o voto confirmado também será
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        // se todos os quadradinhos foram preenchidos, voto confirmado
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        // após a confirmação do voto, mudamos de etapa (de vereador, passamos a prefeito)
        etapaAtual++;
        // se não for indefinida (se existir uma proxima etapa), começamo-la
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            // caso seja a ultima etapa, é o fim.
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();