// Бүх глобаль хувьсагчид
var activePlayer, scores, roundScore;
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// Тоглоомыг шинээр эхлэхэд бэлдэх
function initGame() {
	// Тоглогчийн ээлжийг хадгалдаг хувьсагч, 1-р тоглогч 0, 2-р тоглогч 1
	activePlayer = 0;
	// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
	scores = [0, 0];
	// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалдаг хувьсагч
	roundScore = 0;

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	// Тоглогчдын нэрийг буцааж гаргах
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");

	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");

	document.querySelector(".player-0-panel").classList.add("active");

	diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
	// 1-6 доторх санамсаргүй нэг тоо гаргаж авна
	var diceNumber = Math.floor(Math.random() * 6) + 1;
	// Шооны зургыг вэб дээр гаргаж ирнэ
	diceDom.style.display = "block";
	// Буусан санамсаргүй тоонд харгалзах шооны зургыг вэб дээр гаргаж ирнэ
	diceDom.src = "dice-" + diceNumber + ".png";
	// Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
	if (diceNumber !== 1) {
		// 1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
		roundScore = roundScore + diceNumber;
		document.getElementById("current-" + activePlayer).textContent = roundScore;
	} else {
		// 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт солино
		switchToNextPlayer();
	}
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
	// Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
	scores[activePlayer] = scores[activePlayer] + roundScore;
	// Дэлгэц дээр оноог өөрчилнө
	document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
	// Уг тоглогч хожсон эсэхийг шалгах
	if (scores[activePlayer] >= 10) {
		// Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
		document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
		document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	} else {
		// Тоглогчийн ээлжийг солино
		switchToNextPlayer();
	}
});

// Уг функц нь тоглох ээлжийг дараачийн тоглогчруу шилжүүлнэ
function switchToNextPlayer() {
	// Уг тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
	roundScore = 0;
	document.getElementById("current-" + activePlayer).textContent = 0;
	// Тоглогчийн ээлжийг нөгөө тоглогруу шилжүүлнэ
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	// Улаан цэгийг шилжүүлэх
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	// Шоог түр алга болгоно
	diceDom.style.display = "none";
}

// New Game товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);