function timeRange(str) {
  return str.split("-").map((s) => {
    return s
      .split(":")
      .reverse()
      .reduce((a, x, i) => a + parseInt(x) * Math.pow(60, i), 0);
  });
}

function sa2kn(str) {
  return str
    .split("")
    .map((e) => {
      const p = e.charCodeAt(0);
      return String.fromCharCode(p >= 0x0900 && p <= 0x97f ? p + 0x380 : p);
    })
    .join("");
}

function kn2dv(str) {
  return str
    .split("")
    .map((e) => {
      const p = e.charCodeAt(0);
      return String.fromCharCode(p >= 0x0c80 && p <= 0xcff ? p - 0x380 : p);
    })
    .join("");
}

function playAudioInterval(interval) {
  console.log(interval);
}

class IntervalPlayer {
  constructor(audioElem) {
    this.player = audioElem;
    this.player.addEventListener("timeupdate", () => {
      if (this.player.currentTime >= this.playEnd) {
        this.player.pause();
        if (this.func) this.func(this.arg);
      }
    });
  }
  playInterval(interval, arg, func) {
    if (this.playStart == interval[0]) {
      if (this.player.paused) {
        this.player.currentTime = this.pauseTime;
        this.player.play();
      } else {
        this.pauseTime = this.player.currentTime;
        this.player.pause();
        if (this.func) this.func(this.arg);
      }
      this.playStart = player.currentTime;
      if (this.func) this.func(this.arg);
    } else {
      this.playStart = interval[0];
      this.playEnd = interval[1];
      if (this.func) this.func(this.arg);
      this.arg = arg;
      this.func = func;
      this.player.currentTime = interval[0];
      this.player.play();
    }
  }
  pause() {
    this.player.pause();
  }
}
