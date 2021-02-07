import { System } from "ecsy";
import { ECS } from "..";
import { Model } from '../components/model'

/** Example system */
export class CubeRotationSystem extends System {

    constructor() {
        super(ECS);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public execute(delta: number, time: number): void {
        // this.queries.cubes.results.forEach(entity => {
        //     const cube = entity.getComponent(Model) as Model;
        //     cube.mesh.rotation.x += 0.01;
        //     cube.mesh.rotation.y += 0.01;
        //     cube.mesh.rotation.z += 0.01;
        // });
    }

}

CubeRotationSystem.queries = {
    cubes: {
        components: [Model]
    }
}
