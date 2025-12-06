import { CategoryType } from "@repo/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CatCard = ({ data }: { data: CategoryType }) => {
  return (
    <Link href={`/cat/${data.id}`}>
      <div className="w-full rounded-lg overflow-clip cursor-pointer">
        <div className="w-full mb-2  flex items-center justify-center rounded-lg  h-[100px] bg-accent">
          <div className="w-[80px] h-[80px] relative">
            <Image fill src={data?.url} className="object-contain " alt="" />
          </div>
        </div>
        <p className="text-sm text-center capitalize ">{data?.name}</p>
      </div>
    </Link>
  );
};

export default CatCard;
