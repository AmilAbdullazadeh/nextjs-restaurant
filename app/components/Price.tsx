import React from "react";

export default function Price({price}: any) {
    const renderPrice = () => {
        return (
            <>
                <span>$$$$</span>
            </>
        );
    }

    return <p className="flex mr-3">{renderPrice()}</p>;
}