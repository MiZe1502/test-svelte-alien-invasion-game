<script>
  import IconButton from "./IconButton.svelte";
  import LeftArrow from "../assets/LeftArrow.svelte";
  import RightArrow from "../assets/RightArrow.svelte";
  import Bullet from "../assets/Bullet.svelte";
  import { direction, isFiring } from "../stores/cannon.js";

  const resetDirection = () => direction.set(null);
  const setDirectionLeft = () => direction.set("left");
  const setDirectionRight = () => direction.set("right");

  const startFire = () => isFiring.set(true);
  const stopFire = () => isFiring.set(false);

  function handleKeydown(event) {
    const code = event.code;

    switch (code) {
      case "Space":
        startFire();
        break;
      case "ArrowLeft":
        setDirectionLeft();
        break;
      case "ArrowRight":
        setDirectionRight();
        break;
      default:
        break;
    }
  }

  function handleKeyup(event) {
    const code = event.code;

    switch (code) {
      case "Space":
        stopFire();
        break;
      case "ArrowLeft":
        resetDirection();
        break;
      case "ArrowRight":
        resetDirection();
        break;
      default:
        break;
    }
  }
</script>

<style>
  .controls {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }

  .arrowGroup {
    display: flex;
    justify-content: space-between;
    width: 150px;
  }
</style>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<div class="controls">
  <div class="container">
    <div class="arrowGroup">
      <IconButton
        start={setDirectionLeft}
        release={resetDirection}
        active={$direction === 'left'}>
        <LeftArrow />
      </IconButton>
      <IconButton
        start={setDirectionRight}
        release={resetDirection}
        active={$direction === 'right'}>
        <RightArrow />
      </IconButton>
    </div>
    <IconButton start={startFire} release={stopFire} active={$isFiring}>
      <Bullet />
    </IconButton>
  </div>
</div>
