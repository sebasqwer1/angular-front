import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [IndexComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'consumo'`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('consumo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('consumo app is running!');
  });
});
