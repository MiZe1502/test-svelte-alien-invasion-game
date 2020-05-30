<style>
  .message {
    position: fixed;
    top: 33.3%;
    max-width: 50%;
    max-height: 50%;
    min-height: 200px;
    min-width: 60%;
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    z-index: 2;
    background-color: darkgray;
  }
</style>

<div class="message">
  <slot />
</div>
