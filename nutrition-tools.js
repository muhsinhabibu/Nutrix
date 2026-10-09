const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Adult BMI calculator
const bmiForm = document.getElementById("bmiForm");
if (bmiForm) {
  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const weight = Number(document.getElementById("weight").value);
    const heightCm = Number(document.getElementById("height").value);
    const result = document.getElementById("bmiResult");

    if (!Number.isFinite(weight) || !Number.isFinite(heightCm) || weight <= 0 || weight > 500 || heightCm < 50 || heightCm > 250) {
      result.textContent = "Please enter valid measurements.";
      return;
    }

    const bmi = weight / ((heightCm / 100) ** 2);
    let category;

    if (bmi < 18.5) category = "Below the usual adult BMI range";
    else if (bmi < 25) category = "Within the usual adult BMI range";
    else if (bmi < 30) category = "Above the usual adult BMI range";
    else category = "In the adult obesity BMI range";

    result.textContent = `BMI: ${bmi.toFixed(1)} — ${category}. BMI is a screening measure, not a diagnosis.`;
  });
}

// Adult BMR calculator using the Mifflin–St Jeor equation
const bmrForm = document.getElementById("bmrForm");
if (bmrForm) {
  bmrForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const sex = document.getElementById("bmrSex").value;
    const age = Number(document.getElementById("bmrAge").value);
    const weight = Number(document.getElementById("bmrWeight").value);
    const height = Number(document.getElementById("bmrHeight").value);
    const result = document.getElementById("bmrResult");

    if (!sex || !Number.isFinite(age) || age < 18 || age > 120 || !Number.isFinite(weight) || weight <= 0 || weight > 500 || !Number.isFinite(height) || height < 50 || height > 250) {
      result.textContent = "Please enter valid adult measurements.";
      return;
    }

    const sexAdjustment = sex === "male" ? 5 : -161;
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + sexAdjustment);

    result.textContent = `Estimated BMR: ${bmr} kcal/day. The estimate has been entered into the TDEE Tracker below.`;
    document.getElementById("tdeeBmr").value = bmr;
  });
}

// Estimate total daily energy expenditure from BMR and activity level
const tdeeForm = document.getElementById("tdeeForm");
if (tdeeForm) {
  tdeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const bmr = Number(document.getElementById("tdeeBmr").value);
    const activity = Number(document.getElementById("activityLevel").value);
    const result = document.getElementById("tdeeResult");

    if (!Number.isFinite(bmr) || bmr < 500 || bmr > 6000 || !Number.isFinite(activity) || activity < 1.2 || activity > 1.9) {
      result.textContent = "Please enter a valid BMR and choose an activity level.";
      return;
    }

    result.textContent = `Estimated TDEE: ${Math.round(bmr * activity)} kcal/day. This is an approximate maintenance-energy estimate.`;
  });
}
