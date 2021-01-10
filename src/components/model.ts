import { BoxGeometry, Color, Mesh, MeshPhongMaterial } from 'three';
import { Component } from 'ecsy';

export class Model extends Component<void> {

    constructor() {
        super();
        this.color = new Color('hsl(40, 100%, 60%)'); // yellow
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({
            color: this.color,
            shininess: 80
        });
        this.mesh = new Mesh(this.geometry, this.material);
    }

    color: Color;
    geometry: BoxGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

}
