const floatwinStyle = `
    .editwin {
      position: absolute;
      display: grid;
      grid-template-rows: 25px 1fr;
      grid-template-columns: 1fr;
      resize: both;
      border: 3px solid var(--border-dark);
      overflow: hidden;
    }
    .toppane {
      grid-area: 1 / 1 / 2 / 2;
      background-color: var(--bg-normal);
      cursor: move;
    }
    .editarea {
      grid-area: 2 / 1 / 3 / 2;
      background-color: var(--fg-light);
      border: none;
    }
    .win-title {
      text-align: center;
      color: var(--fg-dark);
      height: 25px;
    }
    `;

class FloatingWin extends HTMLElement {
  static winInstances = [];
  static observedAttributes = ["data-title"];
  #shadow;
  #dragState = { isValid: false, parentPos: [0, 0], childPos: [0, 0] };
  constructor() {
    super();
  }

  connectedCallback() {
    this.#shadow = this.attachShadow({ mode: "open" });
    const editwin = document.createElement("div");
    editwin.setAttribute("class", "editwin");
    const winTitle = this.getAttribute("data-title") || "No-Name";
    editwin.innerHTML = `
      <div class="toppane">
        <div class="toppane-left"></div>
        <div class="win-title">${winTitle}</div>
        <div class="toppane-right"></div>
      </div>
      <div class="editarea"></div>
      `;
    const style = document.createElement("style");
    style.textContent = floatwinStyle;
    this.#shadow.appendChild(style);
    this.#shadow.appendChild(editwin);

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
      editwin.addEventListener("click", (e) => this.bringFront2(e));
      editwin.addEventListener("dragstart", (e) => this.dragStart(e));
      editwin.addEventListener("dragend", (e) => this.dragEnd(e));
      FloatingWin.winInstances.push(editwin);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "data-title":
        if (oldValue)
          this.#shadow.querySelector(".win-title").innerHTML = newValue;
        break;
    }
  }

  bringFront(elem) {
    FloatingWin.winInstances.forEach((w) => {
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
    if (
      this.#shadow
        .elementFromPoint(e.clientX, e.clientY)
        .classList.contains("win-title")
    ) {
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

  getToppaneLeft() {
    return this.#shadow.querySelector("toppane-left");
  }
  getToppaneRight() {
    return this.#shadow.querySelector("toppane-right");
  }
}
customElements.define("float-win", FloatingWin);
