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

Outside of research, I've hiked Half Dome, run a marathon, and competed internationally in junior badminton.

<!-- Start the divider below the floated profile photo instead of running across it -->
<div style="clear: both"></div>

---

### Experience

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/honeywell.png' | relative_url }}" alt="Honeywell logo">
  <div class="org-header-text"><strong>SWE-Agentic AI Master's Intern</strong> · <a href="https://www.honeywell.com">Honeywell</a> · Atlanta, GA</div>
  <div class="org-header-date">May 2026 – Aug 2026</div>
</div>

- Built **agentic evaluation judge framework** across task completion, context retention, and error recovery scenarios
- Routed LLM inference across Anthropic and OpenAI via **OpenAI-compatible layer**; built FastAPI-backed data visualizer
- Dockerized and deployed eval pipeline; integrated **Databricks** model-serving endpoints, tracking per-call cost and latency

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/usc_mascle.png' | relative_url }}" alt="USC Machine Learning Center logo">
  <div class="org-header-text"><strong>Graduate Research Assistant</strong> · <a href="https://mascle.usc.edu">USC Machine Learning Center</a> · Los Angeles, CA</div>
  <div class="org-header-date">Mar 2025 – Present</div>
</div>

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

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/bruker.png' | relative_url }}" alt="Bruker logo">
  <div class="org-header-text"><strong>Research Associate</strong> · <a href="https://www.bruker.com">Bruker</a> · San Jose, CA</div>
  <div class="org-header-date">Jun 2023 – Jul 2024</div>
</div>

- Developed custom Python pipelines to automate experimental data analysis, adapting to evolving scientific demands
- Designed interactive Plotly dashboards to visualize complex biological datasets, enabling faster data-driven insights

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/applied_materials.png' | relative_url }}" alt="Applied Materials logo">
  <div class="org-header-text"><strong>Process Engineer</strong> · <a href="https://www.appliedmaterials.com">Applied Materials</a> · Santa Clara, CA</div>
  <div class="org-header-date">Jan 2022 – Jun 2023</div>
</div>

- Launched Lab Inventory Database as final product, delivering full workflow traceability and reducing processing time by **80%**
- Built automated data visualization pipelines using Pandas and Plotly to extract insights from terabyte-sized datasets

---

### Education

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/usc.png' | relative_url }}" alt="USC logo">
  <div class="org-header-text"><strong>MS Computer Science</strong> · <a href="https://www.usc.edu">University of Southern California</a></div>
  <div class="org-header-date">2024 – 2026</div>
</div>

<div class="org-header">
  <img class="org-logo" src="{{ '/assets/img/logos/uw.png' | relative_url }}" alt="UW logo">
  <div class="org-header-text"><strong>BS Molecular and Cell Biology</strong> · <a href="https://www.washington.edu">University of Washington</a></div>
  <div class="org-header-date">2018 – 2021</div>
</div>

---
