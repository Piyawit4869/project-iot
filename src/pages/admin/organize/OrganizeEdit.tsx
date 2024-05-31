import React from "react";
// import { Select } from "antd";
import { OrganizeCreateForm } from "@src/forms";

// const { Option } = Select;

// const styles = {
//   uploadContainer: {
//     display: "flex",
//     alignItems: "center",
//     border: "1px solid #ccc",
//     padding: "20px",
//     borderRadius: "10px",
//     fontFamily: "Arial, sans-serif",
//   },

//   uploadInfo: {
//     flex: "1",
//   },

//   fileInput: {
//     display: "none",
//   },
// };

//get initial value

const organize = {
  name: "องค์กร 1",
  type: "type 1",
  description: "description 1",
  image: "image 1",
  address: "address 1",
  phone: "phone 1",
  email: "email 1",
  website: "website 1",
  facebook: "facebook 1",
  line: "line 1",
  twitter: "twitter 1",
  instagram: "instagram 1",
  youtube: "youtube 1",
  status: "status 1",
};

export const OrganizeEdit: React.FC = () => {
  // const [imageSrc, setImageSrc] = useState("image-placeholder.png");

  // const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageSrc(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };

  return (
    <div>
      <OrganizeCreateForm initialValues={organize} />
    </div>
  );
};

export default OrganizeEdit;
