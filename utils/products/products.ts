const API = process.env.API

export const getProducts = async () => {
    // const response = await axios.get(`${API}/api/products`)
    // dummy response
    const response: any = { success: true, message: "Products fetched successfully", products:   [
        { id: 1, name: 'Dosha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png' },
        { id: 2, name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png' },
        
        { id: 3, name: 'Rasmalai', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rasgulla.png' },
        
        { id: 4, name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Jalebi.png' },
        
        { id: 5, name: 'Paneer', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pure%20Veg.png' },
        
        { id: 6, name: 'Rolls', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png' },
        
        { id: 7, name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png' },
        
        { id: 8, name: 'Rasgoola', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rasgulla.png' },
        
        { id: 9, name: 'Chole Bhature', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chole%20Bhature.png' },
    
        { id: 10, name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png' },
    
        { id: 11, name: 'Paratha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png' },
    
        { id: 11, name: 'Pav Bhaji', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pav%20Bhaji.png' },
    
        { id: 11, name: 'Idli', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Idli.png' },
    
        { id: 11, name: 'Pastry', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png' },
    
      ]}
    return response
}

export const getProduct = async (productId: string) => {
    // const response = await axios.get(`${API}/api/products/${productId}`)
    // dummy response
    const response = { success: true, message: "Product fetched successfully", product: 
        {
            id: 2,
            name: 'Whopper',
            restaurant: 'Burger King',
            deliveryTime: '20 mins',
            rating: '4.0',
            reviews: '12k',
            category: 'Burger',
            description: 'A flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
            price: 5.99,
            image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
        }
    }
    return response
}

export const getTopItems = async () => {
    // const response = await axios.get(`${API}/api/products/top-items`)
    // dummy response
    const response = { success: true, message: "Top items fetched successfully", topItems: 
        [
            {
              id: 1,
              name: 'Italian Bistro',
              deliveryTime: '39 mins',
              rating: '3.5',
              reviews: '42k',
              description: 'A cozy Italian restaurant known for its authentic pizzas and pastas.',
              price: 10.99,
              category: 'Pizza',
              averageCost: '₹300 for two',
              topItems: ['Pizza', 'Pasta'],
              image: 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg',
            },
            {
              id: 2,
              name: 'Whopper',
              restaurant: 'Burger King',
              deliveryTime: '20 mins',
              rating: '4.0',
              reviews: '12k',
              category: 'Burger',
              description: 'A flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
              price: 5.99,
              image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
            },
            {
              id: 3,
              name: 'Margherita Pizza',
              restaurant: 'Pizza Hut',
              deliveryTime: '45 mins',
              rating: '4.5',
              reviews: '25k',
              category: 'Pizza',
              description: 'A classic pizza with a thin crust, topped with fresh mozzarella cheese, tomatoes, and basil.',
              price: 8.99,
              image: 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg',
            },
        ]
    }
    return response
}

export const getProductsByRestaurant = async (restaurantId: string) => {
    // const response = await axios.get(`${API}/api/products/restaurant/${restaurantId}`)
    // dummy response
      const response = { success: true, message: "Products fetched successfully", products: [
        {
          id: 1,
          name: 'Italian Bistro',
          deliveryTime: '39 mins',
          rating: '3.5',
          reviews: '42k',
          description: 'A cozy Italian restaurant known for its authentic pizzas and pastas.',
          price: 10.99,
          category: 'Pizza',
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
          category: 'Burger',
          description: 'A fast food restaurant known for its burgers, fries, and other fast food items.',
          price: 5.99,
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
          description: 'A Chinese restaurant known for its Chinese food, including noodles, rice, and other Chinese dishes.',
          price: 8.99,
          averageCost: '₹250 for two',
          category: 'Chinese',
          topItems: ['Manchurian', 'Fried Rice'],
          image: 'https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg',
        },
        {
          id: 4,
          name: 'Sagar Ratna',
          deliveryTime: '45 mins',
          rating: '4.5',
          reviews: '22k',
          description: 'A South Indian restaurant known for its South Indian food, including dosa, idli, and other South Indian dishes.',
          price: 12.99,
          category: 'South Indian',
          averageCost: '₹400 for two',
          topItems: ['Dosa', 'Idli'],
          image: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-for-more-than-one-dosha-1706085501.jpg',
        },
        {
          id: 5,
          name: 'Biryani House',
          deliveryTime: '35 mins',
          rating: '4.2',
          description: 'A restaurant known for its Biryani, including chicken biryani, mutton biryani, and other Biryani dishes.',
          price: 15.99,
          reviews: '18k',
          category: 'Biryani',
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
          category: 'Pizza',
          description: 'A pizza restaurant known for its pizza, including margherita pizza, farmhouse pizza, and other pizza dishes.',
          price: 11.99,
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
          category: 'North Indian',
          description: 'A restaurant known for its North Indian food, including butter chicken, naan, and other North Indian dishes.',
          price: 15.99,
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
          category: 'Desserts',
          description: 'A dessert restaurant known for its desserts, including chocolate pastry, black forest, and other desserts.',
          price: 10.99,
          averageCost: '₹150 for two',
          topItems: ['Chocolate Pastry', 'Black Forest'],
          image: 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg',
        },
      ]
    }
    return response
}

