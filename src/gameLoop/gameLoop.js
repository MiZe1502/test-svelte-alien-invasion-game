import {
	isPlaying,
	isDefeated,
	isWinning,
	level,
	livesCount,
	initLivesCount
} from "../stores/game";

import { get } from "svelte/store";
import { rotateCannon, shoot, moveBullet, clearBullets } from "./cannon";
import { addEnemy, moveEnemy } from "./enemy";
import { checkCollision, checkDefeat, checkLevel } from "./game";
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

export function clearGameState(isTerminated) {
	shoots.set(0);
	frags.set(0);
	enemyList.set([]);
	lastEnemyAddedAt.set(0);
	direction.set(null);
	angle.set(0);
	isFiring.set(false);
	lastFireAt.set(0);
	isTerminated && level.set(1);
	bulletList.set([]);
	isWinning.set(false);
	isDefeated.set(false);
	isPlaying.set(true);
}

export const startGame = () => {
	clearGameState(true);
	startLoop([
		rotateCannon,
		shoot,
		moveBullet,
		clearBullets,
		addEnemy,
		moveEnemy,
		checkCollision,
		checkDefeat,
		checkLevel
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
			livesCount.set(initLivesCount);
			break;
		default:
			break;
	}
}
