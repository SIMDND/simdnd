INSERT INTO campaign_info 
(user_id, campaign_name, room_code) 
VALUES ((select user_id from user_info where user_email = $1), $2, $3);

INSERT INTO board_info (campaign_id, board_name, board_col, board_row) VALUES ((SELECT campaign_id FROM campaign_info WHERE campaign_name = $2 ) , 'default', 5, 5);