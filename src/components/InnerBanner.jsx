import Image from "next/image";

export default function InnerBanner({ 
  sectionId = "innerBanner",
  imageSrc,
  imageAlt,
  title,
  className = ""
}) {
  return (
    <section id={sectionId} className={className}>
      <div className="banner-inner">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={2880} 
          height={808} 
          className="img-fluid" 
        />
        <div className="container">
          <div className="row position-relative">
            <div className="col-lg-12">
              <div className="bannerCaption">
                <h2 className="bannerHeading">{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
