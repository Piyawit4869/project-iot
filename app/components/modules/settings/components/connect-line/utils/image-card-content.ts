type LineFlex = any;

export function buildImageCardBody(input: any): LineFlex {
  const p = input.image;
  const heroContents: any[] = [];

  heroContents.push({
    type: "image",
    url: p.imageUrl,
    size: "full",
    aspectMode: "cover",
    aspectRatio: "1:1",
  });

  if (
    p.tagEnabled &&
    typeof p.tagText === "string" &&
    p.tagText.trim() !== ""
  ) {
    heroContents.push({
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: p.tagText.trim(),
          size: "xxs",
          color: "#ffffff",
          align: "center",
        },
      ],

      position: "absolute",
      offsetTop: "10px",
      offsetStart: "10px",
      paddingAll: "4px",
      cornerRadius: "999px",
      backgroundColor: p.tagColor || "#4B5D73",
    });
  }

  if (
    p.actionEnabled &&
    typeof p.actionText === "string" &&
    p.actionText.trim() !== ""
  ) {
    heroContents.push({
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: p.actionText.trim(),
          size: "sm",
          color: "#ffffff",
          align: "center",
          weight: "bold",
        },
      ],

      position: "absolute",
      offsetStart: "10px",
      offsetEnd: "10px",
      offsetBottom: "10px",
      paddingAll: "8px",
      cornerRadius: "999px",
      backgroundColor: "#1f2937",
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
          hero: {
            type: "box",
            layout: "vertical",
            paddingAll: "0px",
            contents: heroContents,
          },
          body: {
            type: "box",
            layout: "vertical",
            paddingAll: "0px",
            contents: [],
          },
          footer: {
            type: "box",
            layout: "vertical",
            paddingAll: "0px",
            contents: [],
          },
        },
      ],
    },
  };

  return card;
}
