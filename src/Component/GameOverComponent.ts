import Ref from "@ludeschersoftware/ref";
import { AbstractComponent, ContentManager, Renderer } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";

class GameOverComponent extends AbstractComponent {
    private m_show: Ref<boolean>;
    private m_score: Ref<number>;
    private m_score_component: TextComponent;

    constructor(show: Ref<boolean>, score: Ref<number>) {
        super({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });

        this.m_show = show;
        this.m_score = score;
        this.m_score_component = new TextComponent({
            title: 'Score: 0',
            fillStyle: 'red',
            textAlign: 'center',
            textBaseline: 'middle',
            font: '40px verdana, sans-serif',
            x: 0,
            y: 100,
            width: 350,
            height: 100,
        });

        this.addComponent(this.m_score_component);
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number, inputState: unknown): void {
        this.width = Renderer.CONFIG.canvas.width * 0.666;
        this.height = Renderer.CONFIG.canvas.height * 0.666;
        this.x = (Renderer.CONFIG.canvas.width - this.width) / 2;
        this.y = (Renderer.CONFIG.canvas.height - this.height) / 2;

        if (this.m_show.value) {
            this.m_score_component.title = `Score: ${this.m_score.value}`;
        }
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        if (!this.m_show.value) return false;

        context.fillStyle = '#0317fc';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default GameOverComponent;