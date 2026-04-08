/**
 * Slide Panel Functions
 * Handles the opening and closing of slide-in panels for model details
 */

function openSlidePanel(title, content, imageUrl, imageUrlData) {
  const panel = document.getElementById("slide-panel");
  const panelTitle = document.getElementById("panel-title");
  const panelContent = document.getElementById("panel-content");
  const panelImage = document.getElementById("panel-image");
  const panelDownloads = document.getElementById("panel-downloads");

  console.log("Image URL Data:", imageUrlData);
  // Set content
  panelTitle.textContent = title || "Model Details";
  panelContent.innerHTML = content || "";

  // Set image
  if (imageUrl) {
    panelImage.src = imageUrl;
    panelImage.alt = title || "Model Image";
  }

  // Handle image_url data for downloads
  if (
    imageUrlData &&
    Array.isArray(imageUrlData) &&
    imageUrlData.length > 0 &&
    panelDownloads
  ) {
    panelDownloads.innerHTML = "";

    // Create download links section
    const downloadsTitle = document.createElement("h3");
    downloadsTitle.className = "text-lg font-semibold mb-3";
    downloadsTitle.textContent = "Download als:";
    panelDownloads.appendChild(downloadsTitle);

    const downloadsList = document.createElement("div");
    downloadsList.className = "flex flex-wrap gap-2";

    // Process each download item from the grid data
    imageUrlData.forEach((item) => {
      if (item.url && item.bestand) {
        const downloadLink = document.createElement("a");
        downloadLink.href = `https://havee.nl/app/uploads/${item.url}`;
        downloadLink.target = "_blank";
        downloadLink.className = "w-20 btn-primary-download";

        // Create content based on file type
        if (item.bestand !== "PDF") {
          downloadLink.innerHTML = `<div class="text-center">${item.bestand} - formaat</div>`;
        } else {
          downloadLink.innerHTML = `<div>${item.bestand}</div> ${item.naam || "Download"}`;
          downloadLink.style.width = "250px";
        }

        downloadsList.appendChild(downloadLink);
      }
    });

    panelDownloads.appendChild(downloadsList);
  }

  // Show panel
  panel.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

function openSlidePanelFromData(element) {
  const title = element.dataset.title || "";
  const content = element.dataset.content || "";
  const imageUrl = element.dataset.image || "";
  let downloads = [];

  try {
    if (element.dataset.downloads) {
      downloads = JSON.parse(element.dataset.downloads);
    }
  } catch (e) {
    console.log("Error parsing downloads data:", e);
  }

  openSlidePanel(title, content, imageUrl, downloads);
}

function closeSlidePanel() {
  const panel = document.getElementById("slide-panel");
  panel.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Close on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSlidePanel();
  }
});
