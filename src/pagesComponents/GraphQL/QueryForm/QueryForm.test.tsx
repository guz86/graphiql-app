import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QueryForm from './QueryForm';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('../../UrlInput/UrlInput', () => ({
  default: ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  ),
}));

vi.mock('../../TextAreaInput/TextAreaInput', () => ({
  default: ({ label, value, onChange, placeholder, rows }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  ),
}));

vi.mock('../HeaderInput/HeaderInput', () => ({
  default: ({ keyValue, onKeyChange, onValueChange, onAdd }: any) => (
    <div>
      <input
        type="text"
        value={keyValue.key}
        onChange={onKeyChange}
        placeholder="Header Key"
      />
      <input
        type="text"
        value={keyValue.value}
        onChange={onValueChange}
        placeholder="Header Value"
      />
      <button onClick={onAdd}>Add Header</button>
    </div>
  ),
}));

vi.mock('../../Button/Button', () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));


describe('QueryForm Component', () => {
  const mockProps = {
    url: 'https://example.com/graphql',
    sdlUrl: 'https://example.com/graphql?sdl',
    query: 'query { hello }',
    variables: '{"id": "1"}',
    headers: '[]',
    onUrlChange: vi.fn(),
    onSdlUrlChange: vi.fn(),
    onQueryChange: vi.fn(),
    onVariablesChange: vi.fn(),
    onBodyChange: vi.fn(),
    onBodyBlur: vi.fn(),
    onHeadersChange: vi.fn(),
    onQueryExecute: vi.fn(),
    t: en.graphiql
  };

  it('should render the component correctly', () => {
    render(<QueryForm {...mockProps} />);

    expect(screen.getByLabelText('Endpoint URL:')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL:')).toBeInTheDocument();
    expect(screen.getByLabelText('Query:')).toBeInTheDocument();
    expect(screen.getByText('Prettify')).toBeInTheDocument();
    expect(screen.getByText('Send Request')).toBeInTheDocument();

    const showVariablesButton = screen.getByText('Show Variables');
    fireEvent.click(showVariablesButton);

    expect(screen.getByLabelText('Variables:')).toBeInTheDocument();
  });


  it('should toggle headers visibility', () => {
    render(<QueryForm {...mockProps} />);

    const headersButton = screen.getByText('Show Headers');
    fireEvent.click(headersButton);
    expect(screen.getByText('Hide Headers')).toBeInTheDocument();
  });


  it('should toggle variables visibility', () => {
    render(<QueryForm {...mockProps} />);


    const variablesButton = screen.getByText('Show Variables');
    fireEvent.click(variablesButton);
    expect(screen.getByText('Hide Variables')).toBeInTheDocument();
  });


  it('should call onQueryExecute when Send Request is clicked', () => {
    render(<QueryForm {...mockProps} />);

    const sendRequestButton = screen.getByText('Send Request');
    fireEvent.click(sendRequestButton);

    expect(mockProps.onQueryExecute).toHaveBeenCalled();
  });

  it('should call handlePrettify and update query on Prettify button click', () => {
    render(<QueryForm {...mockProps} />);

    const prettifyButton = screen.getByText('Prettify');
    fireEvent.click(prettifyButton);

    expect(mockProps.onQueryChange).toHaveBeenCalled();
  });
});

describe('QueryForm Handling Functions', () => {
  const mockProps = {
    url: 'https://example.com/graphql',
    sdlUrl: 'https://example.com/graphql?sdl',
    query: 'query { hello }',
    variables: '{"id": "1"}',
    headers: '[]',
    onUrlChange: vi.fn(),
    onSdlUrlChange: vi.fn(),
    onQueryChange: vi.fn(),
    onVariablesChange: vi.fn(),
    onBodyChange: vi.fn(),
    onBodyBlur: vi.fn(),
    onHeadersChange: vi.fn(),
    onQueryExecute: vi.fn(),

    t: en.graphiql
  };

  it('should handle URL change', () => {
    render(<QueryForm {...mockProps} />);

    const urlInput = screen.getByLabelText('Endpoint URL:');
    fireEvent.change(urlInput, {
      target: { value: 'https://new-url.com/graphql' },
    });

    expect(mockProps.onUrlChange).toHaveBeenCalled();
  });

  it('should handle SDL URL change', () => {
    render(<QueryForm {...mockProps} />);

    const sdlUrlInput = screen.getByLabelText('SDL URL:');
    fireEvent.change(sdlUrlInput, {
      target: { value: 'https://new-sdl-url.com/graphql?sdl' },
    });

    expect(mockProps.onSdlUrlChange).toHaveBeenCalled();
  });

  it('should handle query change', () => {
    render(<QueryForm {...mockProps} />);

    const queryInput = screen.getByLabelText('Query:');
    fireEvent.change(queryInput, { target: { value: 'query { newQuery }' } });

    expect(mockProps.onQueryChange).toHaveBeenCalled();
  });

  it('should handle body change and blur', () => {
    render(<QueryForm {...mockProps} />);

    const queryInput = screen.getByLabelText('Query:');
    fireEvent.change(queryInput, { target: { value: 'query { changed }' } });
    fireEvent.blur(queryInput);

    expect(mockProps.onBodyChange).toHaveBeenCalled();
    expect(mockProps.onBodyBlur).toHaveBeenCalled();
  });
});
