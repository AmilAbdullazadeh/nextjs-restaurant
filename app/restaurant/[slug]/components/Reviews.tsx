import ReviewCard from "./ReviewCard";

export default function Reviews() {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                What "person" : "people" are saying
            </h1>
            <div>
                <ReviewCard
                    // review={review}
                    // key={review.id}
                />
            </div>
        </div>
    );
}