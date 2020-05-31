import { get } from "svelte/store";
import { lastEnemyAddedAt, enemyList } from "../stores/enemy";
import { level } from "../stores/game";

export function addEnemy() {
	if (Date.now() - get(lastEnemyAddedAt) > 2500) {
		lastEnemyAddedAt.set(new Date());
		enemyList.update(enemies => {
			return [
				...enemies,
				{
					x: Math.floor(Math.random() * 449) + 1,
					y: 0,
					id: () => Math.random() + Date.now()
				}
			];
		});
	}
}

export function moveEnemy() {
	enemyList.update(enemyList => {
		return enemyList.map(enemy => {
			return {
				...enemy,
				y: enemy.y + 0.5 * get(level)
			};
		});
	});
}

export function removeEnemy(id) {
	enemyList.update(enemies => enemies.filter(enemy => enemy.id !== id));
}
