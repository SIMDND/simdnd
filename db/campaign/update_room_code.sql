UPDATE campaign_info
SET room_code = $1
WHERE user_id = (SELECT user_id FROM user_info WHERE user_email = $2)
AND campaign_name = $3;