import Parser from "rss-parser";
import { WebhooksSendMessage, webhooksSendMessage } from "webhooks-simpleing";

const replaceHTMLCode = (text: string) => {
  const textData = text.length > 100 ? text.substring(0, 99) + "..." : text;
  return textData.replace(/&quot;/g, '"');
};

export interface GeekNewsRSSType {
  url: string;
  htmlParser?: string;
  jandi?: string[];
}

export const geekNewsRSS = async ({
  url,
  htmlParser,
  jandi,
}: GeekNewsRSSType) => {
  const parser = new Parser();

  const isJandi = !!jandi && jandi.length > 0;

  let text = "";
  let now = new Date().getTime();

  let feed = await parser.parseURL(url);

  feed.items.forEach((item, index) => {
    if (
      now - new Date(item.pubDate as string).getTime() <
      60 * 60 * 24 * 1000
    ) {
      if (htmlParser) {
        text +=
          (index > 0 ? "<br/><br/>" : "") +
          `<div><a href=${item.link}>*${item.title}*></a><br/><div>${
            item.content
              ? replaceHTMLCode(
                  item.content
                    .replace(/<[^>]*>/g, "")
                    .trim()
                    .replace(/\n/g, "<br/>")
                ) + "<br/>"
              : "no content"
          }</div></div>`;
      } else {
        text +=
          (index > 0 ? "\n\n\n\n" : "") +
          `<${item.link}  |*  ${item.title}*>\n${
            item.content
              ? replaceHTMLCode(item.content.replace(/<[^>]*>/g, "").trim()) +
                "\n"
              : "no content"
          }`;
      }
    }
  });

  const trimText = text.trim();

  if (isJandi) {
    webhooksSendMessage({
      type: "jandi",
      urlType: jandi,
      title: "New Feed",
      content: trimText,
    } as WebhooksSendMessage);
    return;
  }

  return trimText;
};
