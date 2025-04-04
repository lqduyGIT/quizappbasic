const questions = [
  {
    question:
      "Bạn hãy cho biết tên của người chiến sĩ cắm lá cờ đầu tiên trên nóc Dinh Độc Lập.",
    answers: [
      {
        text: "Bùi Quang Thận",
        correct: true,
      },
      {
        text: "Lữ Văn Hỏa",
        correct: false,
      },
      {
        text: "Thái Bá Minh",
        correct: false,
      },
      {
        text: "Nguyễn Văn Kỷ",
        correct: false,
      },
    ],
  },

  {
    question:
      "Bạn hãy cho biết lời kêu gọi cả nước của Bác Hồ: “Dù phải chiến đấu 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa, chúng ta cũng kiên quyết chiến đấu đến thắng lợi hoàn toàn” được ra đời vào thời gian nào?",
    answers: [
      {
        text: "Ngày 5/6/1965",
        correct: false,
      },
      {
        text: "Ngày 20/7/1965",
        correct: true,
      },
      {
        text: "Ngày 25/6/1965",
        correct: false,
      },
      {
        text: "Ngày 26/5/1965",
        correct: false,
      },
    ],
  },

  {
    question:
      "Lúc 10h45p, ngày 30/4/1975, diễn ra sự kiện cơ bản nào ở Sài Gòn?",
    answers: [
      {
        text: "Dương Văn Minh đầu hàng",
        correct: false,
      },
      {
        text: "Xe tăng tiến vào Dinh Độc Lập",
        correct: true,
      },
      {
        text: "Chiến dịch Hồ Chí Minh toàn thắng",
        correct: false,
      },
      {
        text: "Cắm cờ trên nóc Dinh Độc Lập",
        correct: false,
      },
    ],
  },

  {
    question:
      "Bạn hãy cho biết tên của một chiến dịch đã mở màn cho đại thắng mùa xuân 1975?",
    answers: [
      {
        text: "Chiến dịch Tây Nguyên",
        correct: true,
      },
      {
        text: "Chiến dịch Hồ Chí Minh",
        correct: false,
      },
      {
        text: "Chiến dịch Trị – Thiên",
        correct: false,
      },
      {
        text: "Chiến dịch Huế – Đà Nẵng",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("quiz__app--question");
const answerButtons = document.getElementById("answer__buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Hàm khởi động lại bài quiz khi bắt đầu hoặc làm mới
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Hàm hiển thị câu hỏi mới và các lựa chọn trả lời
function showQuestion() {
  // Gọi resetState() để xóa nội dung của các câu trả lời trước.
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Xóa nội dung cũ trước khi hiển thị câu hỏi mới
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Hàm xử lý khi người dùng chọn một đáp án
function selectAnswer(e) {
  const selectedBtn = e.target;
  // Kiểm tra xem đáp án được chọn có đúng không.
  const isCorrect = selectedBtn.dataset.correct === "true";
  // Đánh dấu đáp án đúng hoặc sai bằng class correct hoặc incorrect.
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // Hiện tất cả đáp án đúng cho người dùng thấy.
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // Vô hiệu hóa tất cả các nút đáp án để không cho chọn thêm.
    button.disabled = true;
  });
  // Hiện nút “Next” để chuyển sang câu tiếp theo.
  nextButton.style.display = "block";
}

// function selectAnswer(e) {
//   const selectedBtn = e.target;
//   console.log("Bạn đã chọn:", selectedBtn.innerText); // Kiểm tra nút đã được click

//   const isCorrect = selectedBtn.dataset.correct === "true";
//   if (isCorrect) {
//     selectedBtn.classList.add("correct");
//     console.log("Thêm class: correct");
//   } else {
//     selectedBtn.classList.add("incorrect");
//     console.log("Thêm class: incorrect");
//   }
// }

// Hàm hiển thị kết quả cuối cùng sau khi hoàn thành tất cả câu hỏi.
function showScore() {
  //Xóa nội dung cũ.
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  //Đổi nội dung nút thành “Play Again” để làm lại.
  nextButton.innerHTML = "Play Again";
  // /Hiển thị nút để người dùng bấm chơi lại
  nextButton.style.display = "block";
}

// Hàm xử lý hành động khi người dùng bấm nút “Next”.
function handleNextButton() {
  //Tăng chỉ số câu hỏi.
  currentQuestionIndex++;
  //Nếu vẫn còn câu hỏi → gọi showQuestion() để hiển thị tiếp.
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    //Nếu hết câu hỏi → gọi showScore() để kết thúc.
    showScore();
  }
}

//Khi người dùng bấm nút “Next” hoặc “Play Again” sẽ thực hiện logic tương ứng:
nextButton.addEventListener("click", () => {
  //Nếu còn câu hỏi → chuyển sang câu tiếp theo.
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    //Nếu hết câu hỏi → chơi lại từ đầu.
    startQuiz();
  }
});

startQuiz();
