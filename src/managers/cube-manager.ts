import { Entity } from "ecsy";
import { Vector2 } from "three";
import { Model } from "../components/model";
import { Cube } from "../entities/cube";

export class CubeManager {

    private readonly cubes: Entity[][] = [];

    private closedSet: Model[] = [];
    private openSet: Model[] = [];
    private path: Model[] = [];
    private start: Model;
    private stop: Model;
    private size;

    private heuristic(a: Vector2, b: Vector2): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    constructor(size: number) {
        this.size = size;
        for (let i = 0; i < this.size; i++) {
            this.cubes[i] = [];
            for (let j = 0; j < this.size; j++)
                this.cubes[i].push(Cube.create(new Vector2(i, j)));
        }
        this.setColors();

        this.start = Cube.getByXY(this.cubes, new Vector2(0, 0))!;
        this.stop = Cube.getByXY(this.cubes, new Vector2(this.size - 1, this.size - 1))!;

        for (let i = 0; i < this.cubes.length; i++)
            for (let j = 0; j < this.cubes[i].length; j++)
                Cube.getByXY(this.cubes, new Vector2(i, j))!.addNeighbours(this.cubes);

        console.log(this.cubes);

        this.openSet.push(this.start);
    }

    private setColors(): void {
        Cube.getByXY(this.cubes, new Vector2(0, 0))!.isOrigin = true;

        Cube.getByXY(this.cubes, new Vector2(5, 1))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(5, 2))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(5, 3))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(5, 4))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(5, 5))!.isBlocked = true;

        Cube.getByXY(this.cubes, new Vector2(1, 5))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(0, 4))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(1, 4))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(2, 4))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(3, 4))!.isBlocked = true;

        Cube.getByXY(this.cubes, new Vector2(1, 2))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(2, 1))!.isBlocked = true;
        Cube.getByXY(this.cubes, new Vector2(2, 2))!.isBlocked = true;

        Cube.getByXY(this.cubes, new Vector2(this.size - 1, this.size - 1))!.isTarget = true;

        for (const itmX of this.cubes)
            for (const itmY of itmX) {
                const model = itmY.getMutableComponent(Model) as Model;
                model.updateColor();
            }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public onUpdate(delta: number, time: number): void {
        this.aStarAlgorithm();
    }

    private aStarAlgorithm() {
        for (const itm of this.openSet)
            if (!itm.isOrigin && !itm.isTarget)
                itm.setChecked();

        for (const itm of this.path)
            if (!itm.isOrigin && !itm.isTarget)
                itm.setPath();

        let winner = 0;
        if (this.openSet.length > 0) {
            // keep going

            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[winner].f)
                    winner = i;
            }

            const current = this.openSet[winner];

            if (current === this.stop) {

                let temp = current;
                this.path.push(temp);
                while (temp.previous) {
                    this.path.push(temp.previous);
                    temp = temp.previous;
                }
                console.log('Done!');
            }

            this.openSet = this.openSet.filter(c => c.getId() !== current.getId());
            this.closedSet.push(current);

            const neighbours = current.neighbours;
            for (let i = 0; i < neighbours.length; i++) {
                const neighbour = neighbours[i];
                if (!this.closedSet.includes(neighbour)) {
                    const tempG = current.g + 1;
                    if (this.openSet.includes(neighbour)) {
                        if (tempG < neighbour.g)
                            neighbour.g = tempG;
                    } else {
                        neighbour.g = tempG;
                        this.openSet.push(neighbour);
                    }

                    neighbour.h = this.heuristic(neighbour.getXY(), this.stop.getXY());
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }

        } else {
            // no solution
        }
    }

}
