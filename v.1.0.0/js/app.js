window.addEventListener("load", function () {
  const widthScreen = window.innerWidth;
  const heightScreen = window.innerHeight;
  var status = false;
  var intervalHereket;
  var intervalReqib;
  const timeHereket = 250;
  const timeReqib = 5000;
  const step = 10;
  const reqibler = [];
  score = 0;

  const men = {
    dom: null,
    x: Random(0, 3),
    y: heightScreen - 210,
  };

  const menu = document.querySelector("#menu");
  const play = document.querySelector("#play");
  const xal = document.querySelector("#xal");
  const btnSol = document.querySelector("#btn-sol");
  const btnSag = document.querySelector("#btn-sag");
  const zolaqLar = document.querySelectorAll("#yol div");
  const meseSol = document.querySelector("#mese-sol");
  const meseSag = document.querySelector("#mese-sag");

  play.addEventListener("click", function () {
    play.classList.add("gizle");
    menu.classList.add("gizle");
    xal.innerText = score;
    status = true;

    Start();
    ReqibYrad();

    intervalHereket = setInterval(function () {
      if (status) {
        score++;
        if (score % 10 == 0) xal.innerText = score / 10;

        for (let i = 0; i < reqibler.length; i++) {
          reqibler[i].y += step;
          reqibler[i].dom.style.top = `${reqibler[i].y}px`;
          if (reqibler[i].y >= heightScreen) {
            zolaqLar[reqibler[i].x].removeChild(reqibler[i].dom);
            reqibler.splice(i, 1);
          }

          if (reqibler[i].x == men.x) {
            if (men.y >= reqibler[i].y - 65) {
              if (men.y - reqibler[i].y <= 65 - step / 2) {
                men.dom.setAttribute("src", "./img/masin-1.0.png");
                reqibler[i].dom.setAttribute("src", "./img/masin-2.0.png");
                gameOver();
              }
            }
          }
        }
      }
    }, timeHereket);

    intervalReqib = setInterval(function () {
      if (status) {
        ReqibYrad();
      }
    }, timeReqib);
  });

  btnSag.addEventListener("click", function () {
    if (status) Sag();
  });

  btnSol.addEventListener("click", function () {
    if (status) Sol();
  });

  window.addEventListener("keydown", function (e) {
    if (status) {
      switch (e.keyCode) {
        case 39:
        case 68:
          Sag();
          break;
        case 37:
        case 65:
          Sol();
          break;
      }
    }
  });

  function gameOver() {
    status = false;
    clearInterval(intervalHereket);
    meseSol.style.animationPlayState = "paused";
    meseSag.style.animationPlayState = "paused";
    setTimeout(function () {
      window.open("index.html", "_parent");
      //   play.classList.remove("gizle");
      //   menu.classList.remove("gizle");
    }, 5000);
  }

  function Sag() {
    if (men.x < 3) {
      men.dom.style.animationName = "don-sag";

      setTimeout(function () {
        zolaqLar[men.x].removeChild(men.dom);
        men.x++;
        zolaqLar[men.x].appendChild(men.dom);
        men.dom.style.animationName = "";
      }, 1000);
    }
  }

  function Sol() {
    if (men.x > 0) {
      men.dom.style.animationName = "don-sol";
      setTimeout(function () {
        zolaqLar[men.x].removeChild(men.dom);
        men.x--;
        zolaqLar[men.x].appendChild(men.dom);
        men.dom.style.animationName = "";
      }, 1000);
    }
  }

  function Start() {
    men.dom = document.createElement("img");
    men.dom.setAttribute("src", "./img/masin-1.png");
    men.dom.classList.add("men");
    men.dom.style.top = `${men.y}px`;
    zolaqLar[men.x].appendChild(men.dom);
  }

  function ReqibYrad() {
    let reqib = {
      dom: document.createElement("img"),
      x: Random(0, 3),
      y: -65,
    };

    reqib.dom.setAttribute("src", "./img/masin-2.png");
    reqib.dom.classList.add("reqib");
    reqib.dom.style.top = `${reqib.y}px`;
    zolaqLar[reqib.x].appendChild(reqib.dom);
    reqibler.push(reqib);
  }

  function Random(start, end) {
    return Math.floor(start + Math.random() * (end - start));
  }
});
