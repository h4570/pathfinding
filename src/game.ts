import { Color, PointLight } from "three";
import { Camera, Scene } from ".";
import { Cube } from "./entities/cube";

export class Game {

    public init(): void {
        Cube.Create();
        this.setCamera();
        this.setLight();
        console.log('Game - initialized!');
    }

    private setCamera() {
        Camera.position.z = 35;
    }

    private setLight() {
        const white = new Color('hsl(0, 100%, 100%)');
        const light = new PointLight(white, 2);
        light.position.set(-40, -20, 20);
        Scene.add(light);
    }

}
