import { Vector3 } from "three";
import { Camera as ThreeCamera } from ".";

/** Wrapper class for threejs camera */
export class Camera {

    private speed = 0.6;
    private targetCam = new Vector3();

    private yaw = 0.0; // vertical
    private pitch = 100.0; // horizontal 
    private y = 50;
    private center: number;

    constructor(center: number) {
        this.center = center;
        ThreeCamera.position.set(0, this.center, this.pitch);
        this.targetCam.copy(ThreeCamera.position);
        document.body.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
        this.updateTarget();
        console.log('Camera - initialized!');
    }

    public onUpdate(): void {
        if (ThreeCamera.position.distanceTo(this.targetCam) > 0.1)
            ThreeCamera.position.lerp(this.targetCam, 0.1);
        ThreeCamera.lookAt(this.center, 0, this.center);
    }

    public onKeyDown(keyEvent: KeyboardEvent): void {
        this.move(keyEvent);
        this.updateTarget();
    }

    private move(keyEvent: KeyboardEvent): void {
        if (keyEvent.key === 'w')
            this.pitch -= this.speed;
        else if (keyEvent.key === 's')
            this.pitch += this.speed;
        else if (keyEvent.key === 'd')
            this.yaw += this.speed;
        else if (keyEvent.key === 'a')
            this.yaw -= this.speed;
    }

    private updateTarget(): void {
        this.targetCam.set(
            Math.sin(this.yaw) * this.pitch,
            this.y,
            Math.cos(this.yaw) * this.pitch);
    }

}