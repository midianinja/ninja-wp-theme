import numberMask from './../masks/number-masker';

const maskableItens = document.querySelectorAll('.wp-block-jaci-deforestation-info span[data-mask=true]');
maskableItens.forEach(item => {
    if (deforestationInfo.getLangCode === 'pt-br') {
        item.innerHTML = numberMask(item.innerHTML);
    } else {
        item.innerHTML = numberMask(item.innerHTML, ',');
    }
});
