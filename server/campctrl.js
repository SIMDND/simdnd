module.exports = {
    async getCampaigns(req,res){
        console.log(req.body)
        const {user_email} = req.session.user
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async createCampaign(req,res){
        console.log(req.body)
        const {campName, roomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let [createdCamp] = await db.campaign.create_campaign([userEmail, campName, roomCode])
        console.log(createdCamp)
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editCampaignName(req,res){
        console.log(req.body)
        const {campName, roomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async editRoomCode(req,res){
        console.log(req.body)
        const {userEmail, campName, roomCode} = req.body
        const {user_email} = req.session.user
        let db = req.app.get('db');
        console.log(db.campaign)
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
    async deleteCampaign(req,res){
        console.log(req.params)
        const {user_email} = req.session.user
        let [allCamps] = await db.campaign.get_campaigns([user_email])
        res.status(200).send(allCamps)
    },
}