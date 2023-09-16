document.addEventListener("DOMContentLoaded", function () {
  const objectHolder = document.querySelector(".object-holder");
  const rankingList = document.querySelector(".ranking ol");
  const saveButton = document.getElementById("save-button");
  const maxRankingItems = 10; // Maximum number of items in the ranking list

  // Mock data (replace with your JSON data)
  const animeData = [
    { id: 1, name: "Anime 1" },
    { id: 2, name: "Anime 2" },
    { id: 3, name: "Anime 3" },
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
    animeObject.textContent = anime.name;
    animeObject.setAttribute("draggable", true);

    animeObject.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.textContent);
    });

    objectHolder.appendChild(animeObject);
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
      rankingItem.textContent = data;
      rankingItem.classList.add("dragged");
    }
  });

  // Handle saving the ranking
  saveButton.addEventListener("click", () => {
    const rankedItems = Array.from(rankingList.children)
      .filter((item) => item.classList.contains("dragged"))
      .map((item) => item.textContent);

    // Send the rankedItems data to your server or perform other actions here
    console.log("Ranked Items:", rankedItems);
    alert("Ranking saved!");
  });
});