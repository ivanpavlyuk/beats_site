window.addEventListener('load', e => {

  const player = document.querySelector('.player');
  const video = document.querySelector('video');
  const bigPlayButton = document.querySelector('.player__play');
  const smallPlayButton = document.querySelector('.player__controls-play');
  const progress = document.querySelectorAll('.player__controls-progress');
  const previous = document.querySelectorAll('.player__controls-previous');
  const muteButton = document.querySelector('.player__controls-mute');
  const positionBar = progress[0];
  const volumeBar = progress[1];
  let isPlayerActive = false;
  let isVideoPaused = false;
  let isMuted = false;

  function setVolume() {
    video.volume = volumeBar.value / 10;
    setBarPreviousWidth(volumeBar);
  }

  function muteVideo() {
    video.muted = true;
    isMuted = true;
  }

  function unMuteVideo() {
    video.muted = false;
    isMuted = false;
  }

  function setPlayerInactive() {
    player.classList.remove('player_active');
    positionBar.value = 0;
    volumeBar.value = 5;
    positionBar.max = Math.round(video.duration);
    positionBar.disabled = true;
    isPlayerActive = false;
    setBarPreviousWidth(positionBar);
    unMuteVideo();
    setVolume();
  }

  function setPlayerActive() {
    player.classList.add('player_active');
    positionBar.disabled = false;
    isPlayerActive = true;
  }

  function setBarPreviousWidth(element) {
    element.previousElementSibling.style.width = element.value / element.max * 100 + '%';
  }

  function playVideo() {
    video.addEventListener('timeupdate', () => {
      positionBar.value = Math.round(video.currentTime);
      setBarPreviousWidth(positionBar);
    });
    positionBar.addEventListener('input', e => {
      video.currentTime = positionBar.value;
      setBarPreviousWidth(positionBar);
    });
    video.play();
    video.classList.remove('video_paused');
    isVideoPaused = false;
  }

  function pauseVideo() {
    video.pause();
    video.classList.add('video_paused');
    isVideoPaused = true;
  }

  console.log('ok');

  setPlayerInactive();
  bigPlayButton.addEventListener('click', e => {
    setPlayerActive();
    playVideo();
  });

  smallPlayButton.addEventListener('click', e => {
    if (!isPlayerActive) {
      setPlayerActive();
      playVideo();
    } else if (isPlayerActive && isVideoPaused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  video.addEventListener('ended', e => {
    setPlayerInactive();
  });

  muteButton.addEventListener('click', e => {
    if (isMuted) {
      unMuteVideo();
    } else {
      muteVideo();
    }
  });

  volumeBar.addEventListener('input', e => {
    setVolume();
  });

});