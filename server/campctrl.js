module.exports = {
    async getCampaigns(req,res){
        console.log(req.session)
        const {user_email} = req.session.user
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async createCampaign(req,res){
        console.log(req.body)
        const {campName, roomCode} = req.body
        console.log(req.session)
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let createdCamp = await db.campaign.create_campaign([userEmail, campName, roomCode])
        console.log(createdCamp)
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editCampaignName(req,res){
        console.log(req.body)
        const {campName, newCampName} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let newCampName = await db.campaign.update_campaign([newCampName,user_email, campName])
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editRoomCode(req,res){
        console.log(req.body)
        const {campName, newRoomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let newRoomCode = await db.campaign.update_room_code([newRoomCode, user_email, campName])
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async deleteCampaign(req,res){
        console.log(req.params)
        const {campName} = req.params
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let deleteCamp = await db.campaign.delete_campaign([user_email, campName])
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
}