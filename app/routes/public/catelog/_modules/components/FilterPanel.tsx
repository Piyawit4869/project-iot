import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { FilterOptions, ProductQueryState } from "../types/product";

interface FilterPanelProps {
  queryState: ProductQueryState;
  filterOptions: FilterOptions;
  onUpdateQuery: (updates: Partial<ProductQueryState>) => void;
  className?: string;
}

export function FilterPanel({
  queryState,
  filterOptions,
  onUpdateQuery,
  className,
}: FilterPanelProps) {
  const handleAttributeChange = (
    attributeType: "size" | "color" | "pattern",
    value: string,
    checked: boolean
  ) => {
    const currentAttrs = queryState.attrs || {};
    const currentValues = currentAttrs[attributeType] || [];

    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    onUpdateQuery({
      attrs: {
        ...currentAttrs,
        [attributeType]: newValues.length > 0 ? newValues : undefined,
      },
    });
  };

  const clearAllFilters = () => {
    onUpdateQuery({
      q: undefined,
      category: undefined,
      priceMin: undefined,
      priceMax: undefined,
      status: undefined,
      attrs: undefined,
    });
  };

  const hasActiveFilters = !!(
    queryState.q ||
    queryState.category ||
    queryState.priceMin ||
    queryState.priceMax ||
    queryState.status ||
    queryState.attrs?.size?.length ||
    queryState.attrs?.color?.length ||
    queryState.attrs?.pattern?.length
  );

  return (
    <Card className={`p-6 rounded-2xl border-0 bg-card shadow-sm ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ตัวกรอง</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs rounded-xl"
            >
              ล้างทั้งหมด
            </Button>
          )}
        </div>

        {/* ค้นหา */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">ค้นหา</Label>
          <Input
            placeholder="ค้นหาสินค้า..."
            value={queryState.q || ""}
            onChange={(e) => onUpdateQuery({ q: e.target.value || undefined })}
            className="rounded-xl"
          />
        </div>

        <Separator />

        {/* หมวดหมู่ */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">หมวดหมู่</Label>
          <Select
            value={queryState.category || ""}
            onValueChange={(value) =>
              onUpdateQuery({
                category: value === "all-categories" ? undefined : value,
              })
            }
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="ทุกหมวดหมู่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">ทุกหมวดหมู่</SelectItem>
              {filterOptions.categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* ช่วงราคา */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">ช่วงราคา</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="ต่ำสุด"
              value={queryState.priceMin || ""}
              onChange={(e) =>
                onUpdateQuery({
                  priceMin: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="rounded-xl"
            />
            <Input
              type="number"
              placeholder="สูงสุด"
              value={queryState.priceMax || ""}
              onChange={(e) =>
                onUpdateQuery({
                  priceMax: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="rounded-xl"
            />
          </div>
        </div>

        <Separator />

        {/* สถานะสินค้า */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">สถานะสินค้า</Label>
          <Select
            value={queryState.status || ""}
            onValueChange={(value: any) =>
              onUpdateQuery({
                status: value === "all-statuses" ? undefined : value,
              })
            }
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="ทุกสถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">ทุกสถานะ</SelectItem>
              {filterOptions.statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* ขนาด */}
        {filterOptions.sizes.length > 0 && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">ขนาด</Label>
              <div className="space-y-2">
                {filterOptions.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={queryState.attrs?.size?.includes(size) || false}
                      onCheckedChange={(checked) =>
                        handleAttributeChange("size", size, checked as boolean)
                      }
                      className="rounded"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {size.toUpperCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* สี */}
        {filterOptions.colors.length > 0 && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">สี</Label>
              <div className="space-y-2">
                {filterOptions.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={
                        queryState.attrs?.color?.includes(color) || false
                      }
                      onCheckedChange={(checked) =>
                        handleAttributeChange(
                          "color",
                          color,
                          checked as boolean
                        )
                      }
                      className="rounded"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* ลวดลาย */}
        {filterOptions.patterns.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">ลวดลาย</Label>
            <div className="space-y-2">
              {filterOptions.patterns.map((pattern) => (
                <div key={pattern} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pattern-${pattern}`}
                    checked={
                      queryState.attrs?.pattern?.includes(pattern) || false
                    }
                    onCheckedChange={(checked) =>
                      handleAttributeChange(
                        "pattern",
                        pattern,
                        checked as boolean
                      )
                    }
                    className="rounded"
                  />
                  <Label
                    htmlFor={`pattern-${pattern}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
