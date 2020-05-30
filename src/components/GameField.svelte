<script>
  import Cannon from "./Cannon.svelte";
  import Bullet from "./Bullet.svelte";
  import Enemy from "./Enemy.svelte";
  import Message from "./Message.svelte";
  import { bulletList } from "../stores/cannon";
  import { enemyList } from "../stores/enemy";
  import { isDefeated, isPlaying } from "../stores/game";
</script>

<style>
  .container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 100%;
  }

  .message {
    text-transform: uppercase;
    text-align: center;
    font-size: 32px;
  }
</style>

<div class="container">
  {#if !$isPlaying}
    <Message>
      {#if $isDefeated}
        <span class="message">You are defeated</span>
      {/if}
    </Message>
  {/if}
  <svg viewBox="0 0 480 800">
    {#each $enemyList as enemy (enemy.id)}
      <Enemy {enemy} />
    {/each}
    {#each $bulletList as bullet (bullet.id)}
      <Bullet {bullet} />
    {/each}
    <Cannon />
  </svg>
</div>
