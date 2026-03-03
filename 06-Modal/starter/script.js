'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

const openModal = btnText => {
  modal.classList.remove('hidden'); // modal 요소의 hidden 클래스 제거
  overlay.classList.remove('hidden'); // .은 선택자이기 때문에 제외하고 클래스명만 작성
  console.log(`\"${btnText}\" button is opened`);
};

const closeModal = () => {
  modal.classList.add('hidden'); // modal 요소에 hidden 클래스 추가
  overlay.classList.add('hidden');
  console.log('modal is closed');
};

console.log(btnsShowModal);
for (let i = 0; i < btnsShowModal.length; i++) {
  let btn = btnsShowModal[i];
  btn.addEventListener('click', () => openModal(btn.textContent));
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
    console.log('Escape key is pressed');
  }
});
