import { Model } from "../components/model";
import { ECS, Scene } from "..";
import { Entity } from "ecsy";

export class Cube {

    public static Create(): Entity {
        const cube = ECS.createEntity().addComponent(Model);
        const mesh = (cube.getComponent(Model) as Model).mesh;
        Scene.add(mesh);
        return cube;
    }

}