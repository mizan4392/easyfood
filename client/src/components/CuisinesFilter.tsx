import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChanges: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

export default function CuisinesFilter({
  selectedCuisines,
  isExpanded,
  onChanges,
  onExpandedClick,
}: Props) {
  const handelCuisinesReset = () => onChanges([]);

  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisineLists = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChanges(newCuisineLists);
  };
  return (
    <>
      <div className=" flex items-center justify-between px-2">
        <div className="text-md font-semibold mb-2">Filter by cuisine</div>
        <div
          onClick={handelCuisinesReset}
          className="text-sm font-semibold mb-2 cursor-pointer text-blue-500 "
        >
          Reset Filters
        </div>
      </div>

      <div className=" space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, i) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className=" flex" key={i}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleCuisineChange}
                  className="hidden"
                  value={cuisine}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600 "
                      : "border border-slate-3"
                  } `}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant={"link"}
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className=" flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
