import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

function trimPlusMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedValue = (control.value || '').trim();
    return trimmedValue.length < minLength ? { minLength: { value: control.value } }: null;
  }
}

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit, OnChanges {
  @Input()
  public initialText: string = '';
  @Output()
  private submit = new EventEmitter<string>();

  public commentTextCtrl = new FormControl('', [Validators.required, trimPlusMinLengthValidator(4)]);

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.initialText) {
      this.commentTextCtrl.patchValue(this.initialText);
    }
  }

  public getErrorMessage(): string {
    if (this.commentTextCtrl.hasError('required')) {
      return 'Please enter a valid comment';
    }
    if (this.commentTextCtrl.hasError('minLength')) {
      return 'Comment must be at least 4 characters long';
    }
    return '';
  }

  public submitComment() {
    const text = this.commentTextCtrl.value?.trim();
    this.commentTextCtrl.reset();
    this.submit.emit(text);
  }

}
