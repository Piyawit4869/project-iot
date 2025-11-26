import React from "react";

interface SectionWithImageProps {
  title: string;
  content: string | React.ReactNode;
  image?: string | React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export default function SectionWithImage({
  title,
  content,
  image,
  position = "left",
  className = "",
}: SectionWithImageProps) {
  const isLeft = position === "left";
  const hasImage = Boolean(image);

  return (
    <section
      className={`
        flex flex-col 
        lg:flex-row 
        items-center 
        lg:items-start 
        gap-6           
        lg:gap-16      
        mt-10           
        lg:mt-16       
        ${isLeft ? "" : "lg:flex-row-reverse"}
        ${className}
      `}
    >
      {hasImage && (
        <div
          className={`
            w-full lg:w-1/2 
            flex 
            ${isLeft ? "justify-start" : "justify-end"}
            lg:justify-center
          `}
        >
          {typeof image === "string" ? (
            <img
              src={image}
              alt=""
              className="w-40 sm:w-48 lg:w-72 object-contain"
            />
          ) : (
            image
          )}
        </div>
      )}

      <div
        className={`
          w-full 
          ${hasImage ? "lg:w-1/2" : "lg:w-full"}
          flex flex-col 
          space-y-3        /* mobile: ลดจากเดิม */
          lg:space-y-4     /* desktop: ระยะห่างปกติ */
          text-gray-900 dark:text-sidebar-foreground
        `}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>

        <div className="text-gray-600 dark:text-muted-foreground leading-relaxed space-y-1.5 whitespace-pre-line">
          {content}
        </div>
      </div>
    </section>
  );
}
