class GripSack {
  #pElem;
  static winInstances = [];
  constructor(pElem) {
    this.#pElem = pElem;
  }

  bringFront(e) {
    this.winInstances.forEach((w) => {
      w.style.zIndex = "1";
    });
    e.style.zIndex = "2";
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
      this.#pElem
        .elementFromPoint(e.clientX, e.clientY)
        .classList.contains("win-title"),
    );

    if (
      this.#pElem
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

  addWin(grip, sack) {
    parent.querySelectorAll(grip).forEach((e) => {
      addEvenrListener("mouseenter", (e1) => {
        sack.setAttribute("draggable", "true");
      });
    });
    grip.addEvenrListener("mouseleave", (e) => {
      sack.setAttribute("draggable", "false");
    });
  }
  delWin() {}
}
