import {
  CmdEnd,
  CmdStart,
  ElseKey,
  IfEndKey,
  IfKey,
  KarolPrefix,
  RepeatAlwaysKey,
  RepeatEnd,
  RepeatStart,
  RepeatTimesKey,
  RepeatWhileKey,
  Return,
  ThenKey,
} from './parser.terms'

export function keywords(input: string) {
  if (/^(return)$/i.test(input)) return Return
  if (/^(wiederhole)$/i.test(input)) return RepeatStart
  if (/^((ende|\*)wiederhole)$/i.test(input)) return RepeatEnd
  if (/^(solange)$/i.test(input)) return RepeatWhileKey
  if (/^(mal)$/i.test(input)) return RepeatTimesKey
  if (/^(immer)$/i.test(input)) return RepeatAlwaysKey
  if (/^(wenn)$/i.test(input)) return IfKey
  if (/^(dann)$/i.test(input)) return ThenKey
  if (/^((ende|\*)wenn)$/i.test(input)) return IfEndKey
  if (/^(sonst)$/i.test(input)) return ElseKey
  if (/^(Anweisung)$/i.test(input)) return CmdStart
  if (/^((ende|\*)(Anweisung))$/i.test(input)) return CmdEnd
  if (/^(karol)/i.test(input)) return KarolPrefix

  return -1
}