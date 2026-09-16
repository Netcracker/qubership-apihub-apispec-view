import { MenuActionItem, MenuItems } from '@stoplight/mosaic';

/**
 * `MenuItems` also allows dividers, groups and falsy entries, none of which carry an `id`.
 * Destructuring them as `MenuActionItem` would crash on `null` and render `<option>` without a value.
 *
 * The presence of `id` is checked rather than its type: some call sites pass numeric ids.
 */
export const isSelectableMenuItem = (item: MenuItems[number]): item is MenuActionItem =>
  !!item && typeof item === 'object' && 'id' in item;
