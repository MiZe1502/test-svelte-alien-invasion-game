import { get } from "svelte/store";
import { bulletList } from "../stores/cannon";
import { enemyList } from "../stores/enemy";
import { removeBullet } from "./cannon";
import { removeEnemy, updateEnemyDamage, sizeByEnemyType } from "./enemy";
import { frags } from "../stores/stats";
import { stopGame, clearGameState } from "./gameLoop";
import { GameState, ScreenSize } from "./utils";
import { level, livesCount } from "../stores/game";

const bulletWidth = 5;
const bulletHeight = 8;

export function checkCollision() {
	get(bulletList).forEach(bullet => {
		get(enemyList).forEach(enemy => {
			if (
				bullet.x < enemy.x + sizeByEnemyType[enemy.type] &&
				bullet.x + bulletWidth > enemy.x &&
				bullet.y < enemy.y + sizeByEnemyType[enemy.type] &&
				bullet.y + bulletHeight > enemy.y
			) {
				removeBullet(bullet.id);
				updateEnemyDamage(enemy.id);
				if (enemy.damageCount === 0) {
					removeEnemy(enemy.id);
					frags.update(frag => (frag += 1));
				}
			}
		});
	});
}

export function checkDefeat() {
	get(enemyList).forEach(enemy => {
		if (enemy.y + sizeByEnemyType[enemy.type] >= ScreenSize) {
			livesCount.update(livesCount => livesCount - 1);
			console.log(get(livesCount));
			if (get(livesCount) <= 0) {
				stopGame(GameState.Defeat);
			} else {
				clearGameState(false);
			}
		}
	});
}

export function checkLevel() {
	if (get(frags) >= get(level) * 10) {
		level.update(level => (level += 1));
	}
}
