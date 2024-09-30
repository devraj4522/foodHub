import { Link } from "@nextui-org/link";
import { RestaurantData } from "@/types/Restaurant";
import {Breadcrumbs , BreadcrumbItem} from "@nextui-org/breadcrumbs";
import { FoodItem } from "@/types/Food";

export default function BreadCrumb({foodItem}: {foodItem: FoodItem}) {
  const slug = foodItem.id;
  return (
    <section className='relative w-full bg-lime-100 overflow-hidden'>
          {/* Breadcrumb */}
          <Breadcrumbs className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <BreadcrumbItem>
              <Link className="text-black hover:underline cursor-pointer" href="/">Home</Link>
            </BreadcrumbItem>

            <BreadcrumbItem>

              <Link className="text-black hover:underline cursor-pointer" href="/#restaurants">Restaurants</Link>
            </BreadcrumbItem>

            <BreadcrumbItem>

            <Link href={`/restaurant/${foodItem?.restaurant.id}`} className="text-black hover:underline cursor-pointer">{foodItem?.restaurant.name}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link className="text-black hover:underline cursor-pointer" href={`/food/${foodItem?.id}`}>{foodItem?.name}</Link>
            </BreadcrumbItem>
          </Breadcrumbs>


      </section>
  );
}
