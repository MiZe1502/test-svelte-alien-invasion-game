<script>
  export let enemy;
</script>

<g transform={`translate(${enemy.x}, ${enemy.y})`}>
  <rect fill={enemy.color} width={enemy.size} height={enemy.size} />
</g>
