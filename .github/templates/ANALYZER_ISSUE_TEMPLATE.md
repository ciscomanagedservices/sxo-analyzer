---
title: SecureX Orchestration Workflow Analyzer Results - Commit {{ hash[:7] }}
labels: sxo-analyzer
---

[SecureX Orchestration Workflow Analyzer](https://github.com/ciscomanagedservices/sxo-analyzer) analyzed your last commit {{ hash }}. An itemized list of issues found in checks that ran are grouped by workflow name (click ▶ to expand) & presented below as 'tasks' for your review.

> 🎯 **Pro Tip:** You can covert each task on this list into an issue of it's own to break down work and to assign to others. Check out [this](https://m.youtube.com/watch?v=BplF7vHXewA) video for more!

---


{% for wf in wfs %}
<details>
<summary><strong>{{ wf.split('_')[0] }} [<a href="../blob/master/{{wf}}">link</a>]</strong></summary>
{% if issues.get(wf) != None %}
### 😞 Failed
{% for issue in issues.get(wf) %}
- [ ] {{ issue['title'] }} - {{ issue['description'] }} - {{ issue['moreInfo']}}
{%- endfor %}
{%- endif %}

{% if warnings.get(wf) != None %}
### 😶 Warnings
{% for warning in warnings.get(wf) %}
- [ ] {{ warning['title'] }} - {{ warning['description'] }} - {{ warning['moreInfo']}}
{%- endfor %}
{%- endif %}

{% if successes.get(wf) != None %}
### 🥳 Passed
{% for success in successes.get(wf) %}
- [x] {{ success['title'] }} - {{ success['description'] }} - {{ success['moreInfo']}}
{%- endfor %}
{%- endif %}
</details>
{% endfor %}
