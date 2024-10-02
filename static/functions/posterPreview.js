function updatePreview(event) {
    const modalContainer = event.target.closest('.poster-modal-settings');
    const previewImg = modalContainer.previousElementSibling.querySelector("img");
    const orient = modalContainer.querySelector('input[name="orientation"]:checked').value;
    const theme = modalContainer.querySelector('input[name="bg-color"]:checked').value;
    
    previewImg.src = '/static/previews/pre-' + orient + '-' + theme + '.png';

    previewImg.style.backgroundColor = (theme === 'light') ? "rgb(246, 247, 250)" : "rgb(30, 31, 33)";
    previewImg.style.width = (orient === 'landscape') ? "500px" : "8cm";
}

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.poster-modal-settings');
    modals.forEach(modal => {
        modal.addEventListener('change', updatePreview);
    });
});