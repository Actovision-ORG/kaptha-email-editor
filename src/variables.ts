/**
 * Variable system — public types and utilities for the wrapper package.
 *
 * This wrapper loads the editor core from the CDN as a runtime global, so it
 * cannot import the core's implementation at build time. These pure, dependency
 * free helpers are therefore defined here and kept intentionally identical to
 * the core's `utils/variables` so consumers get the same behaviour whether they
 * format/replace variables in the browser or in a Node send pipeline.
 *
 * A "variable" is a user-defined personalization token. Consumers supply the
 * human-readable `label` and the raw `value` (the key WITHOUT delimiters, e.g.
 * "user.name"); the builder wraps `value` into `{{value}}` internally.
 */

/** Opening delimiter of a rendered variable placeholder. */
export const VARIABLE_START = "{{";

/** Closing delimiter of a rendered variable placeholder. */
export const VARIABLE_END = "}}";

/**
 * A user-defined variable.
 * - `label`: human-readable text shown in the picker (e.g. "User Name").
 * - `value`: raw key without delimiters (e.g. "user.name").
 */
export interface EmailBuilderVariable {
  label: string;
  value: string;
}

/**
 * Wrap a raw variable key into its placeholder form.
 *
 * @example
 * formatEmailBuilderVariable("user.name"); // => "{{user.name}}"
 */
export const formatEmailBuilderVariable = (value: string): string =>
  `${VARIABLE_START}${value}${VARIABLE_END}`;

/** Escape a string for safe use inside a `RegExp`. */
const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Replace every supplied variable placeholder in `data` with its value.
 *
 * Works on plain text or generated HTML (it only rewrites the `{{key}}`
 * placeholders, so surrounding HTML structure is preserved). Variables not
 * present in `replaceValues` are left untouched, and all replacements happen
 * in a single call.
 *
 * @param data - Plain text or HTML that may contain `{{key}}` placeholders.
 * @param replaceValues - Tuples of `[variableKey, replacementValue]`.
 * @returns `data` with all matching placeholders replaced.
 *
 * @example
 * replaceEmailBuilderVariable(html, [
 *   ["user.name", "John Doe"],
 *   ["company.name", "Kaptha"],
 * ]);
 */
export const replaceEmailBuilderVariable = (
  data: string,
  replaceValues: Array<[string, string]>,
): string => {
  if (!data || !Array.isArray(replaceValues) || replaceValues.length === 0) {
    return data;
  }

  let result = data;
  for (const entry of replaceValues) {
    if (!Array.isArray(entry)) continue;
    const [key, replacement] = entry;
    if (!key) continue;

    const placeholder = formatEmailBuilderVariable(key);
    const pattern = new RegExp(escapeRegExp(placeholder), 'g');
    // Replacer function inserts the replacement literally (no `$&`/`$1`
    // interpretation) and never touches unrelated text.
    result = result.replace(pattern, () => replacement ?? '');
  }
  return result;
};
