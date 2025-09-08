// Get DOM elements
const player = document.querySelector('.player');
const videoElement = player.querySelector('.viewer');
const progressContainer = player.querySelector('.progress');
const progressFill = player.querySelector('.progress__filled');
const playPauseBtn = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');

// Functions
const togglePlayback = () => {
  videoElement[videoElement.paused ? 'play' : 'pause']();
};

const updateToggleIcon = () => {
  const icon = videoElement.paused ? '►' : '❚ ❚';
  playPauseBtn.textContent = icon;
};

const skipVideo = function () {
  videoElement.currentTime += parseFloat(this.dataset.skip);
};

const updateRange = function () {
  videoElement[this.name] = this.value;
};

const updateProgress = () => {
  const percentComplete = (videoElement.currentTime / videoElement.duration) * 100;
  progressFill.style.flexBasis = `${percentComplete}%`;
};

const scrubTo = (e) => {
  const scrubTime = (e.offsetX / progressContainer.offsetWidth) * videoElement.duration;
  videoElement.currentTime = scrubTime;
};

// Event listeners
videoElement.addEventListener('click', togglePlayback);
videoElement.addEventListener('play', updateToggleIcon);
videoElement.addEventListener('pause', updateToggleIcon);
videoElement.addEventListener('timeupdate', updateProgress);

playPauseBtn.addEventListener('click', togglePlayback);
skipBtns.forEach(btn => btn.addEventListener('click', skipVideo));
sliders.forEach(slider => {
  slider.addEventListener('change', updateRange);
  slider.addEventListener('mousemove', updateRange);
});

let isMouseDown = false;
progressContainer.addEventListener('click', scrubTo);
progressContainer.addEventListener('mousemove', (e) => isMouseDown && scrubTo(e));
progressContainer.addEventListener('mousedown', () => isMouseDown = true);
progressContainer.addEventListener('mouseup', () => isMouseDown = false);
