document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const taskContainer = document.getElementById("task-container");
  const story = document.getElementById("story");

  startBtn.addEventListener("click", () => {
    story.style.display = "none";
    taskContainer.style.display = "block";
    showTask1();
  });

  function showTask1() {
    taskContainer.innerHTML = `
        <h2>Задание 1: Взлом зашифрованного файла</h2>
        <div class="story-container">
          <img src="assets/page_2.png" alt="page_2" class="page-image" />
          <div class="cards-stack">
            <div class="card" style="margin: 0;">
              <p>В комьютере Питер смог найти лог-файл с данными о последнем посетителе лаборатории. Но есть проблема – данные надежно зашифрованы.</p>
              <button onclick="downloadFile()">Скачать файл</button>
            </div>
            <div class="input-group">
              <input type="text" id="answer1" placeholder="Введите ответ">
              <button onclick="checkTask1()">Проверить</button>
            </div>
            <p id="hint1"></p>
          </div>
        </div>
        <button class="button-secondary" onclick="showHint1()">Подсказка</button>
        <div id="hidden-card" class="card hidden">
          <p>openssl aes-256-cbc -d -a -in encrypted.txt -out decrypted.txt -pass pass:spideypass</p>
        </div>
      `;
  }

  window.downloadFile = function () {
    const content = `U2FsdGVkX189kyESxneTFB7FdqnP29p9kwwfqED2EBc=
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "encrypted.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  window.checkTask1 = function () {
    const answer = document
      .getElementById("answer1")
      .value.trim()
      .toLowerCase();
    const hint = document.getElementById("hint1");
    const encrypted_answer = CryptoJS.SHA256(answer, "spideypass").toString();
    if (
      encrypted_answer ===
      "e7ddef299291b3f9d0c9d9bf46f9e76ef006ff2a83caa670e654b9a5efc9e164"
    ) {
      hint.innerText = "✅ Да! Последней в лаборатории была Гвен.";
      setTimeout(showTask2, 1500);
    } else {
      hint.innerText = "❌ Нет, попробуй еще раз.";
    }
  };

  window.showHint1 = function () {
    document.getElementById("hidden-card").classList.remove("hidden");
  };

  function showTask2() {
    taskContainer.innerHTML = `
        <h2>Задание 2: Тайна шкатулки</h2>
        <div class="story-container">
          <img src="assets/page_3.png" alt="page_3" class="page-image" />
          <div class="cards-stack">
            <div class="card">
              <p>Даша и Питер находят след Гвен в школе – она оставила свой рюкзак в одном из кабинетов. Внутри они обнаруживают загадочную шкатулку с кодовым замком и старую тетрадь. На первой странице аккуратным почерком написана странная подсказка:</p>
            </div>
            <div class="card sticker-card">
              <p>"Сегодня мой День Рождения, и у меня есть 5 свечей. В прошлом году я зажигала 4 из них, а через 7 лет планирую зажечь все 5. Сколько мне исполняется лет и сколько свечей следует зажечь сегодня?"</p>
            </div>
            <div class="input-group">
              <input type="text" id="answer2" placeholder="000" maxlength="3" pattern="\d{3}" oninput="validateDigits(this)">
              <button onclick="checkTask2()">Проверить</button>
            </div>
            <p id="hint2"></p>
          </div>
        </div>
        <button class="button-secondary" onclick="showHint1()">Подсказка</button>
        <div id="hidden-card" class="card hidden">
          <p>Через 8 лет я куплю еще свечу, но зажгу только первую из них</p>
        </div>
      `;
  }

  window.checkTask2 = function () {
    const answer = document.getElementById("answer2").value.trim();
    const hint = document.getElementById("hint2");
    const encrypted_answer = CryptoJS.SHA256(answer, "spideypass").toString();
    if (
      encrypted_answer ===
      "14063697603e22d600d336bee6cff12c8be93509ce84a0642918d89b2aef1753"
    ) {
      hint.innerText =
        "✅ Да! 24 года – это 11000 в двоичной системе, значит нужно зажечь 2 свечи.";
      setTimeout(showTask3, 2000);
    } else {
      hint.innerText = "❌ Нет, попробуй еще раз.";
    }
  };

  window.validateDigits = function (input) {
    input.value = input.value.replace(/\D/g, "").slice(0, 3);
  };

  function showTask3() {
    taskContainer.innerHTML = `
        <h2>Задание 3: Какая дверь ведет к Гвен?</h2>
        <div class="story-container">
          <img src="assets/page_4.png" alt="page_4" class="page-image" />
          <div class="cards-stack">
            <div class="card">
              <p>В шкатулке Даша нашла записку: "Жду тебя в кабинете 307." Не теряя времени, они с Питером отправились в указанную аудиторию, которая по совместительству была кабинетом музыки.</p>
              <p>Однако попасть внутрь не удалось – на двери висела табличка с просьбой обращаться по всем вопросам к учителю. Но он как всегда был не в духе и, даже не выслушав, отмахнулся:  "С кабинетом, который вам нужен, все ОК! Не занимайте мое время." Куда же отправилась Гвен?</p>
            </div>
            <div class="input-group">
              <input type="text" id="answer3" placeholder="000" maxlength="3" pattern="\d{3}" oninput="validateDigits(this)">
              <button onclick="checkTask3()">Проверить</button>
            </div>
            <p id="hint3"></p>
          </div>
        </div>
        <div class="building">
          <div class="floor">
            <h3>5 этаж</h3>
            <button class="door" onclick="showPopup(500)">500</button>
            <button class="door" onclick="showPopup(501)">501</button>
            <button class="door" onclick="showPopup(502)">502</button>
            <button class="door" onclick="showPopup(503)">503</button>
            <button class="door" onclick="showPopup(504)">504</button>
            <button class="door" onclick="showPopup(505)">505</button>
            <button class="door" onclick="showPopup(506)">506</button>
            <button class="door" onclick="showPopup(507)">507</button>
          </div>
          <div class="floor">
            <h3>4 этаж</h3>
            <button class="door" onclick="showPopup(400)">400</button>
            <button class="door" onclick="showPopup(401)">401</button>
            <button class="door" onclick="showPopup(402)">402</button>
            <button class="door" onclick="showPopup(403)">403</button>
            <button class="door" onclick="showPopup(404)">404</button>
            <button class="door" onclick="showPopup(405)">405</button>
            <button class="door" onclick="showPopup(406)">406</button>
            <button class="door" onclick="showPopup(407)">407</button>
          </div>
          <div class="floor">
            <h3>3 этаж</h3>
            <button class="door" onclick="showPopup(300)">300</button>
            <button class="door" onclick="showPopup(301)">301</button>
            <button class="door" onclick="showPopup(302)">302</button>
            <button class="door" onclick="showPopup(303)">303</button>
            <button class="door" onclick="showPopup(304)">304</button>
            <button class="door" onclick="showPopup(305)">305</button>
            <button class="door" onclick="showPopup(306)">306</button>
            <button class="door" onclick="showPopup(307)">307</button>
          </div>
          <div class="floor">
            <h3>2 этаж</h3>
            <button class="door" onclick="showPopup(200)">200</button>
            <button class="door" onclick="showPopup(201)">201</button>
            <button class="door" onclick="showPopup(202)">202</button>
            <button class="door" onclick="showPopup(203)">203</button>
            <button class="door" onclick="showPopup(204)">204</button>
            <button class="door" onclick="showPopup(205)">205</button>
            <button class="door" onclick="showPopup(206)">206</button>
            <button class="door" onclick="showPopup(207)">207</button>
          </div>
        </div>
        <button class="button-secondary" onclick="showHint1()">Подсказка</button>
        <div id="hidden-card" class="card hidden">
          <p>Проверять комнату 404 – всегда плохая идея</p>
        </div>
        <div id="popup" class="popup hidden">
          <p id="popup-message"></p>
          <button onclick="closePopup()">Закрыть</button>
        </div>
      `;
  }

  window.checkTask3 = function () {
    const answer = document.getElementById("answer3").value.trim();
    const hint = document.getElementById("hint3");
    const encrypted_answer = CryptoJS.SHA256(answer, "spideypass").toString();
    if (
      encrypted_answer ===
      "27badc983df1780b60c2b3fa9d3a19a00e46aac798451f0febdca52920faaddf"
    ) {
      hint.innerText =
        "✅ Ура! The HTTP 200 OK и тайная комната наконец-то открыта...";
      setTimeout(showFinal, 2000);
    } else {
      hint.innerText = "❌ Нет, попробуй еще раз.";
    }
  };

  window.showPopup = function (door) {
    const messages = {
      204: '"Срочно требуется закупить стулья и парты в 204 аудиторию!" В кабинете пусто.',
      404: "Эта дверь никуда не ведет.",
      307: '"Кабинет музыки временно переехал. Детали уточняйте у мистера Никогда-Нет-На-Вас-Времени."',
      403: '"Только для учителей!!"',
      400: '"Co-working space. Уроки здесь проводить нельзя."',
      500: '"Извините, кабинет находится на ремонте."',
    };

    const message = messages[door] || "Самая обычная дверь.";

    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.remove("hidden");
  };

  window.closePopup = function () {
    document.getElementById("popup").classList.add("hidden");
  };

  function showFinal() {
    flashBackground();
    revealPrize();
    playSound();
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
    taskContainer.innerHTML = `
        <h2>🎉 Сюрприз!!</h2>
        <div class="story-container">
          <img src="assets/page_5.png" alt="page_5" class="page-image" />
          <div class="card" style="text-align: start;">
            <p>– С Днем Рождения! – хором закричали твои друзья, выпрыгивая из укрытия.</p>
            <p>Внутри кабинета мерцали яркие гирлянды, повсюду были красно-синие воздушные шары, а в центре стоял огромный торт с паутинкой из шоколада. Пока Даша разгадывала загадки, Гвен подготовила сюрприз-вечеринку, а Питер… ну, он просто тянул время.</p>
            <p>– Прости за всю эту детективную суету и кражу костюма, – смеется Питер, почесывая затылок. – Но мне надо было как-то отвлечь тебя. Надеюсь, загадки были не слишком сложными? Не забудь проверить подарки на столе.</p>
            <p>Сегодня Даша не только раскрыла очередную тайну, но и хорошо провела время с друзьями.</p>
            <p>Конец!</p>
          </div>
        </div>
      `;
  }

  function flashBackground() {
    let colors = ["#003049", "#003631", "#411e36", "#003148", "#2a264b"];
    let i = 0;
    setInterval(() => {
      document.body.style.background = colors[i % colors.length];
      i++;
    }, 500);
  }

  function revealPrize() {
    const prizes = [
      "Плюшевый паучок! 🕷️",
      "Шпионские очки! 🕶️",
      "Паутинный бластер! 🕸️",
      "Постер с Человеком-Пауком! 🌌",
    ];
    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    const prizeBox = document.createElement("div");
    prizeBox.innerHTML = `<h2>Твой подарок: ${prize}</h2>`;
    prizeBox.style.cssText =
      "text-align: center; color: white; font-size: 2em;";
    document.body.appendChild(prizeBox);
  }

  function playSound() {
    const audio = new Audio("assets/partyblower.mp3");
    audio.play();
  }
});
