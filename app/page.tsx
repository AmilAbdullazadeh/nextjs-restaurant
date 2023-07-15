import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// interface IRestaurant {
//     id: number;
//     name: string;
// }

const fetchRestaurants = async () => {
    const restaurants = await prisma.restaurants.findMany();
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
                    restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                    ))
                }
            </div>
        </main>
    );
}