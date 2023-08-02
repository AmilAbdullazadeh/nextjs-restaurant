import React from 'react';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import Home from '../app/page';
import { server } from '../mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

import { PrismaClient } from '@prisma/client';

// mock data
const mockRestaurants = [
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
];

// Mocking Prisma's findMany method
const prisma = new PrismaClient();
prisma.restaurants.findMany = jest.fn().mockResolvedValue(mockRestaurants);


describe('Home Component', () => {

    // @ts-ignore
    const renderComponent = () => render(<Home />);

    it('should render Header component', () => {
        renderComponent();
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    // for prisma
    it('should fetch and render restaurants correctly', async () => {
        renderComponent();
        await waitFor(() => expect(screen.getByText(mockRestaurants[0].name)).toBeInTheDocument());
    });

    it('should fetch and render restaurants correctly', async () => {
        renderComponent();
        await waitFor(() => expect(screen.getByText('Restaurant Name')).toBeInTheDocument()); 
    });

    it('should render RestaurantCard for each restaurant', async () => {
        renderComponent();
        await waitFor(() => expect(screen.getAllByTestId('restaurant-card')).toHaveLength(1)); 
    });

    it('should render specific restaurant details correctly', async () => {
        renderComponent();
        await waitFor(() => expect(screen.getByText('Restaurant Name')).toBeInTheDocument()); 
    });

    it('should handle error case', async () => {
        server.use(
            rest.get('/api/restaurantxs', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        );

        renderComponent();
        await waitFor(() => expect(screen.getByText('Error fetching restaurants')).toBeInTheDocument());
    });
});
