import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function Host() {
  const { host } = useContent();
  return (
    <Section tone="t" id="host" className="hostsec" scallop="var(--bW)">
      <div className="wrap">
        <div className="hostcard">
          <div className="stampc">
            <div className="htext">
              <div className="hi">{host.greeting}</div>
              <h2>
                <span className="nm">
                  {host.name}
                  <img src="/stickers/name-doodle.webp" alt="" />
                </span>
              </h2>
              {(host.paragraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="hchips">
                {(host.chips ?? []).map((c, i) => (
                  <span className="pill" key={i}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="jn">
              <img className="coco" src="/stickers/coco.webp" alt="" />
            </div>
            <div className="hphoto">
              <img src={host.photo} alt={host.photoAlt} />
            </div>
          </div>
          <img className="hibi" src="/stickers/hibi.webp" alt="" />
        </div>
      </div>
    </Section>
  );
}
