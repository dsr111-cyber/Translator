async function translateText() {
  const key = document.getElementById("key").value;
  const region = document.getElementById("region").value;
  const text = document.getElementById("inputText").value;
  const targetLang = document.getElementById("targetLang").value;
  const output = document.getElementById("outputText");

  if (!key || !region || !text) {
    alert("Please fill all fields!");
    return;
  }

  const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`;

  try {
    output.innerHTML = "⏳ Translating...";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{ Text: text }])
    });

    const data = await response.json();
    const translated = data[0].translations[0].text;

    output.innerHTML = translated;

  } catch (error) {
    output.innerHTML = "❌ Error: " + error.message;
  }
}