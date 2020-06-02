<script>
  import { livesCount } from "../stores/game";
</script>

<style>
  .attempts {
      height: 100px;
      width: 100px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 4px;
      font-weight: 700;
      font-size: 64px;
      text-align: center;
  }
</style>

<div class="attempts">{$livesCount}</div>
