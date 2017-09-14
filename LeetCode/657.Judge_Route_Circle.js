/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
    
    if(typeof moves !== 'string'){
        return false;
    }
    
    moves = moves.split('');
    let x = 0,
        y = 0;
    
    moves.forEach(function(move){
        move = move.toLowerCase();
        switch(move){
            case 'u':
                y++;
                break;
            case 'd':
                y--;
                break;
            case 'l':
                x--;
                break;
            case 'r':
                x++;
                break;
        }
    })
    
    return x === 0 && y === 0;
};