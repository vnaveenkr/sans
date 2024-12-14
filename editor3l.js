const caretToLineBeg = () => {
  // let div = document.querySelector("#test1");
};

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
  special: {},
};

const Editor3l_style = `
    .editwin {
      position: absolute;
      left: 100px;
      top:50px;
      font-family: "Tiro", serif;
      display: grid;
      grid-template-rows: 25px minmax(100px, auto) 25px;
      grid-template-columns: 60px auto;
      width: 50%;
      height:50%;
      resize: both;
      border: 3px solid #f90;
      overflow: hidden;
    }
    .toppane {
      grid-area: 1 / 1 / 2 / 3;
      display: grid;
      grid-template-columns: 75px auto 50px;
      background-color: #f90;
      height: 100%;
    }
    .bottompane {
      grid-area: 3 / 1 / 4 / 3;
    }
    .bottompane input {
      border: 1px solid #f90;
      width: 100%;
    }
    .linenum {
      grid-area: 2 / 1 / 3 / 2;
      background-color: #eee;
      border: none;
    }
    .editarea {
      grid-area: 2 / 2 / 3 / 3;
      font-family: "Tiro Devanagari Sanskrit", serif;
      font-weight: 400;
      font-style: normal;
      white-space: pre-wrap;
      overflow:scroll;
      border: 1px solid #f90;
      border: none;
      overflow: scroll;
      scrollbar-color: #f00 #840 ;
    }
    .editarea:focus, .bottompane input {
      outline: none;
    }
    .toppane button {
      background-color: #900;
      color: white;
      border: none;
      cursor: pointer;
      height: 100%;
      width: 25px;
    }
    .btn-right {
      margin-left: auto;
    }
    .win-title {
      text-align: center;
      color: #900;
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
  #shadow;
  #state = {
    lang: "en",
    esc: false,
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.#shadow = this.attachShadow({ mode: "open" });
    const editwin = document.createElement("div");
    editwin.setAttribute("class", "editwin");
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
        <input></input>
      </div>
      `;
    const style = document.createElement("style");
    style.textContent = Editor3l_style;
    this.#shadow.appendChild(style);
    this.#shadow.appendChild(editwin);

    this.#shadow.querySelectorAll(".btn-grp-lang > button").forEach((elem) => {
      elem.addEventListener("click", (event) => {
        const parent = event.target.parentElement;
        [...parent.children].forEach((e) => {
          e.style.setProperty("background-color", "#887");
        });
        event.target.style.setProperty("background-color", "#900");
        this.#state.lang = event.target.getAttribute("data-lang");
        this.#shadow.querySelector(".editarea").focus();
      });
    });

    let div = this.#shadow.querySelector(".editarea");
    div.addEventListener("keydown", (e) => this.keyDown(e));
    div.addEventListener("keyup", (e) => this.keyUp(e));
    div.addEventListener("click", (e) => this.keyClick(e), false);
  }

  insertTypedText(html) {
    let range = window.getSelection().getRangeAt(0);
    const frag = range.createContextualFragment(html);
    range.insertNode(frag);
    range.collapse(false);
  }

  keyDown(e) {
    let div = this.#shadow.querySelector(".editarea");
    let start = div.selectionStart;
    let end1 = div.selectionEnd;

    if (e.code in Editor3l_keyMap.special) {
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
    } else {
      // div.setRangeText(e.key);
      // div.setRangeText(e.key);
      // div.setSelectionRange(start+1, end1+1);
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
    console.log(`node: ${textNode.id}: offset: ${offset}`);
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
}
customElements.define("editor-3l", Editor3L);
