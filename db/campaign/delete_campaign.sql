DELETE FROM ONLY campaign_info
WHERE user_id = (SELECT user_id FROM user_info WHERE user_email=$1)
AND campaign_name = $2;