"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { units } from "data/units";
const UnitDropdown = ({
  defaultValue = "",
  className,
  ...props
}: React.ComponentProps<"select">) => {
  return (
    <Select
      defaultValue={`${defaultValue}`}
      value={`${props.value}`}
      onValueChange={props.onChange as () => void}>
      <SelectTrigger className="w-full capitalize">
        <SelectValue placeholder="Select Unit" />
      </SelectTrigger>
      <SelectContent>
        {units.map((unit, index) => (
          <SelectGroup key={index}>
            <SelectLabel key={index}>{unit.name}</SelectLabel>
            {unit?.key?.map((item, index) => (
              <SelectItem className="capitalize" value={item.value} key={index}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UnitDropdown;
