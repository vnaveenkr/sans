const caretToLineBeg = () => {
  // let div = document.querySelector("#test1");
};

const vimode = Object.freeze({ normal: 0, insert: 1, command: 2 });

const escMethods = {
  // Digit0: caretToLineBeg,
};

const Editor3l_keyMap = {
  kn: {
    KeyA: ["ಾ", "ಆ", "ಅ", ""],
    KeyB: ["ಬ", "ಭ", "", ""],
    KeyC: ["ಚ", "ಛ", "", ""],
    KeyD: ["ದ", "ಧ", "", ""],
    KeyE: ["ೆ", "ೇ", "ಎ", "ಏ"],
    KeyF: ["್", "ೄ", "ೠ", "​"],
    KeyG: ["ಗ", "ಘ", "", "ꣳ"],
    KeyH: ["ಹ", "ಃ", "ೱ", ""],
    KeyI: ["ಿ", "ೀ", "ಇ", ""],
    KeyJ: ["ಜ", "ಝ", "", ""],
    KeyK: ["ಕ", "ಖ", "", ""],
    KeyL: ["ಲ", "ಳ", "ೢ", ""],
    KeyM: ["ಮ", "ಂ", "ಽ", ""],
    KeyN: ["ನ", "ಣ", "", ""],
    KeyO: ["ೊ", "ೋ", "ಒ", ""],
    KeyP: ["ಪ", "ಫ", "", ""],
    KeyQ: ["ಟ", "ಠ", "", ""],
    KeyR: ["ರ", "ೃ", "ಋ", ""],
    KeyS: ["ಸ", "ಶ", "", ""],
    KeyT: ["ತ", "ಥ", "", ""],
    KeyU: ["ು", "ೂ", "ಉ", ""],
    KeyV: ["ವ", "ೌ", "ಔ", ""],
    KeyW: ["ಡ", "ಢ", "", ""],
    KeyX: ["ಷ", "಼", "ೞ", ""],
    KeyY: ["ಯ", "ೈ", "ಐ", ""],
    KeyZ: ["ಞ", "ಙ", "", ""],
    Minus: ["-", "_", "॒", ""],
    Digit1: ["", "", "", ""],
    Digit2: ["", "", "", ""],
    Digit3: ["", "", "", ""],
    Digit4: ["", "", "", "₹"],
    Digit5: ["", "", "", ""],
    Digit6: ["", "", "", ""],
    Digit7: ["", "", "", ""],
    Digit8: ["", "", "", ""],
    Digit9: ["", "", "", ""],
    Digit0: ["", "", "", ""],
    Quote: ["'", '"', "॑", "᳚"],
    Backslash: ["\\", "|", "।", "॥"],
  },
  sa: {
    KeyA: ["ा", "आ", "अ", "ॲ"],
    KeyB: ["ब", "भ", "", ""],
    KeyC: ["च", "छ", "", ""],
    KeyD: ["द", "ध", "", ""],
    KeyE: ["ॆ", "े", "ऎ", "े"],
    KeyF: ["्", "ॄ", "ॠ", ""],
    KeyG: ["ग", "घ", "", ""],
    KeyH: ["ह", "ः", "", ""],
    KeyI: ["ि", "ी", "इ", "ई"],
    KeyJ: ["ज", "झ", "", ""],
    KeyK: ["क", "ख", "", ""],
    KeyL: ["ल", "ळ", "", ""],
    KeyM: ["म", "ं", "", ""],
    KeyN: ["न", "ण", "", ""],
    KeyO: ["ॊ", "ो", "ऒ", "ओ"],
    KeyP: ["प", "फ", "फ़", ""],
    KeyQ: ["ट", "ठ", "", ""],
    KeyR: ["र", "ृ", "ऋ", "ऱ"],
    KeyS: ["स", "श", "", ""],
    KeyT: ["त", "थ", "", ""],
    KeyU: ["ु", "ू", "उ", "ऊ"],
    KeyV: ["व", "ौ", "", ""],
    KeyW: ["ड", "ढ", "ड", "ढ"],
    KeyX: ["ष", "़", "", ""],
    KeyY: ["य", "ै", "ऐ", "य़"],
    KeyZ: ["ञ", "ङ", "", ""],
  },
  en: {},
};

