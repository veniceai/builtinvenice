// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageField from './ImageField';

function makeFile(name: string, type: string, sizeBytes: number): File {
  const f = new File([new Uint8Array(1)], name, { type });
  Object.defineProperty(f, 'size', { value: sizeBytes });
  return f;
}

describe('ImageField', () => {
  it('renders the drop affordance with label and description', () => {
    render(
      <ImageField id="thumb" label="Thumbnail" description="16:9 PNG" onBlobChange={() => {}} />
    );
    expect(screen.getByText('Thumbnail')).toBeInTheDocument();
    expect(screen.getByText('16:9 PNG')).toBeInTheDocument();
    expect(screen.getByText(/Drop an image/)).toBeInTheDocument();
  });

  it('ignores non-image files', async () => {
    const onBlobChange = vi.fn();
    render(<ImageField id="thumb" label="Thumbnail" onBlobChange={onBlobChange} />);
    const input = document.getElementById('field-thumb') as HTMLInputElement;
    const file = makeFile('a.txt', 'text/plain', 100);
    await userEvent.upload(input, file);
    expect(screen.getByText(/Drop an image/)).toBeInTheDocument();
  });

  it('rejects files larger than 20 MB with an inline error', async () => {
    render(<ImageField id="thumb" label="Thumbnail" onBlobChange={() => {}} />);
    const input = document.getElementById('field-thumb') as HTMLInputElement;
    const huge = makeFile('big.png', 'image/png', 21 * 1024 * 1024);
    await userEvent.upload(input, huge);
    expect(screen.getByText(/Image too large/)).toBeInTheDocument();
  });

  it('emits onBlobChange(null) initially (no completed crop yet)', () => {
    const onBlobChange = vi.fn();
    render(<ImageField id="thumb" label="Thumbnail" onBlobChange={onBlobChange} />);
    expect(onBlobChange).toHaveBeenCalledWith(null);
  });

  it('clears the size error when a valid file is selected next', async () => {
    render(<ImageField id="thumb" label="Thumbnail" onBlobChange={() => {}} />);
    const input = document.getElementById('field-thumb') as HTMLInputElement;
    await userEvent.upload(input, makeFile('big.png', 'image/png', 21 * 1024 * 1024));
    expect(screen.getByText(/Image too large/)).toBeInTheDocument();

    const origFileReader = globalThis.FileReader;
    class FakeReader {
      onload: (() => void) | null = null;
      result = 'data:image/png;base64,Zm9v';
      readAsDataURL() { setTimeout(() => this.onload?.(), 0); }
    }
    // @ts-expect-error test stub
    globalThis.FileReader = FakeReader;

    await userEvent.upload(input, makeFile('ok.png', 'image/png', 100));
    await new Promise(r => setTimeout(r, 5));
    expect(screen.queryByText(/Image too large/)).toBeNull();

    globalThis.FileReader = origFileReader;
  });

  it('reset removes the preview and calls onBlobChange(null)', async () => {
    const onBlobChange = vi.fn();
    render(<ImageField id="thumb" label="Thumbnail" onBlobChange={onBlobChange} />);
    const input = document.getElementById('field-thumb') as HTMLInputElement;

    const origFileReader = globalThis.FileReader;
    class FakeReader {
      onload: (() => void) | null = null;
      result = 'data:image/png;base64,Zm9v';
      readAsDataURL() { setTimeout(() => this.onload?.(), 0); }
    }
    // @ts-expect-error test stub
    globalThis.FileReader = FakeReader;

    await userEvent.upload(input, makeFile('ok.png', 'image/png', 100));
    await new Promise(r => setTimeout(r, 5));

    const remove = await screen.findByRole('button', { name: 'Remove image' });
    onBlobChange.mockClear();
    fireEvent.click(remove);
    expect(onBlobChange).toHaveBeenCalledWith(null);
    expect(screen.getByText(/Drop an image/)).toBeInTheDocument();

    globalThis.FileReader = origFileReader;
  });
});
