import ReactLinkify from "react-linkify";

export function MessageText({ text }: { text: string }) {
  return (
    <ReactLinkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          href={decoratedHref}
          key={key}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {decoratedText}
        </a>
      )}
    >
      {text}
    </ReactLinkify>
  );
}
