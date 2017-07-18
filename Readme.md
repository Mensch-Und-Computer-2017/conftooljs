# conftooljs

A Node.js api wrapper and toolkit to work with [ConfTool](http://www.conftool.net/index.html). 

## Install

This library is currently not directly available from NPM. To install as a local dependency run `npm install https://github.com/Mensch-Und-Computer-2017/conftooljs`. In order to use the library you will need an api key and the url to the REST endpoint of your ConfTool instance. Please refer to the [documentation](https://www.conftool.net/ctforum/index.php?topic=280.0), to obtain these values.

## Usage

**Add the libray to your script** 

``` 
const ConfTool = require('conftooljs');
```

### Export data from ConfTool

**Create an API-Client**

```
var conftool = new ConfTool.Client({
      apiKey: API_KEY,
      baseUrl: API_URL
	});
``` 

**Download submission data**

```
conftool.downloadSubmissions(options).then(function(result) {
    // the api response is stored in results
  });

``` 

`downloadSubmission` returns a Promise and expects a parameter object (`options`) including two properties:

| Property 				| Values 												| Description							|
|-----------------------|-------------------------------------------------------|---------------------------------------|
| form_export_format 	| String: xml, xml_short, csv_comma, csv_semicolon, xls | Export format 						|
| extended 				| Array of Strings										| Additional api options (see below)	|


## ConfTool REST API

This library uses ConfTools REST API which is documented [here](https://www.conftool.net/ctforum/index.php?topic=280.0). Some options are not explained very well in that official documentation. Here are some additional information, extracted from the HTML Form used in ConfTools web interface.


### URLs and parameters for downloading paper information (extracted from ConfTool website)

Base URL for all calls: https://www.conftool.com/{{conference}}/rest.php?

| Action													| Required? | Option 								| Type 			| Allowed values									|
|-----------------------------------------------------------|-----------|---------------------------------------|---------------|---------------------------------------------------|
| Action (fixed value)										| yes		| page									| String		| adminExport										|
| Data to be exported										| yes		| export_select*						| String        | papers											|
| Add rows for each author in extended format 				| optional 	| form_export_papers_options%5B%5D		| String		| authors_extended 									|
| Add * (star) behind presenting author						| optional 	| form_export_papers_options%5B%5D 		| String		| authors_extended_presenters						|
| List name, organization and email in separate rows		| optional 	| form_export_papers_options%5B%5D		| String		| authors_extended_columns							|
| Add paper abstracts	to export							| optional 	| form_export_papers_options%5B%5D		| String		| abstracts											|
| Add paper reviews to export (may take a while)			| optional 	| form_export_papers_options%5B%5D		| String		| reviews 											|
| Add info about corresponding session to export			| optional 	| form_export_papers_options%5B%5D		| String		| session 											|
| Add links to uploaded files	to export					| optional 	| form_export_papers_options%5B%5D		| String		| downloads                         				|
| Add submitting author info to export						| optional 	| form_export_papers_options%5B%5D		| String		| submitter											|
| List multiple authors and organizations in seperate lines	| optional 	| form_export_papers_options%5B%5D		| String		| newlines											|
| Probably a filter?										| optional 	| form_track							| ?				| ?													|
| Probably a filter?										| optional 	| form_status							| ? 			| ?													|
| Probably a filter?										| optional 	| form_personType						| ? 			| ?													|
| Probably a filter?										| optional 	| form_event							| ?				| ?													|
| Probably a filter?										| optional 	| form_notpaid							| ? 			| ?													|
| Probably a filter?										| optional 	| form_lastupdate						| ? 			| ?													|
| Probably a filter?										| optional 	| form_paymethod						| ? 			| ?													|
| Include deleted items										| yes		| form_include_deleted					| Integer		| 0,1 (used as Booleans)							|
| Output format												| yes		| form_export_format 					| String 		| xml, xml_short, csv_comma, csv_semicolon, xls 	|
| Include header in output 									| yes		| form_export_header					| String		| default 											|
| Export (fixed value)										| yes		| cmd_create_export						| String		| true												|


* Other values can be used to access differnent data: invitations, authors, subsumed_authors, topics, reviews, reviewers, sessions, participants, nametags, identities, event_participants, payments, identities