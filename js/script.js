"use strict";

const menuEls = document.querySelectorAll('nav > ul > li');
const submenuEls = document.querySelectorAll('.sub');

menuEls.forEach(menu => {

  menu.addEventListener('mouseover', () => {
    // const menuEl = menu.querySelector('a');
    // menuEl.style.background = '#333';

    submenuEls.forEach(submenu => {
      submenu.style.visibility = 'visible';
      submenu.style.height = '160px';
    });
  });

  menu.addEventListener('mouseout', () => {

    submenuEls.forEach(submenu => {
      submenu.style.visibility = 'hidden';
      submenu.style.height = '0';
    });
  })
})

// slide
const slide = document.querySelector('.slide');
let slideItemEls = slide.querySelectorAll('.slide-item');
const slideCount = slideItemEls.length;
const slideHeight = slide.clientHeight;
let current = 1;

const firstSlideItemClone = slideItemEls[0].cloneNode(true);
const lastSlideItemClone = slideItemEls[slideCount - 1].cloneNode(true);

slideItemEls[0].before(lastSlideItemClone);
slideItemEls[slideCount - 1].after(firstSlideItemClone);

slideItemEls = slide.querySelectorAll('.slide-item');
slideItemEls.forEach(slideItem => {
  slideItem.style.top = `${-slideHeight}px`;
});

const nextMove = () => {

  if (++current <= slideCount) {
    slideItemEls.forEach(slideItem => {
      slideItem.style.transition = 'top .5s';
      slideItem.style.top = `${-current * slideHeight}px`;
    });
  }
  else {
    /* 첫페이지로 이동 */
    current = 0;
    slideItemEls.forEach(slideItem => {
      slideItem.style.transition = 'top 0s';
      slideItem.style.top = `${-(current) * slideHeight}px`;
    });
    current = 1;
    setTimeout(() => {
      slideItemEls.forEach(slideItem => {
        slideItem.style.transition = 'top .5s';
        slideItem.style.top = `${-current * slideHeight}px`;
      }); 
    }, 100);
  }
}

let loopInterval = setInterval(nextMove, 3000);

slide.addEventListener('mouseover', () => clearInterval(loopInterval));
slide.addEventListener('mouseout', () => loopInterval = setInterval(nextMove, 3000));


// tab
const tabEls = document.querySelectorAll('.tab > div');
const tabNameEls = document.querySelectorAll('.tab > div > .tab-name');

tabNameEls.forEach(tabNameEl => tabNameEl.addEventListener('click', (event) => {
  tabEls.forEach(tabEl => tabEl.classList.remove('active'));
  event.target.parentElement.classList.add('active');
}));

// notice popup
const noticeEls = document.querySelectorAll('.notice .tab-content > div');
const popupWrapEl = document.querySelector('.popup-wrap');
const popupEl = popupWrapEl.querySelector('.popup');
const popupCloseBtn = popupEl.querySelector('.close');
const shadowEl = popupWrapEl.querySelector('.shadow');

const showPopup = (event) => {
  event.stopPropagation();
  popupWrapEl.classList.add('active')
}
const hidePopup = (event) => {
  event.stopPropagation();
  popupWrapEl.classList.remove('active')  
}

noticeEls.forEach(notice => {
  notice.addEventListener('click',showPopup);
});


popupCloseBtn.addEventListener('click', hidePopup);
shadowEl.addEventListener('click', hidePopup);