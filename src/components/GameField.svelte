<script>
  import Cannon from "./Cannon.svelte";
  import Bullet from "./Bullet.svelte";
  import Enemy from "./Enemy.svelte";
  import Message from "./Message.svelte";
  import Stats from "./Stats.svelte";

  import { bulletList } from "../stores/cannon";
  import { enemyList } from "../stores/enemy";
  import { isDefeated, isPlaying } from "../stores/game";
  import { startGame } from "../gameLoop/gameLoop";
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

  .button {
    outline: none;
    border: 1px solid black;
    border-radius: 4px;
    height: 60px;
    width: 200px;
    font-size: 20px;
  }

  .button:hover {
    cursor: pointer;
    background-color: #bdbdbd;
  }
</style>

<div class="container">
  {#if $isPlaying}
    <Stats />
  {/if}
  {#if !$isPlaying}
    <Message>
      {#if $isDefeated}
        <span class="message">You are defeated</span>
        <!-- <Stats /> -->
        <button class="button" on:click={startGame}>Start again</button>
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
