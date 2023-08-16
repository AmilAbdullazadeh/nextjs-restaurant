import { rest } from 'msw';

export const handlers = [
    rest.get('api/restaurants', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 1,
                    name: "Restaurant Name",
                    main_image: "image.jpg",
                    cuisinie: "Italian",
                    location: "City",
                    price: "LOW",
                    slug: "restaurant-name",
                    reviews: []
                }
            ])
        );
    }),
];
