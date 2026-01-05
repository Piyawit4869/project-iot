type LineFlex = any;

function buildIcon(extraInfoType?: string): string {
  switch (extraInfoType) {
    case "time":
      return "https://storage.googleapis.com/utotech-storage/clock-3-067aaa34a0134526a2972a4e3c7d9f6d/446673.svg";
    case "phone":
      return "https://storage.googleapis.com/utotech-storage/phone-call-070bc4ba12d04109a055dce66c5b0d3d/743366.svg";
    case "custom":
      return "https://storage.googleapis.com/utotech-storage/info-7605446042864dcda26816d0361e4563/279241.svg";
    default:
      return "";
  }
}

export function buildPlaceCardBody(input: any): LineFlex {
  const p = input.place;

  const heroContents: any[] = [];

  if (p.imageUrl) {
    heroContents.push({
      type: "image",
      url: p.imageUrl,
      size: "full",
      aspectMode: "cover",
      aspectRatio: "1:1",
    });
  }

  if (p.tagEnabled && typeof p.tagText === "string" && p.tagText.trim()) {
    heroContents.push({
      type: "box",
      layout: "vertical",
      position: "absolute",
      offsetTop: "10px",
      offsetStart: "10px",
      paddingAll: "4px",
      cornerRadius: "999px",
      backgroundColor: p.tagColor || "#4B5D73",
      contents: [
        {
          type: "text",
          text: p.tagText.trim(),
          size: "xxs",
          color: "#ffffff",
          align: "center",
        },
      ],
    });
  }

  const bodyContents: any[] = [];

  if (p.title) {
    bodyContents.push({
      type: "text",
      text: p.title,
      weight: "bold",
      size: "xl",
      align: "start",
    });
  }

  if (p.addressText) {
    bodyContents.push({
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          type: "icon",
          url: "https://storage.googleapis.com/utotech-storage/map-pin-29bd8410a8a04546a61c7cec4ea25b59/516231.svg",
          size: "sm",
        },
        {
          type: "text",
          text: p.addressText,
          size: "sm",
          color: "#aaaaaa",
          wrap: true,
        },
      ],
    });
  }

  const extraIcon = buildIcon(p.extraInfoType);
  if (extraIcon && p.extraInfoValue) {
    bodyContents.push({
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          type: "icon",
          url: extraIcon,
          size: "sm",
        },
        {
          type: "text",
          text: p.extraInfoValue,
          size: "sm",
          color: "#aaaaaa",
          wrap: true,
        },
      ],
    });
  }

  const footerContents: any[] = [];

  if (p.ctaPrimaryEnabled && p.ctaPrimaryText) {
    footerContents.push({
      type: "button",
      style: "link",
      height: "sm",
      action: {
        type: "uri",
        label: p.ctaPrimaryText,
        uri: "https://line.me/",
      },
    });
  }

  if (p.ctaSecondaryEnabled && p.ctaSecondaryText) {
    footerContents.push({
      type: "button",
      style: "link",
      height: "sm",
      action: {
        type: "uri",
        label: p.ctaSecondaryText,
        uri: "https://line.me/",
      },
    });
  }

  const card: LineFlex = {
    active: true,
    name: input.name,
    description: p.description || "",
    type: "card",
    isFavorite: false,
    content: {
      type: "carousel",
      contents: [
        {
          type: "bubble",

          ...(heroContents.length > 0 && {
            hero: {
              type: "box",
              layout: "vertical",
              paddingAll: "0px",
              contents: heroContents,
            },
          }),

          body: {
            type: "box",
            layout: "vertical",
            contents: bodyContents,
          },

          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: footerContents,
          },
        },
      ],
    },
  };

  return card;
}
