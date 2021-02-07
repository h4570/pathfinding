/*
 *         ___ __          __ 
 * .-----.'  _|__.-----.--|  |
 * |  _  |   _|  |     |  _  |
 * |   __|__| |__|__|__|_____|
 * |__|                       
 * ____________________________
 * Copyright 2021, pfind - https://github.com/h4570/pfind
 * Licenced under Apache License 2.0
 * Sandro h4570 Sobczyński <sandro.sobczynski@gmail.com>
 */

import { Setup } from './setup';
import { World } from 'ecsy';
import { PerspectiveCamera, WebGLRenderer, Scene as ThreeScene, Clock } from 'three';
import { Game } from './game';

export const Renderer = new WebGLRenderer({ antialias: true });
export const Camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
export const Scene = new ThreeScene();
export const ECS = new World();

// ---

Setup.init();

const game = new Game();

const clock = new Clock();
const gameLoop = () => {
    requestAnimationFrame(gameLoop);
    const delta = clock.getDelta();
    const elapsedTime = clock.elapsedTime;
    game.onUpdate(delta, elapsedTime);
    ECS.execute(delta, elapsedTime);
    Renderer.render(Scene, Camera);
}
gameLoop();
