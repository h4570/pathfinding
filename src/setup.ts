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

import { Camera, ECS, Renderer } from '.';
import { Model } from './components/model';
import { CubeRotationSystem } from './systems/cube-rotation-system';

export class Setup {

    private static isInitialized: boolean;

    public static init(): void {
        console.assert(!this.isInitialized, 'Setup - Cant init, because already initialized!');

        Renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(Renderer.domElement);
        window.addEventListener('resize', () => this.resize());

        this.registerECS();

        console.log("Setup - initialized");
        this.isInitialized = true;
    }

    private static registerECS(): void {
        ECS.registerComponent(Model);
        ECS.registerSystem(CubeRotationSystem);
    }

    // --- Private

    private static resize(): void {
        console.assert(this.isInitialized === true, 'Setup - cant resize, because not initialized!');
        const { innerWidth, innerHeight } = window;
        Renderer.setSize(innerWidth, innerHeight);
        Camera.aspect = innerWidth / innerHeight;
        Camera.updateProjectionMatrix();
    }

}

