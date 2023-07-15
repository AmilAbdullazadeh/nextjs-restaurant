import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export default async function Search() {
    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar />
                <div className="w-5/6">
                  <RestaurantCard />
                  {/*<p>Sorry, we found no restaurants in this area</p>*/}
                </div>
            </div>
        </>
    );
}