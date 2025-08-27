import { AbstractComponent, Camera2D, ContentManager } from '@ludeschersoftware/scenerenderer';
import { Vec2 } from 'gl-matrix';

interface InputState {
    keyboardKeyDown: Record<string, boolean>;
}

class CameraComponent extends AbstractComponent {
    private m_camera: Camera2D;

    constructor(camera: Camera2D) {
        super({ height: 1, width: 1, x: 0, y: 0 });
        this.m_camera = camera;
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number, inputState: InputState): void | false {
        if (inputState.keyboardKeyDown['ArrowUp']) {
            this.m_camera.MovePosition(Vec2.fromValues(0, 10));
        }

        if (inputState.keyboardKeyDown['ArrowRight']) {
            this.m_camera.MovePosition(Vec2.fromValues(-10, 0));
        }

        if (inputState.keyboardKeyDown['ArrowDown']) {
            this.m_camera.MovePosition(Vec2.fromValues(0, -10));
        }

        if (inputState.keyboardKeyDown['ArrowLeft']) {
            this.m_camera.MovePosition(Vec2.fromValues(10, 0));
        }
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        // Optional draw logic
    }
}

export default CameraComponent;