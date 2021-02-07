import { BoxGeometry, Color, Mesh, MeshPhongMaterial, Vector2 } from 'three';
import { Component, Entity } from 'ecsy';
import { Cube } from '../entities/cube';

export class Model extends Component<void> {

    private id: number;
    private readonly _neighbours: Model[] = [];
    public previous: Model | null;

    public get neighbours(): Model[] { return this._neighbours; }

    public addNeighbours(arr: Entity[][]): void {
        const x = this.mesh.position.x;
        const y = this.mesh.position.z;
        const a = Cube.getByXY(arr, new Vector2(x + 1, y));
        if (a && !a.isBlocked) this._neighbours.push(a);
        const b = Cube.getByXY(arr, new Vector2(x - 1, y));
        if (b && !b.isBlocked) this._neighbours.push(b);
        const c = Cube.getByXY(arr, new Vector2(x, y + 1));
        if (c && !c.isBlocked) this._neighbours.push(c);
        const d = Cube.getByXY(arr, new Vector2(x, y - 1));
        if (d && !d.isBlocked) this._neighbours.push(d);
    }

    constructor() {
        super();
        this.id = Math.random();
        this.isBlocked = false;
        this.isOrigin = false;
        this.isTarget = false;
        this.color = new Color('hsl(40, 100%, 60%)'); // yellow
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({
            color: this.color,
            shininess: 80
        });
        this.mesh = new Mesh(this.geometry, this.material);
        this.previous = null;
    }

    public getId(): number { return this.id; }

    public getXY(): Vector2 {
        return new Vector2(this.mesh.position.x, this.mesh.position.z);
    }

    public updateColor(): void {
        if (this.isBlocked)
            this.material.color.setRGB(0, 0, 0);
        else if (this.isOrigin)
            this.material.color.setRGB(0, 128, 0);
        else if (this.isTarget)
            this.material.color.setRGB(128, 0, 0);
    }

    public setChecked(): void {
        this.material.color.setRGB(0, 0, 64);
    }

    public setPath(): void {
        this.material.color.setRGB(0, 64, 64);
    }

    f = 0;
    g = 0;
    h = 0;

    // https://www.youtube.com/watch?v=aKYlikFAV4k
    // 14 minuta

    isBlocked: boolean;
    isOrigin: boolean;
    isTarget: boolean;
    color: Color;
    geometry: BoxGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

}
