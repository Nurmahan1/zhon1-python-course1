export default async function handler(req, res) {

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Сен қазақ тілінде жауап беретін Python көмекшісісің."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "Жауап келмеді"
    });

  } catch (e) {

    res.status(500).json({
      answer: "Қате: " + e.message
    });

  }

}
