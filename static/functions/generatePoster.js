// define and reset alert elements for progress updates
const alertHead = document.getElementById('alert-heading');
const alertBody = document.getElementById('alert-desc');
alertHead.innerText = "";
alertBody.innerText = "";

document.body.onload = function() {
    alertHead.innerText = "Generating poster...";
    alertBody.innerText = "Your poster is being generated. Please wait";

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
        setOrient();
        setSize();
        setTheme();
        resizeText('tracklist');
        resizeText('title');

        // Use html2canvas to take a screenshot of the poster container
        html2canvas(document.getElementById('poster-container')).then(canvas => {

            // Append canvas to its own div for hiding after image creation
            let canvasDiv = document.getElementById('complete-poster');
            canvasDiv.appendChild(canvas);
            alert(canvasDiv.style.width + ' ' + canvasDiv.style.height);

            // Turn canvas into image and put image in container
            document.getElementById('final-image').innerHTML = '';  // Clear previous content
            const canvasURL = canvas.toDataURL();
            const canvasImg = document.createElement('img');
            canvasImg.src = canvasURL;

            document.getElementById('final-image').appendChild(canvasImg);

            // convert canvas to dataUrl
            let downloadBtn = document.getElementById('download-button');

            // create link to download URL-ified canvas
            var link = document.createElement('a');
            link.download = 'album-postify.png';
            link.href = canvasURL;

            // click link when download button is pressed
            downloadBtn.addEventListener("click", function(){ link.click(); });

            alertHead.innerText = "Poster generated!";
            alertBody.innerText = "Use the button provided to download.";

        });


    }

    function resizeText(name) {
        const container = document.getElementById(name+'-container');
        const text = document.getElementById(name);
        let fontSize = parseInt(window.getComputedStyle(text).fontSize);
      
        // Reduce the font size until the text fits inside the container
        while (text.clientHeight > container.clientHeight) {
          fontSize -= 1;
          text.style.fontSize = fontSize + 'px';
          text.offsetHeight;
        }
        return
      }      

    // First, convert the album cover image to a Data URL
    convertToDataURL(albumCover.src, function(dataUrl) {
        albumCover.src = dataUrl;  // Replace the image src with the Data URL
        // After setting the data URL, check if the image is loaded

        albumCover.onload = function() {
            generatePoster();  // Generate the poster after the image is loaded

            const poster = document.getElementById('poster-container');
            poster.style.display = "none";
        };
    });
};

// Set width and height
function setSize() {
    const x = '210mm';
    const y = '297mm';

    let width = '';
    let height = '';

    const orient = document.getElementById('orientation').innerText;

    if(orient == "landscape"){
        width = y;
        height = x;
    } else if(orient == "portrait"){
        width = x;
        height = y;
    }

    const poster = document.getElementById('poster-container');
    poster.style.width = width;
    poster.style.height = height;

    alert(poster.style.cssText)
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

function setOrient() {
    const orient = document.getElementById('orientation').innerText;

    if (orient === 'landscape') {
        // if landscape, add landscape class to required elements.
        const poster = document.getElementById('poster-container');
        const titleContainer = document.getElementById('title-container');

        poster.style.flexDirection = "row";
        titleContainer.style.height = "22%";

        for (let child of poster.children){
            child.classList.add("landscape");
        }
    } 
}