const Editor3l_style = `
    .editwin {
      position: absolute;
      left: 100px;
      top: 50px;
      font-family: "Tiro", serif;
      display: grid;
      grid-template-rows: 25px minmax(100px, auto) 25px;
      grid-template-columns: 60px auto;
      width: 50%;
      height:50%;
      resize: both;
      border: 3px solid var(--border-dark);
      overflow: hidden;
    }
    .toppane {
      grid-area: 1 / 1 / 2 / 3;
      display: grid;
      grid-template-columns: 75px auto 50px;
      background-color: var(--bg-normal);
      height: 100%;
      cursor: move;
    }
    .bottompane {
      grid-area: 3 / 1 / 4 / 3;
    }
    .bottompane input {
      border: 1px solid var(--border-light);
      width: 100%;
    }
    .linenum {
      grid-area: 2 / 1 / 3 / 2;
      background-color: var(--text-bg-dark);
      border: none;
    }
    .editarea {
      grid-area: 2 / 2 / 3 / 3;
      font-family: "Tiro Devanagari Sanskrit", serif;
      font-weight: 400;
      font-style: normal;
      white-space: pre-wrap;
      background-color: var(--text-bg-light);
      overflow:scroll;
      border: 1px solid var(--border-normal);
      border: none;
      overflow: scroll;
      scrollbar-color: var(--bg-dark) var(--bg-normal) ;
    }
    .editarea:focus, .bottompane input {
      outline: none;
    }
    .toppane button {
      background-color: var(--bg-normal);
      color: white;
      border: none;
      cursor: pointer;
      height: 100%;
      width: 25px;
      user-select: none;
      }
    .btn-right {
      margin-left: auto;
    }
    .win-title {
      text-align: center;
      color: var(--fg-dark)
      height: 25px;
    }
    .btn-grp-lang {
      display: flex;
    }
    .btn-grp-right {
      display: flex;
    }
    `;

