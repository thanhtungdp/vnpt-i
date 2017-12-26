import React from 'react'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left'
import EmojiFoodIcon from '@atlaskit/icon/glyph/emoji/food'
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent'
import MapLocation from '@atlaskit/icon/glyph/location'
import DecisionIcon from '@atlaskit/icon/glyph/decision'
import PdfIcon from '@atlaskit/icon/glyph/pdf'
import PageIcon from '@atlaskit/icon/glyph/page'

export default {
  map: <MapLocation label="" />,
  landFill: <EmojiFoodIcon label="" />,
  transport: <PdfIcon label="" />,
  appointment: <EmojiFrequentIcon label="" />,
  direction: <DecisionIcon label="" />,
  categories: <PageIcon label="" />,
  list: <EditorAlignLeftIcon label="" />,
  create: <EditorAddIcon label="" />
}
