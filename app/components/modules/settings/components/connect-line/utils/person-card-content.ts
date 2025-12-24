import { hasText } from "~/utils/line-card-content-check-text";

type LineFlex = any;

function buildTags(tags: any[]) {
  const enabledTags = (tags ?? []).filter(
    (t) => t.enabled === true && hasText(t.text)
  );

  if (enabledTags.length === 0) return null;

  return {
    type: "box",
    layout: "horizontal",
    spacing: "sm",
    margin: "md",
    contents: enabledTags.map((t) => ({
      type: "box",
      layout: "horizontal",
      paddingAll: "4px",
      cornerRadius: "999px",
      backgroundColor: t.color || "#444444",
      contents: [
        {
          type: "text",
          text: t.text,
          size: "xxs",
          color: "#ffffff",
        },
      ],
    })),
  };
}

export function buildPersonCardBody(input: any): LineFlex {
  const p = input.person;

  const bodyContents: any[] = [];

  if (hasText(p.imageUrl)) {
    bodyContents.push({
      type: "box",
      layout: "vertical",
      cornerRadius: "18px",
      contents: [
        {
          type: "image",
          url: p.imageUrl,
          size: "full",
          aspectMode: "cover",
          aspectRatio: "20:13",
        },
      ],
    });
  }

  if (hasText(p.name)) {
    bodyContents.push({
      type: "text",
      text: p.name,
      size: "xl",
      weight: "bold",
      margin: "md",
    });
  }

  if (p.descriptionEnabled && hasText(p.description)) {
    bodyContents.push({
      type: "text",
      text: p.description,
      size: "sm",
      wrap: true,
      margin: "sm",
    });
  }

  const tagsBox = buildTags(p.tags);
  if (tagsBox) {
    bodyContents.push(tagsBox);
  }

  const footerContents =
    p.actions
      ?.filter((a: any) => a.enabled === true && hasText(a.text))
      .map((a: any) => ({
        type: "button",
        style: "link",
        height: "sm",
        action: {
          type: "uri",
          label: a.text,
          uri: "https://line.me/",
        },
      })) ?? [];

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
          body: {
            type: "box",
            layout: "vertical",
            contents: bodyContents,
            alignItems: "center",
          },
          ...(footerContents.length > 0 && {
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: footerContents,
            },
          }),
        },
      ],
    },
  };

  return card;
}
