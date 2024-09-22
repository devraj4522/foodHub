-- Insert the restaurant data
INSERT INTO "Restaurant" (
   id,  name, description, cuisine, address, city, state, image, "pinCode", phone,
    rating, "avgCostForTwo", "openingTime", "closingTime", "deliveryTime", "isActive",
    "createdAt", "updatedAt"
) VALUES
(1, 'Spice Route', 'Spice Route - Butter Chicken, Naan', ARRAY['North Indian', 'Mughlai'], '42 MG Road', 'Bangalore', 'Karnataka', 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg', '560001', '9876543210', 4.2, 450, '11:00', '23:00', 35, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Dosa Delight', 'Dosa Delight - Masala Dosa, Idli Sambar', ARRAY['South Indian', 'Vegetarian'], '15 Anna Salai', 'Chennai', 'Tamil Nadu', 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg', '600002', '8765432109', 4.5, 250, '07:00', '22:30', 25, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Tandoori Nights', 'Tandoori Nights - Chicken Tikka, Paneer Tikka', ARRAY['North Indian', 'Kebabs'], '78 Park Street', 'Kolkata', 'West Bengal', 'https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg', '700016', '7654321098', 4.0, 400, '12:00', '23:30', 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Chaat Corner', 'Chaat Corner - Pani Puri, Bhel Puri', ARRAY['Street Food', 'Chaat'], '23 Linking Road', 'Mumbai', 'Maharashtra', 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-for-more-than-one-dosha-1706085501.jpg', '400054', '6543210987', 4.3, 200, '10:00', '22:00', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5,'Biryani Bazaar', 'Biryani Bazaar - Hyderabadi Biryani, Keema Biryani', ARRAY['Biryani', 'Mughlai'], '56 Necklace Road', 'Hyderabad', 'Telangana', 'https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg', '500003', '5432109876', 4.6, 350, '11:30', '23:00', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6,'Punjabi Dhaba', 'Punjabi Dhaba - Sarson Ka Saag, Makki Di Roti', ARRAY['Punjabi', 'North Indian'], '89 Mall Road', 'Amritsar', 'Punjab', 'https://b.zmtcdn.com/data/reviews_photos/ead/2a1826787ec13c007c17e76502bb8ead_1639634307.jpg', '143001', '4321098765', 4.1, 300, '09:00', '23:30', 35, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7,'Kerala Kitchen', 'Kerala Kitchen - Malabar Parotta, Fish Curry', ARRAY['Kerala', 'Seafood'], '32 Marine Drive', 'Kochi', 'Kerala', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8vpqzG1hDGjt-tOmgnMaHXs7TdQBfyRL_w&s', '682001', '3210987654', 4.4, 400, '08:00', '22:30', 45, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Gujarati Thali', 'Gujarati Thali - Dhokla, Khandvi', ARRAY['Gujarati', 'Vegetarian'], '11 CG Road', 'Ahmedabad', 'Gujarat', 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg', '380009', '2109876543', 4.2, 250, '11:00', '22:00', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);