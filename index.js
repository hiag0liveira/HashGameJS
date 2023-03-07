// Variáveis globais úteis
const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  // Inicializa as variáveis globais 
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'
  // Ajusta o título da página (caso seja necessário)
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updateTitle()
  // Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
 
  resetBoard()
}

function resetBoard() {
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
}

// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
  const winRegions = []
  if (isWinningRow(0))
    winRegions.push("0.0", "0.1", "0.2")
  if (isWinningRow(1))
    winRegions.push("1.0", "1.1", "1.2")
  if (isWinningRow(2))
    winRegions.push("2.0", "2.1", "2.2")
  if (isWinningColumn(0))
    winRegions.push("0.0", "1.0", "2.0")
  if (isWinningColumn(1))
    winRegions.push("0.1", "1.1", "2.1")
  if (isWinningColumn(2))
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

function isWinningRow(row) {
  return vBoard[row][0] && vBoard[row][0] === vBoard[row][1] && vBoard[row][0] === vBoard[row][2]
}

function isWinningColumn(column) {
  return vBoard[0][column] && vBoard[0][column] === vBoard[1][column] && vBoard[0][column] === vBoard[2][column]
}

// Desabilita uma região do tabuleiro para que não seja mais clicável
function disableRegion(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}
// Pinta as regiões onde o jogador venceu e mostra seu nome na tela
function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick(ev) {
  // Obtém os índices da região clicada
  const span = ev.currentTarget
  const [row, column] = span.dataset.region.split('.') // ["N", "N"]
  
  fillElementWithPlayerSymbol(span, row, column)
  
  // Limpa o console e exibe nosso tabuleiro virtual
  console.clear()
  console.table(vBoard)
  // Desabilita a região clicada
  disableRegion(span)
  // Verifica se alguém venceu
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    handleWin(winRegions)
  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    document.querySelector('h2').innerHTML = 'Empate!'
  }
}

function fillElementWithPlayerSymbol(el, row, column) {
  if (turnPlayer === 'player1') {
    el.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    el.innerText = 'O'
    vBoard[row][column] = 'O'
  }
}

// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)