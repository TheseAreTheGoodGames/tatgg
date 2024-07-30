window.requestAnimationFrame(step);
  let alreadyFading = false;

  let newOpacity = 1;
  function step() {
    newOpacity -= 0.05;
    document.getElementById("fade").style.opacity = (0, 0, 0, newOpacity);

    document.getElementById("button").ondragstart = function () {
      return false;
    };

    document.getElementById("backButton").ondragstart = function () {
      return false;
    };

    window.requestAnimationFrame(step);
  }

  let mouseDown = false;
  let backMouseDown = false;

  let pointsText = document.getElementById("points");
  let buttonImage = document.getElementById("button");
  let backButtonImage = document.getElementById("backButton");

  let notClicked =
    "https://cdn.glitch.global/feac0236-fb39-4a57-a3e5-1a988e2a38e6/Not%20Clicked.png?v=1716070731664";
  let clicked =
    "https://cdn.glitch.global/feac0236-fb39-4a57-a3e5-1a988e2a38e6/Clicked.png?v=1716070724808";

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      SpaceClick();
    } else if (event.code === "Escape") {
      EscapeClick();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      GivePoints();
    } else if (event.code === "Escape") {
      backButtonImage.src = notClicked;
      newOpacity = 0;
      window.requestAnimationFrame(stepIn);
    }
  });

  window.addEventListener("mouseup", (event) => {
    UnClick();
  });

  window.onload = function () {
    document.body.style.background = "#00ffff";
    if (localStorage.getItem("Points") == null) {
      localStorage.setItem("Points", 0);
      fadeOut();
    }

    pointsText.innerHTML = localStorage.getItem("Points");
    document.title = localStorage.getItem("Points") + " - CFP";
  };

  function BackClick() {
    backMouseDown = true;
    backButtonImage.src = clicked;
  }

  function Click() {
    mouseDown = true;
    buttonImage.src = clicked;
  }

  function SpaceClick() {
    buttonImage.src = clicked;
  }

  function EscapeClick() {
    backButtonImage.src = clicked;
  }

  function stepIn(timeStamp) {
    newOpacity += 0.1;
    document.getElementById("fade").style.opacity = (0, 0, 0, newOpacity);

    if (newOpacity <= 2) {
      window.requestAnimationFrame(stepIn);
    } else {
      window.open("/", "_self");
    }
  }

  function UnClick() {
    if (backMouseDown) {
      if (!alreadyFading) {
        alreadyFading = true;
        backMouseDown = false;
        backButtonImage.src = notClicked;
        newOpacity = 0;
        window.requestAnimationFrame(stepIn);
      }
    }
    if (mouseDown) {
      mouseDown = false;
      GivePoints();
    }
  }

  function GivePoints() {
    points = parseFloat(localStorage.getItem("Points"));
    localStorage.setItem("Points", (points = points + 1));
    points = parseFloat(localStorage.getItem("Points"));
    pointsText.innerHTML = points;

    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.background = randomColor;
    document.title = points + " - CFP";
    if (!mouseDown) buttonImage.src = notClicked;
  }