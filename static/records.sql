SET CLIENT_ENCODING TO 'UTF8';
SET timezone = 'UTC';

-- Удаляем таблицу, если она существует
DROP TABLE IF EXISTS records;

-- Создаем новую таблицу
CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  login TEXT,
  language TEXT,
  requested TEXT
);


-- 2024-08-23 19:34:37
