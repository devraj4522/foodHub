import { Link } from "@nextui-org/link";
import { RestaurantData } from "@/types/Restaurant";
import {Breadcrumbs , BreadcrumbItem} from "@nextui-org/breadcrumbs";


export default function BreadCrumb({restaurant}:{restaurant: RestaurantData}) {
  const slug = restaurant.id;
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

            <BreadcrumbItem isCurrent>

              <Link className="text-black hover:underline cursor-pointer" href={`/restaurant/${slug}`}>{restaurant?.name}</Link>
            </BreadcrumbItem>
          </Breadcrumbs>


      </section>
  );
}
