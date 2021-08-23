function getAttributes() {
    return [
        document.querySelector("#count-alive"),
        document.querySelector("#yin-percent"),
        document.querySelector("#yang-percent"),
        document.querySelector("#grid-checkbox"),
        document.querySelector("#canvas-checkbox"),
    ];
}

function getDataFromLocalStorage() {
    getAttributes().forEach((item) => {
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
    getAttributes().forEach((item) => {
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

export { getDataFromLocalStorage, postDataToLocalStorage };
