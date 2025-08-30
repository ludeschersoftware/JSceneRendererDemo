import Ref from "@ludeschersoftware/ref";
import { AbstractComponent, getConfig, GlobalConfigInterface } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";

class GameOverComponent extends AbstractComponent {
    private m_config: GlobalConfigInterface;
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

        this.m_config = getConfig("1");
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

    public LoadContent(): void {
        // Optional content loading logic
    }

    public Update(): void {
        this.width = this.m_config.Canvas.width * 0.666;
        this.height = this.m_config.Canvas.height * 0.666;
        this.x = (this.m_config.Canvas.width - this.width) / 2;
        this.y = (this.m_config.Canvas.height - this.height) / 2;

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