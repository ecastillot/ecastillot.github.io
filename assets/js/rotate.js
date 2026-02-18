let currentImages = [];
let currentIndex = 0;


document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const fullImg = document.getElementById("fullImg");
  const closeBtn = document.querySelector(".close");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const captionPanel = document.getElementById("captionPanel");

  // Attach click to all publication images
  document.querySelectorAll(".image-rotator img").forEach((img, index, images) => {
    img.addEventListener("click", function () {

      // Collect all images in this rotator
      const container = img.closest(".image-rotator");
      currentImages = Array.from(container.querySelectorAll("img"));
      currentIndex = 0;

      openLightbox();
    });
  });

  function updateLightbox() {
    const img = currentImages[currentIndex];
    fullImg.src = img.src;
    captionPanel.innerText = img.dataset.caption || "";
  }

  function openLightbox() {
    updateLightbox();
    lightbox.style.display = "flex";
    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.classList.remove("modal-open");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
    }

    function showPrev() {
    currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
    }
  closeBtn.addEventListener("click", closeLightbox);
  rightArrow.addEventListener("click", showNext);
  leftArrow.addEventListener("click", showPrev);

  // Close when clicking outside image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    }
  });
});
