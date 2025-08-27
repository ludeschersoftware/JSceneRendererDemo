import { AbstractComponent, ContentManager, Renderer } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";

class FPSComponent extends AbstractComponent {
    private m_text_component: TextComponent;

    constructor() {
        super({ height: 0, width: 0, x: 0, y: 0 });

        this.m_text_component = new TextComponent({
            fillStyle: 'red',
            font: '40px verdana, sans-serif',
            title: 'FPS(0)',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
        });

        this.addComponent(this.m_text_component);
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number): void {
        const FPS = Math.trunc(1 / deltaTime);
        this.m_text_component.title = `${FPS} FPS`;

        this.x = Renderer.CONFIG.canvas.width - (FPS <= 100 ? 140 : 160);
    }

    public Draw(context: CanvasRenderingContext2D, deltaTime: number): void | false {
        // Optional draw logic, currently empty
    }
}

export default FPSComponent;