export function downloadObjectAsJson(exportObj, exportName) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(exportObj)], { type: 'application/json' }),
  );
  a.download = `${exportName}.json`;
  a.click();
  a.remove();
}
