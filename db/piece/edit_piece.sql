update piece_map set character_name = $4, piece_type = $5, x_coordinate = $6, y_coordinate = $7, image_url = $8 where campaign_id = $1 and board_name = $2 and character_name = $3;