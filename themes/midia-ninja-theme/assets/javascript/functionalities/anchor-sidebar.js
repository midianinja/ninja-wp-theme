document.addEventListener("DOMContentLoaded", function(){

    let linkList = ''
    let anchors = document.getElementById("anchors")
    let titles = document.querySelectorAll(".content > h1, .content > h2, .content > h3, .content > h4, .content > h5, .content > h6")

    if (anchors && titles) {
        titles.forEach((title, index) => {
            let content = title.innerText.replace(/<[^>]+>/g, '')
            let id = `${index}-section`
    
            title.setAttribute("id", `${id}`)
    
            linkList += `<li><a href="#${id}">${content}</a></li>`
    
        });
    
        anchors.innerHTML = linkList
    }

})