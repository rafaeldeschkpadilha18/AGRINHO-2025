
let campoPersonagem, cidadePersonagem;
let itensCampo = [];
let itensCidade = [];
let scoreCampo = 0;
let scoreCidade = 0;
let numItens = 10;
let celebration = false;

function setup() {
  createCanvas(800, 400);
  
  // Personagem do campo (à esquerda)
  campoPersonagem = new Personagem(100, height / 2, color(34, 139, 34), "Campo");
  // Personagem da cidade (à direita)
  cidadePersonagem = new Personagem(width - 100, height / 2, color(169, 169, 169), "Cidade");
  
  // Criar itens do campo e cidade
  for (let i = 0; i < numItens; i++) {
    itensCampo.push(new Item(random(50, 300), random(50, 200), "semente"));
    itensCidade.push(new Item(random(500, 750), random(50, 200), "luz"));
  }
}

function draw() {
  background(135, 206, 235); // cor de fundo (céu)

  // Desenha o campo (lado esquerdo) e cidade (lado direito)
  fill(34, 139, 34); // Campo
  rect(0, 0, width / 2, height);
  
  fill(169, 169, 169); // Cidade
  rect(width / 2, 0, width / 2, height);

  // Exibe os itens do campo
  for (let i = itensCampo.length - 1; i >= 0; i--) {
    itensCampo[i].display();
    if (itensCampo[i].isClicked(mouseX, mouseY)) {
      itensCampo.splice(i, 1);
      scoreCampo++;
      updateScores();
    }
  }
  
  // Exibe os itens da cidade
  for (let i = itensCidade.length - 1; i >= 0; i--) {
    itensCidade[i].display();
    if (itensCidade[i].isClicked(mouseX, mouseY)) {
      itensCidade.splice(i, 1);
      scoreCidade++;
      updateScores();
    }
  }

  // Exibe os personagens
  campoPersonagem.display();
  cidadePersonagem.display();

  // Verifica se todos os itens foram coletados e exibe mensagem de celebração
  if (itensCampo.length === 0 && itensCidade.length === 0 && !celebration) {
    celebration = true;
    showCelebrationMessage();
  }
}

// Função chamada quando o mouse é clicado
function mousePressed() {
  // Verifica se algum item foi clicado
  for (let i = itensCampo.length - 1; i >= 0; i--) {
    if (itensCampo[i].isClicked(mouseX, mouseY)) {
      itensCampo.splice(i, 1);
      scoreCampo++;
      updateScores();
    }
  }

  for (let i = itensCidade.length - 1; i >= 0; i--) {
    if (itensCidade[i].isClicked(mouseX, mouseY)) {
      itensCidade.splice(i, 1);
      scoreCidade++;
      updateScores();
    }
  }
}

// Atualiza a pontuação na tela
function updateScores() {
  document.getElementById('scoreCampo').textContent = scoreCampo;
  document.getElementById('scoreCidade').textContent = scoreCidade;
}

// Exibe a mensagem de celebração
function showCelebrationMessage() {
  let celebrationMessage = document.getElementById('celebrationMessage');
  celebrationMessage.style.display = "block";
  setTimeout(() => {
    celebrationMessage.style.display = "none";
  }, 3000);
}

// Classe do Personagem
class Personagem {
  constructor(x, y, cor, tipo) {
    this.x = x;
    this.y = y;
    this.cor = cor;
    this.tipo = tipo;
  }

  display() {
    fill(this.cor);
    ellipse(this.x, this.y, 50, 50);
    textSize(16);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.tipo, this.x, this.y + 30);
  }
}

// Classe do Item (semente ou luz)
class Item {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.size = 30;
  }

  display() {
    if (this.tipo === "semente") {
      fill(255, 223, 0); // Amarelo para a semente
      ellipse(this.x, this.y, this.size * 2, this.size * 2);
    } else if (this.tipo === "luz") {
      fill(255, 0, 255); // Roxo para a luz
      ellipse(this.x, this.y, this.size * 2, this.size * 2);
    }
  }

  isClicked(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.size;
  }
}
