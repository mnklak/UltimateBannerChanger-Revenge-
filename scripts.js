document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("changeBannerBtn");

  btn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/gif";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imgPreview = document.getElementById("bannerPreview");
          imgPreview.src = reader.result;
          alert("Banner carregado localmente! (Simulação)");
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  });
});
