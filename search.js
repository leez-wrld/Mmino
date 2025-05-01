document.addEventListener("DOMContentLoaded", () => {
  // Import Lucide icons
  const lucide = window.lucide

  // Initialize Lucide icons
  lucide.createIcons()

  // Create music notes background
  createMusicNotesBackground()

  // DOM elements
  const searchInput = document.getElementById("searchInput")
  const clearSearchBtn = document.getElementById("clearSearch")
  const searchSuggestions = document.getElementById("searchSuggestions")
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const loadingState = document.getElementById("loadingState")
  const emptyState = document.getElementById("emptyState")
  const noResultsState = document.getElementById("noResultsState")
  const searchResults = document.getElementById("searchResults")

  // Search input event listeners
  searchInput.addEventListener("input", function () {
    // Show/hide clear button
    if (this.value) {
      clearSearchBtn.classList.add("visible")
    } else {
      clearSearchBtn.classList.remove("visible")
    }

    // Perform search if query is longer than 1 character
    if (this.value.length > 1) {
      performSearch(this.value)
    } else {
      searchResults.classList.add("hidden")
      noResultsState.classList.add("hidden")
      emptyState.classList.remove("hidden")
    }
  })

  searchInput.addEventListener("focus", () => {
    searchSuggestions.classList.add("visible")
  })

  // Hide suggestions when clicking outside
  document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
      searchSuggestions.classList.remove("visible")
    }
  })

  // Clear search button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = ""
    clearSearchBtn.classList.remove("visible")
    searchResults.classList.add("hidden")
    noResultsState.classList.add("hidden")
    emptyState.classList.remove("hidden")
    searchInput.focus()
  })

  // Tab triggers
  tabTriggers.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabTriggers.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Filter results if there's a search query
      if (searchInput.value.length > 1) {
        performSearch(searchInput.value, this.dataset.filter)
      }
    })
  })

  // Suggestion items
  const suggestionItems = document.querySelectorAll(".suggestion-item")
  suggestionItems.forEach((item) => {
    item.addEventListener("click", function () {
      const name = this.querySelector(".suggestion-name").textContent
      searchInput.value = name
      clearSearchBtn.classList.add("visible")
      searchSuggestions.classList.remove("visible")
      performSearch(name)
    })
  })

  // Function to create music notes background
  function createMusicNotesBackground() {
    const musicNotesBg = document.getElementById("music-notes-bg")
    const musicNotes = ["♪", "♫", "♬", "♭", "♮", "♯"]

    for (let i = 0; i < 50; i++) {
      const note = document.createElement("div")
      note.className = "music-note"
      note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)]

      const size = Math.random() * 20 + 10
      note.style.fontSize = `${size}px`

      const posX = Math.random() * 100
      note.style.left = `${posX}%`

      const delay = Math.random() * 10
      note.style.animationDelay = `${delay}s`

      musicNotesBg.appendChild(note)
    }
  }

  // Mock search function
  function performSearch(query, filter = "all") {
    // Show loading state
    loadingState.classList.remove("hidden")
    searchResults.classList.add("hidden")
    noResultsState.classList.add("hidden")
    emptyState.classList.add("hidden")

    // Simulate API call delay
    setTimeout(() => {
      // Get mock results
      const results = generateMockResults(query, filter)

      // Hide loading state
      loadingState.classList.add("hidden")

      if (results.length > 0) {
        // Render results
        renderSearchResults(results)
        searchResults.classList.remove("hidden")
      } else {
        // Show no results state
        noResultsState.classList.remove("hidden")
      }
    }, 500)
  }

  // Render search results
  function renderSearchResults(results) {
    searchResults.innerHTML = ""

    results.forEach((result) => {
      const resultCard = document.createElement("div")
      resultCard.className = "result-card"

      let imageContent = ""
      if (result.type === "playlist") {
        // For playlists, use colored background with icon
        const colorClass = result.title.includes("Chill")
          ? "blue-purple"
          : result.title.includes("Workout")
            ? "pink-purple"
            : "indigo-blue"

        const icon = result.title.includes("Chill")
          ? "headphones"
          : result.title.includes("Workout")
            ? "dumbbell"
            : "music"

        imageContent = `
                    <div class="result-image-container ${colorClass}">
                        <div class="result-overlay">
                            <div class="play-icon">
                                <i data-lucide="play" color="white"></i>
                            </div>
                        </div>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                            <i data-lucide="${icon}" size="48" color="white"></i>
                        </div>
                    </div>
                `
      } else {
        // For other types, use image
        imageContent = `
                    <div class="result-image-container">
                        <img src="${result.image}" alt="${result.title}" class="result-image">
                        <div class="result-overlay">
                            <div class="play-icon">
                                <i data-lucide="play" color="white"></i>
                            </div>
                        </div>
                        ${result.type !== "song" ? `<div class="result-type-badge">${capitalizeFirstLetter(result.type)}</div>` : ""}
                    </div>
                `
      }

      resultCard.innerHTML = `
                ${imageContent}
                <div class="result-content">
                    <h3 class="result-title">${result.title}</h3>
                    <p class="result-subtitle">${result.subtitle}</p>
                </div>
            `

      searchResults.appendChild(resultCard)
    })

    // Re-initialize Lucide icons for the new content
    lucide.createIcons()
  }

  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Generate mock search results
  function generateMockResults(query, filter = "all") {
    const mockData = [
      {
        type: "song",
        title: "Blinding Lights",
        subtitle: "The Weeknd",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/after%20hours.jpg-mBQNDu3SvF53QLeezuOVaiYROSMF3M.jpeg",
      },
      {
        type: "song",
        title: "Save Your Tears",
        subtitle: "The Weeknd",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/after%20hours.jpg-mBQNDu3SvF53QLeezuOVaiYROSMF3M.jpeg",
      },
      {
        type: "song",
        title: "Levitating",
        subtitle: "Dua Lipa",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/levitating-OjRNnnSwL6hUdtu6qN45dOv9DdaNiX.jpeg",
      },
      {
        type: "artist",
        title: "The Weeknd",
        subtitle: "Artist",
        image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
      },
      {
        type: "artist",
        title: "Dua Lipa",
        subtitle: "Artist",
        image: "https://i.scdn.co/image/ab6761610000e5eb54e0cc6e97b5aa60beaded4f",
      },
      {
        type: "album",
        title: "After Hours",
        subtitle: "The Weeknd",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/after%20hours.jpg-mBQNDu3SvF53QLeezuOVaiYROSMF3M.jpeg",
      },
      {
        type: "album",
        title: "Future Nostalgia",
        subtitle: "Dua Lipa",
        image: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
      },
      {
        type: "playlist",
        title: "Chill Vibes",
        subtitle: "Perfect for relaxing",
        image: "/placeholder.svg?height=400&width=400",
      },
      {
        type: "playlist",
        title: "Workout Mix",
        subtitle: "High energy tracks",
        image: "/placeholder.svg?height=400&width=400",
      },
    ]

    // Filter by type if needed
    let filteredData = mockData
    if (filter !== "all") {
      // Remove 's' from filter (e.g., 'songs' -> 'song')
      const filterType = filter.slice(0, -1)
      filteredData = mockData.filter((item) => item.type === filterType)
    }

    // Filter by query (case insensitive)
    const lowerQuery = query.toLowerCase()
    return filteredData.filter(
      (item) => item.title.toLowerCase().includes(lowerQuery) || item.subtitle.toLowerCase().includes(lowerQuery),
    )
  }
})