class Editor3L extends HTMLElement {
  static winInstances = [];
  static observedAttributes = ["data-title"];
  #shadow;
  #state = {
    lang: "en",
    esc: false,
    mode: vimode.normal,
  };
  #dragState = { isValid: false, parentPos: [0, 0], childPos: [0, 0] };
  constructor() {
    super();
  }

  connectedCallback() {
    this.#shadow = this.attachShadow({ mode: "open" });
    const editwin = document.createElement("div");
    editwin.setAttribute("class", "editwin");
    // editwin.setAttribute("draggable", "true");
    const win_title = this.getAttribute("data-title") || "No-Name";
    editwin.innerHTML = `
      <div class="linenum"></div>
      <div class="toppane">
        <div class="btn-grp-lang">
          <button data-lang="sa">ॐ</button>
          <button data-lang="kn">ಅ</button>
          <button data-lang="en">A</button>
        </div>
        <div class="win-title">${win_title}</div>
        <div class="btn-grp-right">
          <button class="button-move btn-right">✥</button>
          <button class="button-close btn-right">✕</button>
        </div>
      </div>
      <div class="editarea" contenteditable="true" autocomplte="off"></div>
      <div class="bottompane">
        <input class="comarea"></input>
      </div>
      `;
    const style = document.createElement("style");
    style.textContent = Editor3l_style;
    this.#shadow.appendChild(style);
    this.#shadow.appendChild(editwin);

    const styles = getComputedStyle(document.documentElement);
    const back_dark = styles.getPropertyValue("--bg-dark");
    const back_normal = styles.getPropertyValue("--bg-normal");
    this.#shadow.querySelectorAll(".btn-grp-lang > button").forEach((elem) => {
      elem.style.setProperty(
        "background-color",
        elem.getAttribute("data-lang") == this.#state.lang
          ? back_dark
          : back_normal,
      );
      elem.addEventListener("click", (event) => {
        const parent = event.target.parentElement;
        [...parent.children].forEach((e) => {
          e.style.setProperty("background-color", back_normal);
        });
        event.target.style.setProperty("background-color", back_dark);
        this.#state.lang = event.target.getAttribute("data-lang");
        this.#shadow.querySelector(".editarea").focus();
      });
    });

    {
      const div = this.#shadow.querySelector(".editarea");
      div.addEventListener("keydown", (e) => this.keyDown(e));
      div.addEventListener("keyup", (e) => this.keyUp(e));
      div.addEventListener("click", (e) => this.keyClick(e));
    }

    {
      const div = this.#shadow.querySelector(".win-title");
      div.addEventListener("mouseenter", (e) =>
        this.#shadow
          .querySelector(".editwin")
          .setAttribute("draggable", "true"),
      );
      div.addEventListener("mouseleave", (e) =>
        this.#shadow
          .querySelector(".editwin")
          .setAttribute("draggable", "false"),
      );
    }

    {
      const div = editwin.addEventListener("click", (e) => this.bringFront2(e));
      editwin.addEventListener("dragstart", (e) => this.dragStart(e));
      editwin.addEventListener("dragend", (e) => this.dragEnd(e));
      Editor3L.winInstances.push(editwin);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} ${oldValue} ${newValue}`);
    switch (name) {
      case "data-title":
        if (oldValue)
          this.#shadow.querySelector(".win-title").innerHTML = newValue;
        break;
    }
  }

  setContent(content) {
    this.#shadow.querySelector(".editarea").textContent = content;
    // this.#shadow.querySelector(".editarea").innerHTML = content;
  }

  insertTypedText(html) {
    let range = window.getSelection().getRangeAt(0);
    const frag = range.createContextualFragment(html);
    range.insertNode(frag);
    range.collapse(false);
  }

  clr_esc() {}

  keyDown(e) {
    let div = this.#shadow.querySelector(".editarea");
    let start = div.selectionStart;
    let end1 = div.selectionEnd;

    console.log(e.code);
    if (e.code === "Escape") {
      if (this.#state.esc) {
        this.clr_esc();
      } else {
        this.#state.esc = true;
        console.log(this.#state.esc);
      }
    } else if (
      this.#state.esc &&
      this.#state.mode == null &&
      e.code === "Semicolon"
    ) {
      console.log("hi");
      this.#shadow.querySelector(".comarea").innerHTML = ":";
      this.#shadow.querySelector(".comarea").focus();
      this.#state.mode = "command";
    }

    if (
      this.#state.lang &&
      e.code in Editor3l_keyMap[this.#state.lang] &&
      !e.getModifierState("Control")
    ) {
      e.preventDefault();
      e.stopPropagation();
      let idx = 0;
      if (e.getModifierState("Shift")) idx += 1;
      if (e.getModifierState("Alt")) idx += 2;
      this.insertTypedText(Editor3l_keyMap[this.#state.lang][e.code][idx]);
    }
  }

  keyClick(e) {
    let range;
    let textNode;
    let offset;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(e.clientX, e.clientY);
      textNode = range.startContainer;
      offset = range.startOffset;
    } else if (document.caretPositionFromPoint) {
      range = document.caretPositionFromPoint(e.clientX, e.clientY);
      textNode = range.offsetNode;
      offset = range.offset;
    }
  }

  keyDir() {
    let div = this.#shadow.querySelector(".editarea");
    let start = div.selectionStart;
    if (typeof keyDir.last == "undefined") keyDir.last = 0;
    console.log(`keydir: ${start} ${start - keyDir.last}`);
    keyDir.last = start;
  }

  keyUp(e) {
    // console.log(`up: ${e.key}`);
  }

  setCaretPos(idx) {
    const tag = this.#shadow.querySelector(".editarea");
    const setpos = document.createRange();
    const set1 = window.getSelection();
    setpos.setStart(tag.childNodes[0], idx);
    setpos.collapse(true);
    set1.removeAllRanges();
    set1.addRange(setpos);
    tag.focus();
  }

  bringFront(elem) {
    Editor3L.winInstances.forEach((w) => {
      w.style.zIndex = "1";
    });
    elem.style.zIndex = "2";
  }

  bringFront2(e) {
    e.preventDefault();
    e.stopPropagation();
    this.bringFront(e.currentTarget);
  }

  dragStart(e) {
    console.log(
      `start current: ${e.currentTarget.classList} target: ${e.target.classList}`,
    );
    console.log(
      this.#shadow
        .elementFromPoint(e.clientX, e.clientY)
        .classList.contains("win-title"),
    );

    if (
      this.#shadow
        .elementFromPoint(e.clientX, e.clientY)
        .classList.contains("win-title")
    ) {
      console.log("handling");
      // e.preventDefault();
      // e.stopPropagation();
      const s = this.#dragState;
      const style = getComputedStyle(e.target);
      s.parentPos[0] = parseInt(style.left);
      s.parentPos[1] = parseInt(style.top);
      s.childPos[0] = e.pageX;
      s.childPos[1] = e.pageY;
      s.isValid = true;
    }
  }

  dragEnd(e) {
    console.log(
      `end current: ${e.currentTarget.classList} target: ${e.target.classList}`,
    );
    console.log("handling");
    // e.preventDefault();
    // e.stopPropagation();
    const s = this.#dragState;
    if (s.isValid) {
      s.parentPos[0] += e.pageX - s.childPos[0];
      s.parentPos[1] += e.pageY - s.childPos[1];
      if (s.parentPos[0] >= 0 && s.parentPos[1] >= 0) {
        e.target.style.left = s.parentPos[0] + "px";
        e.target.style.top = s.parentPos[1] + "px";
      }
      s.isValid = false;
    }
    this.bringFront(e.target);
  }
}
customElements.define("editor-3l", Editor3L);
