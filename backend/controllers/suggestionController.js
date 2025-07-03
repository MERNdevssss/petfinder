const fetch = require('node-fetch');
const  Suggestion = require ('../models/Suggestion.js');

 const suggestPet = async (req, res) => {
  const { personality, homeSize, diet, petTypes } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  const userInput = `
    Personality: ${personality}
    Home size: ${homeSize}
    Diet: ${diet}
    Suggest suitable pets from: ${petTypes.join(", ")}.
    Include breed name and explanation.
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: 'You are a helpful pet advisor AI.' },
          { role: 'user', content: userInput },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const suggestionText = data.choices?.[0]?.message?.content;

    await Suggestion.create({
      personality,
      homeSize,
      diet,
      petTypes,
      suggestionResult: suggestionText
    });

    if (suggestionText) {
      res.json({ suggestions: suggestionText });
    } else {
      res.status(500).json({ error: 'No suggestions received from AI.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

module.exports = suggestPet;