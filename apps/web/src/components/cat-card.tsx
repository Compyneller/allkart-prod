import { CategoryType } from "@repo/types";
import Link from "next/link";
import React from "react";

const CatCard = ({ data }: { data: CategoryType }) => {
  return (
    <Link href={`/cat/${data.id}`}>
      <div className="w-[100px] rounded-lg overflow-clip cursor-pointer">
        <div className="w-full mb-2  flex items-center justify-center rounded-lg  h-[100px] bg-accent">
          <img src={data?.url} className="object-contain w-[80px] h-[80px]" alt="" />
        </div>
        <p className="text-sm text-center capitalize ">{data?.name}</p>
      </div>
    </Link>
  );
};

export default CatCard;
