import helper from './helper.js';

function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');

    element.innerHTML = '6.source_map';

    btn.innerHTML = 'Check the console 111';
    btn.onclick = helper;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());