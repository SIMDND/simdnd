module.exports = {
async updateMessages(req,res,next){
    let {campaign_id,messagesArray} = req.body;
    let db = req.app.get('db');
    await db.chat.delete_messages([campaign_id]);
    for (let i = 0; i < messagesArray.length; i++){
        db.chat.update_messages([campaign_id,i,messagesArray[i].sender,messagesArray[i].message])
    }
    res.sendStatus(200);
},
async getMessages(req,res,next){
    let {campaign_id} = req.params;
    let db = req.app.get('db');
    let a = await db.chat.get_messages([campaign_id]);
    let b = [];
    a.forEach((element,index,arr)=>{
        b[element.index] = {sender:element.sender,message:element.message};
    })
    setTimeout(()=>{
        res.status(200).send(b);
    },500)
}
}