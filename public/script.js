const input = document.getElementById("audioFile");
const preview = document.getElementById("preview");

input.addEventListener("change", () => {

  preview.innerHTML = "";

  for (let file of input.files) {

    const card = document.createElement("div");

    card.classList.add("card");

    const title = document.createElement("p");

    title.textContent = file.name;

    const audio = document.createElement("audio");

    audio.controls = true;

    audio.src = URL.createObjectURL(file);

    card.appendChild(title);
    card.appendChild(audio);

    preview.appendChild(card);
  }

});

document
  .getElementById("convertBtn")
  .addEventListener("click", async () => {

    const files = input.files;

    if (files.length === 0) {
      alert("Selecione pelo menos um áudio");
      return;
    }

    const formData = new FormData();

    for (let file of files) {
      formData.append("audios", file);
    }

    formData.append(
      "format",
      document.getElementById("format").value
    );

    const response = await fetch("/convert", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    alert(data.message);

  });