# Reports

Every report reads the text of the active editor and opens its result as a new Markdown document. Your file is never changed and nothing is sent anywhere. The examples below come from the sample file (Open Sample File).

## Show Script Summary

Command: **NS Script Atlas: Show Script Summary**

Shows the API version, script type and module scope from the JSDoc header, how many modules the define call loads, and the names the script returns, and lists missing @NApiVersion or @NScriptType tags.

Example (sample file):

> # Script Summary
>
> | Item | Value |
> | --- | --- |
> | API version | 2.x |
> | Script type | UserEventScript |
> | Module scope | Public |
> | Modules | 5 |
> | Entry points | beforeLoad, afterSubmit, onSave |
>
> ## Header problems
>
> No header problems.

## Show Entry Point Check

Command: **NS Script Atlas: Show Entry Point Check**

Lists the official entry points of the script type with whether the file exports each one, names every exported function that is not an entry point of that type, and warns when no valid entry point is exported, which makes the upload fail.

Example (sample file):

> # Entry Points
>
> | Entry point | Exported |
> | --- | --- |
> | beforeLoad | yes |
> | beforeSubmit | no |
> | afterSubmit | yes |
>
> onSave is not an entry point of UserEventScript.

## Show Module Usage

Command: **NS Script Atlas: Show Module Usage**

Lists every module of the define call with the parameter it is bound to and whether that variable is used in the code (as variable. or variable(), outside comments and strings), and counts the unused modules.

Example (sample file):

> # Modules
>
> | Module | Variable | Used |
> | --- | --- | --- |
> | N/record | record | yes |
> | N/search | search | yes |
> | N/email | email | yes |
> | N/log | log | yes |
> | N/format | format | no |
>
> 1 unused module.

## Show Governance Risks (Pro)

Command: **NS Script Atlas: Show Governance Risks** (Pro; part of the 14-day trial)

Finds record, search, HTTP and e-mail calls inside for, while and do loops and inside forEach, each, map, filter and reduce callbacks, where every iteration uses governance units; SuiteScript 1.0 APIs (nlapi and nlobj); and run().each(), which stops after 4000 results (runPaged() does not). Comments and string contents are ignored.

Example (sample file):

> # Governance Risks
>
> 3 findings.
>
> | Line | Rule | Finding |
> | ---: | --- | --- |
> | 19 | loop_call | record.load inside a loop; every call uses governance units |
> | 24 | each_limit | run\(\).each\(\) stops after 4000 results; use runPaged\(\) for large searches |
> | 25 | loop_call | email.send inside a loop; every call uses governance units |

## Show Version Compatibility (Pro)

Command: **NS Script Atlas: Show Version Compatibility** (Pro; part of the 14-day trial)

For API version 2.0 or 2.x, which run on an ES5 engine, lists the first use of const, let, arrow functions, classes, template literals, async, await, spread and for...of, each of which needs @NApiVersion 2.1; and flags @NModuleScope Public, which lets other accounts load the module.

Example (sample file):

> # Version Compatibility
>
> 2 findings.
>
> | Line | Rule | Finding |
> | ---: | --- | --- |
> | 4 | module_scope | NModuleScope Public lets other accounts load this module; prefer SameAccount |
> | 29 | es2015 | const needs @NApiVersion 2.1 |
