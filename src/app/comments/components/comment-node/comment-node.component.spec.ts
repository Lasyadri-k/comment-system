import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentNodeComponent } from './comment-node.component';

describe('CommentNodeComponent', () => {
  let component: CommentNodeComponent;
  let fixture: ComponentFixture<CommentNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
