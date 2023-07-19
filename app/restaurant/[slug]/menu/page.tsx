import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

import {PrismaClient, PRICE, Cuisinie, Location} from '@prisma/client';
import {throws} from "assert";
import {IMenuCard} from "../components/MenuCard";

const prisma = new PrismaClient();

export interface IRestaurantMenu {
    items: string[],
}

const fetchRestaurantMenu = async (slug: string): Promise<IRestaurantMenu> => {
    const restaurantMenu = await prisma.restaurants.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    });

    if (!restaurantMenu) {
        throw new Error();
    }

    // @ts-ignore
    return restaurantMenu.items;
}

export default async function RestaurantMenu(
    {params}: { params: { slug: string } }
) {

    const restaurantMenu = await fetchRestaurantMenu(params.slug);

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar
                    slug={params.slug}
                />
                <Menu
                    menu={restaurantMenu}
                />
            </div>
        </>
    );
}