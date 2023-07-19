import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

import {PrismaClient, PRICE, Cuisinie, Location, Review} from '@prisma/client';
import {throws} from "assert";

const prisma = new PrismaClient();

export interface ISearchParams {
    city: string,
    cuisinie: string,
    price: string,
}

export interface IRestaurant {
    id: number,
    name: string,
    description: string,
    main_image: string,
    slug: string,
    cuisinie: Cuisinie,
    location: Location,
    price: PRICE,
    reviews: Review[],
}

const fetchRestaurans = async (params: ISearchParams): Promise<IRestaurant[]> => {

    console.log("params", params);

    const where: any = {}

    if (params.city) {
        const city = {
            name: {
                equals: params.city?.toLocaleLowerCase()
            }
        }
        where.location = city
    }

    if (params.cuisinie) {
        const cuisinie = {
            name: {
                equals: params.cuisinie?.toLocaleLowerCase()
            }
        }
        where.cuisinie = cuisinie
    }

    if (params.price) {
        const price = {
            equals: params.price
        }
        where.price = price
    }

    console.log(where);

    const restaurants = await prisma.restaurants.findMany({
        where,
        select: {
            id: true,
            name: true,
            description: true,
            main_image: true,
            slug: true,
            price: true,
            cuisinie: true,
            location: true,
            reviews: true,
        }
    });

    console.log("restaurants", restaurants)

    if (!restaurants) {
        throw new Error();
    }

    return restaurants as IRestaurant[];
}

const fetchCuisinies = async () => {
    const cuisinies = await prisma.cuisinie.findMany({
        select: {
            name: true,
        }
    });

    if (!cuisinies) {
        throw new Error();
    }

    return cuisinies;
}

const fetchLocations = async () => {
    const locations = await prisma.location.findMany({
        select: {
            name: true,
        }
    });

    if (!locations) {
        throw new Error();
    }

    return locations;
}

export default async function Search(
    {searchParams}: { searchParams: ISearchParams }
) {

    const restaurants = await fetchRestaurans(searchParams);
    const locations = await fetchLocations();
    const cuisinies = await fetchCuisinies();

    return (
        <>
            <Header/>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar cuisinies={cuisinies} locations={locations} searchParams={searchParams}/>
                <div className="w-5/6">
                    {
                        restaurants.length > 0 ?
                            <RestaurantCard restaurants={restaurants}/> :
                            <p className="text-red-500">Sorry, we found no restaurants in this area</p>
                    }
                </div>
            </div>
        </>
    );
}