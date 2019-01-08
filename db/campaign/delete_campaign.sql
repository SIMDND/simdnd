DELETE FROM ONLY campaign_info
WHERE user_id = (SELECT user_id FROM user_info WHERE user_email=$1)
AND campaign_name = $2;

DELETE FROM ONLY board_info
WHERE campaign_id =(SELECT campaign_id FROM campaign_info WHERE user_id =(SELECT user_id FROM user_info WHERE user_email='mattgvo@gmail.com') AND campaign_name ='yup');