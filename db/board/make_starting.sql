update board_info set starting = false where campaign_id = $1;
update board_info set starting = true where campaign_id = $1 and board_name = $2;