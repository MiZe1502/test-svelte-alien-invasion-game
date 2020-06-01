<script>
  import Controls from "./components/Controls.svelte";
  import GameField from "./components/GameField.svelte";
</script>

<style>
  :global(html) {
    height: 100%; /* Наша игра будет занимать 100% высоты*/
  }
  :global(body) {
    height: 100%; /* Наша игра будет занимать 100% высоты*/
    overscroll-behavior: none; /* отключает pull to refresh*/
    user-select: none; /* для тач интерфейсов отключает выделение при нажатии */
    margin: 0; /* убираем отступы*/
    background-color: #efefef; /* устанавливаем цвет фона */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; /* устанавливаем шрифты */
  }
</style>

<Controls />
<GameField />
