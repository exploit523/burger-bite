export const categories = ['All', 'Classic', 'Gourmet', 'Vegetarian'];

export const images = {
  hero: require('../../assets/images/hero-burger.png'),
  bigBurger: require('../../assets/images/big-burger.png'),
  firecracker: require('../../assets/images/firecracker.png'),
  garden: require('../../assets/images/garden.png'),
  sunrise: require('../../assets/images/sunrise.png'),
  avatar: {
    uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
};

export const featuredBurgers = [
  {
    id: 'big-burger',
    name: 'Big Burger',
    description: 'Chicken with cheese',
    details:
      'Savor our Big Burger masterpiece with a succulent chicken patty, topped with melted cheese, fresh veggies, creamy sauce, and soft artisan buns baked daily for the perfect bite.',
    price: 239,
    category: 'Classic',
    rating: 5,
    image: images.bigBurger,
  },
  {
    id: 'garden-gourmet',
    name: 'Garden Gourmet',
    description: 'With fresh veggies',
    details:
      'Savor our Garden Gourmet masterpiece with a succulent plant-based patty, topped with fresh veggies, creamy sauce, and soft artisan buns baked daily for the perfect bite.',
    price: 539,
    category: 'Vegetarian',
    rating: 5,
    image: images.garden,
  },
  {
    id: 'firecracker',
    name: 'The Firecracker',
    description: 'Spicy beef smash',
    details:
      'A bold smash burger layered with jalapeños, pepper jack, and our signature hot sauce on a toasted brioche bun for heat lovers.',
    price: 269,
    category: 'Gourmet',
    rating: 5,
    image: images.firecracker,
  },
];

export const menuBurgers = [
  {
    id: 'sunrise-special',
    name: 'Sunrise Special',
    description: 'Classic breakfast stack',
    details:
      'Savor our Sunrise Special masterpiece with a succulent patty, topped with fresh greens, melted cheese, and artisan buns baked daily.',
    price: 199,
    category: 'Classic',
    rating: 5,
    image: images.sunrise,
  },
  {
    id: 'the-firecracker-menu',
    name: 'The Firecracker',
    description: 'Spicy beef smash',
    details:
      'A bold smash burger layered with jalapeños, pepper jack, and our signature hot sauce on a toasted brioche bun.',
    price: 249,
    category: 'Gourmet',
    rating: 5,
    image: images.firecracker,
  },
  {
    id: 'garden-gourmet-menu',
    name: 'Garden Gourmet',
    description: 'With fresh veggies',
    details:
      'Savor our Garden Gourmet masterpiece with a succulent plant-based patty, topped with fresh veggies, creamy sauce, and soft artisan buns.',
    price: 229,
    category: 'Vegetarian',
    rating: 5,
    image: images.garden,
  },
];

export const formatPrice = (value) => `Rs ${Number(value).toFixed(2)}`;
