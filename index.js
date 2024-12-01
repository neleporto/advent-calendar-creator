//const backgroundInput = document.getElementById("background-upload");
//const backgroundPreview = document.getElementById("background-preview");

const createButton = document.getElementById("create-button");
const downloadButton = document.getElementById("download-button");

const helpButton = document.getElementById("help-button");
const helpModal = document.getElementById("help-modal");
const closeHelp = document.getElementById("close-help");

// Files for the Advent Calendar
let calendarData = [];

// Generate Inputs for All Days
const dayForm = document.getElementById("day-form");
for (let i = 1; i <= 24; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day-input";
    dayDiv.innerHTML = `
        <h3>Day ${i}</h3>
        <label>Image (required):</label>
        <input type="file" class="image-upload" accept="image/jpeg" required>
        <label>Note (optional):</label>
        <textarea class="note-input" placeholder="Enter a note..."></textarea>
        <label>Song (optional):</label>
        <input type="file" class="audio-upload" accept="audio/*">
    `;
    dayForm.appendChild(dayDiv);
}

// Handle Background Upload
//backgroundInput.addEventListener("change", (e) => {
   // const file = e.target.files[0];
   // if (file) {
    //    backgroundPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
     //   backgroundPreview.innerHTML = `<p>Custom background uploaded!</p>`;
   // }
//});

// Handle Create Button
createButton.addEventListener("click", async () => {
    try {
        const imageInputs = document.querySelectorAll(".image-upload");
        const noteInputs = document.querySelectorAll(".note-input");
        const audioInputs = document.querySelectorAll(".audio-upload");

        if (imageInputs.length !== 24) {
            throw new Error("All 24 image slots must be filled.");
        }

        const zip = new JSZip(); // Use JSZip directly from the script tag

        // Create folders for assets
        const imageFolder = zip.folder("images");
        const noteFolder = zip.folder("notes");
        const musicFolder = zip.folder("music");

        // Add files for each day
        for (let i = 0; i < 24; i++) {
            const image = imageInputs[i].files[0];
            if (!image) throw new Error(`Missing image for Day ${i + 1}`);

            const note = noteInputs[i].value || " ";
            const audio = audioInputs[i].files[0] || null;

            imageFolder.file(`image${i + 1}.jpeg`, image);
            noteFolder.file(`note${i + 1}.txt`, note);
            if (audio) musicFolder.file(`song${i + 1}.mp3`, audio);
        }

        // Add default calendar files
        const indexHTML = await fetch("files/index.html").then((res) => res.text());
        const stylesCSS = await fetch("files/styles.css").then((res) => res.text());
        const scriptJS = await fetch("files/script.js").then((res) => res.text());

        zip.file("index.html", indexHTML);
        zip.file("styles.css", stylesCSS);
        zip.file("script.js", scriptJS);

        // Add the background.gif
        const backgroundGif = await fetch("background.gif").then(res => res.blob());
        zip.file("background.gif", backgroundGif);

        // Generate and download ZIP
        zip.generateAsync({ type: "blob" }).then((content) => {
            createButton.classList.add("hidden");
            downloadButton.classList.remove("hidden");

            downloadButton.addEventListener("click", () => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(content);
                link.download = "advent_calendar.zip";
                link.click();
            });
        });
    } catch (error) {
        alert(error.message);
    }
});

// Help Modal
helpButton.addEventListener("click", () => helpModal.classList.remove("hidden"));
closeHelp.addEventListener("click", () => helpModal.classList.add("hidden"));
