"use strict";

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const settingsImage = document.querySelector(".settings-image");
        const settings = document.querySelector(".settings");
        const cross = document.querySelector(".report__cross");

        settingsImage.addEventListener("click", () => {
            settingsImage.classList.toggle("_active");
            settings.classList.toggle("_active");
        });

        cross.addEventListener("click", () => {
            cross.closest(".report").classList.remove("_active");
        });
    });
})();
