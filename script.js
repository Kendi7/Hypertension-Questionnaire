// --- Form Submission & Google Script Integration ---
document.getElementById("hypertensionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);

  // ✅ This is your new correct Web App URL
  fetch("https://script.google.com/macros/s/AKfycbw1W1g9eJlYaqsOy6PB2hAua0SFIPkHuI_-8FeAuUagou8yXnNPE-OBEfyeTEbfBurX/exec", {
    method: "POST",
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      alert("Form submitted successfully!");
      form.reset();
      document.getElementById("diagnosisDetails").style.display = "none";
      document.getElementById("family_relation_section").style.display = "none";
      document.getElementById("family_relation_other_div").style.display = "none";
      document.getElementById("tobaccoFreq").style.display = "none";
      document.getElementById("alcoholFreq").style.display = "none";
      document.getElementById("bpCheck").style.display = "none";
    } else {
      alert("Error submitting form.");
    }
  })
  .catch((error) => {
    console.error("Submission error:", error);
    alert("Submission failed. Check your internet or try again later.");
  });
});

// --- Toggle fields ---
function toggleRelative() {
  const history = document.getElementById("familyHistory").value;
  const relationSection = document.getElementById("family_relation_section");
  relationSection.style.display = history === "Yes" ? "block" : "none";
  document.getElementById("family_relation_other_div").style.display = "none";
}

function checkOtherFamilyRelation(select) {
  const otherDiv = document.getElementById("family_relation_other_div");
  otherDiv.style.display = select.value === "Other" ? "block" : "none";
}

function toggleDiagnosisDetails() {
  const diagnosed = document.getElementById("diagnosed").value;
  const diagnosisDetails = document.getElementById("diagnosisDetails");
  diagnosisDetails.style.display = diagnosed === "Yes" ? "block" : "none";
}

function toggleTobaccoFreq() {
  const tobacco = document.getElementById("tobacco").value;
  document.getElementById("tobaccoFreq").style.display = tobacco === "Yes" ? "block" : "none";
}

function toggleAlcoholFreq() {
  const alcohol = document.getElementById("alcohol").value;
  document.getElementById("alcoholFreq").style.display = alcohol === "Yes" ? "block" : "none";
}

function toggleBPCheck() {
  const bp = document.getElementById("bpAssess").value;
  document.getElementById("bpCheck").style.display = bp === "Yes" ? "block" : "none";
}

// --- BMI Calculation ---
document.getElementById("weight").addEventListener("input", calculateBMI);
document.getElementById("height").addEventListener("input", calculateBMI);

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (weight > 0 && height > 0) {
    const bmi = (weight / (height * height)).toFixed(2);
    document.getElementById("bmi").value = bmi;

    let classification = "";
    if (bmi < 18.5) classification = "Underweight";
    else if (bmi < 25) classification = "Normal weight";
    else if (bmi < 30) classification = "Overweight";
    else classification = "Obese";

    document.getElementById("bmiClassification").value = classification;
  }
}

// --- Blood Pressure Classification ---
document.getElementById("systolic").addEventListener("input", classifyBP);
document.getElementById("diastolic").addEventListener("input", classifyBP);

function classifyBP() {
  const sys = parseInt(document.getElementById("systolic").value);
  const dia = parseInt(document.getElementById("diastolic").value);
  let bpStatus = "";

  if (sys > 0 && dia > 0) {
    if (sys < 120 && dia < 80) bpStatus = "Normal";
    else if (sys >= 120 && sys <= 129 && dia < 80) bpStatus = "Elevated";
    else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) bpStatus = "Hypertension Stage 1";
    else if (sys >= 140 || dia >= 90) bpStatus = "Hypertension Stage 2";
    else if (sys > 180 || dia > 120) bpStatus = "Hypertensive Crisis";
    else bpStatus = "Unclassified";
  }

  document.getElementById("bpClassification").value = bpStatus;
}
