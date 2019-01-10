

module.exports = {
    async getBoards(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id} = req.params;
        let a = await db.board.get_boards([campaign_id]);
        res.status(200).send(a);
    },
    async createBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id,board_name,board_col,board_row} = req.body;
        await db.board.create_board([campaign_id,board_name,board_col,board_row]);
        let a = await db.board.get_boards([campaign_id])
        res.status(200).send(a);
    },
    async deleteBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {campaign_id,board_name} = req.params;
        await db.board.delete_board([campaign_id,board_name]);
        let a = await db.board.get_boards([campaign_id])
        res.status(200).send(a);
    },
    async editBoard(req,res){
        const db = req.app.get('db')
        const {user_email} = req.session.user
        const {new_board_name,board_col,board_row,campaign_id,board_name} = req.body;
        await db.board.edit_board([new_board_name,board_col,board_row,campaign_id,board_name]);
        let a = await db.board.get_boards([campaign_id])
        res.status(200).send(a);
    },
    async makeStarting(req,res){
        const db = req.app.get('db');
        const {campaign_id, board_name} = req.body;
        await db.board.make_starting([campaign_id, board_name]);
        let a = await db.board.get_boards([campaign_id])
        res.status(200).send(a);
    }
}