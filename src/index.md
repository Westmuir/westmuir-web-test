---
title: Welcome to Westmuir
layout: base
cta: true
hero: false
---

<!-- Content can be added here if needed -->

::: center
![Welcome to Westmuir](/assets/images/westmuir-cortachy-header.jpg)
:::

{% block content %}
{% render "partials/nav-cards", cards: cards %}

<main class="main">

{% if hero %}

<section class="hero">
  <div class="hero-content">
    <h1>Welcome to Westmuir</h1>
    <p>Discover the charm of our village, from events to local news.</p>
    <a href="/about/" class="btn">Learn More</a>
  </div>
</section>

{% endif %}

<div class="home-main">

<div class="home-aside">
<blockquote>
        <p class="style60">New Craft Group Starting Monday 4 September 2023</p>
        <div class="home-aside-image">

        ![Crafts](/assets/images/crafts-poster.jpg)

        </div>
        <p class="style62">
          This is a new group startup by Lillian McDownie and Christine Cobb who are setting up a
          Creative craft club in the village hall on Monday afternoons.
        </p>
        <p class="style62">More details in the poster above.</p>
        <hr />
        </blockquote>

</div>

<div class="home-content">

::: home-item

## Men's Speakeasy {.title}

Calling all males living in Westmuir

![Calling all males living in Westmuir](/assets/images/speakeasy-poster.svg){.poster-item-wide}

:::

{% if cta %} {% render "partials/cta" %} {% endif %} {%
endblock %}

</div>

</div>
</main>
