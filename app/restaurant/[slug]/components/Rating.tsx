import Stars from "../../../components/Stars";

export default function Rating({reviews}: any) {
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars
                    reviews={reviews}
                />
                <p className="text-reg ml-3">
                </p>
            </div>
            <div>
                <p className="text-reg ml-4">
                    {reviews.length} reviews
                </p>
            </div>
        </div>
    );
}