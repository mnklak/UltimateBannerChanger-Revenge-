(function () {
  const bannerURL = "https://i.imgur.com/5QFQk8F.png"; // 🔁 Troque pela URL do seu banner

  function removeNitroButton() {
    const nitroButton = document.querySelector('[class*="premium"], [class*="upsell"], [class*="Nitro"]');
    if (nitroButton) {
      nitroButton.remove();
      console.log("Botão Nitro removido.");
    }
  }

  function injectBanner(url) {
    let bannerElement = document.querySelector('[class*="banner"], [class*="ProfileBanner"], [class*="profileBanner"]');

    if (!bannerElement) {
      console.warn("Banner original não encontrado. Criando elemento alternativo...");

      const profileContainer = document.querySelector('[class*="profile"]');
      if (profileContainer) {
        bannerElement = document.createElement("div");
        bannerElement.style.width = "100%";
        bannerElement.style.height = "120px";
        bannerElement.style.backgroundImage = `url("${url}")`;
        bannerElement.style.backgroundSize = "cover";
        bannerElement.style.backgroundPosition = "center";
        bannerElement.style.borderRadius = "8px";
        bannerElement.style.marginBottom = "10px";
        profileContainer.prepend(bannerElement);
        return;
      }
    }

    bannerElement.style.backgroundImage = `url("${url}")`;
    bannerElement.style.backgroundSize = "cover";
    bannerElement.style.backgroundPosition = "center";
    bannerElement.style.opacity = "1";
    console.log("Banner aplicado.");
  }

  function addCustomButton() {
    const bannerContainer = document.querySelector('[class*="banner"], [class*="ProfileBanner"], [class*="profileBanner"]');

    if (bannerContainer) {
      const customButton = document.createElement("button");
      customButton.innerText = "Editar Banner";
      customButton.style.padding = "8px 12px";
      customButton.style.marginTop = "10px";
      customButton.style.border = "none";
      customButton.style.borderRadius = "6px";
      customButton.style.backgroundColor = "#5865F2";
      customButton.style.color = "#fff";
      customButton.style.cursor = "pointer";
      customButton.style.fontWeight = "bold";
      customButton.onclick = () => {
        const newURL = prompt("Digite a URL do novo banner:");
        if (newURL) injectBanner(newURL);
      };

      bannerContainer.appendChild(customButton);
      console.log("Botão customizado adicionado.");
    }
  }

  function initPlugin() {
    const interval = setInterval(() => {
      const profileReady = document.querySelector('[class*="profile"]');
      if (profileReady) {
        clearInterval(interval);
        removeNitroButton();
        injectBanner(bannerURL);
        addCustomButton();
      }
    }, 1000);
  }

  initPlugin();
})();
