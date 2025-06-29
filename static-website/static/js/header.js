const topNavMenu = document.querySelector("#top-nav-menu");
const openTopNavMenu = document.querySelector("#open-top-nav-menu");
const closeTopNavMenu = document.querySelector("#close-top-nav-menu");
if (topNavMenu && openTopNavMenu && closeTopNavMenu) {
    openTopNavMenu.addEventListener("click", () => {
        console.log("it should be open!!!!!!!!")
        topNavMenu.classList.remove("hidden");
    });
    closeTopNavMenu.addEventListener("click", () => {
        topNavMenu.classList.add("hidden");
    });
}