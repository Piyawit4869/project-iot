import React from "react";
import { OrganizeForm } from "@src/forms";

//no intitial value

export const OrganizeCreate: React.FC = () => {
  const [imageSrc, setImageSrc] = React.useState("image-placeholder.png");

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div>
      <OrganizeForm />
    </div>
  );
};

export default OrganizeCreate;
