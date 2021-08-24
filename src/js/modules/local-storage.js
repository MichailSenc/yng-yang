import * as defaults from "../defaults";

const mainAttr = [
    document.querySelector("#count-alive"),
    document.querySelector("#yin-percent"),
    document.querySelector("#yang-percent"),
    document.querySelector("#grid-checkbox"),
    document.querySelector("#canvas-checkbox"),
    document.querySelector("#settings-cell-size"),
    document.querySelector("#settings-yng-color"),
    document.querySelector("#settings-yang-color"),
    document.querySelector("#settings-grid-color"),
];

function getSettingsData() {
    return {
        empty: defaults.EMPTY_COLOR,
        cell: +localStorage.getItem("settings-cell-size") || defaults.CELL_SIZE,
        yng: localStorage.getItem("settings-yng-color") || defaults.YNG_COLOR,
        yang: localStorage.getItem("settings-yang-color") || defaults.YANG_COLOR,
        grid: localStorage.getItem("settings-grid-color") || defaults.GRID_COLOR,
    };
}

function getDataFromLocalStorage() {
    mainAttr.forEach((item) => {
        let value = localStorage.getItem(item.getAttribute("id"));
        if (value) {
            if (item.getAttribute("type") === "checkbox") {
                item.checked = value == "true";
            } else {
                item.value = value;
            }
        }
    });
}

function postDataToLocalStorage() {
    mainAttr.forEach((item) => {
        if (item.getAttribute("type") === "checkbox") {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.checked);
            });
        } else {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.value);
            });
        }
    });
}

function settingsItems() {
    return [
        document.querySelector("settings-cell-size"),
        document.querySelector("settings-yng-color"),
        document.querySelector("settings-yang-color"),
        document.querySelector("settings-grid-color"),
    ];
}

function getSettings() {
    settingsItems.forEach((item) => {
        let value = localStorage.getItem(item.getAttribute("id"));
        if (value) {
            item.value = value;
        }
    });
}

function postSettings() {
    settingsItems.forEach((item) => {
        localStorage.setItem(item.getAttribute("id"));
        let value = localStorage.getItem(item.getAttribute("id"));
        if (value) {
            item.value = value;
        }
    });
}

export {getDataFromLocalStorage, postDataToLocalStorage, getSettingsData};
