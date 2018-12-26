module.exports = {
    async getAllPositionsICanMoveTo(height,width,x,y,spaces){
        let arr = [];
        const calculateSpaceFromOrigin = (xorigin,yorigin,xpoint,ypoint) => {
            if (Math.abs(xorigin-xpoint) > Math.abs(yorigin-ypoint)){
                return Math.abs(xorigin-xpoint);
            } else{
                return Math.abs(yorigin-ypoint);
            }
        }
        const getSpaces = (h,w,xcoor,ycoor,numspaces)=>{
            if (numspaces === 0){

            }else{
                if (xcoor-1 > -1 && ycoor-1 > -1 && arr.findIndex((element,index,arr)=>element.x===xcoor-1 && element.y===ycoor-1) ===-1 && (x != xcoor-1 || y != ycoor-1)){
                    arr.push({x:xcoor-1,y:ycoor-1});
                    getSpaces(h,w,xcoor-1,ycoor-1,spaces-calculateSpaceFromOrigin(x,y,xcoor-1,ycoor-1));
                }
                if (ycoor-1 > -1 && arr.findIndex((element,index,arr)=>element.x===xcoor && element.y===ycoor-1) ===-1 && (x != xcoor || y != ycoor-1)){
                    arr.push({x:xcoor,y:ycoor-1});
                    getSpaces(h,w,xcoor,ycoor-1,spaces-calculateSpaceFromOrigin(x,y,xcoor,ycoor-1));
                }
                if (xcoor+1 < width && ycoor-1 > -1 && arr.findIndex((element,index,arr)=>element.x===xcoor+1 && element.y===ycoor-1) ===-1 && (x != xcoor+1 || y != ycoor-1)){
                    arr.push({x:xcoor+1,y:ycoor-1});
                    getSpaces(h,w,xcoor+1,ycoor-1,spaces-calculateSpaceFromOrigin(x,y,xcoor+1,ycoor-1));
                }
                if (xcoor-1 > -1 && arr.findIndex((element,index,arr)=>element.x===xcoor-1 && element.y===ycoor) ===-1 && (x != xcoor-1 || y != ycoor)){
                    arr.push({x:xcoor-1,y:ycoor});
                    getSpaces(h,w,xcoor-1,ycoor,spaces-calculateSpaceFromOrigin(x,y,xcoor-1,ycoor));
                }
                if (xcoor+1 < width && arr.findIndex((element,index,arr)=>element.x===xcoor+1 && element.y===ycoor) ===-1 && (x != xcoor+1 || y != ycoor)){
                    arr.push({x:xcoor+1,y:ycoor});
                    getSpaces(h,w,xcoor+1,ycoor,spaces-calculateSpaceFromOrigin(x,y,xcoor+1,ycoor));
                }
                if (xcoor-1 > -1 && ycoor+1 < height && arr.findIndex((element,index,arr)=>element.x===xcoor-1 && element.y===ycoor+1) ===-1 && (x != xcoor-1 || y != ycoor+1)){
                    arr.push({x:xcoor-1,y:ycoor+1});
                    getSpaces(h,w,xcoor-1,ycoor+1,spaces-calculateSpaceFromOrigin(x,y,xcoor-1,ycoor+1));
                }
                if (ycoor+1 < height && arr.findIndex((element,index,arr)=>element.x===xcoor && element.y===ycoor+1) ===-1 && (x != xcoor || y != ycoor+1)){
                    arr.push({x:xcoor,y:ycoor+1});
                    getSpaces(h,w,xcoor,ycoor+1,spaces-calculateSpaceFromOrigin(x,y,xcoor,ycoor+1));
                }
                if (xcoor+1 < width && ycoor+1 < height && arr.findIndex((element,index,arr)=>element.x===xcoor+1 && element.y===ycoor+1) ===-1 && (x != xcoor+1 || y != ycoor+1)){
                    arr.push({x:xcoor+1,y:ycoor+1});
                    getSpaces(h,w,xcoor+1,ycoor+1,spaces-calculateSpaceFromOrigin(x,y,xcoor+1,ycoor+1));
                }
            }
        }
        getSpaces(height,width,x,y,spaces);
        return arr;
    }
}