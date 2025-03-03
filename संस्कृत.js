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
      return String.fromCharCode(
        p >= 0x0900 && p <= 0x97f && p != 0x0964 && p != 0x965 ? p + 0x380 : p,
      );
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

class IntervalPlayer {
  constructor(audioElem, timeTable, onpause, onplay) {
    this.player = audioElem;
    this.timeTable = timeTable;
    this.onpause = onpause;
    this.onplay = onplay;
  }

  findRef(time) {
    return this.timeTable.find((x) => x.interval[1] >= time);
  }

  cancelTimer() {
    if (typeof this.timer === "number") {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  onTimeout(obj) {
    obj.cancelTimer();
    if (obj.playall) {
      if (obj.ref) obj.onpause(obj.ref);
      const rec = obj.findRef(obj.player.currentTime);
      console.log(
        `${obj.player.currentTime}: ${rec.interval[0]} ${rec.interval[1]}`,
      );
      obj.ref = rec.ref;
      obj.onplay(obj.ref);
      obj.ref.scrollIntoView({ behavior: "smooth", block: "center" });
      obj.timer = setTimeout(
        obj.onTimeout,
        1000 * (rec.interval[1] - obj.player.currentTime),
        obj,
      );
    } else {
      obj.pausePlayer();
      obj.ref = null;
    }
  }

  playPlayer(rec, start) {
    this.cancelTimer();
    let st = start || rec.interval[0];
    this.player.currentTime = st;
    this.player.play();
    this.ref = rec.ref;
    this.onplay(rec.ref);
    this.timer = setTimeout(
      this.onTimeout,
      1000 * (rec.interval[1] - st),
      this,
    );
  }

  pausePlayer() {
    this.cancelTimer();
    this.playPause = this.player.currentTime;
    this.player.pause();
    this.onpause(this.ref);
  }

  playInterval(idx) {
    this.playall = false;
    console.log("playall:F");
    const rec = this.timeTable[idx];
    if (this.ref === rec.ref) {
      if (this.player.paused && this.playPause) {
        this.playPlayer(rec, this.playPause);
        this.playPause = undefined;
      } else {
        this.pausePlayer();
      }
    } else {
      this.playPlayer(rec);
    }
  }

  setPlayAll(val, idx) {
    console.log("playall:Y");
    this.playall = val;
    if (val) {
      const rec = this.timeTable[idx];
      if (this.ref === rec.ref) {
        this.playPlayer(rec, this.playPause);
      } else {
        this.playPlayer(rec);
      }
    }
  }

  pause() {
    this.pausePlayer();
  }
}
