document.addEventListener('DOMContentLoaded', function() {
    var itemsToMove = {
        'toplevel_page_newspack': 11,
        'toplevel_page_cool-plugins-timeline-addon':12,
        'menu-users': 6,
        'menu-posts-especiais':5,
        'menu-posts-afluente':6
    };


    
    for (var itemSlug in itemsToMove) {
            var menuItems = document.querySelectorAll('#adminmenu > li');
            var newPosition = itemsToMove[itemSlug];

            
            var founded = false;
            var itemIndex = 0;
            menuItems.forEach(function(item, index) {
                if (item.getAttribute('id') == itemSlug) {
                    itemIndex = index;
                    founded = true;
                    return;
                }
            });

            if (founded === true) {
                var itemToMove = menuItems[itemIndex];
                var parentElement = itemToMove.parentElement;
                var referenceNode = menuItems[newPosition - 1];

                parentElement.removeChild(itemToMove);
                parentElement.insertBefore(itemToMove, referenceNode.nextSibling);
            }
        }
});