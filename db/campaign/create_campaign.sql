INSERT INTO campaign_info 
(user_id, campaign_name, room_code) 
VALUES (select user_id from user_info where email = $1, $2, $3);