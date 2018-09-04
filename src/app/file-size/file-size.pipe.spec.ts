import { FilePipeSize } from './file-size.pipe';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';

describe('FileSizeSpec', () => {
  describe('Shallow', () => {
    @Component({
      template: `
        Size: {{ size | filesize:suffix }}
      `
    })
    class TestComponent {
      suffix;
      size = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FilePipeSize, TestComponent]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should convert bytes to mega bytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
      component.size = 1029281;
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 0.98MB');
    });
    it('should use the default extention', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
    });
    it('should override the default extention', () => {
      component.suffix = 'MegaByte';
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MegaByte');
    });
  });

  describe('Isolate', () => {
    const pipe = new FilePipeSize();
    it('should convert bytes to mega bytes', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });
    it('should use the default extention', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
    });
    it('should override the default extention', () => {
      expect(pipe.transform(123456789, 'MegaByte')).toBe('117.74MegaByte');
    });
  });
});
