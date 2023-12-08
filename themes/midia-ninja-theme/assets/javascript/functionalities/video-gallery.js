export class Video {

    constructor() {
        this.blocks = document.querySelectorAll('.embed-template-block');
        this.addLink();
    }

    addLink() {
        this.blocks.forEach((block) => {

            let iframe = block.querySelector('iframe');
            let columns = block.querySelector('.wp-block-columns');

            var blockLink = document.createElement('a');
            blockLink.setAttribute('target', '_blank');
            blockLink.setAttribute('href', this.getVideoUrl(iframe.src));
            blockLink.innerHTML = block.innerHTML;

            block.innerHTML = '';
            block.appendChild(blockLink);

        })
    }

    getVideoUrl(videoUrl) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = videoUrl.match(regExp);

        if (match && match[2].length == 11) {
            return 'https://www.youtube.com/watch?v=' + match[2];
        } else {
            return false;
        }
    }

}

document.defaultView.document.addEventListener('DOMContentLoaded', () => {
	new Video();
});