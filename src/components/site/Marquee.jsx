import { useContent } from '../../context/ContentContext.jsx';

export default function Marquee() {
  const { site } = useContent();
  const text = site.marquee || '';
  return (
    <div className="bandw">
      <div className="band">
        <div className="mq">
          <span>{text.repeat(3)}</span>
          <span aria-hidden="true">{text.repeat(3)}</span>
        </div>
      </div>
    </div>
  );
}
