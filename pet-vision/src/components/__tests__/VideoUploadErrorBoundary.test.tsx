import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import VideoUploadErrorBoundary from '../VideoUploadErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Video upload error');
  }
  return <div>Video upload working</div>;
};

describe('VideoUploadErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <VideoUploadErrorBoundary>
        <ThrowError shouldThrow={false} />
      </VideoUploadErrorBoundary>
    );

    expect(screen.getByText('Video upload working')).toBeInTheDocument();
  });

  it('renders video upload error UI when there is an error', () => {
    render(
      <VideoUploadErrorBoundary>
        <ThrowError shouldThrow={true} />
      </VideoUploadErrorBoundary>
    );

    expect(screen.getByText('Video Upload Error')).toBeInTheDocument();
    expect(screen.getByText('There was a problem with the video upload component. Please try refreshing the page.')).toBeInTheDocument();
  });

  it('has a try again button', () => {
    render(
      <VideoUploadErrorBoundary>
        <ThrowError shouldThrow={true} />
      </VideoUploadErrorBoundary>
    );

    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });
});
