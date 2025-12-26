import Image from "next/image";

export default function LeadInfo({
  sectionId = "leadInfo",
  title,
  description,
  quote,
  image,
  className = ""
}) {
  // Default content for index page
  const defaultContent = {
    title: "Enterprise Intelligence Partnership",
    description: "When your organization processes millions of transactions, serves thousands of locations, or manages complex stakeholder ecosystems, you need more than software—you need a proven Enterprise Intelligence partner.",
    quote: "We are Emisha Interactive. We have specialists in Management Information Systems, Business Intelligence platforms, and Decision Support architecture that transform transactional data into executive intelligence."
  };

  // Use provided content or fall back to defaults
  const content = {
    title: title || defaultContent.title,
    description: description || defaultContent.description,
    quote: quote || defaultContent.quote
  };

  return (
    <section id={sectionId} className={className}>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6">
            <h2 className="sectionHeading">{content.title}</h2>
            <p className="sectionLead mb-lg-0">{content.description}</p>
            {image && (
              <div className="mt-4">
                <Image src={image} alt={content.title} width={500} height={500} className="img-fluid" />
              </div>
            )}
          </div>
          <div className="col-lg-5">
            <div className="notice">
              <div className="me-2">
                <Image src='/images/icon-notice-tip.svg' alt='...' width={45} height={45} />
              </div>
              <p className="mb-0">{content.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
