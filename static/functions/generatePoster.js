// Set width and height (IMPLEMENT AFTER OTHER FUNCTIONS)
function setSize(){
    // default is A4, will change with user input once feature is added
    const width = '210mm';
    const height = '297mm';

    poster = document.getElementById('poster-container');
    poster.style.width = width;
    poster.style.height = height;
}

// Set dark/light mode
function setTheme(){
    theme = document.getElementById('theme').innerText;
    
    if(theme == 'light'){
        textColor = 'rgb(30, 31, 33)';
        bgColor = 'rgb(246, 247, 250)';
    }

    else if(theme == 'dark'){
        textColor = 'rgb(246, 247, 250)';
        bgColor = 'rgb(30, 31, 33)';
    }

    poster = document.getElementById('poster-container');
    poster.style.color = textColor;
    poster.style.backgroundColor = bgColor;

}

// Change CSS depending on orientation setting
function setOrient(){
    // orient = document.getElementById('orientation').innerText;
    
    // if(orient == 'portrait'){

    // }

    // else if(orient == 'landscape'){

    // }

    // poster = document.getElementById('poster-container');
    // poster.style.color = textColor;
    // poster.style.backgroundColor = bgColor;
}

// Main function
function generatePoster(data){
    console.log(data['artist'])
    alert(data['title']);
    // setSize();
    // setTheme();
    // setOrient();
}