type LineFlex = any;

export function buildImageCardBody(input: any): LineFlex {
  const p = input.image;
  const heroContents: any[] = [];

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
        type: "image",
        url: p.imageUrl,
        size: "full",
        aspectMode: "cover",
        aspectRatio: "20:13",
      },
      {
        type: "box",
        layout: "vertical",
        position: "absolute",
        offsetTop: "10px",
        offsetStart: "10px",
        paddingAll: "4px",
        cornerRadius: "999px",
        backgroundColor: "#4B5D73",
        contents: [
          {
            type: "text",
            text: "xxx",
            size: "xxs",
            align: "center",
            color: "#ffffff",
          },
        ],
      },
    ],
  });

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
            contents: [],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [],
          },
        },
      ],
    },
  };

  return card;
}
