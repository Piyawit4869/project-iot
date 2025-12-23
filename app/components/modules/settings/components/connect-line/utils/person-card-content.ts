type LineFlex = any;

function buildTags(tags: any[]) {
  const result = {
    type: "box",
    layout: "horizontal",
    spacing: "sm", // space between the two pills
    margin: "md", // space above this whole group
    contents: [
      {
        type: "box",
        layout: "horizontal",
        paddingAll: "4px",
        cornerRadius: "999px",
        backgroundColor: "#444444",
        width: "60px",
        contents: tags.map((p) => {
          return {
            type: "box",
            layout: "horizontal",
            paddingAll: "4px",
            cornerRadius: "999px",
            backgroundColor: p.color,
            width: "60px",
            contents: [
              {
                type: "text",
                text: p.text,
                size: "xxs",
                align: "center",
                color: "#ffffff",
              },
            ],
          };
        }),
      },
    ],
  };

  return result;
}

export function buildPersonCardBody(input: any): LineFlex {
  const p = input.person;

  // footer buttons
  let footerContents: any[] = [];
  if (p.actions) {
    footerContents = p.actions
      .filter((d: any) => d.enabled === true)
      .map((dd: any) => {
        return {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "uri",
            label: dd.text,
            uri: "https://line.me/",
          },
        };
      });
  }

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
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: p.imageUrl,
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "1:1",
                  },
                ],
                cornerRadius: "xxl",
              },
              {
                size: "xl",
                text: "ddd", //!! FIXME: SEND IT
                type: "text",
                align: "start",
                weight: "bold",
              },
              {
                type: "box",
                layout: "horizontal",
                margin: "md",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    width: "60px",
                    layout: "horizontal",
                    contents: [
                      {
                        size: "xxs",
                        text: "p.text",
                        type: "text",
                        align: "center",
                        color: "#ffffff",
                      },
                    ],
                    paddingAll: "4px",
                    cornerRadius: "999px",
                    backgroundColor: "#444444",
                  },
                  {
                    type: "box",
                    width: "60px",
                    layout: "horizontal",
                    contents: [
                      {
                        size: "xxs",
                        text: p.description, //FIXME: SEND IT
                        type: "text",
                        align: "center",
                        color: "#ffffff",
                      },
                    ],
                    paddingAll: "4px",
                    cornerRadius: "999px",
                    backgroundColor: "#444444",
                  },
                ],
                justifyContent: "center",
              },
            ],
            alignItems: "center",
          },

          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    action: {
                      uri: "https://line.me/",
                      type: "uri",
                      label: "โทรหาคุณ{ชื่อ}",
                    },
                    height: "sm",
                  },
                  {
                    type: "button",
                    style: "link",
                    action: {
                      uri: "https://line.me/",
                      type: "uri",
                      label: "ส่งอีเมลล์",
                    },
                    height: "sm",
                  },
                ],
                alignItems: "center",
              },
            ],
          },
        },
      ],
    },
  };

  return card;
}
