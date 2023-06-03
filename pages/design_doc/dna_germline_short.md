---
layout: default
title: DNA germline short variant discovery
parent: Design documents
---

<h1>Germline short variant discovery (SNPs + Indels) and interpretation</h1>
<h2>Design document</h2>

{: .no_toc }
<details open markdown="block">
<summary>Table of contents</summary>
{: .text-delta }
- TOC
{:toc}
</details>

---

## Introduction
DNA sequence data is received from the sequencing facility in FASTQ format.
It is generally considered that approximately 20-40% of rare genetic disease may be detectable by DNA germline short variant discovery and variant interpretation
Specifically, this is tailored to single nucleotide variants (SNVs) and short insertion/deletions (INDELs) in protein coding genes and splice sites.

To produce our final output (e.g. clinical grade reports, downstream statistical analysis), we must process the data as follows:
1. QC for pre-processing
2. Decide on protocol, alignment build, threshold criteria
3. Annotate known effect
4. Interpret impact
5. Report clinical grade genetics
6. Cohort analysis for variant association
7. Any additional custom outputs

<img 
src="{{ "pages/design_doc/images/variant_annotation_graph.png" | relative_url }}"
width="100%">
Figure: Summary of DNA germline short variant discovery pipeline plan.

## Summary of requirements

### Quality control
We use a number of tools such as [github.com/OpenGene/fastp](https://github.com/OpenGene/fastp) 
for comprehensive quality profiling for both before and after filtering data.

### Alignment
* We use [BWA](https://bio-bwa.sourceforge.net) for alignment with GRCh38.
* Our reference genome build is GRCh38 from following source:

```
ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/001/405/GCA_000001405.15_GRCh38/seqs_for_alignment_pipelines.ucsc_ids/GCA_000001405.15_GRCh38_no_alt_analysis_set.fna.gz
```

This genome build is currently considered the best for our application.
You can read more about it on
[Illumina's website](https://www.illumina.com/science/genomics-research/articles/dragen-demystifying-reference-genomes.html) and 
[Heng Li's website](https://lh3.github.io/2017/11/13/which-human-reference-genome-to-use).

### Variant calling

We will implement the genome analysis tool kit 
[GATK](https://gatk.broadinstitute.org/hc/en-us)
best practices workflow for 
[germline short variant discovery](https://gatk.broadinstitute.org/hc/en-us/articles/360035535932-Germline-short-variant-discovery-SNPs-Indels) (open source licence [here](https://github.com/broadinstitute/gatk/blob/master/LICENSE.TXT)).
This workflow will be designed to operate on a set of samples constituting a study cohort; 
specifically, a set of per-sample BAM files that have been pre-processed as described in the GATK Best Practices for data pre-processing.

### Annotation

Variant annotation is a critical step in clinical and statistical genetics.
Popular tools for applying annotation data to VCF format genetic data include:

* Variant Effect Predictor (VEP) [link: VEP](http://www.ensembl.org/info/docs/tools/vep/index.html)
* NIRVANA [link: NIRVANA](https://illumina.github.io/NirvanaDocumentation/)
* ANNOVAR [link: ANNOVAR](https://annovar.openbioinformatics.org/en/latest/)

We aim to implement [VEP](http://www.ensembl.org/info/docs/tools/vep/index.html) with [Conda](https://docs.conda.io/en/latest/), but we are likely to test additional methods
([licence](http://www.ensembl.org/info/about/legal/code_licence.html)).
Additionally, these tools must be paried with a set of data sources containing the annotation information which will be applied to each variant.
* [View our list of approx. 160 databases]({{ site.baseurl }}{% link pages/annotation_table.md %}).

The variant consequence may be one of the defining criteria by which variants can 
be included in analysis since they are _interpretable_ or of ostensibly _known significance_.

The consequences provided by VEP can provide a simple refernce example to understand its function.
For example, HIGH impact variants might be a likely consequence for identifying candidates disease-causing:
[Ensembl Variation - Calculated variant consequences](https://grch37.ensembl.org/info/genome/variation/prediction/predicted_data.html#consequences).\

{: .note }
You may have observed cases in literature where clinical research reporting relied on variant effect consequence alone for known disease-related genes, but this practice is likely to introduce spurious results. 
It is important to use established criteria for selecting consequences of interest combined with additional filtering methods to define evidence thresholds.
See the ACMG interpretation standards for examples.

<img 
src="{{ "pages/design_doc/images/VEP_consequences.jpg" | relative_url }}"
width="100%">

### Interpretation

We will perform a range of interpretation steps for:
1. Generalised single-case clinical variant classification
2. Cohort-level classification

For example, we will perform interpretation of variants by ACMG standards and guidelines.
Extensive annotation is applied during our genomics analysis.
Interpretation of genetic determinants of disease is based on many evidence sources.
One important source of interpretation comes from the
Standards and guidelines for the interpretation of sequence variants: a joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology
[richards2015standards], full text at doi:
[10.1038/gim.2015.30](https://www.gimjournal.org/article/S1098-3600(21)03031-8/fulltext).

Check the tables linked here:
[temporary link](https://lawlessgenomics.com/topic/acgm-criteria-table-main).
These are provided as they appear in the initial steps of our filtering protocol for the addition of ACMG-standardised labels to candidate causal variants.
* Criteria for classifications
* Caveats implementing filters

Implementing the guidelines for interpretation of annotation requires multiple programmatic steps. 
The number of individual caveat checks indicate the number of bioinformatic filter functions used.
Unnumbered caveat checks indicate that only a single filter function is required during reference to annotation databases.
However, each function depends on reference to either one or several evidence source databases (approximately 160 sources).

For reference, alternative public implementations of ACMG guidelines can be found in [li2017intervar] and [xavier2019tapes];
please note these tools have not implemented here nor is any assertion of their quality offered.
Examples of effective variant filtering and expected candidate variant yield in studies of rare human disease are provided by [pedersen2021effective].


