import { get } from "svelte/store";
import { lastEnemyAddedAt, enemyList } from "../stores/enemy";
import { level } from "../stores/game";

export const enemyType = {
	Low: "Low",
	Medium: "Medium",
	High: "High"
};

export const defaultEnemySize = 30;

export const damageByEnemyType = {
	[enemyType.Low]: 1,
	[enemyType.Medium]: 2,
	[enemyType.High]: 3
};

export const colorByEnemyType = {
	[enemyType.Low]: "green",
	[enemyType.Medium]: "orange",
	[enemyType.High]: "red"
};

export const sizeByEnemyType = {
	[enemyType.Low]: defaultEnemySize,
	[enemyType.Medium]: defaultEnemySize * 2,
	[enemyType.High]: defaultEnemySize * 3
};

export function getRandomEnemyType(obj) {
	const keys = Object.keys(obj);
	return obj[keys[(keys.length * Math.random()) << 0]];
}

export function addEnemy() {
	if (Date.now() - get(lastEnemyAddedAt) > 2500) {
		lastEnemyAddedAt.set(new Date());
		enemyList.update(enemies => {
			const type = getRandomEnemyType(enemyType);
			return [
				...enemies,
				{
					x: Math.floor(Math.random() * 449) + 1,
					y: 0,
					id: () => Math.random() + Date.now(),
					type: type,
					damageCount: damageByEnemyType[type],
					color: colorByEnemyType[type],
					size: sizeByEnemyType[type]
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

export function updateEnemyDamage(id) {
	enemyList.update(enemies => {
		enemies.find(enemy => enemy.id === id).damageCount -= 1;
		return enemies;
	});
}

export function removeEnemy(id) {
	enemyList.update(enemies => enemies.filter(enemy => enemy.id !== id));
}
