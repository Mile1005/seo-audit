import { h } from 'preact';

interface Shortcut {
  combo: string;
  desc: string;
}
interface Props {
  keyboardShortcuts?: Shortcut[];
}

export default function Reference({ keyboardShortcuts }: Props) {
  return (
    <div>
      <h3>Keyboard Shortcuts</h3>
      <ul>
        {keyboardShortcuts?.map(s => (
          <li key={s.combo}><kbd>{s.combo}</kbd>: {s.desc}</li>
        ))}
      </ul>
      <h3>About</h3>
      <p>This extension provides accessibility and SEO diagnostics with a WAVE-style overlay. All controls are keyboard accessible and labeled for screen readers.</p>
    </div>
  );
}
