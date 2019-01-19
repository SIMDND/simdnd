export const cloneArray = arr => {
    let a = arr.slice('');
    return a;
}

export const mergeArrays = (dmpieces,humanpieces) =>{
    let b = dmpieces.slice();
      for (let i = 0; i < humanpieces.length; i++){
        b.push({x:humanpieces[i].x_coordinate,y:humanpieces[i].y_coordinate,type:humanpieces[i].piece_type,id:dmpieces.length+i,name:humanpieces[i].character_name,image_url:humanpieces[i].image_url});
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

export const checkForPlayers = arr =>{
    if (arr.findIndex(element=>element.piece_type==='player') !== -1){
        return true;
    }
    return false;
}

export const compareArrayLengths = (arr1,arr2) =>{
    if (arr1.length < arr2.length){
        return true;
    }
    return false;
}