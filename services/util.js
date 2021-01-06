export const util = {
    makeid,
    getRandomColor
}

function makeid() {
    var length = 6
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function getRandomColor(num) {
    var colors = ['#cfc37c', '#da7b95', '#68c2ab', '#77a6cc']
    return colors[num]
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}