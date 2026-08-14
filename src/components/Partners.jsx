import Image from "next/image";

export default function Partners({
  title = 'Trusted Partnerships\nThat Power Our Services',
  desc = 'Partnering with the best to deliver smarter solutions for you.',
  imageSrc = '/images/partners-logo-v2.webp',
  alt = 'Emisha',
}) {
  const lines = title.split('\n');

  return (
    <section className="partners">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-lg-4">
            <h2 className="title">
              {lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < lines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="desc">{desc}</p>
          </div>
          <div className="col-md-12 col-lg-8">
            <Image src={imageSrc} alt={alt} width={1499} height={216} className="img-fluid mt-4 mt-lg-0 d-none d-lg-block" />
            <Image src="/images/partners-logo-mobile.webp" alt={alt} width={1499} height={216} className="img-fluid mt-4 mt-lg-0 d-lg-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
