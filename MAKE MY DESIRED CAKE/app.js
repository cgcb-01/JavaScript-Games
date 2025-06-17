
const kitchen = document.getElementById("kitchen");
let cakeBottom = 20;

document.querySelectorAll(".ingredient").forEach(img => {
  img.addEventListener("click", () => {
    const newLayer = document.createElement("img");
    newLayer.src = img.src;
    newLayer.classList.add("layer");

    if (img.classList.contains("cream")) {
      newLayer.classList.add("cream");
      newLayer.style.bottom = cakeBottom + "px";
      cakeBottom += 40; // height from cream layer
    } else {
      newLayer.classList.add("cake");
      newLayer.style.bottom = cakeBottom + "px";
      cakeBottom += 70; 
    }

    kitchen.appendChild(newLayer);
  });
});
