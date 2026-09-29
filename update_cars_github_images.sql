-- ==============================================================================
-- UPDATE CARS WITH GITHUB-HOSTED IMAGE URLS
-- Repository: https://github.com/anaschougle32/CarRental
-- Folder: Cars/Cars/
-- ==============================================================================

-- Hyundai
UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Alcazar%20Sunroof.png' 
WHERE slug = 'hyundai-alcazar' OR name ILIKE '%Alcazar%';

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Creta%20Automatic%20Sunroof.png' 
WHERE slug = 'hyundai-creta-automatic' OR name ILIKE '%Creta Automatic%';

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Creta%20Sunroof.png' 
WHERE (slug = 'hyundai-creta' OR slug = 'hyundai-creta-manual' OR name ILIKE '%Creta%') AND name NOT ILIKE '%Automatic%';

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Grand%20i10%20Mannual.png' 
WHERE slug = 'hyundai-grand-i10-manual' OR (name ILIKE '%Grand i10%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Grand%20i10%20Automatic.png' 
WHERE slug = 'hyundai-grand-i10-automatic' OR (name ILIKE '%Grand i10%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/I20%20Automatic.png' 
WHERE slug = 'hyundai-i20-automatic' OR (name ILIKE '%i20%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/I20%20Mannual.png' 
WHERE slug = 'hyundai-i20' OR slug = 'hyundai-i20-manual' OR (name ILIKE '%i20%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Venue%20Mannual.png' 
WHERE slug = 'hyundai-venue-manual' OR (name ILIKE '%Venue%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Venue%20Sunroof.png' 
WHERE slug = 'hyundai-venue' OR (name ILIKE '%Venue%' AND name ILIKE '%Sunroof%');

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Verna%20Sunroof.png' 
WHERE slug = 'hyundai-verna' OR name ILIKE '%Verna%';

-- Maruti Suzuki
UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Baleno%20Automatic.png' 
WHERE slug = 'maruti-baleno-automatic' OR (name ILIKE '%Baleno%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Baleno%20Mannual.png' 
WHERE slug = 'maruti-baleno-manual' OR slug = 'maruti-baleno' OR (name ILIKE '%Baleno%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Brezza%20Automatic.png' 
WHERE slug = 'maruti-brezza-automatic' OR (name ILIKE '%Brezza%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Brezza%20Sunroof.png' 
WHERE slug = 'maruti-brezza' OR slug = 'maruti-brezza-sunroof' OR (name ILIKE '%Brezza%' AND name NOT ILIKE '%Automatic%');

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Ciaz%20Automatic.png' 
WHERE slug = 'maruti-ciaz-automatic' OR (name ILIKE '%Ciaz%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Ciaz%20Mannual.png' 
WHERE slug = 'maruti-ciaz' OR slug = 'maruti-ciaz-manual' OR (name ILIKE '%Ciaz%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Dzire%20Automatic.png' 
WHERE slug = 'maruti-dzire-automatic' OR (name ILIKE '%Dzire%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Dzire%20Mannual.png' 
WHERE slug = 'maruti-dzire' OR slug = 'maruti-dzire-manual' OR (name ILIKE '%Dzire%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Ertiga%20Automatic.png' 
WHERE slug = 'maruti-ertiga-automatic' OR (name ILIKE '%Ertiga%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Ertiga%20Mannual.png' 
WHERE slug = 'maruti-ertiga' OR slug = 'maruti-ertiga-manual' OR (name ILIKE '%Ertiga%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Fronx%20Automatic.png' 
WHERE slug = 'maruti-fronx-automatic' OR (name ILIKE '%Fronx%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Fronx%20Mannual.png' 
WHERE slug = 'maruti-fronx' OR slug = 'maruti-fronx-manual' OR (name ILIKE '%Fronx%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Ignis%20Automatic.png' 
WHERE slug = 'maruti-ignis-automatic' OR (name ILIKE '%Ignis%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Swift%20Automatic.png' 
WHERE slug = 'maruti-swift-automatic' OR (name ILIKE '%Swift%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Swift%20Mannual.png' 
WHERE slug = 'maruti-swift' OR slug = 'maruti-swift-manual' OR (name ILIKE '%Swift%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Wagon%20R%20Automatic.png' 
WHERE slug = 'maruti-wagon-r-automatic' OR slug = 'maruti-wagonr-automatic' OR (name ILIKE '%Wagon%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Wagon%20R%20Mannual.png' 
WHERE slug = 'maruti-wagon-r' OR slug = 'maruti-wagonr' OR (name ILIKE '%Wagon%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/XL6%20Automatic.png' 
WHERE slug = 'maruti-xl6-automatic' OR slug = 'maruti-xl6' OR name ILIKE '%XL6%';

-- Mahindra
UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Scorpio%20Classic%20Mannual.png' 
WHERE slug = 'mahindra-scorpio-classic' OR name ILIKE '%Scorpio Classic%';

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Scorpio%20N%20Automatic%20Sunroof.png' 
WHERE slug = 'mahindra-scorpio-n-automatic' OR (name ILIKE '%Scorpio N%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Scorpio%20N%20Sunroof.png' 
WHERE slug = 'mahindra-scorpio-n' OR (name ILIKE '%Scorpio N%' AND (transmission = 'Manual' OR name ILIKE '%Manual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Thar%204%20x%204%20Automatic.png' 
WHERE slug = 'mahindra-thar-automatic' OR slug = 'mahindra-thar-4x4-automatic' OR (name ILIKE '%Thar%' AND name NOT ILIKE '%Rox%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Thar%204%20x%204%20Mannual.png' 
WHERE slug = 'mahindra-thar' OR slug = 'mahindra-thar-manual' OR (name ILIKE '%Thar%' AND name NOT ILIKE '%Rox%' AND (transmission = 'Manual' OR name ILIKE '%Manual%' OR name ILIKE '%Mannual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Thar%20Rox%20Automatic%20Sunroof.png' 
WHERE slug = 'mahindra-thar-roxx-automatic' OR slug = 'mahindra-thar-rox-automatic' OR (name ILIKE '%Thar Rox%' AND (transmission = 'Automatic' OR name ILIKE '%Automatic%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Thar%20Rox%20Sunroof.png' 
WHERE slug = 'mahindra-thar-roxx' OR slug = 'mahindra-thar-rox' OR (name ILIKE '%Thar Rox%' AND (transmission = 'Manual' OR name ILIKE '%Manual%'));

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/XUV%20700%20Sunroof.png' 
WHERE slug = 'mahindra-xuv700' OR name ILIKE '%XUV 700%' OR name ILIKE '%XUV700%';

-- Toyota
UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Fortuner%20Legender%20Automatic.png' 
WHERE slug = 'toyota-fortuner-legender' OR name ILIKE '%Legender%';

UPDATE cars SET main_image = 'https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars/Innova%20Crysta%20Mannual.png' 
WHERE slug = 'toyota-innova-crysta' OR name ILIKE '%Innova Crysta%' OR name ILIKE '%Innova%';
