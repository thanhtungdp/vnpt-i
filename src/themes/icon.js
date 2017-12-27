import React from 'react'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left'
import EmojiFoodIcon from '@atlaskit/icon/glyph/emoji/food'
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent'
import MapLocation from '@atlaskit/icon/glyph/location'
import SwitcherIcon from '@atlaskit/icon/glyph/switcher';
import DecisionIcon from '@atlaskit/icon/glyph/decision'
import PdfIcon from '@atlaskit/icon/glyph/pdf'

export default {
  map: <MapLocation label="" />,
  landFill: <EmojiFoodIcon label="" />,
  transport: <SwitcherIcon label="" />,
  appointment: <EmojiFrequentIcon label="" />,
  direction: <DecisionIcon label="" />,
  organization: <PdfIcon label=""/>,
  car: <PdfIcon label=""/>,
  list: <EditorAlignLeftIcon label="" />,
  create: <EditorAddIcon label="" />
}
