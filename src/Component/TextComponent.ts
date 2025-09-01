import { AbstractComponent } from "@ludeschersoftware/scenerenderer";
import AlignType from "../Enum/AlignType";
import FontOptions from "../Interfaces/FontOptions";
import { Loose, NonNullableProps } from "@ludeschersoftware/types";

interface TextOptions extends FontOptions {
    value: string;
    color: string | CanvasGradient | CanvasPattern;
    horizontalAlign: AlignType;
    verticalAlign: AlignType;
}

class TextComponent extends AbstractComponent {
    private m_options: NonNullableProps<TextOptions>;
    private m_font: string;
    private m_text_align: CanvasTextAlign;
    private m_text_baseline: CanvasTextBaseline;

    constructor(options: Loose<TextOptions>) {
        super();

        this.m_options = Object.assign({
            fontFamily: 'verdana, sans-serif',
            fontSize: '10px',
            fontStyle: "normal",
            fontWeight: "normal",
            value: 'PLACEHOLDER',
            color: '#a83256',
            horizontalAlign: AlignType.Start,
            verticalAlign: AlignType.Start,
        }, options);
        this.m_font = `${this.m_options.fontStyle} ${this.m_options.fontWeight} ${this.m_options.fontSize} ${this.m_options.fontFamily}`;
        this.m_text_align = 'start';
        this.m_text_baseline = 'top';
    }

    public get value(): string {
        return this.m_options.value;
    }

    public set value(value: string) {
        this.m_options.value = value;
    }

    public override Update(): void {
        const PARENT_SIZE = this.getParentComponent()!.size;

        if (this.m_options.horizontalAlign === AlignType.Start) {
            this.x = 0;
            this.m_text_align = 'start';
        } else if (this.m_options.horizontalAlign === AlignType.Center) {
            this.x = PARENT_SIZE.width / 2;
            this.m_text_align = 'center';
        } else if (this.m_options.horizontalAlign === AlignType.End) {
            this.x = PARENT_SIZE.width;
            this.m_text_align = 'end';
        }

        if (this.m_options.verticalAlign === AlignType.Start) {
            this.y = 0;
            this.m_text_baseline = 'top';
        } else if (this.m_options.verticalAlign === AlignType.Center) {
            this.y = PARENT_SIZE.height / 2;
            this.m_text_baseline = 'middle';
        } else if (this.m_options.verticalAlign === AlignType.End) {
            this.y = PARENT_SIZE.height;
            this.m_text_baseline = 'bottom';
        }
    }

    public override Draw(context: CanvasRenderingContext2D): void | false {
        context.fillStyle = this.m_options.color;
        context.textAlign = this.m_text_align;
        context.textBaseline = this.m_text_baseline;
        context.font = this.m_font;
        context.fillText(this.value, this.x, this.y);
    }
}

export default TextComponent;