import { get } from "svelte/store";
import { bulletList } from "../stores/cannon";
import { enemyList } from "../stores/enemy";
import { removeBullet } from "./cannon";
import { removeEnemy, updateEnemyDamage } from "./enemy";
import { frags } from "../stores/stats";
import { stopGame, clearGameState } from "./gameLoop";
import { GameState, ScreenSize } from "./utils";
import { level, livesCount } from "../stores/game";

const enemyWidth = 30;
const bulletWidth = 5;
const enemyHeight = 30;
const bulletHeight = 8;

export function checkCollision() {
	get(bulletList).forEach(bullet => {
		get(enemyList).forEach(enemy => {
			if (
				bullet.x < enemy.x + enemyWidth &&
				bullet.x + bulletWidth > enemy.x &&
				bullet.y < enemy.y + enemyHeight &&
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
		if (enemy.y + enemyHeight >= ScreenSize) {
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
