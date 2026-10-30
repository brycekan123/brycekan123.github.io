---
layout: about
title: about
permalink: /
subtitle: "Graduate Researcher @ <a href='https://mascle.usc.edu'>USC ML Center</a> | LLM Post-training · Agentic AI · NLP"

profile:
  align: right
  image: profile_bryce_zion.jpg
  image_circular: false
  more_info: >
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

I'm Bryce Kan, an ML researcher and CS Master's student at the [University of Southern California](https://www.usc.edu). I work at the intersection of **LLM post-training, agentic AI, and NLP**, currently focused on long-term memory for LLM agents and LLM-powered recommendation systems that reason about both preference and qualification.

My path into ML started in biology. After studying [Molecular and Cell Biology](https://www.washington.edu/students/gencat/program/S/Biology-112.html#credential-67040893e845e109dda9bb0f) at the [University of Washington](https://www.washington.edu/), I spent 2.5 years in the biotech industry, building automated imaging pipelines at Applied Materials and developing data analysis tools at Bruker for spatial gene expression analysis. Working closely with scientists and engineers there is what got me hooked on machine learning and pushed me to make the full switch into CS.

I'm now fully focused on LLM post-training, agentic AI, and NLP. I want to build models that don't just answer questions but actually remember, reason, and improve through training. Long-term I'm aiming to work as an ML engineer or researcher in this space.

Outside of research, I've hiked Half Dome, run a marathon, and competed internationally in junior badminton.

---

### Experience

**SWE-Agentic AI Master's Intern** · [Honeywell](https://www.honeywell.com) · _May 2026 – Aug 2026_ · Atlanta, GA

- Built **agentic evaluation judge framework** across task completion, context retention, and error recovery scenarios
- Routed LLM inference across Anthropic and OpenAI via **OpenAI-compatible layer**; built FastAPI-backed data visualizer
- Dockerized and deployed eval pipeline; integrated **Databricks** model-serving endpoints, tracking per-call cost and latency

**Graduate Research Assistant** · [USC Machine Learning Center](https://mascle.usc.edu) · _Mar 2025 – Present_ · Los Angeles, CA

_[RaMem: Contextual Reinstatement for Long-Term Agentic Memory](https://arxiv.org/abs/2606.22844)_

- Built RAG-based agentic memory pipeline enabling LLM agents to recall evidence across multi-session conversations
- Engineered temporal evidence filtering with session metadata to remove semantically related but invalid memories
- Implemented hybrid retrieval with Reciprocal Rank Fusion (RRF) over semantic search and BM25, improving F1 by **11.6 points** across GPT-4o, GPT-4.1-mini, and Qwen3-8B
- Reduced prompt context length by **50%** while preserving performance against state-of-the-art agent memory baselines

_[Student-Job Recommendation System](https://arxiv.org/abs/2602.03097)_

- Led end-to-end development as 1st author, mentoring 2 Master's students and collaborating with PhD candidates
- Tackled cold-start scenarios using synthetic explanation generation via GPT-4o-mini distillation into Llama-3-8B-Instruct for student-teacher learning
- Implemented multi-step fine-tuning via dual optimization framework with LoRA, jointly training 2 objectives for ranking (InfoNCE contrastive loss)
- Achieved up to **2.6× Recall@5** and over **3× NDCG@5** improvement over LLM baselines

**Research Associate** · [Bruker](https://www.bruker.com) · _Jun 2023 – Jul 2024_ · San Jose, CA

- Developed custom Python pipelines to automate experimental data analysis, adapting to evolving scientific demands
- Designed interactive Plotly dashboards to visualize complex biological datasets, enabling faster data-driven insights

**Process Engineer** · [Applied Materials](https://www.appliedmaterials.com) · _Jan 2022 – Jun 2023_ · Santa Clara, CA

- Launched Lab Inventory Database as final product, delivering full workflow traceability and reducing processing time by **80%**
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
