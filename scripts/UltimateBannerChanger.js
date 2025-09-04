// Ultimate Banner Changer para Revenge
// Permite mudar o banner do Discord sem Nitro com interface simples

/**
 * Pega o token do usuário atual
 */
function getToken() {
    // Dependendo do client mod, pode ser window.localStorage ou API interna
    return window.localStorage.token?.replace(/"/g, "") || "SEU_TOKEN_AQUI";
}

/**
 * Converte uma imagem (URL) para base64
 */
async function imageUrlToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Muda o banner do usuário
 * @param {string} bannerBase64 - Imagem em base64
 */
async function changeBannerBase64(bannerBase64) {
    const endpoint = "https://discord.com/api/v9/users/@me/profile";
    const body = {
        banner: bannerBase64,
        banner_type: "1", // tipo GIF/JPG/PNG
    };
    const resp = await fetch(endpoint, {
        method: "PATCH",
        headers: {
            "Authorization": getToken(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (resp.ok) {
        showToast("Banner alterado com sucesso!");
    } else {
        showToast("Falha ao alterar banner: " + resp.statusText);
    }
}

/**
 * Valida se uma URL é uma imagem
 */
function isValidImageUrl(url) {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
}

/**
 * Menu de uso rápido
 */
async function openBannerChangerMenu() {
    const url = prompt("Cole a URL da imagem para banner:");
    if (!url || !isValidImageUrl(url)) {
        showToast("URL inválida! Use JPG, PNG ou GIF.");
        return;
    }
    showToast("Convertendo imagem...");
    try {
        const base64 = await imageUrlToBase64(url);
        await changeBannerBase64(base64);
    } catch (e) {
        showToast("Erro na conversão: " + e.message);
    }
}

/**
 * Toast de feedback
 */
function showToast(msg) {
    // Se Revenge tiver API de toast, use-a. Ou use alert.
    if (window.showToast) window.showToast(msg);
    else alert(msg);
}

/**
 * Comando global
 */
window.openBannerChangerMenu = openBannerChangerMenu;

// Auto toast para usuário saber usar
showToast("Ultimate Banner Changer carregado! Use openBannerChangerMenu() para iniciar.");
