const mensagem = document.querySelector('.mensagem');
const pontuacao = document.querySelector('.pontuacao');
const buttons = document.querySelectorAll('button');
const pontuacoes = [0,0];
let erros = 0;

function testaPalavras(texto){
	return ["Pedra", "Papel", "Tesoura"].includes(texto);
}
 
for ( let i = 0 ; i < buttons.length ; i++){
	buttons[i].addEventListener('click', start);
}

function jogar(opcaoUsuario){

	if (testaPalavras(opcaoUsuario)){
        erros = 0;
            let opcaoComputador = Math.random();
    
        if (opcaoComputador < .34){
            opcaoComputador = 'Pedra';
        } else if (opcaoComputador <= .67){
            opcaoComputador = 'Papel';
        } else {
            opcaoComputador = 'Tesoura';
        }
        
        let resultado = verificarVencedor(opcaoUsuario, opcaoComputador);
    
        if (resultado === 'Jogador'){
            resultado += ' venceu!';
            pontuacoes[0]++;
        }
    
        if (resultado === 'Computador'){
            resultado += ' venceu!';
            pontuacoes[1]++;
        }
    
        if (resultado === 'Empate'){
            resultado += '. Empate!'
        }
    
        pontuacao.innerHTML = 'Jogador: [ ' + pontuacoes[0]+ ' ] Computador: [ ' + pontuacoes[1] + ' ]';
    
        //Imprime as opcoes selecionadas
        ImprimeResultado('Jogador: <strong>' + opcaoUsuario + '</strong> Computador: <strong>' + opcaoComputador + '</strong><br>' + resultado);
	} else {
        erros ++
        ImprimeResultado("Palavra não reconhecida, tente de novo. " + (erros))
        if (erros > 2) {
            alert("Você errou mais de 3 vezes, o jogo acabou!")
            recognition.stop()
            recognition.continuous = false;
        }
  }
}
 
function start(e){
	//obtem escolha do usuario
	let opcaoUsuario = e.target.innerText;
	
	jogar(opcaoUsuario);
}
 
function ImprimeResultado(texto){
	mensagem.innerHTML = texto;
}
 
function verificarVencedor(jogador, computador){
	if (jogador === computador){
		return 'Empate';
	}
	if (jogador === 'Pedra'){
		if(computador === 'Papel'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
	if (jogador === 'Papel'){
		if (computador === 'Tesoura'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
	if (jogador === 'Tesoura'){
		if (computador === 'Pedra'){
			return 'Computador';
		} else {
			return 'Jogador';
		}
	}
}
     
 
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
 
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
 
recognition.continuous = true;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 3;
 
//adiciona a pagina o evento de click para disparo da API
document.body.onload = function() {
  recognition.start();
  console.log('Diga algo.....');
}
 
recognition.onresult = function(event) {
  var last = event.results.length - 1;
  //Resultado recebido do comando de voz
  var texto = event.results[last][0].transcript;
  texto = texto.trim();
  texto = texto.charAt(0).toUpperCase() + texto.slice(1);
   console.log(texto);

  jogar(texto);
  
 
  console.log('Confidencia: ' + event.results[0][0].confidence);
}
 
recognition.onspeechend = function() {
  recognition.stop();
}
 
recognition.onerror = function(event) {
	console.log('Erro no reconhecimento do texto: ' + event.error);
}
