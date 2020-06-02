<script>
  import { livesCount } from "../stores/game";
</script>

<style>
  .inputWrapper {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 200px;
  }

  .label {
    margin-right: 8px;
  }

  .input {
    border: 1px solid black;
    border-radius: 4px;
    min-width: 30px
  }
</style>

<div class="inputWrapper">
  <label class="label" for="livesCountInput">Attempts:</label>
  <input
    class="input"
    id="livesCountInput"
    value={$livesCount}
    min="1"
    max="10"
    type="number"
    placeholder="Choose number of continues..." />
</div>
