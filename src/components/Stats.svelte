<script>
  import { frags, shoots } from "../stores/stats";
  import { get } from "svelte/store";

  $: efficiency = $shoots > 0 ? $frags / $shoots : 0;
</script>

<style>
  .stats {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 4px;
    width: 150px;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
  }

  .statsRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .statsRow:not(:last-of-type) {
    margin-bottom: 4px;
  }
</style>

<div class="stats">
  <div class="statsRow">
    <span>Frags:</span>
    <span>{$frags}</span>
  </div>
  <div class="statsRow">
    <span>Shoots:</span>
    <span>{$shoots}</span>
  </div>
  <div class="statsRow">
    <span>Accuracy:</span>
    <span>{(efficiency * 100).toFixed(1)}%</span>
  </div>
</div>
