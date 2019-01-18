export const cloneArray = arr => {
    let a = arr.slice('');
    return a;
}

export const mergeArrays = (dmpieces,humanpieces) =>{
    let b = dmpieces.slice();
      for (let i = 0; i < humanpieces.length; i++){
        b.push({x:humanpieces[i].x_coordinate,y:humanpieces[i].y_coordinate,type:humanpieces[i].piece_type,id:dmpieces.length+i,name:humanpieces[i].character_name,image_url:humanpieces.image_url});
      }
      return b;
}

export const getPlayerTokens = (tokens) =>{
    let b = [];
    for (let i = 0; i < tokens.length; i++){
        if (tokens[i].piece_type==='player'){
            b.push(tokens[i]);
        }
    }
    return b;
}

export const shuffleTokens = tokens =>{
    if (tokens.length === 0)return tokens;
    let a = Object.assign(tokens[0]);
    let randomIndex = Math.floor(Math.random()*tokens.length);
    let b = Object.assign(tokens[randomIndex]);
    let c = {};
    for (let i = 0; i < tokens.length; i++){
        for (var prop in tokens[i]) { if (tokens[i].hasOwnProperty(prop)) { delete tokens[i][prop]; } }
        tokens[i]=Object.assign(b);
        for (var prop in tokens[randomIndex]) { if (tokens[randomIndex].hasOwnProperty(prop)) { delete tokens[randomIndex][prop]; } }
        tokens[randomIndex]=Object.assign(a);
        for (var prop in a) { if (a.hasOwnProperty(prop)) { delete a[prop]; } }
        for (var prop in b) { if (b.hasOwnProperty(prop)) { delete b[prop]; } }
    }
    return tokens;
}

export const checkForPlayers = arr =>{
    if (arr.findIndex(element=>element.piece_type==='player') !== -1){
        return true;
    }
    return false;
}