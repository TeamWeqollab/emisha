import Layout from "@/components/Layout.jsx";
import { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().test('phone', 'Phone must be exactly 10 digits', (val) => !val || /^[0-9]{10}$/.test(val)),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactUs() {
  const partnershipCarouselRef = useRef(null);
  const [status, setStatus] = useState("");
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;
      if (publicKey && !isInit) {
        emailjs.init({ publicKey });
        setIsInit(true);
      }
    } catch {}
  }, [isInit]);

  // Scroll to contact form when arriving from another page (e.g. JOIN THE TEAM) without hash in URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scrollToId = window.sessionStorage.getItem('scrollTo');
    if (!scrollToId) return;
    window.sessionStorage.removeItem('scrollTo');
    const el = document.getElementById(scrollToId);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  return (
    <Layout
      pageTitle="Emisha"
      metaTitle="Future-proofing businesses with intelligent data solutions."
      metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
      socialTitle="Future-proofing businesses with intelligent data solutions."
      socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/contact"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="bg-contact">

      <div className="innerBanner2">
        <div className="d-none d-md-block text-center">
          <Image src="/images/banner-contact.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none text-center">
          <Image src="/images/banner-contact-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">Your business <br />deserves better data.</h2>
                <p className="banner-desc">Reach out to Emisha and take control of your data strategy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <section className="sectionWrapper pt-0" id="contactusform" aria-label="Contact form">
        <div className="container">
          <div className="contactEmishaBx">
            <div className="row align-items-start justify-content-between">
              <div className="col-md-4">
                <h3 className="title">Contact Information</h3>
                <p className="card-Text">Talk to Emisha and let&apos;s innovate together.</p>
                {/* <p className="card-Text">+65-XXXX-YYYY</p> */}
                <p className="card-Text">info@emishaglobal.com</p>
                <p className="card-Text mb-0">An Emisha expert will reach out soon with tailored solutions to meet your needs.</p>
              </div>

              <div className="col-md-7">
                <div className="contactForm">
                  <Formik
                    initialValues={{ name: "", email: "", phone: "", message: "" }}
                    validationSchema={ContactSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
                      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
                      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

                      if (!serviceId || !templateId || !publicKey) {
                        console.error("EmailJS environment variables are missing:", { serviceId, templateId, publicKey });
                        setStatus("❌ Email service not configured. Please try again later.");
                        setSubmitting(false);
                        return;
                      }

                      try {
                        
                        const response = await emailjs.send(
                          serviceId,
                          templateId,
                          {
                            name: values.name,
                            phone: values.phone,
                            email: values.email,
                            message: values.message,
                          },
                          publicKey
                        );
                        console.log("Form submit values:", values);
                        console.log("EmailJS success:", response);
                        setStatus("✅ Message sent successfully!");
                        resetForm();
                      } catch (error) {
                        console.error("EmailJS Error:", error);
                        setStatus("❌ Failed to send. Please try again later.");
                      } finally {
                        setSubmitting(false);
                        // optionally clear status after a short time
                        setTimeout(() => setStatus(""), 5000);
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="row g-4">
                        <div className="col-12 contactCol">
                          <label className="form-label">Name 
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <Field name="name" className="form-control" />
                          <ErrorMessage name="name" component="div" className="text-danger small mt-3" />
                        </div>

                        <div className="col-12 contactCol">
                          <label className="form-label">Email 
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <Field type="email" name="email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="text-danger small mt-3" />
                        </div>

                        <div className="col-12 contactCol">
                          <label className="form-label">Phone (Optional)</label>
                          <Field
                            name="phone"
                            className="form-control"
                            maxLength="10"
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          <ErrorMessage name="phone" component="div" className="text-danger small mt-3" />
                        </div>

                        <div className="col-12 contactCol">
                          <label className="form-label">Message 
                            {/* <span className="text-danger">*</span> */}
                          </label>
                          <Field as="textarea" name="message" className="form-control" rows="4" style={{ resize: 'none' }} />
                          <ErrorMessage name="message" component="div" className="text-danger small mt-3" />
                        </div>

                        <div className="col-12 text-end">
                          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "SUBMIT"}
                          </button>
                        </div>

                        {status && (
                          <div className="col-12 text-center mt-3">
                            <p>{status}</p>
                          </div>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>


    </Layout>
  );
}
