import ReviewCard from "./ReviewCard";

export default function Reviews({reviews}: any) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                What {reviews.length === 1 ? "person is" : "people are"} saying
            </h1>
            <div>
                {
                    reviews.map((review: any) => (
                        <ReviewCard key={review.id} review={review}/>
                    ))
                }
            </div>
        </div>
    );
}