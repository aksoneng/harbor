import { Component, Input, Output, EventEmitter } from '@angular/core';

import { COPY_INPUT_HTML } from './copy-input.html';
import { PUSH_IMAGE_STYLE } from './push-image.css';

export const enum CopyStatus {
    NORMAL, SUCCESS, ERROR
}

@Component({
    selector: 'hbr-copy-input',
    styles: [PUSH_IMAGE_STYLE],
    template: COPY_INPUT_HTML,

    providers: []
})
export class CopyInputComponent {
    @Input() inputSize: number = 40;
    @Input() headerTitle: string = "Copy Input";
    @Input() defaultValue: string = "N/A";

    state: CopyStatus = CopyStatus.NORMAL;

    @Output() onCopySuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCopyError: EventEmitter<any> = new EventEmitter<any>();

    onSuccess($event: any): void {
        this.state = CopyStatus.SUCCESS;
        this.onCopySuccess.emit($event);
    }

    onError(error: any): void {
        this.state = CopyStatus.ERROR;
        this.onCopyError.emit(error);
    }

    reset(): void {
        this.state = CopyStatus.NORMAL;
    }

    public get isCopied(): boolean {
        return this.state === CopyStatus.SUCCESS;
    }

    public get hasCopyError(): boolean {
        return this.state === CopyStatus.ERROR;
    }
}
