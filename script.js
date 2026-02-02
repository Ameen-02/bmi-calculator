/* ---------- DARK / LIGHT MODE ---------- */
function toggleMode() {
  const body = document.body;
  const btn = document.querySelector(".mode-btn");

  body.classList.toggle("dark");
  body.classList.toggle("light");

  btn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}

/* ---------- UNIT CONVERSION ---------- */
function convertHeight() {
  const unit = document.getElementById("heightUnit").value;
  document.getElementById("height").style.display =
    unit === "ft" ? "none" : "block";
  document.getElementById("feetBox").style.display =
    unit === "ft" ? "flex" : "none";
}

function convertWeight() {
  const unit = document.getElementById("weightUnit").value;
  const weightInput = document.getElementById("weight");
  if (!weightInput.value) return;

  if (unit === "lb") {
    weightInput.value = (weightInput.value * 2.20462).toFixed(2);
  } else {
    weightInput.value = (weightInput.value / 2.20462).toFixed(2);
  }
}

/* ---------- MULTI LANGUAGE ---------- */
const langData = {
  en: {
    title: "Smart BMI Calculator",
    male: "Male",
    female: "Female",
    calc: "Calculate BMI"
  },
  hi: {
    title: "स्मार्ट बीएमआई कैलकुलेटर",
    male: "पुरुष",
    female: "महिला",
    calc: "बीएमआई निकालें"
  },
  ur: {
    title: "سمارٹ بی ایم آئی کیلکولیٹر",
    male: "مرد",
    female: "عورت",
    calc: "بی ایم آئی نکالیں"
  },
   tr: {
    title: "Akıllı VKİ Hesaplayıcı",
    male: "Erkek",
    female: "Kadın",
    calc: "VKİ Hesapla"
  },
  es: {
    title: "Calculadora Inteligente de IMC",
    male: "Hombre",
    female: "Mujer",
    calc: "Calcular IMC"
  },
   vi: {
    title: "Máy Tính BMI Thông Minh",
    male: "Nam",
    female: "Nữ",
    calc: "Tính BMI"
  },
};

function changeLanguage() {
  const lang = document.getElementById("language").value;
  document.getElementById("title").textContent = langData[lang].title;
  document.getElementById("maleTxt").textContent = langData[lang].male;
  document.getElementById("femaleTxt").textContent = langData[lang].female;
  document.getElementById("calcBtn").textContent = langData[lang].calc;
}

/* ---------- BMI + GOAL TRACKER ---------- */
function calculateBMI() {
  const age = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const goalBMI = document.getElementById("goalBMI").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const heightUnit = document.getElementById("heightUnit").value;

  const resultBox = document.getElementById("resultBox");
  const bmiResult = document.getElementById("bmiResult");
  const bmiCategory = document.getElementById("bmiCategory");
  const customMessage = document.getElementById("customMessage");
  const goalMessage = document.getElementById("goalMessage");
  const ageMessage = document.getElementById("ageMessage");
  const progress = document.getElementById("bmiProgress");

  if (!age || !weight || !gender) {
    alert("Please fill all fields and select gender ❌");
    return;
  }

  let heightCM;

  if (heightUnit === "ft") {
    const feet = document.getElementById("feet").value;
    const inch = document.getElementById("inch").value;

    if (!feet && !inch) {
      alert("Please enter height in feet/inches ❌");
      return;
    }

    heightCM = (feet * 30.48) + (inch * 2.54);
  } else {
    const height = document.getElementById("height").value;
    if (!height) {
      alert("Please enter height ❌");
      return;
    }
    heightCM = height;
  }

  const h = heightCM / 100;
  const bmi = (weight / (h * h)).toFixed(2);

  let category = "";
  let message = "";
  let colorClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    message = "You are underweight. Focus on healthy food 💪";
    colorClass = "blue";
  } else if (bmi < 24.9) {
    category = "Normal";
    message = "Your BMI is normal. Keep it up 🔥";
    colorClass = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    message = "A little exercise can help 🏃‍♂️";
    colorClass = "orange";
  } else {
    category = "Obese";
    message = "Healthy habits can change everything ❤️";
    colorClass = "red";
  }

  bmiResult.innerHTML = "Your BMI: " + bmi;
  bmiCategory.innerHTML = "Category: " + category;
  customMessage.innerHTML = message;

  /* Goal Tracker */
  if (goalBMI) {
    const diff = (bmi - goalBMI).toFixed(2);
    if (diff > 0) {
      goalMessage.innerHTML = `You need to reduce BMI by ${diff} to reach your goal 🎯`;
    } else if (diff < 0) {
      goalMessage.innerHTML = `You need to increase BMI by ${Math.abs(diff)} to reach your goal 🎯`;
    } else {
      goalMessage.innerHTML = "Goal achieved! Amazing job 🏆";
    }
  } else {
    goalMessage.innerHTML = "";
  }

  const ageInfo = age < 18
    ? "Teen BMI may vary. Please consult a doctor 👨‍⚕️"
    : "Adult BMI standard applied ✅";

  ageMessage.innerHTML = ageInfo;

  resultBox.className = "result-box show " + colorClass;

  let percent = (bmi / 40) * 100;
  if (percent > 100) percent = 100;

  progress.style.width = percent + "%";
  progress.style.background =
    window.getComputedStyle(resultBox).backgroundColor;
}
