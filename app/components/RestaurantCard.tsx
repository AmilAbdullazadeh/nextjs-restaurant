import Link from "next/link";
import Price from "./Price";
import Stars from "./Stars";

import {IRestaurant} from "../page";

export default function RestaurantCard(
    {restaurant}: { restaurant: IRestaurant }
) {
    return (
        <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
            <Link href={`/restaurant/${restaurant.slug}`}>
                <img src={`${restaurant.main_image}`} alt="" className="w-full h-36"/>
                <div className="p-1">
                    <h3 className="font-bold text-xl mb-2">{restaurant?.name}</h3>
                    <div className="flex items- start">
                        {/*<Stars*/}
                        {/*    reviews={restaurant?.reviews}*/}
                        {/*/>*/}
                        <p className="ml-2">
                            5 reviews
                        </p>
                    </div>
                    <div className="flex text-reg font-light capitalize">
                        <p className=" mr-3">{restaurant.cuisinie?.name}</p>
                        <Price
                            price={restaurant?.price}
                        />
                        <p>{restaurant.location?.name}</p>
                    </div>
                    <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                </div>
            </Link>
        </div>
    );
}
