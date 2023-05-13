-- Insert data into rent_prices table
INSERT INTO rent_prices (city, neighborhood, rent_price) VALUES
('Madrid', 'Distrito Salamanca', 1200),
('Madrid', 'Recoletos, Justicia and Jeronimos', 1500),
('Madrid', 'Ibiza', 1100),
('Madrid', 'Goya', 1100),
('Madrid', 'Sol', 1000),
('Madrid', 'Princesa', 1300),
('Madrid', 'Malasana', 1300),
('Madrid', 'Chueca', 1200),
('Lisbon', 'Chiado', 1200),
('Lisbon', 'Avenidas Novas', 1000),
('Lisbon', 'Bairro Alto', 1100),
('Lisbon', 'Campo de Ourique', 900),
('Lisbon', 'Alfama', 800),
('Lisbon', 'Principe Real', 1100),
('Lisbon', 'Graça', 900),
('Lisbon', 'Alvalade', 1000),
('Dublin', 'Docklands', 1600),
('Dublin', 'Temple Bar', 1500),
('Dublin', 'Smithfield', 1200),
('Dublin', 'Ballsbridge', 1400),
('Dublin', 'Ranelagh', 1200),
('Dublin', 'Stoneybatter', 1000),
('Dublin', 'Phibsborough', 900),
('Frankfurt', 'Westend-Süd', 1500),
('Frankfurt', 'Nordend-West', 1300),
('Frankfurt', 'Sachsenhausen', 1200),
('Frankfurt', 'Bockenheim', 1100),
('Frankfurt', 'Bornheim', 1000),
('Frankfurt', 'Bahnhofsviertel', 1400)
ON CONFLICT (city, neighborhood) DO NOTHING;

-- Insert data into city_information table
INSERT INTO city_information (city, median_income, population, top_industry, unemployment_rate) VALUES
('Dublin', 55000, 1000000, 'Technology', 8.2),
('Lisbon', 40000, 600000, 'Tourism', 9.5),
('Madrid', 45000, 3000000, 'Finance', 7.8),
('Frankfurt', 60000, 700000, 'Banking', 6.4);
