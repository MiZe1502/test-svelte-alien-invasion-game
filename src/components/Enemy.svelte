<script>
  export let enemy;
</script>

<g transform={`translate(${enemy.x}, ${enemy.y})`}>
  <rect fill={enemy.color} width="30" height="30" />
</g>
