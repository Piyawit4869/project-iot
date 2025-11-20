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
}: SectionWithImageProps) {
  const isleft = position === "left";
  const hasImage = Boolean(image);

  return (
    <section
      className={`
        flex flex-col lg:flex-row items-center mt-16 gap-10
        text-gray-900 dark:text-sidebar-foreground
        ${isleft ? "" : "lg:flex-row-reverse"}
      `}
    >
      {hasImage && (
        <div
          className={`flex-1 flex ${
            isleft ? "justify-start" : "justify-end"
          }`}
        >
          {typeof image === "string" ? (
            <img
              src={image}
              alt=""
              className="w-40 lg:w-70 object-contain lg:mx-6"
            />
          ) : (
            image
          )}
        </div>
      )}

      <div
        className={`
          flex-1 space-y-4 max-w-[80%]
          ${
            !hasImage
              ? isleft
                ? "lg:text-left"
                : "lg:text-left lg:pl-[21.5%]"
              : ""
          }
        `}
      >
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-sidebar-foreground">
          {title}
        </h2>

        <div className="text-gray-600 dark:text-muted-foreground leading-relaxed space-y-2 whitespace-pre-line">
          {content}
        </div>
      </div>
    </section>
  );

}
