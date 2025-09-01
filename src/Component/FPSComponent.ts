import { AbstractComponent, getConfig, GlobalConfigInterface } from "@ludeschersoftware/scenerenderer";
import TextComponent from "./TextComponent";

class FPSComponent extends AbstractComponent {
    private m_config: GlobalConfigInterface;
    private m_text_component: TextComponent;

    constructor() {
        super();

        this.m_config = getConfig("1");
        this.m_text_component = new TextComponent({
            color: 'red',
            fontSize: '40px',
            value: 'FPS(0)',
        });

        this.addComponent(this.m_text_component);
    }

    public override Update(deltaTime: number): void {
        const FPS = Math.trunc(1 / deltaTime);
        this.m_text_component.value = `${FPS} FPS`;

        this.x = this.m_config.Canvas.width - (FPS <= 100 ? 140 : 160);
    }

    public override Draw(): void | false {
        // Optional draw logic, currently empty
    }
}

export default FPSComponent;