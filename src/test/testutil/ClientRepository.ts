export interface ClientRepositoryInterface {
    setClientReplyText(replyText: string): void;
    getClientReplyText(): string;

}

export class ClientRepository implements ClientRepositoryInterface{
    private replyText: string;

    setClientReplyText(replyText: string) {
        this.replyText = replyText;
    }

    getClientReplyText(): string {
        return this.replyText;
    }

}