document.addEventListener('DOMContentLoaded', () => {
    renderBookmarks();
});


function renderBookmarks() {
    chrome.bookmarks.getTree(treeNodes => $('.bookmarks').append(renderTreeNodes(treeNodes)));
}

function renderTreeNodes(nodes) {
    let list = $('<div class="container">');
    nodes.forEach(node => list.append(renderNode(node)));
    return list;  
}

function renderNode(node) {

    let isBookmark = !!node.url;
    let item = $(isBookmark ? '<a class="bookmark fs14 grayTxt">' : '<h1 class="title darkGrayTxt">');
    isBookmark && item.attr('href', node.url);
    isBookmark && item.click(() => { chrome.tabs.create({url: node.url}) });
    item.text(node.title);


    let parentNode = $('<div>').append(item);
    node.children && node.children.length > 0 && parentNode.append(renderTreeNodes(node.children));
    return parentNode;
}


