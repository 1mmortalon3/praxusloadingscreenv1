(function () {
  "use strict";

  var totalFiles = 0;
  var filesNeeded = 0;
  var tipIndex = 0;
  var trackIndex = 0;
  var tracks = ["./assets/loading-song.ogg", "./assets/pathway-to-nothing.ogg"];
  var tips = [
    "Respect roleplay boundaries and give other players room to build their stories.",
    "Use faction comms for tactical information and local chat for nearby roleplay.",
    "Your saber form matters—adapt your stance to the opponent in front of you.",
    "Capture objectives with your team; lone heroes are easy targets."
  ];

  var audio = document.getElementById("music");
  var soundButton = document.getElementById("sound-toggle");

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setSoundState(isPlaying) {
    soundButton.querySelector("span").textContent = isPlaying ? "◖))" : "◖×";
    soundButton.querySelector("b").textContent = isPlaying ? "MUSIC ON" : "ENABLE MUSIC";
    soundButton.setAttribute("aria-label", isPlaying ? "Mute music" : "Play music");
  }

  function playMusic() {
    var result = audio.play();
    if (result && typeof result.then === "function") {
      result.then(function () { setSoundState(true); }).catch(function () { setSoundState(false); });
    }
  }

  function updateProgress() {
    var completed = Math.max(0, totalFiles - filesNeeded);
    var progress = totalFiles > 0 ? Math.round((completed / totalFiles) * 100) : 0;
    setText("percentage", progress);
    setText("file-count", totalFiles > 0 ? completed.toLocaleString() + " / " + totalFiles.toLocaleString() + " FILES" : "SYNC PENDING");
    document.getElementById("progress-fill").style.width = progress + "%";
    document.getElementById("progress-track").setAttribute("aria-valuenow", progress);
  }

  window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode, volume) {
    if (serverName) setText("server-name", serverName);
    if (mapName) setText("map-name", mapName);
    if (steamId) setText("steam-id", steamId);
    if (gameMode) setText("game-mode", gameMode);
    if (Number.isFinite(Number(volume))) audio.volume = Math.max(0, Math.min(1, Number(volume)));
  };

  window.SetFilesTotal = function (value) {
    totalFiles = Math.max(0, Number(value) || 0);
    updateProgress();
  };

  window.SetFilesNeeded = function (value) {
    filesNeeded = Math.max(0, Number(value) || 0);
    updateProgress();
  };

  window.DownloadingFile = function (value) {
    var parts = String(value || "").replace(/\\/g, "/").split("/");
    setText("download-file", parts[parts.length - 1] || "Waiting for server content…");
  };

  window.SetStatusChanged = function (value) {
    if (value) setText("status", value);
  };

  audio.addEventListener("ended", function () {
    trackIndex = (trackIndex + 1) % tracks.length;
    audio.src = tracks[trackIndex];
    playMusic();
  });

  soundButton.addEventListener("click", function () {
    if (audio.paused) playMusic();
    else {
      audio.pause();
      setSoundState(false);
    }
  });

  window.setInterval(function () {
    tipIndex = (tipIndex + 1) % tips.length;
    setText("tip", tips[tipIndex]);
  }, 9000);

  playMusic();
})();
