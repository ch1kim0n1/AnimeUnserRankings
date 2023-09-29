document.addEventListener("DOMContentLoaded", function () {
  const objectHolder = document.querySelector(".object-holder");
  const rankingList = document.querySelector(".ranking ol");
  const saveButton = document.getElementById("save-button");
  const maxRankingItems = 10; // Maximum number of items in the ranking list

  console.log("objectHolder:", objectHolder);
  console.log("rankingList:", rankingList);

  // Mock data (replace with your JSON data)
  const animeData = [
    { id: 1, name: "Anime 1", image: "images/Anime/1.jpg" },
    { id: 2, name: "Anime 2", image: "images/Anime/1.jpg" },
    { id: 3, name: "Anime 3", image: "images/Anime/1.jpg" },
    // Add more data
  ];

  // Initialize the ranking list
  for (let i = 1; i <= maxRankingItems; i++) {
    const rankingItem = document.createElement("li");
    rankingItem.className = "ranking-item";
    rankingItem.textContent = i;
    rankingList.appendChild(rankingItem);
  }

  // Create draggable objects from data
  animeData.forEach((anime) => {
    const animeObject = document.createElement("div");
    animeObject.className = "draggable";
    const animeImage = document.createElement("img");
    animeImage.src = anime.image;
    animeObject.appendChild(animeImage);
    animeObject.setAttribute("draggable", true);

    console.log("animeObject:", animeObject);

    animeObject.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", anime.id);
      e.target.classList.add("dragging");
    });

    animeObject.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });

    if (objectHolder) {
      objectHolder.appendChild(animeObject);
    } else {
      console.error("Object holder not found");
    }
  });

  // Handle drag-and-drop functionality
  rankingList.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  rankingList.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const rankingItem = e.target;

    if (!rankingItem.classList.contains("dragged")) {
      const animeObject = document.querySelector(`[data-anime-id="${data}"]`);
      rankingItem.appendChild(animeObject);
      rankingItem.classList.add("dragged");
    }
  });

  // Handle saving the ranking
  saveButton.addEventListener("click", () => {
    const rankedItems = Array.from(rankingList.children)
      .filter((item) => item.classList.contains("dragged"))
      .map((item) => item.dataset.animeId);

    // Send the rankedItems data to your server or perform other actions here
    console.log("Ranked Items:", rankedItems);
    alert("Ranking saved!");

    // Convert the ranking list to an image and save as JPG
    html2canvas(rankingList).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.download = "ranking.jpg";
      link.href = imgData;
      link.click();
    });
  });
});