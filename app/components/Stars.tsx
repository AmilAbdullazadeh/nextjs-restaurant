import React from "react";
import Image from "next/image";
import {calculateReviewAvarage} from "../utils/calculateReviewAvarage";
import star from "../assets/icons/star.svg";
import halfStar  from "../assets/icons/star-half-alt.svg";
import emptyStar from "../assets/icons/empty_star.svg";

export default function Stars({reviews, rating}: { reviews: any[], rating?: number; }) {


    const r = rating || calculateReviewAvarage(reviews)

    const renderStars = (rating: number) => {
        console.log('rating', rating)

        // create the strings
        const fullStar = "★";
        const halfStar =  "☆";
        const emptyStar = "☆";

        // determine the full, half, and empty stars
        const fullStars = Math.floor(rating);
        const halfStars = Math.round(rating - fullStars);
        const emptyStars = 5 - fullStars - halfStars;

        // generate the strings
        const fullStarsString = fullStar.repeat(fullStars);
        const halfStarsString = halfStar.repeat(halfStars);
        const emptyStarsString = emptyStar.repeat(emptyStars);

        // return the combined string inside a div
        return (
            <div className="flex items-center">
                {fullStarsString}
                {halfStarsString}
                {emptyStarsString}
            </div>
        );
    }

    if (reviews.length === 0 && !r) return <div className="flex items-center">No reviews</div>;
    return <div className="flex items-center">{renderStars(+r)}</div>;
}