import React, { FC, useState } from "react";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import DropdownBox, { DropdownBoxProps } from "@/commons/DropdownBox";
import PackageDescription, {
  PackageDescriptionProps,
} from "@/commons/PackageDescription";
import Button, { ButtonProps } from "@/commons/Button";
import { StrictUnion } from "@/types/helper.types";
import { useRouter } from "next/navigation";
import { Package } from "@/types/package.types";
interface DeliveryCollapsibleBoxWithDelivery
  extends DropdownBoxProps,
    PackageDescriptionProps {
  className?: string;
  packages?: Package[];
  buttonProps?: ButtonProps;
  buttonText?: string;
  delivery: true;
}

interface DeliveryCollapsibleBoxWithoutDelivery
  extends DropdownBoxProps,
    PackageDescriptionProps {
  className?: string;
  packages?: Package[];
  buttonProps?: ButtonProps;
  pathButton?: string;
  delivery: false;
}

type DeliveryCollapsibleBoxProps = StrictUnion<
  DeliveryCollapsibleBoxWithDelivery | DeliveryCollapsibleBoxWithoutDelivery
>;

const DeliveryCollapsibleBox: FC<DeliveryCollapsibleBoxProps> = ({
  title,
  description,
  delivery,
  destination,
  packageId,
  recipient,
  coordinatesPackage,
  coordinatesUser,
  packages,
  buttonProps,
  buttonText,
  pathButton,
  className,
}) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className={`${className || ""}`}>
      <DropdownBox title={title} description={description}>
        <>
          {delivery && buttonText ? (
            <div className="flex flex-col gap-4">
              <PackageDescription
                destination={destination}
                packageId={packageId}
                recipient={recipient}
                coordinatesUser={coordinatesUser}
                coordinatesPackage={coordinatesPackage}
              />
              <Button className="self-end" {...buttonProps}>
                {buttonText}
              </Button>
            </div>
          ) : packages ? (
            <>
              {packages.map((deliveryPackage) => (
                <div key={deliveryPackage._id}>
                  <DeliveryPackageCard
                    trash={false}
                    buttonText=""
                    className="mb-4"
                    {...deliveryPackage}
                    status={
                      deliveryPackage.status === "delivered"
                        ? "delivered"
                        : deliveryPackage.status === "in_progress"
                        ? "in_progress"
                        : null
                    }
                    onClick={() => {
                      push(`/package/description/${deliveryPackage._id}`);
                    }}
                  />
                  {deliveryPackage !== packages.at(-1) && (
                    <hr className="mb-4" />
                  )}
                </div>
              ))}
              {pathButton ? (
                <Button
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    push(pathButton);
                  }}
                  className="m-auto py-[0.20rem]"
                  {...buttonProps}
                >
                  Ver Mas
                </Button>
              ) : null}
            </>
          ) : (
            <p>Ningun reparto añadido aun</p>
          )}
        </>
      </DropdownBox>
    </div>
  );
};

export default DeliveryCollapsibleBox;
