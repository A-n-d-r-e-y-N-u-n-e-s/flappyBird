const sprites = new Image();
sprites.src = './imagem/sprites.png';

const canvas = document.querySelector('canvas');
const contexte = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexte.fillStyle = '#70c5ce';
        contexte.fillRect(0, 0, canvas.width, canvas.height)

        contexte.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )

        contexte.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexte.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        )

        contexte.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        )
    }
}

function colisao(flappybird, chao) {
    const flappybirdY = flappybird.y + flappybird.altura;
    const chaoY = chao.y;

    if (flappybirdY >= chaoY) {
        return true;
    }

    return false;
}

function criarflappybird() {

    const flappybird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 18,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            flappybird.velocidade = - flappybird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (colisao(flappybird, chao)) {
                console.log('coledio');
                return;
            }

            flappybird.y = flappybird.y + flappybird.velocidade;
            flappybird.velocidade = flappybird.velocidade + flappybird.gravidade
        },
        desenha() {
            contexte.drawImage(
                sprites,
                flappybird.spriteX, flappybird.spriteY,
                flappybird.largura, flappybird.altura,
                flappybird.x, flappybird.y,
                flappybird.largura, flappybird.altura,
            )
        }
    }

    const mensagemGetReady = {
        spriteX: 134,
        spriteY: 0,
        largura: 174,
        altura: 152,
        x: (canvas.width / 2) - 174 / 2,
        y: 50,

        desenha() {
            contexte.drawImage(

                sprites,
                mensagemGetReady.spriteX, mensagemGetReady.spriteY,
                mensagemGetReady.largura, mensagemGetReady.altura,
                mensagemGetReady.x, mensagemGetReady.y,
                mensagemGetReady.largura, mensagemGetReady.altura,
            )
        }
    }

}

const globais = {};

let TelasAtiva = {};
function mudaDeTela(novatela) {
    TelasAtiva = novatela;

    if (TelasAtiva.inicializa) {
        TelasAtiva.inicializa();
    }
};

const Telas = {
    inicio: {
        inicializa() {
            globais.flappybird = criarflappybird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            
            globais.flappybird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaDeTela(TelasDeJogo.inicio);
        },
        atualiza() {

        }
    }
}

const TelasDeJogo = {
    inicio: {
        desenha() {
            planoDeFundo.desenha();

            chao.desenha();
            globais.flappybird.desenha();

        },
        click() {
            globais.flappybird.pula();
        },
        atualiza() {
            globais.flappybird.atualiza();

        }
    }
}

function loop() {
    TelasAtiva.desenha()
    TelasAtiva.atualiza()
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (TelasAtiva.click) {
        TelasAtiva.click();
    }
});

mudaDeTela(Telas.inicio);
loop();
