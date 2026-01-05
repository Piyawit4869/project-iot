import {
  DecoratorNode,
  type SerializedLexicalNode,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
} from "lexical";
import type { JSX } from "react";

type SerializedImageNode = {
  src: string;
  type: "image";
  version: 1;
} & SerializedLexicalNode;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;

  static getType() {
    return "image";
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__key);
  }

  constructor(src: string, key?: NodeKey) {
    super(key);
    this.__src = src;
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): false {
    return false;
  }

  decorate() {
    return <img src={this.__src} className="max-w-full rounded-md" alt="" />;
  }

  static importJSON(serializedNode: SerializedImageNode) {
    return new ImageNode(serializedNode.src);
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      src: this.__src,
      version: 1,
    };
  }
}

export function $createImageNode(src: string) {
  return new ImageNode(src);
}

export function $isImageNode(node: LexicalNode | null): node is ImageNode {
  return node instanceof ImageNode;
}
