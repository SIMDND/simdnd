

module.exports = {
    async getBoards(req,res){
        console.log('inside getBoards with campaign_id:',req.params.campaign_id)
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id} = req.params;
        let a = await db.board.get_boards([campaign_id]);
        console.log(a);
        res.status(200).send(a);
    },
    async createBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id,board_name,board_col,board_row} = req.body;
        await db.board.createBoard([campaign_id,board_name,board_col,board_row]);
        let a = db.board.getBoards([campaign_id])
        res.status(200).send(a);
    },
    async deleteBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id,board_name} = req.body;
        await db.board.deleteBoard([campaign_id,board_name]);
        let a = db.board.getBoards([campaign_id])
        res.status(200).send(a);
    },
    async editBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {new_board_name,board_col,board_row,campaign_id,board_name} = req.body;
        db.board.editBoard([new_board_name,board_col,board_row,campaign_id,board_name]);
        let a = db.board.getBoards([campaign_id])
        res.status(200).send(a);
    },
}