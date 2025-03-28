const images = [
    "comics/magicstar/comiclogo.png",
    "comics/magicstar/page1.png",
    "comics/magicstar/page2.png",
    "comics/magicstar/page3.png"
];
let currentIndex = 0;

function getPageURL() {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");

    if (page === "cover-image") {
        return 0;
    }

    page = parseInt(page, 10);
    return isNaN(page) || page < 0 || page >= images.length ? 0 : page;
}

function getSavedPage()
{
    const savedPage = localStorage.getItem("comicPage");
    return savedPage !== null ? parseInt(savedPage, 10) : null;
}

function updateURL() {
    const newPage = currentIndex === 0 ? "cover-image" : currentIndex;
    const newURL = `${window.location.pathname}?page=${newPage}`;
    window.history.replaceState(null, "", newURL);
}

function savePage()
{
    localStorage.setItem("comicPage", currentIndex);
}

function updateImage() {
    document.getElementById("comicPage").src = images[currentIndex];
    document.getElementById("lastButton").disabled = currentIndex === 0;
    document.getElementById("nextButton").disabled = currentIndex === images.length - 1;
    updateURL();
    savePage();
}

function nextPage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
    }
}

function lastPage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
}

// Initialize the correct page based on URL
window.onload = function () {
    const savedPage = getSavedPage();
    currentIndex = getPageURL();
    updateImage();
};
