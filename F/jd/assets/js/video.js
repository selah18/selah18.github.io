<script>
  var videoPlayer = videojs('video-player');

  // Add a custom button to enter and exit full screen mode
  videoPlayer.controlBar.addChild('button', {
    text: 'Full Screen',
    className: 'vjs-fullscreen-button',
    clickHandler: function() {
      if (videoPlayer.isFullscreen()) {
        videoPlayer.exitFullscreen();
      } else {
        videoPlayer.requestFullscreen();
      }
    }
  });

  // Show and hide the custom play button based on the player state
  videoPlayer.on('play', function() {
    document.getElementById('play-button').style.display = 'none';
  });
  videoPlayer.on('pause', function() {
    document.getElementById('play-button').style.display = 'block';
  });

  // Add a click event listener to the custom play button
  document.getElementById('play-button').addEventListener('click', function() {
    videoPlayer.play();
  });
</script>
