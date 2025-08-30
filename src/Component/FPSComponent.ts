import { AbstractComponent, getConfig, GlobalConfigInterface } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";

class FPSComponent extends AbstractComponent {
    private m_config: GlobalConfigInterface;
    private m_text_component: TextComponent;

    constructor() {
        super({ height: 0, width: 0, x: 0, y: 0 });

        this.m_config = getConfig("1");
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

    public LoadContent(): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number): void {
        const FPS = Math.trunc(1 / deltaTime);
        this.m_text_component.title = `${FPS} FPS`;

        this.x = this.m_config.Canvas.width - (FPS <= 100 ? 140 : 160);
    }

    public Draw(): void | false {
        // Optional draw logic, currently empty
    }
}

export default FPSComponent;