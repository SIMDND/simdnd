CREATE TABLE user_info
(user_id SERIAL PRIMARY KEY,
user_email TEXT UNIQUE,
user_name VARCHAR(40) UNIQUE,
user_hash TEXT,
active BOOLEAN,
registerDate TIMESTAMP
)