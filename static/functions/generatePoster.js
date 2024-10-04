let alertPopup = document.getElementById('poster-alert');
alertPopup.classList.add('alert-info')
alertPopup.innerHTML = "Generating poster...";

document.body.onload = function() {
    alertPopup.innerHTML = "Generating poster...";

    const albumCover = document.getElementById('cover-img');

    // Function to convert an image URL to a Data URL (to avoid cross-origin issues)
    function convertToDataURL(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);  // Pass the data URL to the callback
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    // Function to generate the poster after the image is loaded
    function generatePoster() {
        // Set poster size and theme before generating the image
        setSize();
        setTheme();

        // Use html2canvas to take a screenshot of the poster container
        html2canvas(document.getElementById('poster-container')).then(canvas => {
            // Append the generated canvas to the final image div
            document.getElementById('final-image').innerHTML = '';  // Clear previous content
            document.getElementById('final-image').appendChild(canvas);

        });
    }

    function resizeText(name) {
        const container = document.getElementById(name+'-container');
        const text = document.getElementById(name);
        let fontSize = parseInt(window.getComputedStyle(text).fontSize);
      
        // Reduce the font size until the text fits inside the container
        while (text.scrollHeight > container.clientHeight && fontSize > 10) {
          fontSize -= 1;
          text.style.fontSize = fontSize + 'px';
        }
      }      


    // First, convert the album cover image to a Data URL
    convertToDataURL(albumCover.src, function(dataUrl) {
        albumCover.src = dataUrl;  // Replace the image src with the Data URL
        // After setting the data URL, check if the image is loaded

        albumCover.onload = function() {
            resizeText('tracklist');
            resizeText('title');
            generatePoster();  // Generate the poster after the image is loaded
            // resizeText('tracklist');

            alertPopup.classList.remove('alert-info')
            alertPopup.classList.add('alert-success')
            alertPopup.innerHTML = "Poster generated! Use the button provided to download the image, or right-click to 'Save Image As...'. Please do not sell or redistribute these images.";
        };
    });
};

// Set width and height
function setSize() {
    const width = '210mm';
    const height = '297mm';

    const poster = document.getElementById('poster-container');
    poster.style.width = width;
    poster.style.height = height;
}

// Set dark/light theme
function setTheme() {
    const theme = document.getElementById('theme').innerText;
    let textColor, bgColor;

    if (theme === 'light') {
        textColor = 'rgb(30, 31, 33)';
        bgColor = 'rgb(246, 247, 250)';
    } else if (theme === 'dark') {
        textColor = 'rgb(246, 247, 250)';
        bgColor = 'rgb(30, 31, 33)';
    }

    const poster = document.getElementById('poster-container');
    poster.style.color = textColor;
    poster.style.backgroundColor = bgColor;
}