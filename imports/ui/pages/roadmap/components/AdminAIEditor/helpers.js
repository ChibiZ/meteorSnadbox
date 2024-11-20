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

export const findParentNodeName = (nodes, nodeId, edges) => {
  const [parent] = edges.filter((edge) => {
    if (edge.target === nodeId) {
      return edge.source;
    }
  });
  const [parentNode] = nodes.filter((node) => {
    if (node.id === parent.source) {
      return node;
    }
  });
  return parentNode?.data?.label || undefined;
};

export const makeDefaultPrompt = (nodeLabel, parentNodeLabel) => {
  return `Я провожу опрос для frontend разработчиков, где они по ключевому слову должны понять знают ли они данную технологию или нет. Для этого мне нужен справочный материал, из которого будет понятно, о чём спрашивают. Помоги мне создать такой. Ключевое слово "${parentNodeLabel} ${nodeLabel}". В моём опросе контент будет хорошо выглядеть, если дать краткое определение одним параграфом, дальше дать 2-4 примера, и в конце дать перечисление связанных ключевых терминов.`;
};

export const makePromptFromTemplate = (
  dataString,
  nodeLabel,
  parentNodeLabel,
) => {
  return dataString
    .replace('parentNodeLabel', parentNodeLabel)
    .replace('nodeLabel', nodeLabel);
};

export function getLastElement(arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[arr.length - 1];
  } else {
    return undefined;
  }
}
