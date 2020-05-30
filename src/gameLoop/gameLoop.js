import { isPlaying, isDefeated, isWinning } from "../stores/game";

import { get } from "svelte/store";
import { rotateCannon, shoot, moveBullet, clearBullets } from "./cannon";
import { addEnemy, moveEnemy } from "./enemy";
import { checkCollision, checkDefeat } from "./game";
import { GameState } from "./utils";
import { shoots, frags } from "../stores/stats";
import { enemyList, lastEnemyAddedAt } from "../stores/enemy";
import {
	direction,
	angle,
	isFiring,
	lastFireAt,
	bulletList
} from "../stores/cannon";

function startLoop(steps) {
	window.requestAnimationFrame(() => {
		steps.forEach(step => {
			if (typeof step === "function") {
				step();
			}
		});

		if (get(isPlaying)) {
			startLoop(steps);
		}
	});
}

function clearGameState() {
	shoots.set(0);
	frags.set(0);
	enemyList.set([]);
	lastEnemyAddedAt.set(0);
	direction.set(null);
	angle.set(0);
	isFiring.set(false);
	lastFireAt.set(0);
	bulletList.set([]);
	isWinning.set(false);
	isDefeated.set(false);
	isPlaying.set(true);
}

export const startGame = () => {
	clearGameState();
	startLoop([
		rotateCannon,
		shoot,
		moveBullet,
		clearBullets,
		addEnemy,
		moveEnemy,
		checkCollision,
		checkDefeat
	]);
};

export function stopGame(status) {
	isPlaying.set(false);
	switch (status) {
		case GameState.Win:
			isWinning.set(true);
			break;
		case GameState.Defeat:
			isDefeated.set(true);
			break;
		default:
			break;
	}
}
