import { describe, it, expect } from 'vitest';
import { stripMarkdown } from './strip-markdown';

describe('stripMarkdown', () => {
  it('removes headers', () => {
    expect(stripMarkdown('# Header 1')).toBe('Header 1');
    expect(stripMarkdown('## Header 2')).toBe('Header 2');
    expect(stripMarkdown('### Header 3')).toBe('Header 3');
  });

  it('removes emphasis', () => {
    expect(stripMarkdown('**bold**')).toBe('bold');
    expect(stripMarkdown('*italic*')).toBe('italic');
    expect(stripMarkdown('__bold__')).toBe('bold');
    expect(stripMarkdown('_italic_')).toBe('italic');
    expect(stripMarkdown('~~strike~~')).toBe('strike');
  });

  it('removes links and images', () => {
    expect(stripMarkdown('[text](url)')).toBe('text');
    expect(stripMarkdown('![alt](img.png)')).toBe('alt');
  });

  it('removes code blocks and inline code', () => {
    expect(stripMarkdown('```js\ncode\n```')).toBe('');
    expect(stripMarkdown('`inline`')).toBe('inline');
  });

  it('removes blockquotes', () => {
    expect(stripMarkdown('> quote')).toBe('quote');
  });

  it('removes lists (default: markers removed)', () => {
    expect(stripMarkdown('- item')).toBe('item');
    expect(stripMarkdown('* item')).toBe('item');
    expect(stripMarkdown('1. item')).toBe('item');
  });

  it('preserves list markers when configured', () => {
    expect(stripMarkdown('- item', { unorderedListMarkers: false })).toBe(
      '- item',
    );
    expect(stripMarkdown('* item', { unorderedListMarkers: false })).toBe(
      '* item',
    );
    expect(stripMarkdown('1. item', { orderedListMarkers: false })).toBe(
      '1. item',
    );
  });

  it('removes horizontal rules', () => {
    expect(stripMarkdown('---')).toBe('');
    expect(stripMarkdown('***')).toBe('');
    expect(stripMarkdown('___')).toBe('');
  });

  it('handles mixed markdown', () => {
    const md = `# Title\n\n**Bold** and _italic_ [link](url)\n\n- List\n- Items\n\n## Second Headline\n\n1. Numbered\n2. List\n\n> Blockquote\n\n\`code\``;
    expect(
      stripMarkdown(md, {
        orderedListMarkers: false,
        unorderedListMarkers: false,
        extraNewlines: false,
      }),
    ).toBe(
      'Title\n\nBold and italic link\n\n- List\n- Items\n\nSecond Headline\n\n1. Numbered\n2. List\n\nBlockquote\n\ncode',
    );
  });
});
