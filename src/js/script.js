"use strict";
import * as defaults from "./defaults";

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const settingsImage = document.querySelector(".settings-image"),
            settings = document.querySelector(".settings"),
            report = document.querySelector(".report"),
            reportText = document.querySelector(".report__text"),
            cross = document.querySelector(".report__cross"),
            settingsDefault = document.querySelector("#settings-def-btn"),
            settingsApply = document.querySelector("#settings-apply-btn"),
            settingsYng = document.querySelector("#settings-yng-color"),
            settingsYang = document.querySelector("#settings-yang-color"),
            settingsGrid = document.querySelector("#settings-grid-color"),
            settingsCellSize = document.querySelector("#settings-cell-size");

        settingsImage.addEventListener("click", () => {
            settingsImage.classList.toggle("_active");
            settings.classList.toggle("_active");
        });

        cross.addEventListener("click", () => {
            cross.closest(".report").classList.remove("_active");
        });

        settingsDefault.addEventListener("click", () => {
            settingsYng.value = defaults.YNG_COLOR;
            settingsYang.value = defaults.YANG_COLOR;
            settingsGrid.value = defaults.GRID_COLOR;
            settingsCellSize.value = defaults.CELL_SIZE;
            let event = new Event("change");
            [settingsYng, settingsYang, settingsGrid, settingsCellSize].forEach((item) => item.dispatchEvent(event));
        });

        settingsApply.addEventListener("click", () => {
            settings.classList.remove("_active");
            settingsImage.classList.remove("_active");
            if (settings.classList.contains("_message")) {
                reportText.innerText = "Размер клетки будет изменён после перезагрузки страницы";
                report.classList.add("_active");
                settings.classList.remove("_message");
            }
        });

        settingsCellSize.addEventListener("change", () => {
            report.classList.remove("_active");
            settings.classList.add("_message");
        });
    });
})();
