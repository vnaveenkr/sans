async function openFromLocalFS(desc, accept) {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Text Files",
          accept: {
            "text/*": [".txt", ".js", ".html", ".css", ".json"],
          },
        },
      ],
    });

    currentFileHandle = fileHandle;
    const file = await fileHandle.getFile();
    const content = await file.text();

    editor.value = content;
    showStatus(`Opened: ${file.name}`);
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Error opening file:", err);
      showStatus("Error opening file!");
    }
  }
}
