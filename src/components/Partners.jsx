import Image from "next/image";

export default function Partners({
  title = 'Trusted Partnerships\nThat Power Our Services',
  desc = 'Partnering with the best to deliver smarter solutions for you.',
  imageSrc = '/images/logo-partners.png',
  alt = 'Emisha',
}) {
  const lines = title.split('\n');

  return (
    <section className="partners">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h3 className="title">
              {lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < lines.length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p className="desc">{desc}</p>
          </div>
          <div className="col-md-8">
            <Image src={imageSrc} alt={alt} width={1499} height={216} className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}
