## GitHub Action for SecureX Orchestrator Workflow Analyzer

[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/ciscomanagedservices/sxo-analyzer)

This repository houses a [GitHub Action](https://github.com/features/actions) wrapper for the Workflow Analyzer available [here](https://ciscosecurity.github.io/sxo-05-security-workflows/analyzer/), that you can use in a CI/CD pipeline with your SecureX Orchestrator (SXO) Atomic Actions & Workflows. 

By using this GitHub Action, you can have the Workflow Analyzer automatically run on each commit you make to the repository to check if your workflows & atomic actions conform to Cisco recommended best practices.

---

### Features:
1. **Ability to run conditionally**
<br>Don't want the analyzer to run for some workflows? No problem. Just add `!#NOANALYZER` to your workflow description before you commit to the repository and we'll skip it.

2. **Commit Context Aware**
<br>The analyzer will only run for workflows/atomic actions in a given commit and not everything in the repository. This ensures we don't create repeat issues.

3. **Ability to automatically create issues for items that do not conform to best practices**
<br>We'll create an issue per run with an itemized list of checks that failed. A sample issue can be found [here](https://github.com/ciscomanagedservices/sxo-analyzer/issues/1). If no issues are found, i.e. all checks pass in all workflows in the commit context, an issue will be created and auto-closed. This way, you can still audit checks that passed and don't warrant any action.

4. **Latest code, always**
<br>We pull the latest analyzer code on every run. As new best practices & checks are added to the workflow analyzer over time, this action will always be up-to-date!

---

### Steps to use:

If you _**aren't**_ already using one or more GitHub Actions in your repository: 
1. When creating a new repository to commit your SXO workflows/atomic actions to, select [ciscomanagedservices/sxo-analyzer](https://github.com/ciscomanagedservices/sxo-analyzer) as the repository template
2. This will initialize your new repository with the contents of this repository, i.e. with the `.github` folder and a `README.md` file. You're free to discard the `README.md` file or overwrite it with your own.

If you _**are**_ already using one or more GitHub Actions in your repository: 
<br>Copy the [Analyzer Action](.github/workflows/analyzer.yml) and add it under `.github/workflows/` in your own repository.

---

### Usage Guidance: 
1. Any limitations seen in the original analyzer code will exist in this GitHub Action as well. If you have any feedback to improve the workflow analyzer, please create an issue on the original repository [here](https://github.com/CiscoSecurity/sxo-05-security-workflows/issues/new?labels=bug). If you have any feedback pertaining to this action, please create an issue on [this](https://github.com/ciscomanagedservices/sxo-analyzer/issues/new) repository.
2. Please be aware of [pricing & usage limits](https://docs.github.com/en/actions/reference/usage-limits-billing-and-administration) associated with using GitHub Actions.
3. No changes are required on SXO for this action to work. You'd setup the Git Endpoint for your repository on SXO and commit as you typically do.
4. Let the world know you've analyzed your workflows by adding a badge to your repository! 🎉
<br><br>[![sxoanalyzed](https://raw.githubusercontent.com/ciscomanagedservices/sxo-analyzer/main/.github/workflows/sxo-analyzer-badge.svg)](https://github.com/ciscomanagedservices/sxo-analyzer)
    
    > Copy this code to your README: `[![sxoanalyzed](https://raw.githubusercontent.com/ciscomanagedservices/sxo-analyzer/main/.github/workflows/sxo-analyzer-badge.svg)](https://github.com/ciscomanagedservices/sxo-analyzer)`

---

Contributors:

1. Aman Sardana (amasarda@cisco.com)
2. Anant Nambiar (ananambi@cisco.com)

Cisco CX Managed Services - Operate, August 2021
