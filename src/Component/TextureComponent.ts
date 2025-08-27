import { AbstractComponent, ContentManager, Texture2D } from "@ludeschersoftware/scenerenderer";

interface TextureOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    src: string;
}

class TextureComponent extends AbstractComponent {
    private m_texture: Texture2D | undefined;
    private m_src: string;

    constructor(options: TextureOptions) {
        super(options);
        this.m_texture = undefined;
        this.m_src = options.src;
    }

    public Initialize(): void {
        // Optional setup logic
    }

    public LoadContent(contentManager: ContentManager): void {
        this.m_texture = contentManager.LoadFromSrc(this.m_src);
    }

    public Update(deltaTime: number, inputState: unknown): false | void {
        // Optional update logic
    }

    public Draw(context: CanvasRenderingContext2D): void | false {
        if (this.m_texture !== undefined) {
            context.drawImage(
                this.m_texture.GetImageBitmap(),
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}

export default TextureComponent;