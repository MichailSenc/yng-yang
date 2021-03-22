function getAttributes() {
    return [
        document.querySelector("#count_alive"),
        document.querySelector("#yin_percent"),
        document.querySelector("#yang_percent"),
        document.querySelector("#grid_checkbox"),
        document.querySelector("#canvas_checkbox"),
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

export { getDataFromLocalStorage, postDataToLocalStorage };
