class FileSystemAccess {
  #FileHandle;

  async open(
    opts = {
      types: [
        {
          description: "Text Files",
          accept: { "text/*": [".txt", ".js", ".html", ".css", ".json"] },
        },
      ],
    },
  ) {
    try {
      const [fileHandle] = await window.showOpenFilePicker(opts);

      this.#FileHandle = fileHandle;
      const file = await fileHandle.getFile();
      const content = await file.text();
      return content;
    } catch (err) {
      this.#FileHandle = null;
      return null;
    }
  }

  getName() {
    if (this.#FileHandle) return this.#FileHandle.name;
  }

  // Save as new file
  async saveAs() {
    try {
      const fileHandle = await window.showSaveFilePicker({
        types: [
          {
            description: "Text Files",
            accept: {
              "text/plain": [".txt"],
            },
          },
        ],
      });

      this.#FileHandle = fileHandle;
      const writable = await fileHandle.createWritable();
      await writable.write(editor.value);
      await writable.close();

      console.log("File saved successfully!");
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error saving file:", err);
        // showStatus("Error saving file!");
      }
    }
  }

  async save() {
    if (!this.#FileHandle) {
      return this.saveAs();
    }

    try {
      const writable = await currentFileHandle.createWritable();
      await writable.write(editor.value);
      await writable.close();

      console.log("File saved successfully!");
    } catch (err) {
      console.error("Error saving file:", err);
      console.log("Error saving file!");
    }
  }
}
