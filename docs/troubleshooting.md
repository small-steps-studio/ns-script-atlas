# Troubleshooting

## The report says the file is not valid

NS Script Atlas reads SuiteScript 2.x: a file with a JSDoc header that contains @NApiVersion, or with a define( call. Other JavaScript files are reported as not being SuiteScript 2.x scripts. Comments and the contents of strings and template literals are ignored by the code checks, so a word inside a string is never reported.

## The file is too large

Reports read files up to the size set in `nsScriptAtlas.maxFileSizeMB` (50 MB by default and at most). VS Code passes files only up to 50 MB to extensions, so a larger file cannot be read by any extension: split it, or save a shorter one.

## The preview does not open

The report always opens as a Markdown document. If the preview stays closed, set `nsScriptAtlas.openReportsAsPreview` to true and check that the built-in Markdown extension is enabled.

## Pro or the trial does not unlock

Run **NS Script Atlas: Show Licence Status**. It tells whether a key is stored, whether it was checked, and how many trial days are left. Details are in [licence.md](licence.md).

## Something else

Run **NS Script Atlas: Report A Problem**. It copies a diagnostics block (versions, settings, licence state; no file contents) and opens the issues page.
