-- SQL Script to add sample locations to the database (safely handling existing locations)

-- Begin transaction
BEGIN;

-- Function to safely insert locations (skipping if slug already exists)
DO $$
DECLARE
    location_data RECORD;
BEGIN
    -- North Goa Locations
    FOR location_data IN (
        SELECT * FROM (VALUES
            (
                'Anjuna', 
                'anjuna', 
                'Premium Car Rental Service in Anjuna, North Goa',
                'Looking for a reliable car rental in Anjuna, Goa? ZoiCarRentals offers a wide range of vehicles to suit your needs. Whether you''re exploring the famous Anjuna Beach, visiting the Wednesday Flea Market, or enjoying the vibrant nightlife, our car rental service provides the perfect transportation solution. Our fleet includes economy cars, sedans, SUVs, and premium vehicles, all well-maintained and ready for your Goa adventure. Book your car rental in Anjuna today for the best rates and exceptional service.'
            ),
            (
                'Madgaon', 
                'madgaon', 
                'Affordable Car Rental Options in Madgaon (Margao)',
                'Madgaon (Margao) is the commercial heart of Goa, and ZoiCarRentals provides the perfect transportation solution for visitors to this bustling city. Our car rental service in Madgaon offers competitive rates, well-maintained vehicles, and flexible rental terms. Whether you need a car for business meetings, shopping at the Madgaon Municipal Market, or exploring nearby attractions like Colva Beach, we have the right vehicle for you. Our convenient pickup and drop-off service makes your travel experience seamless and enjoyable.'
            ),
            (
                'Panjim', 
                'panjim', 
                'Reliable Car Rental Service in Panjim, Goa''s Capital',
                'Explore Goa''s charming capital city with a car rental from ZoiCarRentals in Panjim. Our fleet of well-maintained vehicles gives you the freedom to visit attractions like the Church of Our Lady of the Immaculate Conception, Fontainhas (the Latin Quarter), and the Mandovi River promenade at your own pace. We offer competitive rates, excellent customer service, and convenient pickup/drop-off options. Whether you''re in Panjim for business or leisure, our car rental service ensures you have a comfortable and convenient transportation solution.'
            ),
            (
                'South Goa', 
                'south-goa', 
                'Explore South Goa''s Beaches with Our Premium Car Rental Service',
                'South Goa is known for its pristine beaches, laid-back atmosphere, and natural beauty. With ZoiCarRentals, you can explore all that South Goa has to offer at your own pace. Our car rental service provides well-maintained vehicles that are perfect for visiting beaches like Palolem, Agonda, and Colva, as well as attractions such as the Cabo de Rama Fort and Cotigao Wildlife Sanctuary. We offer competitive rates, flexible rental periods, and excellent customer service to ensure your South Goa adventure is memorable and hassle-free.'
            ),
            (
                'Thivim', 
                'thivim', 
                'Convenient Car Rental Options Near Thivim Railway Station',
                'Arriving at Thivim Railway Station? Start your Goa journey with ZoiCarRentals. Our car rental service in Thivim offers a convenient way to explore North Goa''s attractions. With competitive rates and a range of vehicles from economy cars to SUVs, we provide the perfect transportation solution for your Goa trip. Our cars are well-maintained, and our service includes flexible pickup and drop-off options. Whether you''re heading to the beaches of Calangute and Baga or exploring the cultural sites of Panjim, a rental car from Thivim gives you the freedom to travel on your own schedule.'
            ),
            (
                'Karmal', 
                'karmal', 
                'Quality Car Rental Service in Karmal, Goa',
                'Discover the convenience of renting a car in Karmal with ZoiCarRentals. Our service provides you with the freedom to explore Goa at your own pace. With well-maintained vehicles ranging from compact cars to spacious SUVs, we offer options to suit every need and budget. Our car rental service in Karmal features competitive rates, flexible rental periods, and excellent customer support. Whether you''re visiting for business or pleasure, our rental cars make it easy to navigate between Karmal and other popular destinations in Goa.'
            ),
            (
                'Goa Airport', 
                'goa-airport', 
                'Convenient Car Rental Service at Dabolim Airport (GOI)',
                'Start your Goa adventure right from the airport with ZoiCarRentals at Goa Airport (Dabolim). Our car rental service offers a seamless transition from your flight to your Goa exploration. We provide a range of well-maintained vehicles to suit all needs and budgets, from economy cars to premium SUVs. With competitive rates, flexible rental periods, and excellent customer service, we ensure your Goa trip begins and ends smoothly. Book your airport car rental in advance for the best rates and availability.'
            ),
            (
                'Mopa Airport', 
                'mopa-airport', 
                'Premium Car Rental Service at Mopa International Airport',
                'Arriving at the new Mopa International Airport? ZoiCarRentals offers convenient car rental services right at the terminal. Our fleet of well-maintained vehicles gives you the freedom to explore North Goa and beyond at your own pace. With competitive rates, flexible rental options, and excellent customer service, we make your transition from air travel to road travel seamless and enjoyable. Book your Mopa Airport car rental in advance to ensure availability and the best rates for your Goa adventure.'
            ),
            (
                'Candolim', 
                'candolim', 
                'Explore Candolim Beach and Beyond with Our Car Rental Service',
                'Candolim is one of North Goa''s most popular beach destinations, and ZoiCarRentals provides the perfect way to explore it and the surrounding areas. Our car rental service in Candolim offers well-maintained vehicles at competitive rates, allowing you to visit attractions like Fort Aguada, Sinquerim Beach, and the bustling markets at your own pace. With flexible rental periods and excellent customer service, we ensure your Candolim experience is convenient and enjoyable. Book your car rental today and discover the freedom of exploring Goa on your own schedule.'
            ),
            (
                'Vasco Da Gama', 
                'vasco-da-gama', 
                'Reliable Car Rental Service in Vasco Da Gama',
                'Vasco Da Gama is Goa''s largest city and a major transportation hub. ZoiCarRentals offers convenient car rental services in Vasco, providing you with the freedom to explore the city and beyond at your own pace. Our fleet includes a range of well-maintained vehicles to suit all needs and budgets. Whether you''re visiting the Naval Aviation Museum, Bogmalo Beach, or using Vasco as a base to explore the rest of Goa, our car rental service ensures you have reliable transportation throughout your stay.'
            ),
            (
                'North Goa', 
                'north-goa', 
                'Discover North Goa''s Beaches and Attractions with Our Car Rental Service',
                'North Goa is famous for its vibrant beaches, nightlife, and cultural attractions. With ZoiCarRentals, you can explore all that North Goa has to offer at your own pace. Our car rental service provides well-maintained vehicles that are perfect for visiting popular beaches like Baga, Calangute, and Anjuna, as well as attractions such as Fort Aguada and the Basilica of Bom Jesus. We offer competitive rates, flexible rental periods, and excellent customer service to ensure your North Goa adventure is memorable and hassle-free.'
            ),
            (
                'Arambol', 
                'arambol', 
                'Experience Arambol''s Bohemian Charm with Our Car Rental Service',
                'Arambol is known for its bohemian atmosphere, beautiful beach, and stunning Sweet Lake. ZoiCarRentals provides the perfect transportation solution for exploring this unique part of North Goa. Our car rental service in Arambol offers well-maintained vehicles at competitive rates, giving you the freedom to discover hidden beaches, attend yoga classes, or visit nearby attractions like Keri Beach and Terekol Fort. With flexible rental options and excellent customer service, we ensure your Arambol experience is convenient and enjoyable.'
            ),
            (
                'Varca', 
                'varca', 
                'Explore Varca Beach and South Goa with Our Car Rental Service',
                'Varca is home to one of South Goa''s most beautiful beaches, known for its pristine white sand and peaceful atmosphere. ZoiCarRentals offers convenient car rental services in Varca, allowing you to explore this tranquil area and other South Goa attractions at your own pace. Our fleet includes a range of well-maintained vehicles to suit all needs and budgets. Whether you''re relaxing on Varca Beach, visiting nearby Benaulim and Cavelossim, or exploring further afield, our car rental service ensures you have reliable and comfortable transportation throughout your stay.'
            ),
            (
                'Agonda', 
                'agonda', 
                'Discover Agonda''s Natural Beauty with Our Car Rental Service',
                'Agonda Beach is consistently rated as one of Goa''s most beautiful beaches, known for its pristine shoreline and laid-back atmosphere. ZoiCarRentals provides convenient car rental services in Agonda, giving you the freedom to explore this paradise and other South Goa attractions at your own pace. Our well-maintained vehicles are perfect for visiting nearby Palolem Beach, Cabo de Rama Fort, and the Cola Beach. With competitive rates, flexible rental periods, and excellent customer service, we ensure your Agonda experience is both memorable and convenient.'
            ),
            (
                'Mandrem', 
                'mandrem', 
                'Experience Mandrem''s Tranquility with Our Car Rental Service',
                'Mandrem is known for its quiet beaches, yoga retreats, and relaxed atmosphere. ZoiCarRentals offers convenient car rental services in Mandrem, allowing you to explore this peaceful corner of North Goa and beyond at your own pace. Our fleet includes a range of well-maintained vehicles to suit all needs and budgets. Whether you''re relaxing on Mandrem Beach, visiting nearby Ashwem and Morjim, or exploring the bustling markets of Anjuna, our car rental service ensures you have reliable transportation throughout your stay in this tranquil paradise.'
            ),
            (
                'Canacona', 
                'canacona', 
                'Explore Canacona''s Natural Wonders with Our Car Rental Service',
                'Canacona is a region in South Goa known for its natural beauty, including the famous Palolem and Agonda beaches. ZoiCarRentals provides convenient car rental services in Canacona, giving you the freedom to discover this stunning area at your own pace. Our well-maintained vehicles are perfect for visiting attractions like Cotigao Wildlife Sanctuary, Cabo de Rama Fort, and the secluded Butterfly Beach. With competitive rates, flexible rental periods, and excellent customer service, we ensure your exploration of Canacona and South Goa is both convenient and memorable.'
            ),
            (
                'Calangute', 
                'calangute', 
                'Premium Car Rental Service in Calangute, Goa''s Most Popular Beach',
                'Calangute is often called the "Queen of Beaches" in Goa, and ZoiCarRentals offers the perfect way to explore this vibrant area. Our car rental service in Calangute provides well-maintained vehicles at competitive rates, allowing you to visit nearby attractions like Baga Beach, Fort Aguada, and the bustling Saturday Night Market. With flexible rental periods and excellent customer service, we ensure your Calangute experience is convenient and enjoyable. Book your car rental today and discover the freedom of exploring North Goa on your own schedule.'
            )
        ) AS t(name, slug, headline, content)
    ) LOOP
        -- Check if location with this slug already exists
        IF NOT EXISTS (SELECT 1 FROM locations WHERE slug = location_data.slug) THEN
            -- Insert the location if it doesn't exist
            INSERT INTO locations (name, slug, headline, content, created_at, updated_at)
            VALUES (
                location_data.name,
                location_data.slug,
                location_data.headline,
                location_data.content,
                NOW(),
                NOW()
            );
            RAISE NOTICE 'Added location: %', location_data.name;
        ELSE
            RAISE NOTICE 'Location already exists: %', location_data.name;
        END IF;
    END LOOP;
END $$;

-- Commit the changes
COMMIT;
