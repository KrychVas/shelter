document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Офіційні тексти + твої перевірені робочі назви файлів картинок
  const petsData = [
    {
      "name": "Jennifer",
      "img": "../../assets/image/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/image/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/image/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/image/pets-scarlet.png", // Твоя стара робоча назва
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/image/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/image/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/image/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/image/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];

  /* ==========================================================================
     БУРГЕР МЕНЮ
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
        <img class="popup__image" src="${pet.img}" alt="${pet.name}" />
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
        <img class="pet-card__img" src="${pet.img}" alt="${pet.name}" />
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