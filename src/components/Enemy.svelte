<script>
  import { fade, fly } from 'svelte/transition';

  export let enemy;
</script>

<g out:fade transform={`translate(${enemy.x}, ${enemy.y})`}>
  <rect fill={enemy.color} width={enemy.size} height={enemy.size} />
</g>
