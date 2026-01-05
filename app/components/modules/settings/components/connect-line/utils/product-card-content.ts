import { hasText } from "~/utils/line-card-content-check-text";

type LineFlex = any;

function buildCurrencyText(currency: string, price: string): string {
  if (!hasText(price)) return "";
  switch (currency) {
    case "THB":
      return `฿${price}`;
    default:
      return `${currency} ${price}`;
  }
}

export function buildProductCardBody(input: any): LineFlex {
  const p = input.product;

  const heroContents: any[] = [];

  if (hasText(p.imageUrl)) {
    heroContents.push({
      type: "image",
      url: p.imageUrl,
      size: "full",
      aspectMode: "cover",
      aspectRatio: "1:1",
    });
  }

  if (p.tagEnabled && hasText(p.tagText)) {
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
          text: p.tagText,
          size: "xxs",
          color: "#ffffff",
          align: "center",
        },
      ],
    });
  }

  const bodyContents: any[] = [];

  if (hasText(p.title)) {
    bodyContents.push({
      type: "text",
      text: p.title,
      weight: "bold",
      size: "xl",
      wrap: true,
    });
  }

  if (hasText(p.description)) {
    bodyContents.push({
      type: "text",
      text: p.description,
      size: "sm",
      color: "#aaaaaa",
      wrap: true,
      margin: "sm",
    });
  }

  if (p.priceEnabled && hasText(p.price)) {
    bodyContents.push({
      type: "text",
      text: buildCurrencyText(p.currency, p.price),
      weight: "bold",
      size: "sm",
      align: "end",
      margin: "md",
    });
  }

  const footerContents: any[] = [];

  if (p.ctaPrimaryEnabled && hasText(p.ctaPrimaryText)) {
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

  if (p.ctaSecondaryEnabled && hasText(p.ctaSecondaryText)) {
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
    description: hasText(p.description) ? p.description : "",
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
