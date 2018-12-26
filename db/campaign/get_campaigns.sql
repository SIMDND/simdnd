SELECT * FROM campaign_info
WHERE user_id =(SELECT user_id FROM user_info WHERE user_email = $1)