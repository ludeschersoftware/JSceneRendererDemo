import { AbstractComponent, ContentManager } from "@ludeschersoftware/scenerenderer";

interface TextOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    title?: string;
    fillStyle?: string | CanvasGradient | CanvasPattern;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    font?: string;
}

class TextComponent extends AbstractComponent {
    public title: string;
    public fillStyle: string | CanvasGradient | CanvasPattern;
    public textAlign: CanvasTextAlign;
    public textBaseline: CanvasTextBaseline;
    public font: string;

    constructor(options: TextOptions) {
        super(options);

        this.title = options.title ?? 'Placeholder';
        this.fillStyle = options.fillStyle ?? '#a83256';
        this.textAlign = options.textAlign ?? 'start';
        this.textBaseline = options.textBaseline ?? 'top';
        this.font = options.font ?? '10px verdana, sans-serif';
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        // Optional content loading logic
    }

    public Update(deltaTime: number, inputState: unknown): false | void {
        // Optional update logic
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        context.fillStyle = this.fillStyle;
        context.textAlign = this.textAlign;
        context.textBaseline = this.textBaseline;
        context.font = this.font;
        context.fillText(this.title, this.x, this.y);
    }
}

export default TextComponent;