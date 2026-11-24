import { sanityImage } from './sanity';

// Minimal Portable Text → HTML for the article fields defined in
// studio/schemaTypes/richText.ts: paragraphs, h2/h3, quotes, bullet and
// numbered lists, bold, italic, links and photos.
type Span = { _type: 'span'; text: string; marks?: string[] };
type Block = {
  _type: 'block'; _key?: string; style?: string; listItem?: 'bullet' | 'number'; level?: number;
  children?: Span[]; markDefs?: { _key: string; _type: string; href?: string }[];
};
type ImageBlock = { _type: 'image'; asset?: { _ref: string }; alt?: string; caption?: string };
type Node = Block | ImageBlock | { _type: string };

const escape = (text: string) => text.replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

const safeHref = (href = '') => /^(https?:|mailto:|tel:|\/|#)/i.test(href.trim()) ? href.trim() : '#';

function inline(block: Block) {
  return (block.children ?? []).map(span => {
    let html = escape(span.text ?? '').replace(/\n/g, '<br>');
    for (const mark of span.marks ?? []) {
      if (mark === 'strong' || mark === 'em') html = `<${mark}>${html}</${mark}>`;
      else {
        const def = block.markDefs?.find(item => item._key === mark);
        if (def?._type === 'link') {
          const href = safeHref(def.href);
          const external = /^https?:/i.test(href);
          html = `<a href="${escape(href)}"${external ? ' rel="noopener"' : ''}>${html}</a>`;
        }
      }
    }
    return html;
  }).join('');
}

function image(node: ImageBlock) {
  if (!node.asset?._ref) return '';
  const { src, width, height } = sanityImage(node.asset._ref, 1200);
  const caption = node.caption ? `<figcaption>${escape(node.caption)}</figcaption>` : '';
  return `<figure><img src="${escape(src)}" width="${width}" height="${height}" alt="${escape(node.alt ?? '')}" loading="lazy" decoding="async">${caption}</figure>`;
}

export function portableTextToHtml(nodes: Node[] = []) {
  const out: string[] = [];
  // Stack of open lists, one per nesting level.
  const lists: string[] = [];
  const closeLists = (depth: number) => {
    while (lists.length > depth) out.push(`</li></${lists.pop()}>`);
  };

  for (const node of nodes) {
    if (node._type === 'block' && (node as Block).listItem) {
      const block = node as Block;
      const tag = block.listItem === 'number' ? 'ol' : 'ul';
      const level = Math.max(1, block.level ?? 1);
      closeLists(level);
      if (lists.length === level && lists[level - 1] !== tag) closeLists(level - 1);
      if (lists.length === level) out.push('</li>');
      while (lists.length < level) { out.push(`<${tag}>`); lists.push(tag); }
      out.push(`<li>${inline(block)}`);
      continue;
    }
    closeLists(0);
    if (node._type === 'block') {
      const block = node as Block;
      const tag = ({ h2: 'h2', h3: 'h3', blockquote: 'blockquote' } as Record<string, string>)[block.style ?? ''] ?? 'p';
      const content = inline(block);
      if (content.trim()) out.push(`<${tag}>${content}</${tag}>`);
    } else if (node._type === 'image') {
      out.push(image(node as ImageBlock));
    }
  }
  closeLists(0);
  return out.join('\n');
}
