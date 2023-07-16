import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import {PrismaClient, PRICE, Cuisinie, Location} from '@prisma/client';
import {throws} from "assert";

const prisma = new PrismaClient();

export interface IRestaurant {
    id: number,
    name: string,
    main_image: string,
    cuisinie: Cuisinie,
    location: Location,
    price: PRICE,
    slug: string
}

const fetchRestaurants = async (): Promise<IRestaurant[]> => {
    const restaurants = await prisma.restaurants.findMany(
        {
            select: {
                id: true,
                name: true,
                main_image: true,
                cuisinie: true,
                location: true,
                slug: true,
                price: true,
            }
        }
    );

    if (!restaurants) {
        throw new Error();
    }

    return restaurants;
}


export default async function Home() {

    const restaurants = await fetchRestaurants();

    console.log({restaurants})


    return (
        <main>
            <Header/>
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                {
                    restaurants.map((restaurant:  IRestaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                    ))
                }
            </div>
        </main>
    );
}