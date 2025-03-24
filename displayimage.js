const images = ["comics/magicstar/comiclogo.png", "comics/magicstar/page1.png"];
let currentIndex = 0;

function getPageURL()
{
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get("page"), 10);
    return isNaN(page) || page < 0 || page >= images.length ? 0 : page;
}

function updateURL()
{
    const newURL = '${window.location.pathname}?page=${currentIndex}';
    window.history.replaceState(null, "", newURL);
}

function updateImage()
{
    document.getElementById("comicPage").src = images[currentIndex];
    document.getElementById("lastButton").disabled = currentIndex === 0;
    document.getElementById("nextButton").disabled = currentIndex === images.length - 1;
    updateURL();
}

function nextPage()
{
    if (currentIndex < images.length - 1)
        {
        currentIndex++;
        updateImage();
        }
}

function lastPage()
{
    if (currentIndex > 0)
    {
        currentIndex--;
        updateImage();
    }
}

currentIndex = getPageURL();
updateImage();
