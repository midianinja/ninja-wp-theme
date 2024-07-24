const setThumbnailHeightByAuthorCard = function() {
    // Função para definir a altura da imagem de acordo com o card do autor
    var thumbnailImg = document.querySelector('img.attachment-post-thumbnail');

    if (thumbnailImg) {
		var authorInfoCard = document.querySelector('.author-info .author-info-card');
		var authorInfoHeight = authorInfoCard.offsetHeight;
		console.log( authorInfoHeight, authorInfoCard.height, authorInfoCard.clientHeight)

		if( authorInfoCard && authorInfoHeight > 200 ) {
			// Define a altura da imagem como a altura do .author-info-card
			thumbnailImg.style.height = authorInfoCard.offsetHeight + 'px';
		} else {
			setTimeout(function(){
				setThumbnailHeightByAuthorCard()
			}, 800);
		}

    }
}
window.addEventListener("load", (event) => {
	if( window.innerWidth < 900 ) {
		return
	}
	setThumbnailHeightByAuthorCard()
});
