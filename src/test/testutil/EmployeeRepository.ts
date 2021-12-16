export interface EmployeeRepositoryInterface {
    setReplyText(replyText: string): void;
    getReplyText(): string;

}

export class EmployeeRepository implements EmployeeRepositoryInterface{
    private replyText: string;

    setReplyText(replyText: string) {
        this.replyText = replyText;
    }

    getReplyText(): string {
        return this.replyText;
    }

}