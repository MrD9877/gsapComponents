// See https://greensock.com/gsap-1-16 for details.

const snapCheckbox = document.getElementById("snap");
const liveSnapCheckbox = document.getElementById("liveSnap");
const container = document.getElementById("container");

const gridWidth = 74;
const gridHeight = 50;
const gridRows = 28;
const gridColumns = 40;

// Create the grid cells
for (let i = 0; i < gridRows * gridColumns; i++) {
  const y = Math.floor(i / gridColumns) * gridHeight;
  const x = (i * gridWidth) % (gridColumns * gridWidth);

  const cell = document.createElement("div");
  cell.style.position = "absolute";
  cell.style.border = "1px solid #454545";
  cell.style.width = `${gridWidth - 1}px`;
  cell.style.height = `${gridHeight - 1}px`;
  cell.style.top = `${y}px`;
  cell.style.left = `${x}px`;

  container.prepend(cell);
}

// Set container and box sizes
gsap.set(container, {
  height: gridRows * gridHeight + 1,
  width: gridColumns * gridWidth + 1,
});
gsap.set("#box", { width: 150, height: 100, lineHeight: "100px" });

function update() {
  const snap = snapCheckbox.checked;
  const liveSnap = liveSnapCheckbox.checked;

  Draggable.create("#box", {
    bounds: container,
    autoScroll: 1,
    edgeResistance: 0.65,
    type: "x,y",
    throwProps: true,
    liveSnap: liveSnap,

    onRelease: function () {
      this.tween.progress(1);
      const wrapper = document.querySelector(".wrapper");
      const tBounds = this.target.getBoundingClientRect();
      const wBounds = wrapper.getBoundingClientRect();
      let wCenter = wBounds.left + wBounds.width / 2;
      let tCenter = tBounds.left + tBounds.width / 2;
      const scroll = {};

      if (tBounds.right > wBounds.right || tBounds.left < wBounds.left) {
        scroll.x = wrapper.scrollLeft + (tCenter - wCenter);
      }

      if (tBounds.bottom > wBounds.bottom || tBounds.top < wBounds.top) {
        wCenter = wBounds.top + wBounds.height / 2;
        tCenter = tBounds.top + tBounds.height / 2;
        scroll.y = wrapper.scrollTop + (tCenter - wCenter);
      }

      gsap.to(wrapper, this.tween.duration(), { scrollTo: scroll });
      this.tween.progress(0);
    },

    snap: {
      x: function (endValue) {
        return snap || liveSnap ? Math.round(endValue / gridWidth) * gridWidth : endValue;
      },
      y: function (endValue) {
        return snap || liveSnap ? Math.round(endValue / gridHeight) * gridHeight : endValue;
      },
    },
  });
}

function applySnap() {
  if (snapCheckbox.checked || liveSnapCheckbox.checked) {
    document.querySelectorAll(".box").forEach((element) => {
      const transform = element._gsTransform || gsap.getProperty(element, "x,y");
      gsap.to(element, 0.5, {
        x: Math.round(transform.x / gridWidth) * gridWidth,
        y: Math.round(transform.y / gridHeight) * gridHeight,
        delay: 0.1,
        ease: Power2.easeInOut,
      });
    });
  }
  update();
}

// Hook up event listeners
snapCheckbox.addEventListener("change", applySnap);
liveSnapCheckbox.addEventListener("change", applySnap);

// Initial setup
update();
