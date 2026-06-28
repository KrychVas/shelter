document.addEventListener('DOMContentLoaded', () => {
  const getClientWidth = () => document.documentElement.clientWidth;
  
  // Елементи бургер-меню
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav');
  const body = document.body;

  // Динамічне створення глобального оверлею (якщо його немає)
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
  }

  // Динамічне створення попапу
  let popup = document.querySelector('.popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.classList.add('popup');
    body.appendChild(popup);
  }

  // Елементи слайдера
  const sliderPrevButton = document.querySelector('.button-arrow--left');
  const sliderNextButton = document.querySelector('.button-arrow--right');
  const sliderInner = document.querySelector('.pets__carousel');

  // Віртуальні контейнери для генерації слайдів
  const leftSet = document.createElement('div');
  const activeSet = sliderInner; 
  const rightSet = document.createElement('div');

  let petsData = [];
  let activeRandom = [];
  let leftRandom = [];
  let rightRandom = [];
  let isAnimationRunning = false;

  /* ==========================================================================
     БУРГЕР МЕНЮ (25 балів)
     ========================================================================== */
  function showMenu() {
    burger.classList.add('active');
    navMenu.classList.add('open');
    overlay.classList.add('active');
    body.classList.add('lock');
    burger.removeEventListener('click', showMenu);
    burger.addEventListener('click', closeMenu);
  }

  function closeMenu() {
    burger.classList.remove('active');
    navMenu.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('lock');
    burger.removeEventListener('click', closeMenu);
    burger.addEventListener('click', showMenu);
  }

  if (burger) burger.addEventListener('click', showMenu);
  overlay.addEventListener('click', closeMenu);

  if (navMenu) {
    navMenu.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'A' || evt.target.closest('a')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     ЗАВАНТАЖЕННЯ ДАНИХ З PETS.JSON
     ========================================================================== */
  async function loadPetsData() {
    try {
      // Шлях відносно розташування сторінки index.html
      const response = await fetch('../../assets/pets.json'); 
      if (!response.ok) {
        // Якщо відносний шлях не спрацював, спробуємо альтернативний
        const altResponse = await fetch('pets.json');
        petsData = await altResponse.json();
      } else {
        petsData = await response.json();
      }
      initSlider();
    } catch (error) {
      console.error('Помилка завантаження pets.json. Перевірте шлях до файлу!', error);
    }
  }

  /* ==========================================================================
     ЛОГІКА СЛАЙДЕРА (40 балів)
     ========================================================================== */
  function getRandomCards(number, valuesToExclude = []) {
    let cardSet = [];
    while (cardSet.length < number) {
      let randomCard = Math.floor(Math.random() * petsData.length);
      if (!cardSet.includes(randomCard) && !valuesToExclude.includes(randomCard)) {
        cardSet.push(randomCard);
      }
    }
    return cardSet;
  }

  function createCardSet(set, cardSet) {
    if (!set) return;
    set.innerHTML = '';
    for (let i = 0; i < cardSet.length; i++) {
      let card = document.createElement('div');
      card.classList.add('pet-card'); 
      card.setAttribute('data-number', cardSet[i]);

      let cardImage = document.createElement('img');
      cardImage.src = petsData[cardSet[i]].img;
      cardImage.alt = petsData[cardSet[i]].name;
      cardImage.classList.add('pet-card__img');
      card.append(cardImage);

      let cardTitle = document.createElement('h3');
      cardTitle.classList.add('pet-card__name');
      cardTitle.innerHTML = petsData[cardSet[i]].name;
      card.append(cardTitle);

      let cardButton = document.createElement('button');
      cardButton.classList.add('button-secondary');
      cardButton.innerHTML = 'Learn more';
      card.append(cardButton);

      set.append(card);
    }
  }

  function initSlider() {
    const width = getClientWidth();
    let cardsCount = width >= 1280 ? 3 : width >= 768 ? 2 : 1;

    activeRandom = getRandomCards(cardsCount);
    leftRandom = getRandomCards(cardsCount, activeRandom);
    rightRandom = getRandomCards(cardsCount, activeRandom);

    createCardSet(activeSet, activeRandom);
    createCardSet(leftSet, leftRandom);
    createCardSet(rightSet, rightRandom);
  }

  function moveLeft() {
    if (isAnimationRunning) return;
    isAnimationRunning = true;
    sliderInner.classList.add('transition-left');
  }

  function moveRight() {
    if (isAnimationRunning) return;
    isAnimationRunning = true;
    sliderInner.classList.add('transition-right');
  }

  if (sliderPrevButton) sliderPrevButton.addEventListener('click', moveLeft);
  if (sliderNextButton) sliderNextButton.addEventListener('click', moveRight);

  if (sliderInner) {
    sliderInner.addEventListener('animationend', (animationEvent) => {
      const width = getClientWidth();
      let cardsCount = width >= 1280 ? 3 : width >= 768 ? 2 : 1;

      if (animationEvent.animationName.includes('left') || sliderInner.classList.contains('transition-left')) {
        sliderInner.classList.remove('transition-left');
        activeSet.innerHTML = leftSet.innerHTML;
        activeRandom = leftRandom;
        
        leftRandom = getRandomCards(cardsCount, activeRandom);
        createCardSet(leftSet, leftRandom);
        rightRandom = getRandomCards(cardsCount, activeRandom);
        createCardSet(rightSet, rightRandom);
      } else {
        sliderInner.classList.remove('transition-right');
        activeSet.innerHTML = rightSet.innerHTML;
        activeRandom = rightRandom;

        rightRandom = getRandomCards(cardsCount, activeRandom);
        createCardSet(rightSet, rightRandom);
        leftRandom = getRandomCards(cardsCount, activeRandom);
        createCardSet(leftSet, leftRandom);
      }
      isAnimationRunning = false;
    });
  }

  /* ==========================================================================
     МОДАЛЬНЕ ВІКНО / POPUP (15 балів)
     ========================================================================== */
  function showPopup(cardNumber) {
    popup.classList.add('popup--open');
    body.classList.add('lock');
    overlay.classList.add('active');

    popup.innerHTML = `
      <div class="popup__wrapper">
        <button class="button-round popup__close">✕</button>
        <img class="popup__image" src="${petsData[cardNumber].img}" alt="${petsData[cardNumber].name}">
        <div class="popup__content">
          <h3 class="popup__title">${petsData[cardNumber].name}</h3>
          <h4 class="popup__subtitle">${petsData[cardNumber].type} - ${petsData[cardNumber].breed}</h4>
          <p class="popup__text">${petsData[cardNumber].description}</p>
          <ul class="popup__list">
            <li class="popup__item"><strong>Age:</strong> ${petsData[cardNumber].age}</li>
            <li class="popup__item"><strong>Inoculations:</strong> ${petsData[cardNumber].inoculations.join(', ')}</li>
            <li class="popup__item"><strong>Diseases:</strong> ${petsData[cardNumber].diseases.join(', ')}</li>
            <li class="popup__item"><strong>Parasites:</strong> ${petsData[cardNumber].parasites.join(', ')}</li>
          </ul>
        </div>
      </div>
    `;

    const closeBtn = popup.querySelector('.popup__close');
    const closePopup = () => {
      popup.classList.remove('popup--open');
      overlay.classList.remove('active');
      body.classList.remove('lock');
      popup.innerHTML = '';
    };

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
  }

  if (sliderInner) {
    sliderInner.addEventListener('click', (evt) => {
      const card = evt.target.closest('.pet-card');
      if (card) {
        showPopup(card.dataset.number);
      }
    });
  }

  // Запуск лоадера даних
  loadPetsData();
});