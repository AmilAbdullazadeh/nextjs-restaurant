import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

export default async function RestaurantMenu() {
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar
                    // slug={params.slug}
                />
                <Menu
                    // menu={menu}
                />
            </div>
        </>
    );
}