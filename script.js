
const notes = window.VAL_NOTES;
const board = document.getElementById('board');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const closeModal = document.getElementById('closeModal');
const letterFlower = document.getElementById('letterFlower');
const bloomMessage = document.getElementById('bloomMessage');
const flowers = ['🌼','🌻','🌸','🌺','🌷','🌿'];
const colors = ['#f8c8d8','#ffd7ba','#ffeaa5','#cfe7c6','#ddd0ff','#cfe9f6'];
const rotations = [-2, 1.5, -1, 2, -.8, 1, -1.6, .7];

let opened = JSON.parse(localStorage.getItem('valsDayOpened') || '[]');

function saveOpened(){
  localStorage.setItem('valsDayOpened', JSON.stringify(opened));
}

function shortText(text){
  return text.length > 78 ? text.slice(0, 78).trim() + '…' : text;
}

function makeTile(i){
  const btn = document.createElement('button');
  btn.className = 'tile';
  btn.type = 'button';
  btn.style.background = `linear-gradient(145deg, ${colors[i % colors.length]}, #fff4c9)`;
  btn.style.transform = `rotate(${rotations[i % rotations.length]}deg) translateY(${(i%4-1)*3}px)`;
  btn.dataset.flower = flowers[i % flowers.length];
  btn.innerHTML = `<span class="num">${i+1}</span><span class="preview">${shortText(notes[i])}</span>`;
  btn.setAttribute('aria-label', `Open note ${i+1}`);
  if(opened.includes(i+1)) btn.classList.add('opened');
  btn.addEventListener('click', () => openNote(i+1, btn));
  return btn;
}

function renderBoard(){
  board.innerHTML = '';
  for(let i=0;i<notes.length;i++) board.appendChild(makeTile(i));
}

function openNote(num, tile){
  modalText.textContent = notes[num-1];
  letterFlower.textContent = flowers[(num-1) % flowers.length];
  modal.classList.remove('hidden');
  if(!opened.includes(num)){
    opened.push(num);
    saveOpened();
  }
  tile.classList.add('opened');
  if(num === 31){
    setTimeout(() => {
      document.body.classList.add('bloom');
      bloomMessage.classList.remove('hidden');
    }, 500);
  }
}

function hideModal(){
  modal.classList.add('hidden');
}
closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', e => {
  if(e.target.classList.contains('modal-backdrop')) hideModal();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') hideModal();
});

document.getElementById('openWelcome').addEventListener('click', () => {
  document.getElementById('openWelcome').classList.add('hidden');
  document.getElementById('welcomeLetter').classList.remove('hidden');
});
document.getElementById('startBoard').addEventListener('click', () => {
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('boardSection').classList.remove('hidden');
  renderBoard();
});
renderBoard();
