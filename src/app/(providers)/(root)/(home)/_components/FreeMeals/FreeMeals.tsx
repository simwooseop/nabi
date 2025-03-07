/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clientApi from "@/api/clientSide/api";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { Tables } from "@/supabase/database.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";
import FreeMeal from "./FreeMeal";

interface FreeMealsProps {
  initialFreeMeals: (Tables<"freeMeals"> & {
    storeDatas: Tables<"storeDatas">;
  } & {
    userProfiles: Tables<"userProfiles">;
  })[];
}

const mealImgUrl =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/meal.png";

function FreeMeals({ initialFreeMeals }: FreeMealsProps) {
  const windowSize = useWindowSize();
  const queryClient = useQueryClient();

  const { data: freeMeals } = useQuery({
    initialData: initialFreeMeals,
    queryKey: ["freeMeals"],
    queryFn: () => {
      let limit = 3;
      if (windowSize.width <= 360) limit = 1;
      return clientApi.freeMeals.getFreeMealsWithStoreData(limit);
    },
  });

  useEffect(() => {
    if (!windowSize) return;

    queryClient.invalidateQueries({ queryKey: ["freeMeals"] });
  }, [windowSize]);

  return (
    <div className="flex flex-col gap-y-6 bg-white border rounded-md px-5 py-7 sm:h-full sm:py-5 sm:gap-y-3">
      <div className="flex items-center gap-x-2">
        <Image
          src={mealImgUrl}
          width={24}
          height={24}
          alt="무상식사"
          className="-mt-1 sm:hidden"
        />
        <h5 className="sm:text-xs">새롭게 등록된 무상식사</h5>
      </div>

      <ul className="flex flex-col">
        {freeMeals?.map((freeMeal) => {
          return (
            <li key={freeMeal.mealId} className="group/free-meal-li">
              <FreeMeal freeMeal={freeMeal} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FreeMeals;
