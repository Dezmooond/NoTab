const slider = document.querySelector('.slider')
const sliderContainer = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsParent = document.querySelector('.dots');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const SLIDE_TIME = 4000;

let slideInterval = setInterval(startInterval, SLIDE_TIME);

let isAnimationActive = false;

let currentSlideIndex = 0;
const visibleSlidesCount = 3;

if (visibleSlidesCount > slides.length) {
  console.error('Произошла ошибка: количество выводимых изображений больше количества добавленных');
}

slides.forEach((slide, index) => {
  slide.style.flexBasis = `calc(100% / ${visibleSlidesCount})`;

  slide.style.order = (index + 1) % (slides.length);

  slide.style.opacity = 0.5;
});

slides[currentSlideIndex].style.opacity = 1;

for (let i = 0; i < slides.length - 1; i++) {
  const divNotActiveDot = document.createElement('span');

  divNotActiveDot.className = 'dot';
  
  dotsParent.appendChild(divNotActiveDot);
}

prevButton.addEventListener('click', () => {
  if (isAnimationActive) {
    return;
  }

  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  updateSlider();
});

nextButton.addEventListener('click', () => {
  if (isAnimationActive) {
    return;
  }

  currentSlideIndex++;

  if (currentSlideIndex > slides.length - 1) {
    currentSlideIndex = 0;
  }

  updateSlider();
});

const dots = document.querySelectorAll('.dot');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (isAnimationActive) {
      return;
    }

    currentSlideIndex = index;

    updateSlider();
  });
});

function updateSlider() {
  if (isAnimationActive) {
    clearInterval(slideInterval);
    slideInterval = setInterval(startInterval, SLIDE_TIME);
    return;
  }
  slides.forEach((slide, index) => {
    const slideOrder = (index - currentSlideIndex + slides.length + 1) % slides.length;
    let opacity = 0.3;

    slide.style.order = slideOrder;
    slide.style.opacity = opacity;

    let fadeInInterval = setInterval(()=> {
      opacity += 0.05;
      slide.style.opacity = opacity;

      isAnimationActive = true;

      if(index !== currentSlideIndex && opacity >=0.3 || opacity >= 1) {
        isAnimationActive = false;

        clearInterval(fadeInInterval);
      }
    }, 50)
  });

  updateDots(currentSlideIndex);
}

function updateDots(dotIndex) {
  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  dots[dotIndex].classList.add('active');
}

function startInterval() {
  if (isAnimationActive) {
    return;
  }

  currentSlideIndex++;

  if (currentSlideIndex > slides.length - 1) {
    currentSlideIndex = 0;
  }

  updateSlider();
}

slider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
  slideInterval = setInterval(startInterval, SLIDE_TIME);
});