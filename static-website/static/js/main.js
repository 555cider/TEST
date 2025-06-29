async function insertComponents() {
    const elements = document.getElementsByTagName("copmonent");
    if (elements) {
        for (let i = 0; i < elements.length; i++) {
            const path = elements[i].getAttribute("path");
            const key = elements[i].getAttribute("key");
            if (path && key) {
                try {
                    const response = await fetch(path);
                    const data = await response.json();
                    elements[i].innerHTML = data[key];
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    }
}

async function insertComponentTo(id) {
    const element = document.querySelector("#" + id);
    if (element) {
        const path = element.getAttribute("path");
        const key = element.getAttribute("key");
        if (path && key) {
            try {
                const response = await fetch(path);
                const data = await response.json();
                element.innerHTML = data[key];
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }
}

async function insertComponentsByPath() {
    const elements = document.getElementsByTagName("component");
    if (elements) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element) {
                const path = element.getAttribute("path");
                if (path) {
                    fetch(path)
                        .then(response => response.text())
                        .then(text => element.innerHTML = text);
                }
            }
        }
    }
}

async function insertComponentByPathTo(id) {
    const element = document.querySelector("#" + id);
    if (element) {
        const path = element.getAttribute("path");
        if (path) {
            fetch(path)
                .then(response => response.text())
                .then(text => element.innerHTML = text);
        }
    }
}