import { InputStateInterface, AbstractComponent, Camera2D } from '@ludeschersoftware/scenerenderer';
import { Vec2 } from 'gl-matrix';

class CameraComponent extends AbstractComponent {
    private m_camera: Camera2D;

    constructor(camera: Camera2D) {
        super({ height: 1, width: 1, x: 0, y: 0 });
        this.m_camera = camera;
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(): void {
        // Optional content loading logic
    }

    public Update(_deltaTime: number, inputState: InputStateInterface): void | false {
        if (inputState.KeyboardKeyDown['ArrowUp']) {
            this.m_camera.MovePosition(Vec2.fromValues(0, 10));
        }

        if (inputState.KeyboardKeyDown['ArrowRight']) {
            this.m_camera.MovePosition(Vec2.fromValues(-10, 0));
        }

        if (inputState.KeyboardKeyDown['ArrowDown']) {
            this.m_camera.MovePosition(Vec2.fromValues(0, -10));
        }

        if (inputState.KeyboardKeyDown['ArrowLeft']) {
            this.m_camera.MovePosition(Vec2.fromValues(10, 0));
        }
    }

    public Draw(): void | false {
        // Optional draw logic
    }
}

export default CameraComponent;