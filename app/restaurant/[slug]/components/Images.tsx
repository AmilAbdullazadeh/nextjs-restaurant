export default function Images({images}: { images: string[] }) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                5 photos
            </h1>
            <div className="flex flex-wrap">
                {
                    images.map((image, index) => (
                            <img className="w-56 h-44 mr-1 mb-1"
                                 key={index}
                                 src={image}
                                 alt=""
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}