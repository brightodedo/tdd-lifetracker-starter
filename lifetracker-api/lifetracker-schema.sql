CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nutrition(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW() 
);

CREATE TABLE IF NOT EXISTS exercise(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    intensity INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW() 
);

CREATE TABLE IF NOT EXISTS sleep(
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL UNIQUE,
    end_time TIMESTAMP NOT NULL UNIQUE,
    user_id INTEGER REFERENCES users(id) ,
    created_at TIMESTAMP NOT NULL DEFAULT NOW() 
);
