// Example data for each door
const doorData = {
  1: { image: "images/image1.jpeg", note: "notes/note1.txt", song: "music/song1.mp3" },
  2: { image: "images/image2.jpeg", note: "notes/note2.txt", song: "music/song2.mp3" },
  3: { image: "images/image3.jpeg", note: "notes/note3.txt", song: "music/song3.mp3" },
  4: { image: "images/image4.jpeg", note: "notes/note4.txt", song: "music/song4.mp3" },
  5: { image: "images/image5.jpeg", note: "notes/note5.txt", song: "music/song5.mp3" },
  6: { image: "images/image6.jpeg", note: "notes/note6.txt", song: "music/song6.mp3" },
  7: { image: "images/image7.jpeg", note: "notes/note7.txt", song: "music/song7.mp3" },
  8: { image: "images/image8.jpeg", note: "notes/note8.txt", song: "music/song8.mp3" },
  9: { image: "images/image9.jpeg", note: "notes/note9.txt", song: "music/song9.mp3" },
  10: { image: "images/image10.jpeg", note: "notes/note10.txt", song: "music/song10.mp3" },
  11: { image: "images/image11.jpeg", note: "notes/note11.txt", song: "music/song11.mp3" },
  12: { image: "images/image12.jpeg", note: "notes/note12.txt", song: "music/song12.mp3" },
  13: { image: "images/image13.jpeg", note: "notes/note13.txt", song: "music/song13.mp3" },
  14: { image: "images/image14.jpeg", note: "notes/note14.txt", song: "music/song14.mp3" },
  15: { image: "images/image15.jpeg", note: "notes/note15.txt", song: "music/song15.mp3" },
  16: { image: "images/image16.jpeg", note: "notes/note16.txt", song: "music/song16.mp3" },
  17: { image: "images/image17.jpeg", note: "notes/note17.txt", song: "music/song17.mp3" },
  18: { image: "images/image18.jpeg", note: "notes/note18.txt", song: "music/song18.mp3" },
  19: { image: "images/image19.jpeg", note: "notes/note19.txt", song: "music/song19.mp3" },
  20: { image: "images/image20.jpeg", note: "notes/note20.txt", song: "music/song20.mp3" },
  21: { image: "images/image21.jpeg", note: "notes/note21.txt", song: "music/song21.mp3" },
  22: { image: "images/image22.jpeg", note: "notes/note22.txt", song: "music/song22.mp3" },
  23: { image: "images/image23.jpeg", note: "notes/note23.txt", song: "music/song23.mp3" },
  24: { image: "images/image24.jpeg", note: "notes/note24.txt", song: "music/song24.mp3" },
  // Add data for all 24 doors
};

// Initialize modal elements
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalNote = document.getElementById("modal-note");
const closeBtn = document.getElementById("close-btn");
//const audioElement = document.getElementById("background-audio");

// Get current date in Central European Time
const today = new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" });
const currentDay = new Date(today).getDate();

// Add interactivity to calendar doors
document.querySelectorAll(".calendar-square").forEach((door) => {
  const doorNumber = parseInt(door.getAttribute("data-door"));

  if (doorNumber <= currentDay) {
    door.addEventListener("click", () => openDoor(doorNumber, door));
  }
});

// Get audio element
const audioElement = document.getElementById("background-audio");

// Open door functionality
function openDoor(doorNumber, doorElement) {
  const data = doorData[doorNumber];
  if (!data) return;

  // Mark door as opened visually
  doorElement.classList.add("opened");

  // Set the background image of the opened door
  doorElement.style.backgroundImage = `url(${data.image})`;
  doorElement.style.backgroundSize = "cover"; // Ensure the image covers the square
  doorElement.style.backgroundPosition = "center"; // Center the image in the square
  doorElement.textContent = ""; // Remove the number after opening

  // Populate modal with image
  modalImage.src = data.image;
  //modalNote.textContent = data.note;

  // Load and display the note
  // Display the note directly
    if (data.note) {
      const iframeElement = document.createElement("iframe");
      iframeElement.src = data.note; // Path to the .txt file
      iframeElement.style.width = "100%";
      iframeElement.style.height = "150px"; // Adjust height as needed
      iframeElement.style.border = "none"; // Remove border for a clean look
      modalNote.innerHTML = ""; // Clear any previous content
      modalNote.appendChild(iframeElement); // Embed the .txt file in the modal
    } else {
      modalNote.textContent = "No note available.";
    }



  // Play the corresponding song
  if (data.song) {
    audioElement.src = data.song;
    audioElement.play();
  }

  // Show modal
  modal.classList.add("show");
  
}

// Close modal functionality
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");

  // Stop the audio
  audioElement.pause();
  audioElement.currentTime = 0; // Reset the audio
});

// Optional: Close modal on background click
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");

    // Stop the audio
    audioElement.pause();
    audioElement.currentTime = 0; // Reset the audio
  }
});
