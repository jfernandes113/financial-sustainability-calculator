-- Drop existing tables if needed
DROP TABLE IF EXISTS city_information;
DROP TABLE IF EXISTS rent_prices;
DROP TABLE IF EXISTS madrid_expenses;
DROP TABLE IF EXISTS locations;

-- Create tables
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS madrid_expenses (
  id SERIAL PRIMARY KEY,
  rent_mortgage FLOAT NOT NULL,
  restaurants FLOAT NOT NULL,
  markets FLOAT NOT NULL,
  transportation FLOAT NOT NULL,
  utilities FLOAT NOT NULL,
  childcare FLOAT NOT NULL,
  clothing_shoes FLOAT NOT NULL,
  sports_leisure FLOAT NOT NULL,
  doctor_visit FLOAT NOT NULL,
  streaming FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS rent_prices (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  rent_price FLOAT NOT NULL,
  CONSTRAINT unique_neighborhood_city UNIQUE (city, neighborhood)
);

CREATE TABLE IF NOT EXISTS city_information (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  median_income FLOAT NOT NULL,
  population INTEGER NOT NULL,
  top_industry VARCHAR(255) NOT NULL,
  unemployment_rate FLOAT
);
