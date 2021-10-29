const data = {
    users: [
        {
            name: 'Gnoul',
            email: 'gnoul@gmail.com',
            password: '$2b$10$kMvpM0SUTEweJG3odLBBd.JF9mugzHodd.Inke712AOqRehHsaKou', //pass123
            role: 'admin',
        },
        {
            name: 'luong',
            email: 'luong@gmail.com',
            password: '$2b$10$kMvpM0SUTEweJG3odLBBd.JF9mugzHodd.Inke712AOqRehHsaKou', //pass123
            role: 'user',
        },
    ],
    products: [
        {
            _id: '0',
            name: 'Regular Fit Suit Jacket', // Pierre Cardin Navy Twill Regular Fit Suit Jacket
            category: 'Suit Jacket',
            image: '/images/pierre_cardin_navy_twill_regular_fit_suit_jacket.jpg',
            price: 50,
            countInStock: 10,
            brand: 'Pierre Cardin',
            rating: 4.5,
            numReviews: 10,
            description:
                'Look smart and stylish in the classic Pierre Cardin range. All suits are made in a regular fit for comfort, and feature a 2 button jacket with notch lapel. We also offer a range of ties and shirts to complement your new suit.',
        },
        {
            _id: '1',
            name: 'Double Face Shirt', // Karlskrona Double Face Shirt
            category: 'Casual Shirt',
            image: '/images/melka_karlskrona_double_face_shirt.jpg',
            price: 25,
            countInStock: 20,
            brand: 'Melka',
            rating: 5,
            numReviews: 20,
            description:
                'A double cloth shirt to transform your wardrobe - Melka style. introducing the unique Karlskrona, a lightweight cotton shirt with a difference, with long sleeves, a patch chest pocket and a button down, classic collar inspired by our traditional Oxford styling.',
        },
        {
            _id: '2',
            name: 'Navy Blazer', // Scott By The Label Navy Blazer
            category: 'Blazer',
            image: '/images/scott_by_the_label_navy_blazer.jpg',
            price: 145,
            countInStock: 0,
            brand: 'Scott By The Label',
            rating: 4,
            numReviews: 12,
            description:
                "A stylish men's wool blend blazer in navy blue from Scott by the Label, with a versatile, classic fit.",
        },
        {
            _id: '3',
            name: 'Charcoal Melton Overcoat', // Racing Green Charcoal Melton Overcoat
            category: 'Coat',
            image: '/images/racing_green_charcoal_melton_overcoat.jpg',
            price: 95,
            countInStock: 12,
            brand: 'Racing Green',
            rating: 5,
            numReviews: 8,
            description:
                "This dark grey, wool blend overcoat is a unique way to style any wardrobe - a top coat for men inspired by classic British tailoring. With notch lapels, a single breasted three buton fastening, a tailored fit and plenty of pocket space, this men's wool blend jacket is ideal for any wardrobe.",
        },
        {
            _id: '4',
            name: 'V Neck Jumper', // Jett Banks V Neck Jumper
            category: 'Suit Jacket',
            image: '/images/jeff_banks_v_neck_jumper.jpg',
            price: 40,
            countInStock: 30,
            brand: 'Jett Banks',
            rating: 4.5,
            numReviews: 5,
            description:
                'Carefully crafted, this V-neck jumper is made from pure cotton for a luxurious, soft-to-touch feel. With classic metal plaque branding to the side, this jumper is designed for comfort and durability.',
        },
        {
            _id: '5',
            name: 'Plain Blue Panama Slim Fit Suit', // Lemehaus Plain Blue Panama Slim Fit Suit
            category: 'Suit Jacket',
            image: '/images/limehaus_plain_blue_panama_slim_fit_jacket.jpg',
            price: 125,
            brand: 'Lemehaus',
            rating: 5,
            numReviews: 45,
            description:
                "Limehaus are a true trendsetter in menswear, with statement suits that are cut slimmer than usual. We'd recommend sizing up to get the perfect fit.",
        },
    ],
};

export default data;
