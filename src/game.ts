import { AmbientLight, Color } from "three";
import { Scene } from ".";
import { Camera } from "./camera";
import { CubeManager } from "./managers/cube-manager";

export class Game {

    private size = 25;
    private camera = new Camera(this.size / 2);
    private cubeManager = new CubeManager(this.size);

    constructor() {
        this.setLight();
        console.log('Game - initialized!');
    }

    public onUpdate(delta: number, time: number): void { // every frame
        this.camera.onUpdate();
        this.cubeManager.onUpdate(delta, time);
    }

    private setLight() {
        const white = new Color('hsl(0, 100%, 100%)');
        const light = new AmbientLight(white, 2);
        Scene.add(light);
    }

}
