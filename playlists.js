document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  const lucide = window.lucide
  lucide.createIcons()

  // Create music notes background
  createMusicNotesBackground()

  // Play button functionality
  const playButtons = document.querySelectorAll(".play-button, .play-button-small")

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Here you would implement actual play functionality
      // For now, we'll just add a visual feedback
      this.classList.add("playing")
      setTimeout(() => {
        this.classList.remove("playing")
      }, 200)
    })
  })

  // Function to create music notes background
  function createMusicNotesBackground() {
    const musicNotesBg = document.getElementById("music-notes-bg")
    if (!musicNotesBg) return // Safety check

    // Clear any existing notes first
    musicNotesBg.innerHTML = ""

    const musicNotes = ["♪", "♫", "♬", "♭", "♮", "♯"]
    const fragment = document.createDocumentFragment()

    // Reduce the number of notes for better performance
    const noteCount = window.innerWidth < 768 ? 20 : 30

    for (let i = 0; i < noteCount; i++) {
      const note = document.createElement("div")
      note.className = "music-note"
      note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)]

      const size = Math.random() * 20 + 10
      note.style.fontSize = `${size}px`

      const posX = Math.random() * 100
      note.style.left = `${posX}%`

      const delay = Math.random() * 5 // Reduced max delay for faster initial appearance
      note.style.animationDelay = `${delay}s`

      // Add animation duration variation for more natural movement
      const duration = 10 + Math.random() * 5
      note.style.animationDuration = `${duration}s`

      fragment.appendChild(note)
    }

    musicNotesBg.appendChild(fragment)
  }

  // Add hover effects to playlist cards
  const playlistCards = document.querySelectorAll(
    ".playlist-card, .artist-playlist-card, .collection-card, .featured-playlist-card",
  )

  playlistCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-0.5rem)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
})

// Add a window load event listener to ensure the DOM is fully loaded
window.addEventListener("load", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Function to create music notes background
  function createMusicNotesBackground() {
    const musicNotesBg = document.getElementById("music-notes-bg")
    if (!musicNotesBg) return // Safety check

    // Clear any existing notes first
    musicNotesBg.innerHTML = ""

    const musicNotes = ["♪", "♫", "♬", "♭", "♮", "♯"]
    const fragment = document.createDocumentFragment()

    // Reduce the number of notes for better performance
    const noteCount = window.innerWidth < 768 ? 20 : 30

    for (let i = 0; i < noteCount; i++) {
      const note = document.createElement("div")
      note.className = "music-note"
      note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)]

      const size = Math.random() * 20 + 10
      note.style.fontSize = `${size}px`

      const posX = Math.random() * 100
      note.style.left = `${posX}%`

      const delay = Math.random() * 5 // Reduced max delay for faster initial appearance
      note.style.animationDelay = `${delay}s`

      // Add animation duration variation for more natural movement
      const duration = 10 + Math.random() * 5
      note.style.animationDuration = `${duration}s`

      fragment.appendChild(note)
    }

    musicNotesBg.appendChild(fragment)
  }

  // Create music notes background
  createMusicNotesBackground()

  // Recreate notes on window resize for responsive behavior
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(createMusicNotesBackground, 300)
  })

  // Play button functionality
  const playButtons = document.querySelectorAll(".play-button, .play-button-small")

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Here you would implement actual play functionality
      // For now, we'll just add a visual feedback
      this.classList.add("playing")
      setTimeout(() => {
        this.classList.remove("playing")
      }, 200)
    })
  })

  // Add hover effects to playlist cards
  const playlistCards = document.querySelectorAll(
    ".playlist-card, .artist-playlist-card, .collection-card, .featured-playlist-card",
  )

  playlistCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-0.5rem)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
})
