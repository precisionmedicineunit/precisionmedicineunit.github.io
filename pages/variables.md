---
layout: default
title: Variables
nav_order: 5
---

# Variables
<!-- {: .no_toc } -->
<!-- <details open markdown="block"> -->
<!--   <summary> -->
<!--     Table of contents -->
<!--   </summary> -->
<!--   {: .text-delta } -->
<!-- - TOC -->
<!-- {:toc} -->
<!-- </details> -->

---


* For each script, shared variables will be sourced from the variables file.
* Each pipeline can have its own custom variables file which will be sourced in its entirety or selectively from the master.
* The variables file contains entries such as:

```
DATABASE="./sph/database/"
REF_GRCh38="${DATABASE}/ref/grch38/GCA_000001405.15_GRCh38_no_alt_analysis_set.fna.gz"
```

* For all new permanent datasets, tools, etc. we add it to the index table.
* We will assign the locations for all shared datasets, tools, etc.
* See [annotation table](annotation_table) for the list of datasets. (This will be updated to include varaibles.)

{: .note }
We will automatically generate the master variables file from the index table which contains meta data about dates, versions, application, etc. for each of the tools, databases, etc. Therefore, the only manual curation required is for the index table, rather than individual variables file/files. To be integrated on [annotation table](annotation_table).


```
+-- ..
|-- (sph)
|
|-- database
|   |-- ref
|   |   |-- grch37
|   |   |-- grch38
|   |   +-- ..
|   |
|   |-- vep
|   |   |-- ..
|   |   |-- ..
|   |   +-- ..
|   |
|   |-- gnomad
|   |   |-- ..
|   |   |-- ..
|   |   +-- ..
|   |
|   |-- (other files, pages with no children)
|   +-- ..
|
|-- tools
|   |-- gatk
|   |
|   |-- vep
|   |   |-- ..
|   |   +-- ..
|   |
|   |-- vt
|   |
|   +-- ..
|
|-- (sph)
+-- ..
```

