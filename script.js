const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const downButton = document.querySelector('.down-button');
const upButton = document.querySelector('.up-button');
const indicators = document.querySelectorAll('.indicator');
const slidesLength = slideRight.querySelectorAll('div').length;

let activeSlideIndex = 0;
let autoPlayInterval;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;

  if (direction === 'up') {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  } else if (direction === 'down') {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }

  slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  updateIndicators();
};

const updateIndicators = () => {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === activeSlideIndex);
  });
};

upButton.addEventListener('click', () => changeSlide('up'));
downButton.addEventListener('click', () => changeSlide('down'));

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    activeSlideIndex = index;
    changeSlide();
  });
});

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => changeSlide('up'), 3000);
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval);
};

sliderContainer.addEventListener('mouseenter', stopAutoPlay);
sliderContainer.addEventListener('mouseleave', startAutoPlay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    changeSlide('up');
  } else if (e.key === 'ArrowDown') {
    changeSlide('down');
  }
});

startAutoPlay();
