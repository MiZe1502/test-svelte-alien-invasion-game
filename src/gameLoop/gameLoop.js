import { isPlaying } from "../stores/game";

import { get } from "svelte/store";
import { rotateCannon, shoot, moveBullet, clearBullets } from "./cannon";
import { addEnemy, moveEnemy } from "./enemy";
import { checkCollision, checkDefeat } from "./game";

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

export const startGame = () => {
	isPlaying.set(true);
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

export function stopGame() {
	isPlaying.set(false);
}
