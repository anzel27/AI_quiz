async function generateAIQuiz(content) {
  const output = document.getElementById("output");
  output.innerHTML = "⏳ Generating quiz using AI...";

  try {
    const response = await fetch("https://ai-quiz-zltb.onrender.com/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: content })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    output.innerHTML = `<pre>${data.text}</pre>`;

  } catch (err) {
    console.error(err);
    output.innerHTML = "❌ Error generating quiz";
  }
}
