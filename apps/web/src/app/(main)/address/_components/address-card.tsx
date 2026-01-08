import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreAddressTypes } from "@repo/types";
import DeleteAddress from "./delete-address";
import EditAddress from "./edit-address";

const AddressCard = ({ data }: { data: StoreAddressTypes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {data?.name}{" "}
          <div className="flex gap-1.5">
            <EditAddress data={data} />
            <DeleteAddress id={data?.id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>
            <span>Contact:</span> <span>{data?.contact}</span>
          </p>
          <p>
            <span>Address:</span> <span>{data?.address}</span>
          </p>
          <p>
            <span>City:</span> <span>{data?.city}</span>
          </p>
          <p>
            <span>State:</span> <span>{data?.state}</span>
          </p>
          <p>
            <span>District:</span> <span>{data?.district}</span>
          </p>
          <p>
            <span>Pin Code:</span> <span>{data?.pincode}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
