const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function seedRestaurants() {
  const restaurantsData = [
    {
      id: 1,
      name: 'Italian Bistro',
      deliveryTime: '39 mins',
      rating: '3.5',
      reviews: '42k',
      averageCost: '₹300 for two',
      topItems: ['Pizza', 'Pasta'],
      image: 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg',
    },
    {
      id: 2,
      name: 'Burger King',
      deliveryTime: '20 mins',
      rating: '4.0',
      reviews: '12k',
      averageCost: '₹200 for two',
      topItems: ['Whopper', 'Fries'],
      image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
    },
    {
      id: 3,
      name: 'The Chinese Box',
      deliveryTime: '30 mins',
      rating: '3.8',
      reviews: '8k',
      averageCost: '₹250 for two',
      topItems: ['Manchurian', 'Fried Rice'],
      image: 'https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg',
    },
    {
      id: 4,
      name: 'Sagar Ratna',
      deliveryTime: '45 mins',
      rating: '4.5',
      reviews: '22k',
      averageCost: '₹400 for two',
      topItems: ['Dosa', 'Idli'],
      image: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-for-more-than-one-dosha-1706085501.jpg',
    },
    {
      id: 5,
      name: 'Biryani House',
      deliveryTime: '35 mins',
      rating: '4.2',
      reviews: '18k',
      averageCost: '₹350 for two',
      topItems: ['Chicken Biryani', 'Mutton Biryani'],
      image: 'https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg',
    },
    {
      id: 6,
      name: 'The Pizza Place',
      deliveryTime: '25 mins',
      rating: '4.3',
      reviews: '15k',
      averageCost: '₹250 for two',
      topItems: ['Margherita', 'Farmhouse'],
      image: 'https://b.zmtcdn.com/data/reviews_photos/ead/2a1826787ec13c007c17e76502bb8ead_1639634307.jpg',
    },
    {
      id: 7,
      name: 'The Dhaba',
      deliveryTime: '40 mins',
      rating: '4.1',
      reviews: '10k',
      averageCost: '₹300 for two',
      topItems: ['Butter Chicken', 'Naan'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8vpqzG1hDGjt-tOmgnMaHXs7TdQBfyRL_w&s',
    },
    {
      id: 8,
      name: 'The Pastry Shop',
      deliveryTime: '30 mins',
      rating: '4.4',
      reviews: '25k',
      averageCost: '₹150 for two',
      topItems: ['Chocolate Pastry', 'Black Forest'],
      image: 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg',
    },
  ];
  
  for (const restaurant of restaurantsData) {
    await prisma.restaurant.create({
      data: {
        name: restaurant.name,
        description: `${restaurant.name} - ${restaurant.topItems.join(', ')}`,
        cuisine: restaurant.topItems,
        address: '123 Sample Street',
        city: 'Sample City',
        state: 'Sample State',
        image: restaurant.image,
        pinCode: '123456',
        phone: '1234567890',
        rating: parseFloat(restaurant.rating),
        avgCostForTwo: parseFloat(restaurant.averageCost.replace('₹', '').split(' ')[0]),
        openingTime: '09:00',
        closingTime: '22:00',
        deliveryTime: parseInt(restaurant.deliveryTime),
        isActive: true,
      },
    });
  }

  console.log('Restaurants seeded successfully!');
}

seedRestaurants()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());