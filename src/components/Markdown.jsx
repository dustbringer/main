// Original code from https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef
import React from "react";
import styled, { css } from "styled-components";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import RemarkGFMPlugin from "remark-gfm";
import RemarkFrontmatterPlugin from "remark-frontmatter";

// react-katex
// import { InlineMath, BlockMath } from "react-katex";

/* @matejmazur/react-katex */
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css"; // styling math symbols to look like latex

import { GlobalContext } from "../GlobalContext";
import MarkdownContents from "./MarkdownContents";
import HeadingRenderer from "./mdRenderers/Heading";
import YamlRenderer from "./mdRenderers/Yaml";
import BlockCodeRenderer from "./mdRenderers/BlockCode";
import InlineCodeRenderer from "./mdRenderers/InlineCode";
import BlockQuoteRenderer from "./mdRenderers/BlockQuote";
import ImageRenderer from "./mdRenderers/Image";
import LinkRenderer from "./mdRenderers/Link";
import TableRenderer from "./mdRenderers/Table";
import TableHeadRenderer from "./mdRenderers/TableHead";
import TableRowRenderer from "./mdRenderers/TableRow";
import TableCellRenderer from "./mdRenderers/TableCell";
import ListItemRenderer from "./mdRenderers/ListItem";
import HorizontalRuleRenderer from "./mdRenderers/HorizontalRule";

const FormatDiv = styled.div`
  font-family: "Open Sans", "Roboto", "Helvetica", "Arial", "sans-serif";
  font-size: 16px;
  display: flex;
  flex-direction: row;
`;

/* 
 * Break text so it doesnt overflow in div
 * https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
 */
const breakText = css`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

/*
 * NOTES
 *     white-space is for single new lines to be registered
 */
const MarkdownFormatDiv = styled.div`
  width: 100%;
  white-space: pre-line;
  ${breakText};
`;

/**
 * Default Renderers
 * https://github.com/remarkjs/react-markdown/blob/main/src/renderers.js
 *
 * Some Reference Renderers:
 * https://github.com/robinweser/react-markdown-github-renderers
 *
 * Check the code for the different renderers that this is missing
 * - also place renderers in their own folder
 */

// Plugins: https://github.com/remarkjs/remark/blob/main/doc/plugins.md
const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin, RemarkGFMPlugin, RemarkFrontmatterPlugin],
  renderers: {
    ...props.renderers,

    thematicBreak: HorizontalRuleRenderer,
    heading: HeadingRenderer,
    yaml: YamlRenderer,
    inlineCode: InlineCodeRenderer,
    code: BlockCodeRenderer,
    image: ImageRenderer,
    blockquote: BlockQuoteRenderer,
    link: LinkRenderer,
    table: TableRenderer,
    tableHead: TableHeadRenderer,
    tableRow: TableRowRenderer,
    tableCell: TableCellRenderer,
    listItem: ListItemRenderer,

    math: ({ value }) => <TeX block>{value}</TeX>,
    inlineMath: ({ value }) => <TeX>{value}</TeX>,
  },
});

const Markdown = (props) => {
  const context = React.useContext(GlobalContext);
  const { MdHeadings } = context;
  const [headings, setMdHeadings] = MdHeadings;

  React.useEffect(() => {
    return () => {
      setMdHeadings([]);
    };
  }, [setMdHeadings]);

  return (
    <FormatDiv>
      <div>
        {/* See MarkdownContents.jsx for drawbacks of these contents*/}
        <MarkdownContents headings={headings} />
      </div>

      {/* ReactMarkdown renders multiple ungrouped components */}
      <MarkdownFormatDiv>
        <ReactMarkdown {..._mapProps(props)} />
      </MarkdownFormatDiv>
    </FormatDiv>
  );
};

export default Markdown;
