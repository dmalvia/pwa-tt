export class Message {
    public content: string;
    public bot: boolean;
    public type: string

    constructor(content: string, bot: boolean, type: string) {
        this.content = content;
        this.bot = bot;
        this.type = type;
    }
}
