---
layout: about
title: about
permalink: /
subtitle: "Graduate Researcher @ <a href='https://mascle.usc.edu'>USC ML Center</a> | NLP · Agentic AI · Retrieval"

profile:
  align: right
  image: profile_pic_bryce.png
  image_circular: false
  more_info: >
    <p>brycekan@usc.edu</p>
    <p>Los Angeles, CA</p>

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
---

I'm Bryce Kan, an ML researcher and CS Master's student at USC. I build systems at the intersection of **agentic AI, retrieval, and NLP**, currently focused on long-term memory for LLM agents and LLM-powered recommendation systems that reason about both preference and qualification.

My path into ML started in biology. After studying [Molecular and Cell Biology](https://www.washington.edu/students/gencat/program/S/Biology-112.html#credential-67040893e845e109dda9bb0f) at the [University of Washington](https://www.washington.edu/), I spent 2.5 years in the biotech industry, building automated imaging pipelines at Applied Materials and developing data analysis tools at Bruker for spatial gene expression analysis. Working closely with scientists and engineers there is what got me hooked on machine learning and pushed me to make the full switch into CS.

I'm now fully focused on NLP, retrieval-augmented generation (RAG), and agentic systems. I want to build models that don't just answer questions but actually remember, retrieve, and reason. Long-term I'm aiming to work as an ML engineer or researcher in this space.

Outside of research, I've hiked Half Dome, run a marathon, and competed internationally in junior badminton.

---

### Experience

**SWE-Agentic AI Master's Intern** · [Honeywell](https://www.honeywell.com) · _May 2026 – Aug 2026_ · Atlanta, GA

- Building MCP server infrastructure for agentic AI workflows
- Developing chatbot with natural language to SQL query generation
- AWS-based model deployment and serving

**Graduate Research Assistant** · [USC Machine Learning Center](https://mascle.usc.edu) · _Mar 2025 – Present_ · Los Angeles, CA

_RaMem: Contextual Reinstatement for Long-Term Agentic Memory — NeurIPS 2026_

- Built RAG-based agentic memory pipeline enabling LLM agents to recall evidence across multi-session conversations
- Engineered temporal evidence filtering with session metadata to remove semantically related but invalid memories
- Implemented hybrid retrieval with Reciprocal Rank Fusion (RRF) over semantic search and BM25, improving F1 by **11.6 points** across GPT-4o, GPT-4.1-mini, and Qwen3-8B
- Reduced retrieved-memory context by **50%** while preserving performance against SOTA baselines

_[Student-Job Recommendation System](https://arxiv.org/abs/2602.03097)_

- Led end-to-end development as 1st author, mentoring 2 Master's students and collaborating with PhD candidates
- Tackled cold-start via synthetic explanation generation using GPT-4o-mini distillation into Llama-3-8B-Instruct
- Multi-step fine-tuning with InfoNCE contrastive loss; achieved **2.6× Recall@5** and **3× NDCG@5** over LLM baselines

**Research Associate** · [Bruker](https://www.bruker.com) · _Jun 2023 – Jul 2024_ · San Jose, CA

- Developed custom Python pipelines to automate experimental data analysis, adapting to evolving scientific requirements
- Designed interactive Plotly dashboards to visualize complex biological datasets, enabling faster data-driven insights

**Process Engineer** · [Applied Materials](https://www.appliedmaterials.com) · _Jan 2022 – Jun 2023_ · Santa Clara, CA

- Launched Lab Inventory Database, delivering full workflow traceability and reducing processing time by **80%**
- Built automated data visualization pipelines using Pandas and Plotly to extract insights from terabyte-sized datasets

---

### Education

<table style="width:100%; border-collapse: collapse;">
  <tr>
    <td style="width: 44px; padding: 0.5rem 0.75rem 0.5rem 0;">
      <img src="/assets/img/usc_logo.png" alt="USC" style="height: 36px; width: auto; object-fit: contain;">
    </td>
    <td style="padding: 0.5rem 0.5rem;"><strong>MS Computer Science</strong> · <a href="https://www.usc.edu">University of Southern California</a></td>
    <td style="text-align: right; padding: 0.5rem 0; white-space: nowrap;">2024 – 2026</td>
  </tr>
  <tr>
    <td style="width: 44px; padding: 0.5rem 0.75rem 0.5rem 0;">
      <img src="/assets/img/uw_logo.png" alt="UW" style="height: 36px; width: auto; object-fit: contain;">
    </td>
    <td style="padding: 0.5rem 0.5rem;"><strong>BS Molecular and Cell Biology</strong> · <a href="https://www.washington.edu">University of Washington</a></td>
    <td style="text-align: right; padding: 0.5rem 0; white-space: nowrap;">2018 – 2021</td>
  </tr>
</table>

---
