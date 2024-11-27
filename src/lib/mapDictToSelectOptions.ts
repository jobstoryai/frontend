const entryMapper = ([k, v]: [k: string, v: string]) => ({ value: k, label: v})

export const mapDictToSelectOptions = (dict: Record<string, string>) => {
  return Object.entries(dict).map(entryMapper)
}
