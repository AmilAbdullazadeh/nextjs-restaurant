export const calculateReviewAvarage = (reviews: any) => {

    if (reviews.length === 0 || reviews === null || reviews === undefined) return 0;

    const rating = reviews.reduce((acc: any, review: any) => {
        return acc + review.rating
    }, 0) / reviews.length

    if (isNaN(rating)) return 0

    return +rating.toFixed(2)
}