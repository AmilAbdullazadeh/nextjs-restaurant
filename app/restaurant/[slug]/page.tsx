import { notFound } from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export default async function RestaurantDetails() {
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar
                    // slug={restaurant.slug}
                />
                <Title
                    // name={restaurant.name}
                />
                <Rating
                    /*reviews={restaurant.reviews} */
                />
                <Description
                    /*description={restaurant.description} */
                />
                <Images
                    /*images={restaurant.images} */
                />
                <Reviews
                    // reviews={restaurant.reviews}
                />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard />
            </div>
        </>
    );
}