const video = document.querySelector('.experience__video');
const img = video.querySelector('.experience__img');
let iframe;

const createIframe = () => {
  iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = `${img.offsetHeight}px`;
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.setAttribute('src', `${video.dataset.href}?autoplay=1`);
  return iframe;
};

const replacePicture = () => {
  createIframe();
  video.innerHTML = '';
  video.appendChild(iframe);
  // video.classList.remove('experience__video--size');
};

video.addEventListener('click', (evt) => {
  evt.preventDefault();
  replacePicture();
});
