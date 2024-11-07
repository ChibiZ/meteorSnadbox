const makePrompt = (prompt) => ({
  contents: [
    {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ],
});

export const fetchData = async (prompt, url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(makePrompt(prompt)),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
