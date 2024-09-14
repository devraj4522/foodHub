import { useGeolocation } from "@/hooks/location/useGeolocation";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export const Location = () => {
    const { address } = useGeolocation();
    // address are big so we need to make it smaller Like salt lake city...
    const shortAddress = address.split(', ').slice(0, 2).join(', ') + '...';

    return (
        <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-green-600 data-[active=true]:font-medium max-w-60 text-wrap",
                )}
                color="foreground"
                href="#"
              >
              <FaLocationPin size={20} className="mr-2 text-green-600" />  {shortAddress} <FaAngleDown className=" -inset-0 -ml-1" />
              </NextLink> 
    )
}