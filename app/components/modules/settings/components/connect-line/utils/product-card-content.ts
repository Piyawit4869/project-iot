type LineFlex = any;

function buildCurrencyText(currency: string, price: string): string {
  switch (currency) {
    case "THB":
      return `฿${price}`;
    default:
      return `${currency} ${price}`;
  }
}

export function buildProductCardBody(input: any): LineFlex {
  const p = input.product;
  const heroContents: any[] = [
    {
      type: "image",
      url: p.imageUrl,
      size: "full",
      aspectMode: "cover",
      aspectRatio: "20:13",
    },
  ];

  if (p.tagEnabled && p.tagText) {
    heroContents.push({
      type: "box",
      layout: "vertical",
      position: "absolute",
      offsetTop: "10px",
      offsetStart: "10px",
      paddingAll: "4px",
      cornerRadius: "999px",
      backgroundColor: p.tagColor || "#444444",
      contents: [
        {
          type: "text",
          text: p.tagText,
          size: "xxs",
          align: "center",
          color: "#ffffff",
        },
      ],
    });
  }

  // footer buttons
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

  const priceText =
    p.priceEnabled && p.price ? buildCurrencyText(p.currency, p.price) : "";

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
          hero: {
            type: "box",
            layout: "vertical",
            paddingAll: "0px",
            contents: heroContents,
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: p.title,
                weight: "bold",
                size: "xl",
                align: "start",
              },
              ...(p.description
                ? [
                    {
                      type: "text",
                      text: p.description,
                      size: "sm",
                      color: "#aaaaaa",
                    },
                  ]
                : []),
              ...(priceText
                ? [
                    {
                      type: "text",
                      text: priceText,
                      weight: "bold",
                      size: "sm",
                      align: "end",
                    },
                  ]
                : []),
            ],
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
