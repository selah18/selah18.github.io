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
</script>
