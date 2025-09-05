/**
 * UCR — Ultimate Custom Banner Changer
 * Autor: mnklak
 * Compatível com Revenge e Bunny
 */

const BANNER_KEY = "ucr_custom_banner";

function getBannerUrl() {
  return localStorage.getItem(BANNER_KEY);
}

function setBannerUrl(url) {
  localStorage.setItem(BANNER_KEY, url);
  injectBanner(url);
}

function resetBanner() {
  localStorage.removeItem(BANNER_KEY);
  removeInjectedBanner();
}

function injectBanner(url) {
  const profileBanner = document.querySelector('[class*="profileBanner"]');
  if (profileBanner) {
    profileBanner.style.backgroundImage = `url("${url}")`;
    profileBanner.style.backgroundSize = "cover";
    profileBanner.style.backgroundPosition = "center";
  }
}

function removeInjectedBanner() {
  const profileBanner = document.querySelector('[class*="profileBanner"]');
  if (profileBanner) {
    profileBanner.style.backgroundImage = "";
  }
}

function createUI() {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.background = "#2f3136";
  container.style.padding = "10px";
  container.style.borderRadius = "8px";
  container.style.zIndex = "9999";
  container.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  container.style.color = "#fff";
  container.style.fontFamily = "Segoe UI, sans-serif";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "URL do banner";
  input.style.width = "200px";
  input.style.marginRight = "10px";
  input.style.padding = "5px";
  input.style.borderRadius = "4px";
  input.style.border = "none";

  const setBtn = document.createElement("button");
  setBtn.textContent = "Aplicar";
  setBtn.style.padding = "5px 10px";
  setBtn.style.background = "#7289da";
  setBtn.style.border = "none";
  setBtn.style.borderRadius = "4px";
  setBtn.style.color = "#fff";
  setBtn.style.cursor = "pointer";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Resetar";
  resetBtn.style.marginLeft = "10px";
  resetBtn.style.padding = "5px 10px";
  resetBtn.style.background = "#f04747";
  resetBtn.style.border = "none";
  resetBtn.style.borderRadius = "4px";
  resetBtn.style.color = "#fff";
  resetBtn.style.cursor = "pointer";

  setBtn.onclick = () => {
    const url = input.value.trim();
    if (url) setBannerUrl(url);
  };

  resetBtn.onclick = () => {
    resetBanner();
  };

  container.appendChild(input);
  container.appendChild(setBtn);
  container.appendChild(resetBtn);
  document.body.appendChild(container);
}

// Auto-load banner on startup
window.addEventListener("load", () => {
  const url = getBannerUrl();
  if (url) injectBanner(url);
  createUI();
});
