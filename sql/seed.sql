INSERT INTO users (email, password_hash) VALUES ('test@email.com', '$2b$10$RFB6ZM03AhYaC8Je0ecOU.ntaG1VOCLoQ1CTJbqsLVyM32TzLsrQK');

INSERT INTO collections (user_id, name, description) VALUES (1, 'Test Folder', 'this is a test folder'), (2, 'Next Test Folder', 'this is the next test folder');

INSERT INTO tags (name) VALUES ('Security'), ('ES6'), ('Javscript'), ('DSA');

INSERT INTO collections_tags (collection_id, tag_id) VALUES (1,2), (1,3), (2,1), (2,4);


