import Ref from "@ludeschersoftware/ref";
import { AbstractScene } from "@ludeschersoftware/scenerenderer";
import SnakeComponent from "../Component/SnakeComponent";
import MenuComponent from "../Component/MenuComponent";
import FPSComponent from "../Component/FPSComponent";
import CursorComponent from "../Component/CursorComponent";

class SnakeScene extends AbstractScene {
    private m_stop_game: Ref<boolean>;

    constructor(id: string) {
        super(id);

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
                components: [new MenuComponent(this.m_stop_game)],
            },
            {
                applyCamera: false,
                components: [new FPSComponent(), new CursorComponent()],
            },
        ];

        this.m_stop_game.value = false;
    }
}

export default SnakeScene;