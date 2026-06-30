document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Повна база даних прямо в JS для роботи попапів без fetch
  const petsData = [
    {
      "name": "Jennifer",
      "img": "pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is looking for a loving home to live in. She would love to play fetch with you all day long.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is gentle and affectionate, likes to purr and sit on your lap. She is very clean and well-behaved.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 years old Golden Retriever. He is energetic, friendly and loves outdoor activities. He gets along great with children and other pets.",
      "age": "3 years",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "pets-sophia.png",
      "type": "Dog",
      "breed": "Shih Tzu",
      "description": "Sophia is a small, charming girl with a big personality. She loves being the center of attention and will follow you everywhere. Perfect for apartment living.",
      "age": "1 month",
      "inoculations": ["bravacto"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "pets-timmy.png",
      "type": "Cat",
      "breed": "Bengal",
      "description": "Timmy is an active, playful Bengal kitten. He loves climbing high places and chasing toy mice. He needs an owner who can keep up with his high energy.",
      "age": "2 months",
      "inoculations": ["calicivirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Charly is a spirited Jack Russell. He has boundless energy and a strong hunting instinct. He requires consistent training and lots of mental stimulation.",
      "age": "8 months",
      "inoculations": ["bordeaux"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is Charly's sister, but much calmer. She loves cuddles and quiet walks in the park. She is very loyal and responds well to gentle guidance.",
      "age": "8 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a laid-back British Shorthair. He spends most of his day napping in sunny spots. He is quiet, independent and independent-minded.",
      "age": "2 years",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    }
  ];

  const imgPrefix = '../../assets/image/';

  /* ==========================================================================
     БЕНГЕР МЕНЮ
     ========================================================================== */
  const burgerButton = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav');
  let overlay = document.querySelector('.overlay') || document.createElement('div');
  
  if (!overlay.parentElement) {
    overlay.classList.add('overlay');
    body.appendChild(overlay);
  }

  const closeNavMenu = () => {
    if (navMenu) navMenu.classList.remove('open');
    if (burgerButton) burgerButton.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('lock');
  };

  if (burgerButton) {
    burgerButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu) navMenu.classList.toggle('open');
      burgerButton.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('lock');
    });
  }

  document.querySelectorAll('.nav__list li a').forEach(link => link.addEventListener('click', closeNavMenu));
  overlay.addEventListener('click', closeNavMenu);

  /* ==========================================================================
     МОДАЛЬНЕ ВІКНО (ПОПАП)
     ========================================================================== */
  let popup = document.querySelector('.popup') || document.createElement('div');
  if (!popup.parentElement) {
    popup.classList.add('popup');
    body.appendChild(popup);
  }

  function openModal(pet) {
    popup.innerHTML = `
      <div class="popup__wrapper">
        <button class="button-round popup__close">✕</button>
        <img class="popup__image" src="${imgPrefix + pet.img}" alt="${pet.name}" />
        <div class="popup__content">
          <h3 class="popup__title">${pet.name}</h3>
          <h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
          <p class="popup__text">${pet.description}</p>
          <ul class="popup__list">
            <li class="popup__item"><strong>Age:</strong> ${pet.age}</li>
            <li class="popup__item"><strong>Inoculations:</strong> ${pet.inoculations.join(', ')}</li>
            <li class="popup__item"><strong>Diseases:</strong> ${pet.diseases.join(', ')}</li>
            <li class="popup__item"><strong>Parasites:</strong> ${pet.parasites.join(', ')}</li>
          </ul>
        </div>
      </div>`;

    popup.classList.add('popup--open');
    overlay.classList.add('active');
    body.classList.add('lock');

    popup.querySelector('.popup__close').addEventListener('click', closeModal);
  }

  function closeModal() {
    popup.classList.remove('popup--open');
    if (!navMenu || !navMenu.classList.contains('open')) {
      overlay.classList.remove('active');
      body.classList.remove('lock');
    }
    popup.innerHTML = '';
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.pet-card');
    if (!card) return;
    e.preventDefault();
    const name = card.querySelector('.pet-card__name').textContent.trim();
    const pet = petsData.find((p) => p.name === name);
    if (pet) openModal(pet);
  });

  /* ==========================================================================
     СЛАЙДЕР ДЛЯ MAIN
     ========================================================================== */
  const carousel = document.querySelector('.pets__carousel');
  const btnLeft = document.querySelector('.button-arrow--left');
  const btnRight = document.querySelector('.button-arrow--right');

  if (!carousel) return;

  let currentGroup = [];
  let isAnimation = false;

  function getCount() {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function renderSlider(group) {
    carousel.innerHTML = group.map(pet => `
      <div class="pet-card">
        <img class="pet-card__img" src="${imgPrefix + pet.img}" alt="${pet.name}" />
        <h3 class="pet-card__name">${pet.name}</h3>
        <button class="button-secondary">Learn more</button>
      </div>
    `).join('');
  }

  function move() {
    if (isAnimation) return;
    isAnimation = true;

    const count = getCount();
    const currentNames = currentGroup.map(p => p.name);
    const available = petsData.filter(p => !currentNames.includes(p.name));
    const nextGroup = [...available].sort(() => Math.random() - 0.5).slice(0, count);

    carousel.style.opacity = '0';
    carousel.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
      renderSlider(nextGroup);
      carousel.style.opacity = '1';
      currentGroup = nextGroup;
      isAnimation = false;
    }, 300);
  }

  if (btnLeft) btnLeft.addEventListener('click', move);
  if (btnRight) btnRight.addEventListener('click', move);

  currentGroup = [...petsData].sort(() => Math.random() - 0.5).slice(0, getCount());
  renderSlider(currentGroup);
});