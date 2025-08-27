import Ref from "@ludeschersoftware/ref";
import { AbstractScene } from "@ludeschersoftware/scenerenderer";
import SnakeComponent from "../Component/SnakeComponent";
import MenuComponent from "../Component/MenuComponent";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";

class SnakeScene extends AbstractScene {
    private m_container: HTMLElement;
    private m_stop_game: Ref<boolean>;

    constructor(id: string, container: HTMLElement) {
        super(id);

        this.m_container = container;
        this.m_stop_game = new Ref(false);
    }

    public override Initialize(): void {
        super.Initialize();

        this.Layers = [
            {
                applyCamera: false,
                components: [new SnakeComponent(this.m_stop_game)],
            },
            {
                applyCamera: false,
                components: [new MenuComponent(this.m_container, this.m_stop_game)],
            },
            {
                applyCamera: false,
                components: [new FPSComponent(), new CursorComponent(10)],
            },
        ];

        this.m_stop_game.value = false;
    }
}

export default SnakeScene;