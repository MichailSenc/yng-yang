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

export { getDataFromLocalStorage, postDataToLocalStorage };
