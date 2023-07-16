import {notFound} from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

import {PrismaClient, PRICE, Cuisinie, Location} from '@prisma/client';
import {throws} from "assert";

const prisma = new PrismaClient();

export interface IRestaurantDetails {
    id: number,
    name: string,
    images: string[],
    description: string,
    slug: string
}

const fetchRestaurantDetails = async (slug: string): Promise<IRestaurantDetails> => {
    const restaurantDetails = await prisma.restaurants.findUnique({
        where: {
            slug: slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            // reviews: true,
        }
    });

    if (!restaurantDetails) {
        throw new Error();
    }

    return restaurantDetails;
}

export default async function RestaurantDetails(
    {params}: { params: { slug: string } }
) {

    const restaurantDetails = await fetchRestaurantDetails(params.slug);


    console.log(restaurantDetails)

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar
                    slug={restaurantDetails.slug}
                />
                <Title
                    name={restaurantDetails.name}
                />
                <Rating
                    /*reviews={restaurantDetails.reviews} */
                />
                <Description
                    description={restaurantDetails.description}
                />
                <Images
                    images={restaurantDetails.images}
                />
                <Reviews
                    // reviews={restaurantDetails.reviews}
                />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard/>
            </div>
        </>
    );
}