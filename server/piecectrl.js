module.exports = {
    async getPieces(){
        let db = req.app.get('db');
        const {campaign_id,board_name} = req.params;
        let a = await db.piece.get_pieces([campaign_id,board_name]);
        res.status(200).send(a);
    },
    async createPiece(){
        let db = req.app.get('db');
        const {campaign_id,board_name,character_name,piece_type,x_coordinate,y_coordinate,image_url} = req.body;
        await db.piece.create_piece([campaign_id,board_name,character_name,piece_type,x_coordinate,y_coordinate,image_url]);
        let a = await db.piece.get_pieces([campaign_id,board_name]);
        res.status(200).send(a);
    },
    async editPiece(){
        let db = req.app.get('db');
        const {campaign_id,board_name,character_name,new_character_name,piece_type,x_coordinate,y_coordinate,image_url} = req.body;
        await db.piece.edit_piece([campaign_id,board_name,character_name,new_character_name,piece_type,x_coordinate,y_coordinate,image_url]);
        let a = await db.piece.get_pieces([campaign_id,board_name]);
        res.status(200).send(a);
    },
    async deletePiece(){
        let db = req.app.get('db');
        const {campaign_id,board_name,character_name} = req.params;
        await db.piece.delete_piece([campaign_id,board_name,character_name]);
        let a = await db.piece.get_pieces([campaign_id,board_name]);
        res.status(200).send(a);
    }
}