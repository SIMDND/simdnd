module.exports = {
    async getCampaigns(req,res){
        const {user_email} = req.session.user
        let db = req.app.get('db')
        let allCamps = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async createCampaign(req,res){
        const {campName, roomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        let createdCamp = await db.campaign.create_campaign([user_email, campName, roomCode])
        let allCamps = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editCampaignName(req,res){
        console.log(req.body)
        const {campName, newCampName} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let newCampName = await db.campaign.update_campaign([newCampName,user_email, campName])
        let allCamps = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editRoomCode(req,res){
        console.log(req.body)
        const {campName, newRoomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let newRoomCode = await db.campaign.update_room_code([newRoomCode, user_email, campName])
        let allCamps = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async deleteCampaign(req,res){
        const {campName} = req.params
        const {user_email} = req.session.user
        console.log('campName:',campName)
        console.log('user_email:',user_email)
        let db = req.app.get('db');
        let deleteCamp = await db.campaign.delete_campaign([user_email, campName])
        let allCamps = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
}