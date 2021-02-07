import { Model } from "../components/model";
import { ECS, Scene } from "..";
import { Entity } from "ecsy";
import { Color, Vector2 } from "three";

export class Cube {

    public static create(pos: Vector2): Entity {
        const cube = ECS.createEntity().addComponent(Model);
        const model = (cube.getMutableComponent(Model) as Model);
        model.mesh.position.x = pos.x;
        model.mesh.position.z = pos.y;
        model.material.color = new Color(1.0, 1.0, 1.0);
        Scene.add(model.mesh);
        return cube;
    }

    public static getByXY(arr: Entity[][], pos: Vector2): Model | null {
        for (let i = 0; i < arr.length; i++)
            for (let j = 0; j < arr[i].length; j++)
                if (pos.x === i && pos.y === j)
                    return arr[i][j].getMutableComponent(Model) as Model;
        return null;
    }

}